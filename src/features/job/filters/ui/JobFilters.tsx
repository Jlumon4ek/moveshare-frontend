import { useState } from 'react';
import { Button } from '../../../../shared/ui/Button/Button';
import { Checkbox } from '../../../../shared/ui/Checkbox/Checkbox';
import { Input } from '../../../../shared/ui/Input/Input';
import { Select } from '../../../../shared/ui/Select/Select';
import { Slider } from '../../../../shared/ui/Slider/Slider';
import { Calendar } from 'lucide-react';

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
    <label className="block text-sm font-bold text-gray-800 mb-2">{children}</label>
);

export const JobFilters = () => {
    const [distance, setDistance] = useState(250);

    return (
        <aside className="bg-white p-5 rounded-2xl shadow-sm w-full max-w-xs flex flex-col h-full">
            <div className="flex justify-between items-center mb-5 flex-shrink-0">
                <h3 className="text-lg font-bold text-gray-900">Filters</h3>
                <button type="reset" className="text-xs font-medium text-gray-500 hover:text-primary">
                    Reset
                </button>
            </div>

            <div className="flex-1 overflow-y-auto hide-scrollbar pr-2 -mr-2">
                <form className="space-y-4">
                    <Select 
                        label="Relocation Size"
                        options={[{ value: "any", label: "Select number of bedrooms" }, { value: "2", label: "2 bedrooms" }]}
                    />
                    <Select 
                        label="Origin"
                        options={[{ value: "any", label: "City, State" }, { value: "chicago", label: "Chicago, IL" }]}
                    />
                    <Select 
                        label="Destination"
                        options={[{ value: "any", label: "City, State" }, { value: "indianapolis", label: "Indianapolis, IN" }]}
                    />
                    <Slider 
                        label="Distance"
                        min="0"
                        max="500"
                        value={distance}
                        onChange={(e) => setDistance(Number(e.target.value))}
                        currentValue={distance}
                        minLabel="0 mi"
                        maxLabel="500 mi"
                    />

                    <div className="relative">
                       <SectionLabel>Date Start</SectionLabel>
                       <Input type="text" placeholder="mm/dd/yyyy" />
                       <Calendar className="absolute right-3 top-9 text-gray-400" size={18}/>
                    </div>
                     <div className="relative">
                       <SectionLabel>Date End</SectionLabel>
                       <Input type="text" placeholder="mm/dd/yyyy" />
                       <Calendar className="absolute right-3 top-9 text-gray-400" size={18}/>
                    </div>

                    <div>
                        <SectionLabel>Truck Size</SectionLabel>
                        <div className="space-y-2">
                            <Checkbox>Small (≤26')</Checkbox>
                            <Checkbox checked>Medium (27'-52')</Checkbox>
                            <Checkbox>Large (≥53')</Checkbox>
                        </div>
                    </div>

                    <div>
                        <SectionLabel>Payout Range</SectionLabel>
                        <div className="flex gap-2">
                            <Input type="number" placeholder="Min" />
                            <Input type="number" placeholder="Max" />
                        </div>
                    </div>
                </form>
            </div>
            
            <div className="pt-4 flex-shrink-0">
                <Button type="submit" fullWidth size="md" className="py-2.5">Apply Filters</Button>
            </div>
        </aside>
    );
};