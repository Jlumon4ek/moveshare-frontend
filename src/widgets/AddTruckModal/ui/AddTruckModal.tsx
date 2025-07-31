import { 
  X, Truck, Ruler, Zap, Box, Wind, Upload, ShieldCheck, Snowflake, Sofa, Package, PlusCircle 
} from 'lucide-react';
import { Input } from '../../../shared/ui/Input/Input';
import { Button } from '../../../shared/ui/Button/Button';
import { Uploader } from '../../../shared/ui/Uploader/Uploader';
import { SelectCard } from '../../../shared/ui/SelectCard/SelectCard';
import { useState, type ChangeEvent, type FormEvent } from 'react';
import { trucksApi } from '../../../shared/api/trucks';
import { toastStore } from '../../../shared/lib/toast/toastStore';


interface AddTruckModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

const SectionHeader = ({ icon: Icon, title }: { icon: React.ElementType, title: string }) => (
    <div className="flex items-center gap-3 mb-6 pb-3 border-b border-gray-200">
        <Icon className="text-primary" size={24} />
        <h3 className="font-semibold text-lg text-gray-800">{title}</h3>
    </div>
);

// Начальное состояние для формы
const initialState = {
    truck_name: '', license_plate: '', make: '', model: '', year: '', color: '',
    length: '', width: '', height: '', max_weight: '', truck_type: '',
    climate_control: false, liftgate: false, pallet_jack: false,
    security_system: false, refrigerated: false, furniture_pads: false,
};

