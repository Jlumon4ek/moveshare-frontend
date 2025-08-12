// src/features/job/filters/ui/JobFilters.tsx

 import { useState } from 'react';
 import DatePicker from 'react-datepicker';
 import 'react-datepicker/dist/react-datepicker.css';
 import { Calendar } from 'lucide-react';
 import { Button } from '../../../../shared/ui/Button/Button';
 import { Checkbox } from '../../../../shared/ui/Checkbox/Checkbox';
 import { Input } from '../../../../shared/ui/Input/Input';
 import { Select } from '../../../../shared/ui/Select/Select';
 import { Slider } from '../../../../shared/ui/Slider/Slider';
 import type { AvailableJobsParams } from '../../../../shared/api/jobs';

 const SectionLabel = ({ children }: { children: React.ReactNode }) => (
     <label className="block text-sm font-bold text-gray-800 mb-2">{children}</label>
 );

 const bedroomOptions = [
     { value: "", label: "Any Bedrooms" },
     { value: "1", label: "1 Bedroom" },
     { value: "2", label: "2 Bedrooms" },
     { value: "3", label: "3 Bedrooms" },
     { value: "4", label: "4 Bedrooms" },
     { value: "5+", label: "5+ Bedrooms" },
     { value: "office", label: "Office" }
 ];

 // Кастомный инпут для DatePicker с иконкой внутри
 const DateInput = ({ value, onClick, placeholder }: any) => (
     <div className="relative w-full">
         <Input
             type="text"
             value={value || ''}
             onClick={onClick}
             placeholder={placeholder}
             readOnly
             className="pr-10 cursor-pointer w-full"
         />
         <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
             <Calendar className="text-gray-400" size={18} />
         </div>
     </div>
 );

 interface JobFiltersProps {
     onFiltersChange: (filters: AvailableJobsParams) => void;
 }

 export const JobFilters = ({ onFiltersChange }: JobFiltersProps) => {
     const [selectedBedrooms, setSelectedBedrooms] = useState<string>('');
     const [origin, setOrigin] = useState<string>('');
     const [destination, setDestination] = useState<string>('');
     const [distance, setDistance] = useState(500);
     const [dateStart, setDateStart] = useState<Date | null>(null);
     const [dateEnd, setDateEnd] = useState<Date | null>(null);
     const [truckSizes, setTruckSizes] = useState<string[]>([]);
     const [payoutMin, setPayoutMin] = useState<string>('');
     const [payoutMax, setPayoutMax] = useState<string>('');

     const handleReset = () => {
         setSelectedBedrooms('');
         setOrigin('');
         setDestination('');
         setDistance(500);
         setDateStart(null);
         setDateEnd(null);
         setTruckSizes([]);
         setPayoutMin('');
         setPayoutMax('');
         onFiltersChange({});
     };

     const handleTruckSizeChange = (size: string, checked: boolean) => {
         setTruckSizes(prev =>
             checked ? [...prev, size] : prev.filter(s => s !== size)
         );
     };

     const handleApplyFilters = () => {
         const filters: AvailableJobsParams = {};

         const apiTruckSizes = truckSizes.map(size => size.toLowerCase());

         if (selectedBedrooms) filters.number_of_bedrooms = selectedBedrooms;
         if (origin) filters.pickup_location = origin;
         if (destination) filters.delivery_location = destination;
         if (distance < 500) filters.max_distance = distance;
         if (dateStart) filters.pickup_date_start = dateStart?.toISOString().split('T')[0];
         if (dateEnd) filters.pickup_date_end = dateEnd?.toISOString().split('T')[0];
         if (apiTruckSizes.length > 0) filters.truck_size = apiTruckSizes.join(',');
         if (payoutMin) filters.payout_max = parseFloat(payoutMin);
         if (payoutMax) filters.payout_min = parseFloat(payoutMax);

         onFiltersChange(filters);
     };

     return (
         <aside className="bg-white p-4 sm:p-6 lg:rounded-2xl lg:shadow-sm w-full lg:max-w-xs flex flex-col h-full">
             {/* Desktop Filter Header */}
             <div className="hidden lg:flex justify-between items-center mb-5 flex-shrink-0">
                 <h3 className="text-lg font-bold text-gray-900">Filters</h3>
                 <button
                     type="button"
                     className="text-xs font-medium text-gray-500 hover:text-primary transition-colors"
                     onClick={handleReset}
                 >
                     Reset
                 </button>
             </div>
             
             {/* Mobile Filter Header (hidden since it's in the drawer) */}
             <div className="lg:hidden flex justify-between items-center mb-4 flex-shrink-0">
                 <button
                     type="button"
                     className="text-sm font-medium text-gray-500 hover:text-primary transition-colors"
                     onClick={handleReset}
                 >
                     Reset All
                 </button>
             </div>

             {/* Responsive Filter Content */}
             <div className="flex-1 overflow-y-auto hide-scrollbar">
                 <form className="space-y-3 sm:space-y-4 pr-1 sm:pr-2 pl-1">
                     <Select
                         label="Number of Bedrooms"
                         name="bedrooms"
                         value={selectedBedrooms}
                         onChange={(e) => setSelectedBedrooms(e.target.value)}
                         options={bedroomOptions}
                     />
                     <div>
                         <SectionLabel>Origin</SectionLabel>
                         <Input
                             type="text"
                             placeholder="City, State"
                             value={origin}
                             onChange={(e) => setOrigin(e.target.value)}
                         />
                     </div>
                     <div>
                         <SectionLabel>Destination</SectionLabel>
                         <Input
                             type="text"
                             placeholder="City, State"
                             value={destination}
                             onChange={(e) => setDestination(e.target.value)}
                         />
                     </div>
                     <Slider
                         label="Max Distance"
                         min="0"
                         max="500"
                         value={distance}
                         onChange={(e) => setDistance(Number(e.target.value))}
                         currentValue={distance}
                         minLabel="0 mi"
                         maxLabel="500 mi"
                     />

                     <div>
                         <SectionLabel>Date Start</SectionLabel>
                         <div className="w-full">
                             <DatePicker
                                 selected={dateStart}
                                 onChange={(date) => setDateStart(date)}
                                 dateFormat="MM/dd/yyyy"
                                 placeholderText="mm/dd/yyyy"
                                 customInput={<DateInput />}
                                 minDate={new Date()}
                                 popperClassName="!z-50"
                                 popperPlacement="bottom-start"
                                 shouldCloseOnSelect={true}
                             />
                         </div>
                     </div>
                     <div>
                         <SectionLabel>Date End</SectionLabel>
                         <div className="w-full">
                             <DatePicker
                                 selected={dateEnd}
                                 onChange={(date) => setDateEnd(date)}
                                 dateFormat="MM/dd/yyyy"
                                 placeholderText="mm/dd/yyyy"
                                 customInput={<DateInput />}
                                 minDate={dateStart || new Date()}
                                 popperClassName="!z-50"
                                 popperPlacement="bottom-start"
                                 shouldCloseOnSelect={true}
                             />
                         </div>
                     </div>

                     <div>
                         <SectionLabel>Truck Size</SectionLabel>
                         <div className="space-y-2">
                             <Checkbox
                                 checked={truckSizes.includes('Small')}
                                 onChange={(e) => handleTruckSizeChange('Small', e.target.checked)}
                             >
                                 Small (≤26')
                             </Checkbox>
                             <Checkbox
                                 checked={truckSizes.includes('Medium')}
                                 onChange={(e) => handleTruckSizeChange('Medium', e.target.checked)}
                             >
                                 Medium (27'-52')
                             </Checkbox>
                             <Checkbox
                                 checked={truckSizes.includes('Large')}
                                 onChange={(e) => handleTruckSizeChange('Large', e.target.checked)}
                             >
                                 Large (≥53')
                             </Checkbox>
                         </div>
                     </div>

                     <div>
                         <SectionLabel>Payout Range</SectionLabel>
                         <div className="flex flex-col sm:flex-row gap-2">
                             <Input
                                 type="number"
                                 placeholder="Min ($)"
                                 value={payoutMin}
                                 onChange={(e) => setPayoutMin(e.target.value)}
                                 className="flex-1"
                             />
                             <Input
                                 type="number"
                                 placeholder="Max ($)"
                                 value={payoutMax}
                                 onChange={(e) => setPayoutMax(e.target.value)}
                                 className="flex-1"
                             />
                         </div>
                     </div>
                 </form>
             </div>

             {/* Responsive Apply Button */}
             <div className="pt-3 sm:pt-4 border-t border-gray-100 flex-shrink-0 mt-3 sm:mt-4">
                 <Button
                     type="button"
                     fullWidth
                     size="md"
                     className="py-2.5 text-sm sm:text-base font-medium"
                     onClick={handleApplyFilters}
                 >
                     Apply Filters
                 </Button>
             </div>

         </aside>
     );
 };