import { X, Truck, Ruler, Zap, Box, ShieldCheck, ArrowUpFromLine, Wind, Package, Snowflake, Sofa, PlusCircle } from 'lucide-react';
import { Input } from '../../shared/ui/Input/Input';
import { Button } from '../../shared/ui/Button/Button';
import { Uploader } from '../../shared/ui/Uploader/Uploader';
import { SelectCard } from '../../shared/ui/SelectCard/SelectCard';
import { useState } from 'react';

interface AddTruckModalProps {
  onClose: () => void;
}

const SectionHeader = ({ icon: Icon, title }: { icon: React.ElementType, title: string }) => (
    <div className="flex items-center gap-3 mb-6 pb-3 border-b border-gray-200">
        <Icon className="text-primary" size={24} />
        <h3 className="font-semibold text-lg text-gray-800">{title}</h3>
    </div>
);

export const AddTruckModal = ({ onClose }: AddTruckModalProps) => {
    const [truckType, setTruckType] = useState('');
    const [features, setFeatures] = useState<Record<string, boolean>>({});

    const handleFeatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFeatures(prev => ({ ...prev, [name]: checked }));
    };

    return (
        <div 
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
            onClick={onClose}
        >
            <div 
                className="bg-gray-50 w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl shadow-2xl overflow-hidden" // <-- Добавлен overflow-hidden
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
                    <form className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-10">
                        <div className="space-y-6">
                            <section>
                                <SectionHeader icon={Truck} title="Truck Information" />
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="col-span-2">
                                        <Input label="Truck Name *" placeholder="e.g., Blue Thunder, Big Bertha" required />
                                    </div>
                                    <div className="col-span-2">
                                        <Input label="License Plate *" placeholder="e.g., ABC123" required />
                                    </div>
                                    <div>
                                        <Input label="Make *" placeholder="e.g., Ford, Freightliner" required />
                                    </div>
                                    <div>
                                        <Input label="Model *" placeholder="e.g., F-150, Cascadia" required />
                                    </div>
                                    <div>
                                        <Input label="Year *" placeholder="e.g., 2020" type="number" required />
                                    </div>
                                    <div>
                                        <Input label="Color" placeholder="e.g., Red, Blue" />
                                    </div>
                                </div>
                            </section>
                             <section>
                                <SectionHeader icon={Ruler} title="Dimensions & Weight" />
                                 <div className="grid grid-cols-2 gap-4">
                                     <Input label="Length (ft) *" placeholder="e.g., 26" type="number" required/>
                                     <Input label="Width (ft) *" placeholder="e.g., 8.5" type="number" required/>
                                     <Input label="Height (ft) *" placeholder="e.g., 9.5" type="number" required/>
                                     <Input label="Max Weight (lbs) *" placeholder="e.g., 10000" type="number" required/>
                                 </div>
                             </section>
                        </div>

                        <div className="space-y-6">
                        <section>
                            <SectionHeader icon={Truck} title="Truck Type" />
                            <div className="grid grid-cols-3 gap-3">
                                <SelectCard 
                                    layout="vertical" // <-- Указываем вертикальную раскладку
                                    type="radio" name="truckType" value="small"
                                    checked={truckType === 'small'}
                                    onChange={(e) => setTruckType(e.target.value)}
                                    icon={<Truck size={24}/>} 
                                    title="Small (15')" 
                                    subtitle="1 bedroom" />
                                <SelectCard 
                                    layout="vertical" // <-- Указываем вертикальную раскладку
                                    type="radio" name="truckType" value="medium"
                                    checked={truckType === 'medium'}
                                    onChange={(e) => setTruckType(e.target.value)}
                                    icon={<Truck size={24}/>} 
                                    title="Medium (20+')" 
                                    subtitle="2-3 bedrooms" />
                                <SelectCard 
                                    layout="vertical" // <-- Указываем вертикальную раскладку
                                    type="radio" name="truckType" value="large"
                                    checked={truckType === 'large'}
                                    onChange={(e) => setTruckType(e.target.value)}
                                    icon={<Truck size={24}/>} 
                                    title="Large (26+')" 
                                    subtitle="3+ bedrooms" />
                            </div>
                        </section>

                            <section>
                                <SectionHeader icon={Zap} title="Special Features" />
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <SelectCard 
                                        type="checkbox" name="climate_control" value="true"
                                        checked={features['climate_control']} onChange={handleFeatureChange}
                                        icon={<Wind size={20}/>} 
                                        title="Climate Control" 
                                        subtitle="Temperature sensitive cargo" />
                                <SelectCard 
                                        type="checkbox" name="liftgate" value="true"
                                        checked={features['liftgate']} onChange={handleFeatureChange}
                                        icon={<ArrowUpFromLine size={20}/>} 
                                        title="Liftgate" 
                                        subtitle="Ground level loading" />
                                <SelectCard 
                                        type="checkbox" name="pallet_jack" value="true"
                                        checked={features['pallet_jack']} onChange={handleFeatureChange}
                                        icon={<Package size={20}/>} 
                                        title="Pallet Jack" 
                                        subtitle="Pallet loading capability" />
                                <SelectCard 
                                        type="checkbox" name="security" value="true"
                                        checked={features['security']} onChange={handleFeatureChange}
                                        icon={<ShieldCheck size={20}/>} 
                                        title="Security System" 
                                        subtitle="Cargo protection" />
                                <SelectCard 
                                        type="checkbox" name="refrigerated" value="true"
                                        checked={features['refrigerated']} onChange={handleFeatureChange}
                                        icon={<Snowflake size={20}/>} 
                                        title="Refrigerated" 
                                        subtitle="Cold storage" />
                                <SelectCard 
                                        type="checkbox" name="furniture_pads" value="true"
                                        checked={features['furniture_pads']} onChange={handleFeatureChange}
                                        icon={<Sofa size={20}/>} 
                                        title="Furniture Pads" 
                                        subtitle="Protect delicate items" />
                                </div>
                            </section>
                        </div>

                        <section className="lg:col-span-2">
                            <SectionHeader icon={Box} title="Truck Photos" />
                            <Uploader />
                        </section>
                        
                    {/* Actions */}
                    <div className="flex justify-end gap-4 pt-5 border-t border-gray-200 lg:col-span-2">
                        <Button type="button" variant="outline" size="sm" onClick={onClose}>
                            <X size={16} />
                            Cancel
                        </Button>
                        <Button type="submit" variant="success" size="sm">
                            <PlusCircle size={16} />
                            Add Truck
                        </Button>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    );
};