export const AddTruckModal = ({ onClose, onSuccess }: AddTruckModalProps) => {
    const [formData, setFormData] = useState(initialState);
    const [files, setFiles] = useState<File[]>([]);
    const [isSaving, setIsSaving] = useState(false);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleTruckTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, truck_type: e.target.value }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        const data = new FormData();
        // Добавляем все поля формы
        Object.entries(formData).forEach(([key, value]) => {
            data.append(key, String(value));
        });
        // Добавляем все файлы
        files.forEach(file => {
            data.append('photo', file);
        });

        try {
            await trucksApi.createTruck(data);
            toastStore.show('Truck added successfully!', 'success');
            onSuccess(); // Вызываем callback для обновления списка
            onClose();   // Закрываем модальное окно
        } catch (error) {
            toastStore.show(error instanceof Error ? error.message : 'Failed to add truck', 'error');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div 
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
            onClick={onClose}
        >
            <div 
                className="bg-gray-50 w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="bg-primary text-white p-8 text-center rounded-t-2xl relative">
                    <button onClick={onClose} className="absolute top-4 right-4 text-white/70 hover:text-white">
                        <X size={24} />
                    </button>
                    <Truck size={40} className="mx-auto mb-4" />
                    <h2 className="text-3xl font-bold">Add Your Truck</h2>
                    <p className="text-white/90 mt-2">
                        Register your truck to start accepting jobs on MoveShare. Fill in the details below to get started.
                    </p>
                </div>

                <div className="overflow-y-auto p-8 bg-white">
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-10">
                        {/* Left Column */}
                        <div className="flex flex-col">
                            <section>
                                <SectionHeader icon={Truck} title="Truck Information" />
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="col-span-2">
                                        <Input name="truck_name" label="Truck Name *" value={formData.truck_name} onChange={handleInputChange} placeholder="e.g., Blue Thunder" required />
                                    </div>
                                    <div className="col-span-2">
                                        <Input name="license_plate" label="License Plate *" value={formData.license_plate} onChange={handleInputChange} placeholder="e.g., ABC123" required />
                                    </div>
                                    <div>
                                        <Input name="make" label="Make *" value={formData.make} onChange={handleInputChange} placeholder="e.g., Ford" required />
                                    </div>
                                    <div>
                                        <Input name="model" label="Model *" value={formData.model} onChange={handleInputChange} placeholder="e.g., F-150" required />
                                    </div>
                                    <div>
                                        <Input name="year" label="Year *" value={formData.year} onChange={handleInputChange} type="number" placeholder="e.g., 2020" required />
                                    </div>
                                    <div>
                                        <Input name="color" label="Color" value={formData.color} onChange={handleInputChange} placeholder="e.g., Red" />
                                    </div>
                                </div>
                            </section>
                             <section className="mt-auto">
                                <SectionHeader icon={Ruler} title="Dimensions & Weight" />
                                 <div className="grid grid-cols-2 gap-4">
                                     <Input name="length" label="Length (ft) *" value={formData.length} onChange={handleInputChange} type="number" placeholder="e.g., 26" required/>
                                     <Input name="width" label="Width (ft) *" value={formData.width} onChange={handleInputChange} type="number" placeholder="e.g., 8.5" required/>
                                     <Input name="height" label="Height (ft) *" value={formData.height} onChange={handleInputChange} type="number" placeholder="e.g., 9.5" required/>
                                     <Input name="max_weight" label="Max Weight (lbs) *" value={formData.max_weight} onChange={handleInputChange} type="number" placeholder="e.g., 10000" required/>
                                 </div>
                             </section>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-6">
                            <section>
                                <SectionHeader icon={Truck} title="Truck Type" />
                                <div className="grid grid-cols-3 gap-3">
                                    <SelectCard layout="vertical" type="radio" name="truck_type" value="Small" checked={formData.truck_type === 'Small'} onChange={handleTruckTypeChange} icon={<Truck size={24}/>} title="Small (15')" subtitle="1 bedroom" />
                                    <SelectCard layout="vertical" type="radio" name="truck_type" value="Medium" checked={formData.truck_type === 'Medium'} onChange={handleTruckTypeChange} icon={<Truck size={24}/>} title="Medium (20+')" subtitle="2-3 bedrooms" />
                                    <SelectCard layout="vertical" type="radio" name="truck_type" value="Large" checked={formData.truck_type === 'Large'} onChange={handleTruckTypeChange} icon={<Truck size={24}/>} title="Large (26+')" subtitle="3+ bedrooms" />
                                </div>
                            </section>
                            <section>
                                <SectionHeader icon={Zap} title="Special Features" />
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                   <SelectCard type="checkbox" name="climate_control" value="true" checked={formData.climate_control} onChange={handleInputChange} icon={<Wind size={20}/>} title="Climate Control" subtitle="Sensitive cargo" />
                                   <SelectCard type="checkbox" name="liftgate" value="true" checked={formData.liftgate} onChange={handleInputChange} icon={<Upload size={20}/>} title="Liftgate" subtitle="Ground level loading" />
                                   <SelectCard type="checkbox" name="pallet_jack" value="true" checked={formData.pallet_jack} onChange={handleInputChange} icon={<Package size={20}/>} title="Pallet Jack" subtitle="Pallet loading capability" />
                                   <SelectCard type="checkbox" name="security_system" value="true" checked={formData.security_system} onChange={handleInputChange} icon={<ShieldCheck size={20}/>} title="Security System" subtitle="Cargo protection" />
                                   <SelectCard type="checkbox" name="refrigerated" value="true" checked={formData.refrigerated} onChange={handleInputChange} icon={<Snowflake size={20}/>} title="Refrigerated" subtitle="Cold storage" />
                                   <SelectCard type="checkbox" name="furniture_pads" value="true" checked={formData.furniture_pads} onChange={handleInputChange} icon={<Sofa size={20}/>} title="Furniture Pads" subtitle="Protect delicate items" />
                                </div>
                            </section>
                        </div>

                        <section className="lg:col-span-2">
                            <SectionHeader icon={Box} title="Truck Photos" />
                            <Uploader files={files} setFiles={setFiles} />
                        </section>
                        
                        <div className="flex justify-end gap-4 lg:col-span-2 border-t border-gray-200 pt-5">
                            <Button type="button" variant="outline" size="sm" onClick={onClose} disabled={isSaving}>
                                <X size={16} /> Cancel
                            </Button>
                            <Button type="submit" variant="success" size="sm" disabled={isSaving}>
                                <PlusCircle size={16} /> {isSaving ? 'Adding...' : 'Add Truck'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};