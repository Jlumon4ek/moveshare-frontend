import { useState, type ChangeEvent, type ReactNode, forwardRef } from 'react';
import { X, Info, Truck, MapPin, Calendar, CreditCard, Upload, PlusCircle, Briefcase } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Button } from '../../../shared/ui/Button/Button';
import { Input } from '../../../shared/ui/Input/Input';
import { Select } from '../../../shared/ui/Select/Select';
import { SelectCard } from '../../../shared/ui/SelectCard/SelectCard';
import { Textarea } from '../../../shared/ui/Textarea/Textarea';
import cn from 'classnames';

interface PostJobModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Section = ({ title, icon, children }: { title: string, icon: ReactNode, children: ReactNode }) => (
    <section>
        <div className="pb-4 border-b border-gray-200 mb-4">
            <h3 className="flex items-center gap-3 text-xl font-bold text-gray-800">
                {icon}
                <span>{title}</span>
            </h3>
        </div>
        <div className="space-y-4">
            {children}
        </div>
    </section>
);

const ToggleButtonGroup = ({
    options,
    selectedValue,
    onChange,
    columns = 3,
}: {
    options: string[];
    selectedValue: string;
    onChange: (value: string) => void;
    columns?: number;
}) => (
    <div className={`grid grid-cols-${columns} gap-3`}>
        {options.map((option) => (
            <button
                key={option}
                type="button"
                onClick={() => onChange(option)}
                className={cn(
                    'w-full px-4 py-3 text-sm font-medium text-gray-700 border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20',
                    {
                        'bg-blue-50 border-primary shadow-sm': selectedValue === option,
                        'bg-white border-gray-300 hover:bg-gray-50': selectedValue !== option,
                    }
                )}
            >
                {option}
            </button>
        ))}
    </div>
);

// Custom Input for DatePicker with manual masking logic
const CustomDateInput = forwardRef<HTMLInputElement, { value?: string; onClick?: () => void; onChange: (event: ChangeEvent<HTMLInputElement>) => void; placeholder?: string; }>(
    ({ value, onClick, onChange, placeholder }, ref) => {
        const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
            let val = e.target.value.replace(/\D/g, ''); // Remove all non-digit characters
            if (val.length > 2) {
                val = val.slice(0, 2) + '/' + val.slice(2);
            }
            if (val.length > 5) {
                val = val.slice(0, 5) + '/' + val.slice(5, 9);
            }
            e.target.value = val;
            onChange(e);
        };

        return <Input value={value} onClick={onClick} ref={ref} onChange={handleInputChange} placeholder={placeholder} />;
    }
);
CustomDateInput.displayName = 'CustomDateInput';


