import type { InputHTMLAttributes } from 'react';

interface SliderProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    minLabel: string;
    maxLabel: string;
    currentValue: number | string;
}

export const Slider = ({ label, minLabel, maxLabel, currentValue, ...props }: SliderProps) => {
    return (
        <div>
            <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-gray-800">{label}</label>
                <span className="text-sm font-medium text-primary">{currentValue} mi</span>
            </div>
            <input 
                type="range"
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-sm accent-primary"
                {...props}
            />
            <div className="flex justify-between items-center text-xs text-gray-500 mt-1">
                <span>{minLabel}</span>
                <span>{maxLabel}</span>
            </div>
        </div>
    );
};