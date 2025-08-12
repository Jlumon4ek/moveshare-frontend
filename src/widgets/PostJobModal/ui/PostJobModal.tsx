// src/widgets/PostJobModal/ui/PostJobModal.tsx

import { useState, type ChangeEvent, type ReactNode, forwardRef, type FormEvent, useEffect } from 'react';
import { X, Info, Truck, MapPin, Calendar, CreditCard, PlusCircle, Briefcase, Box } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Button } from '../../../shared/ui/Button/Button';
import { Input } from '../../../shared/ui/Input/Input';
import { Select } from '../../../shared/ui/Select/Select';
import { SelectCard } from '../../../shared/ui/SelectCard/SelectCard';
import { Textarea } from '../../../shared/ui/Textarea/Textarea';
import { Uploader } from '../../../shared/ui/Uploader/Uploader';
import { GooglePlacesAutocomplete } from '../../../shared/ui/GooglePlacesAutocomplete/GooglePlacesAutocomplete';
import { jobsApi } from '../../../shared/api/jobs';
import { toastStore } from '../../../shared/lib/toast/toastStore';
import cn from 'classnames';

interface PostJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
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

const validateDate = (dateString: string, minDate?: Date | null): string => {
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(dateString)) return '';
    const parts = dateString.split('/');
    const month = parseInt(parts[0], 10);
    const day = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);
    const now = new Date();
    const currentYear = now.getFullYear();
    now.setHours(0, 0, 0, 0);
    if (year < currentYear) return "Year cannot be in the past.";
    if (month < 1 || month > 12) return "Month must be between 1 and 12.";
    const daysInMonth = new Date(year, month, 0).getDate();
    if (day < 1 || day > daysInMonth) return `Invalid day. Must be between 1 and ${daysInMonth}.`;
    const inputDate = new Date(year, month - 1, day);
    if (inputDate < now) return "Date cannot be in the past.";
    if (minDate && inputDate < minDate) return "End date cannot be before start date.";
    return '';
};

const CustomDateInput = forwardRef<HTMLInputElement, { 
    value?: string; 
    onClick?: () => void; 
    onChange: (event: ChangeEvent<HTMLInputElement>) => void; 
    placeholder?: string;
    error?: string;
    setError: (error: string) => void;
    minDate?: Date | null;
}>(
    ({ value, onClick, onChange, placeholder, error, setError, minDate }, ref) => {
        const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
            let val = e.target.value.replace(/\D/g, '');
            if (val.length > 2) val = `${val.slice(0, 2)}/${val.slice(2)}`;
            if (val.length > 5) val = `${val.slice(0, 5)}/${val.slice(5, 9)}`;
            e.target.value = val;
            const validationError = validateDate(e.target.value, minDate);
            setError(validationError);
            onChange(e);
        };

        return <Input value={value} onClick={onClick} ref={ref} onChange={handleInputChange} placeholder={placeholder} error={error} />;
    }
);
CustomDateInput.displayName = 'CustomDateInput';

const generateTimeOptions = (placeholder: string) => {
    const options = [{ value: '', label: placeholder }];
    for (let h = 0; h < 24; h++) {
      for (let m = 0; m < 60; m += 30) {
        const minute = String(m).padStart(2, '0');
        const hour24 = String(h).padStart(2, '0');
        const timeValue = `${hour24}:${minute}`;
        
        // Convert to 12-hour format for display
        const hour12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
        const period = h < 12 ? 'AM' : 'PM';
        const displayTime = `${hour12}:${minute} ${period}`;
        
        options.push({ value: timeValue, label: displayTime });
      }
    }
    return options;
};
const timeOptionsFrom = generateTimeOptions('From');
const timeOptionsTo = generateTimeOptions('To');