export const PostJobModal = ({ isOpen, onClose }: PostJobModalProps) => {
    const [formData, setFormData] = useState({
        jobType: '',
        bedrooms: '3 Bedrooms',
        packingBoxes: false,
        bulkyItems: true,
        inventoryList: false,
        hoisting: false,
        additionalServicesDescription: '',
        crewAssistants: '',
        truckSize: '',
        pickupLocation: '',
        pickupDetails: 'Stairs',
        pickupFloor: '',
        pickupWalkDistance: '100-200 ft',
        deliveryLocation: '',
        deliveryDetails: 'Elevator',
        deliveryFloor: '',
        deliveryWalkDistance: '50-100 ft',
        pickupTimeWindow: '',
        deliveryTimeWindow: '',
        cut: '',
        payment: '',
    });

    const [pickupDate, setPickupDate] = useState<Date | null>(null);
    const [deliveryDate, setDeliveryDate] = useState<Date | null>(null);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const isCheckbox = type === 'checkbox';
        if (isCheckbox) {
             const { checked } = e.target as HTMLInputElement;
             setFormData(prev => ({ ...prev, [name]: checked }));
        } else {
             setFormData(prev => ({ ...prev, [name]: value }));
        }
    };
    
    const handleValueChange = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    }

  if (!isOpen) {
    return null;
  }

  const additionalServices = [
      { name: 'packingBoxes', label: 'Packing Boxes (hourly fee)'},
      { name: 'bulkyItems', label: 'Bulky Items (piano, safe) (add. fee)'},
      { name: 'inventoryList', label: 'Inventory List'},
      { name: 'hoisting', label: 'Hoisting (add. fee)'}
  ];

  const crewSizeOptions = [
      { value: '', label: 'Select crew size'},
      { value: 'driver_only', label: 'Driver only'},
      { value: 'driver_1', label: 'Driver + 1 Assistant'},
      { value: 'driver_2', label: 'Driver + 2 Assistants'},
      { value: 'driver_3', label: 'Driver + 3 Assistants'},
      { value: 'driver_4', label: 'Driver + 4 Assistants'},
  ];

  const jobTypeOptions = [
      { value: '', label: 'Select job type' },
      { value: 'residential', label: 'Residential Move' },
      { value: 'office', label: 'Office Relocation' },
      { value: 'warehouse', label: 'Warehouse Transfer' },
      { value: 'other', label: 'Other (Type)' },
  ];

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
        <div className="bg-white w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl shadow-xl" onClick={(e) => e.stopPropagation()}>
            <header className="bg-primary text-white p-5 flex justify-between items-center rounded-t-2xl flex-shrink-0">
                <div className="flex items-center gap-3">
                    <Briefcase size={24} />
                    <h2 className="text-xl font-bold">Job Information</h2>
                </div>
                <button onClick={onClose} className="text-white/80 hover:text-white">
                    <X size={24} />
                </button>
            </header>
            
            <form className="flex-1 overflow-y-auto p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-10">
                    
                    {/* Left Column */}
                    <div className="space-y-8">
                        <Section title="Job Details" icon={<Info size={24} className="text-primary"/>}>
                            <Select label="Job Type *" name="jobType" value={formData.jobType} onChange={handleInputChange} options={jobTypeOptions} required />
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Number of Bedrooms *</label>
                                <div className="grid grid-cols-2 gap-3">
                                    {['1 Bedroom', '2 Bedrooms', '3 Bedrooms', '4 Bedrooms', '5+ Bedrooms', 'Office'].map(opt => (
                                        <label key={opt} className={cn('flex items-center p-3 rounded-lg cursor-pointer transition-all border', {
                                            'bg-blue-50 border-primary': formData.bedrooms === opt,
                                            'bg-gray-100 border-transparent hover:bg-gray-200': formData.bedrooms !== opt
                                        })}>
                                            <input type="radio" name="bedrooms" value={opt} checked={formData.bedrooms === opt} onChange={(e) => handleValueChange('bedrooms', e.target.value)} className="sr-only" />
                                            <div className={cn('w-4 h-4 rounded-full border-2 flex items-center justify-center mr-3 flex-shrink-0', {'bg-primary border-primary': formData.bedrooms === opt, 'border-gray-400': formData.bedrooms !== opt})}>
                                                 {formData.bedrooms === opt && <div className="w-2 h-2 rounded-full bg-white"/>}
                                            </div>
                                            <span className="text-sm font-medium text-gray-800">{opt}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                             <div>
                                <label className="block text-sm font-bold text-gray-800 mb-2">Additional Services *</label>
                                <div className="grid grid-cols-2 gap-3">
                                    {additionalServices.map(service => (
                                        <label key={service.name} className={cn(
                                            'flex items-center p-4 rounded-lg cursor-pointer border transition-all',
                                            {
                                                'bg-blue-50 border-primary shadow-sm': formData[service.name as keyof typeof formData],
                                                'bg-white border-gray-300 hover:bg-gray-50': !formData[service.name as keyof typeof formData],
                                            }
                                        )}>
                                            <input
                                                type="checkbox"
                                                name={service.name}
                                                checked={Boolean(formData[service.name as keyof typeof formData])}
                                                onChange={handleInputChange}
                                                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                            />
                                            <span className="ml-3 text-sm font-medium text-gray-700">{service.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <Textarea name="additionalServicesDescription" label="Describe Additional Services Mentioned Above" placeholder="Brief description of the additional services mentioned above..." value={formData.additionalServicesDescription} onChange={handleInputChange} />
                            
                            <div>
                                <label className="block text-sm font-bold text-gray-800 mb-2">Images of Items / PDF of Inventory List</label>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center text-gray-500 cursor-pointer hover:bg-gray-50">
                                    <Upload size={24} className="mx-auto mb-2 text-primary"/>
                                    <p className="font-semibold text-gray-600">Upload Document</p>
                                    <p className="text-xs">Click to upload or drag & drop</p>
                                </div>
                            </div>

                             <Select label="Estimated Crew Assistants *" name="crewAssistants" value={formData.crewAssistants} onChange={handleInputChange} options={crewSizeOptions} required />
                        </Section>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-8">
                        <Section title="Truck & Crew Requirements" icon={<Truck size={24} className="text-primary"/>}>
                             <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Truck Size *</label>
                                <div className="grid grid-cols-3 gap-3">
                                    <SelectCard layout="vertical" type="radio" name="truckSize" value="Small (15')" checked={formData.truckSize === "Small (15')"} onChange={(e) => handleValueChange('truckSize', e.target.value)} icon={<Truck size={24}/>} title="Small (15')" subtitle="1 bedroom" />
                                    <SelectCard layout="vertical" type="radio" name="truckSize" value="Medium (20+')" checked={formData.truckSize === "Medium (20+')" } onChange={(e) => handleValueChange('truckSize', e.target.value)} icon={<Truck size={24}/>} title="Medium (20+')" subtitle="2-3 bedrooms" />
                                    <SelectCard layout="vertical" type="radio" name="truckSize" value="Large (26+')" checked={formData.truckSize === "Large (26+')" } onChange={(e) => handleValueChange('truckSize', e.target.value)} icon={<Truck size={24}/>} title="Large (26+')" subtitle="3+ bedrooms" />
                                </div>
                            </div>
                        </Section>

                        <Section title="Locations" icon={<MapPin size={24} className="text-primary"/>}>
                            {/* Pickup Location Section */}
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-800 mb-2">Pickup Location *</label>
                                    <Input name="pickupLocation" value={formData.pickupLocation} onChange={handleInputChange} placeholder="Street address, city, state" required />
                                </div>
                                <ToggleButtonGroup options={['House', 'Stairs', 'Elevator']} selectedValue={formData.pickupDetails} onChange={(val) => handleValueChange('pickupDetails', val)} />
                                {formData.pickupDetails === 'Stairs' && (
                                    <Select label="Floor" name="pickupFloor" value={formData.pickupFloor} onChange={handleInputChange} options={[{value: '', label: 'Floor'}, {value: '1', label: '1st Floor'}]} />
                                )}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Estimated Walk Distance</label>
                                    <ToggleButtonGroup options={['< 50 ft', '50-100 ft', '100-200 ft', '> 200 ft']} selectedValue={formData.pickupWalkDistance} onChange={(val) => handleValueChange('pickupWalkDistance', val)} columns={2} />
                                </div>
                            </div>

                            {/* Delivery Location Section */}
                            <div className="space-y-4 pt-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-800 mb-2">Delivery Location *</label>
                                    <Input name="deliveryLocation" value={formData.deliveryLocation} onChange={handleInputChange} placeholder="Street address, city, state" required />
                                </div>
                                <ToggleButtonGroup options={['House', 'Stairs', 'Elevator']} selectedValue={formData.deliveryDetails} onChange={(val) => handleValueChange('deliveryDetails', val)} />
                                 {formData.deliveryDetails === 'Stairs' && (
                                     <Select label="Floor" name="deliveryFloor" value={formData.deliveryFloor} onChange={handleInputChange} options={[{value: '', label: 'Floor'}, {value: '1', label: '1st Floor'}]} />
                                 )}
                                 <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Estimated Walk Distance</label>
                                    <ToggleButtonGroup options={['< 50 ft', '50-100 ft', '100-200 ft', '> 200 ft']} selectedValue={formData.deliveryWalkDistance} onChange={(val) => handleValueChange('deliveryWalkDistance', val)} columns={2} />
                                </div>
                            </div>
                        </Section>

                        <Section title="Schedule" icon={<Calendar size={24} className="text-primary"/>}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="relative">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Pickup Date *</label>
                                    <DatePicker
                                        selected={pickupDate}
                                        onChange={(date) => setPickupDate(date)}
                                        minDate={new Date()}
                                        dateFormat="MM/dd/yyyy"
                                        placeholderText="mm/dd/yyyy"
                                        customInput={<CustomDateInput onChange={() => {}} />}
                                        required
                                    />
                                    <Calendar className="absolute right-3 top-10 text-gray-400 pointer-events-none" size={18}/>
                                </div>
                                <Select label="Pickup Time Window *" name="pickupTimeWindow" value={formData.pickupTimeWindow} onChange={handleInputChange} options={[{value: '', label: 'Select time window'}]} required />
                                <div className="relative">
                                     <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Date *</label>
                                     <DatePicker
                                        selected={deliveryDate}
                                        onChange={(date) => setDeliveryDate(date)}
                                        minDate={pickupDate || new Date()}
                                        dateFormat="MM/dd/yyyy"
                                        placeholderText="mm/dd/yyyy"
                                        customInput={<CustomDateInput onChange={() => {}} />}
                                        required
                                        disabled={!pickupDate}
                                    />
                                    <Calendar className="absolute right-3 top-10 text-gray-400 pointer-events-none" size={18}/>
                                </div>
                                <Select label="Delivery Time Window *" name="deliveryTimeWindow" value={formData.deliveryTimeWindow} onChange={handleInputChange} options={[{value: '', label: 'Select time window'}]} required />
                            </div>
                        </Section>

                        <Section title="Payment Details" icon={<CreditCard size={24} className="text-primary"/>}>
                            <div>
                                <label className="block text-sm font-bold text-gray-800 mb-2">
                                    CUT ($) *
                                </label>
                                <Input name="cut" type="number" value={formData.cut} onChange={handleInputChange} placeholder="e.g., 300" required />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-800 mb-2">Payment ($) *</label>
                                <Input name="payment" type="number" value={formData.payment} onChange={handleInputChange} placeholder="e.g., 1500" required />
                            </div>
                        </Section>
                    </div>
                </div>
            </form>
            <footer className="p-4 bg-gray-50 border-t border-gray-200 flex-shrink-0 flex justify-end gap-3 rounded-b-2xl">
                <Button type="button" variant="outline" size="sm" onClick={onClose}>
                    <X size={16} />
                    Cancel
                </Button>
                <Button type="submit" size="sm">
                    <PlusCircle size={16} />
                    Create Job
                </Button>
            </footer>
        </div>
    </div>
  );
};