export const PostJobModal = ({ isOpen, onClose, onSuccess }: PostJobModalProps) => {
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
        weight: '',
        volume: '',
        pickupLocation: '',
        pickupDetails: 'Stairs',
        pickupFloor: '',
        pickupWalkDistance: '100-200 ft',
        deliveryLocation: '',
        deliveryDetails: 'Elevator',
        deliveryFloor: '',
        deliveryWalkDistance: '50-100 ft',
        pickupTimeStart: '',
        pickupTimeEnd: '',
        deliveryTimeStart: '',
        deliveryTimeEnd: '',
        cut: '',
        payment: '',
    });
    
    const [pickupDate, setPickupDate] = useState<Date | null>(null);
    const [deliveryDate, setDeliveryDate] = useState<Date | null>(null);
    const [inventoryFiles, setInventoryFiles] = useState<File[]>([]);
    const [dateErrors, setDateErrors] = useState({ pickup: '', delivery: '' });
    const [isSaving, setIsSaving] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        const validateForm = () => {
            const {
                jobType, bedrooms, crewAssistants, truckSize, weight, volume,
                pickupLocation, deliveryLocation, pickupTimeStart, pickupTimeEnd,
                deliveryTimeStart, deliveryTimeEnd, cut, payment
            } = formData;

            const requiredFields = [
                jobType, bedrooms, crewAssistants, truckSize, weight, volume,
                pickupLocation, deliveryLocation, pickupTimeStart, pickupTimeEnd,
                deliveryTimeStart, deliveryTimeEnd, cut, payment
            ];

            const isDataValid = 
                requiredFields.every(field => field !== '') &&
                pickupDate !== null &&
                deliveryDate !== null &&
                dateErrors.pickup === '' &&
                dateErrors.delivery === '';

            setIsFormValid(isDataValid);
        };

        validateForm();
    }, [formData, pickupDate, deliveryDate, dateErrors]);

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

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!isFormValid) {
            toastStore.show('Please fill in all required fields.', 'error');
            return;
        }
        setIsSaving(true);

        const formatDate = (date: Date | null) => date ? date.toISOString().split('T')[0] : '';

        const payload = {
            job_type: formData.jobType,
            number_of_bedrooms: formData.bedrooms.replace(/\D/g, ''),
            packing_boxes: formData.packingBoxes,
            bulky_items: formData.bulkyItems,
            inventory_list: formData.inventoryList,
            hoisting: formData.hoisting,
            additional_services_description: formData.additionalServicesDescription,
            estimated_crew_assistants: formData.crewAssistants,
            truck_size: formData.truckSize.split(' ')[0].toLowerCase(),
            pickup_address: formData.pickupLocation,
            pickup_floor: formData.pickupFloor ? Number(formData.pickupFloor) : null,
            pickup_building_type: formData.pickupDetails.toLowerCase(),
            pickup_walk_distance: formData.pickupWalkDistance,
            delivery_address: formData.deliveryLocation,
            delivery_floor: formData.deliveryFloor ? Number(formData.deliveryFloor) : null,
            delivery_building_type: formData.deliveryDetails.toLowerCase(),
            delivery_walk_distance: formData.deliveryWalkDistance,
            distance_miles: 0,
            pickup_date: formatDate(pickupDate),
            pickup_time_from: formData.pickupTimeStart,
            pickup_time_to: formData.pickupTimeEnd,
            delivery_date: formatDate(deliveryDate),
            delivery_time_from: formData.deliveryTimeStart,
            delivery_time_to: formData.deliveryTimeEnd,
            cut_amount: Number(formData.cut),
            payment_amount: Number(formData.payment),
            weight_lbs: Number(formData.weight),
            volume_cu_ft: Number(formData.volume)
        };

        try {
            await jobsApi.createJob(payload);
            toastStore.show('Job created successfully!', 'success');
            if (onSuccess) {
                onSuccess();
            }
            onClose();
        } catch (error) {
            toastStore.show(error instanceof Error ? error.message : 'Failed to create job', 'error');
        } finally {
            setIsSaving(false);
        }
    };

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
                
                <form className="flex-1 overflow-y-auto p-8" onSubmit={handleSubmit}>
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
                                    <Uploader 
                                        files={inventoryFiles}
                                        setFiles={setInventoryFiles}
                                        title="Upload Document"
                                        description="Click to upload or drag & drop"
                                        maxFiles={5}
                                    />
                                </div>

                                 <Select label="Estimated Crew Assistants *" name="crewAssistants" value={formData.crewAssistants} onChange={handleInputChange} options={crewSizeOptions} required />
                            </Section>
                            
                            <Section title="Cargo Details" icon={<Box size={24} className="text-primary"/>}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Input 
                                        label="Weight (lbs) *"
                                        name="weight"
                                        type="number"
                                        value={formData.weight}
                                        onChange={handleInputChange}
                                        placeholder="e.g., 4200"
                                        required
                                    />
                                    <Input 
                                        label="Volume (cu ft) *"
                                        name="volume"
                                        type="number"
                                        value={formData.volume}
                                        onChange={handleInputChange}
                                        placeholder="e.g., 1200"
                                        required
                                    />
                                </div>
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
                                 <div className="space-y-4">
                                    <div>
                                        <GooglePlacesAutocomplete
                                            label="Pickup Location *"
                                            name="pickupLocation"
                                            value={formData.pickupLocation}
                                            onChange={handleInputChange}
                                            placeholder="Street address, city, state"
                                            required
                                            onPlaceSelected={(place) => {
                                                if (place.formatted_address) {
                                                    handleValueChange('pickupLocation', place.formatted_address)
                                                }
                                            }}
                                        />
                                    </div>
                                    <ToggleButtonGroup options={['House', 'Stairs', 'Elevator']} selectedValue={formData.pickupDetails} onChange={(val) => handleValueChange('pickupDetails', val)} />
                                    {formData.pickupDetails === 'Stairs' && (
                                        <Input 
                                            label="Floor"
                                            name="pickupFloor"
                                            value={formData.pickupFloor}
                                            onChange={handleInputChange}
                                            placeholder="Enter floor number"
                                        />
                                    )}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Estimated Walk Distance</label>
                                        <ToggleButtonGroup options={['< 50 ft', '50-100 ft', '100-200 ft', '> 200 ft']} selectedValue={formData.pickupWalkDistance} onChange={(val) => handleValueChange('pickupWalkDistance', val)} columns={2} />
                                    </div>
                                </div>
                                <div className="space-y-4 pt-4">
                                    <div>
                                        <GooglePlacesAutocomplete
                                            label="Delivery Location *"
                                            name="deliveryLocation"
                                            value={formData.deliveryLocation}
                                            onChange={handleInputChange}
                                            placeholder="Street address, city, state"
                                            required
                                            onPlaceSelected={(place) => {
                                                if (place.formatted_address) {
                                                    handleValueChange('deliveryLocation', place.formatted_address)
                                                }
                                            }}
                                        />
                                    </div>
                                    <ToggleButtonGroup options={['House', 'Stairs', 'Elevator']} selectedValue={formData.deliveryDetails} onChange={(val) => handleValueChange('deliveryDetails', val)} />
                                     {formData.deliveryDetails === 'Stairs' && (
                                         <Input
                                            label="Floor"
                                            name="deliveryFloor"
                                            value={formData.deliveryFloor}
                                            onChange={handleInputChange}
                                            placeholder="Enter floor number"
                                        />
                                     )}
                                     <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Estimated Walk Distance</label>
                                        <ToggleButtonGroup options={['< 50 ft', '50-100 ft', '100-200 ft', '> 200 ft']} selectedValue={formData.deliveryWalkDistance} onChange={(val) => handleValueChange('deliveryWalkDistance', val)} columns={2} />
                                    </div>
                                </div>
                            </Section>

                            <Section title="Schedule" icon={<Calendar size={24} className="text-primary"/>}>
                                 <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-start">
                                    <div className="relative md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Pickup Date *</label>
                                        <DatePicker
                                            selected={pickupDate}
                                            onChange={(date) => setPickupDate(date)}
                                            minDate={new Date()}
                                            dateFormat="MM/dd/yyyy"
                                            placeholderText="mm/dd/yyyy"
                                            customInput={
                                                <CustomDateInput 
                                                    onChange={() => {}} 
                                                    error={dateErrors.pickup}
                                                    setError={(error) => setDateErrors(prev => ({ ...prev, pickup: error }))}
                                                />
                                            }
                                            required
                                        />
                                        <Calendar className="absolute right-3 top-10 text-gray-400 pointer-events-none" size={18}/>
                                    </div>
                                    <div className="md:col-span-3">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Pickup Time Window *</label>
                                        <div className="grid grid-cols-2 gap-2">
                                            <Select name="pickupTimeStart" value={formData.pickupTimeStart} onChange={handleInputChange} options={timeOptionsFrom} required />
                                            <Select name="pickupTimeEnd" value={formData.pickupTimeEnd} onChange={handleInputChange} options={timeOptionsTo} required />
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-start">
                                     <div className="relative md:col-span-2">
                                         <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Date *</label>
                                         <DatePicker
                                            selected={deliveryDate}
                                            onChange={(date) => setDeliveryDate(date)}
                                            minDate={pickupDate || new Date()}
                                            dateFormat="MM/dd/yyyy"
                                            placeholderText="mm/dd/yyyy"
                                            customInput={
                                                <CustomDateInput 
                                                    onChange={() => {}} 
                                                    error={dateErrors.delivery}
                                                    setError={(error) => setDateErrors(prev => ({ ...prev, delivery: error }))}
                                                    minDate={pickupDate}
                                                />
                                            }
                                            required
                                            disabled={!pickupDate}
                                        />
                                        <Calendar className="absolute right-3 top-10 text-gray-400 pointer-events-none" size={18}/>
                                    </div>
                                    <div className="md:col-span-3">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Time Window *</label>
                                        <div className="grid grid-cols-2 gap-2">
                                            <Select name="deliveryTimeStart" value={formData.deliveryTimeStart} onChange={handleInputChange} options={timeOptionsFrom} required />
                                            <Select name="deliveryTimeEnd" value={formData.deliveryTimeEnd} onChange={handleInputChange} options={timeOptionsTo} required />
                                        </div>
                                    </div>
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
                    <Button type="button" variant="outline" size="sm" onClick={onClose} disabled={isSaving}>
                        <X size={16} />
                        Cancel
                    </Button>
                    <Button type="submit" size="sm" onClick={handleSubmit} disabled={!isFormValid || isSaving}>
                        <PlusCircle size={16} />
                        {isSaving ? 'Creating...' : 'Create Job'}
                    </Button>
                </footer>
            </div>
        </div>
    );
};