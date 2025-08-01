import { useState } from 'react';
import cn from 'classnames';

interface ToggleSwitchProps {
  initialChecked?: boolean;
}

export const ToggleSwitch = ({ initialChecked = false }: ToggleSwitchProps) => {
  const [isChecked, setIsChecked] = useState(initialChecked);

  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input 
        type="checkbox" 
        checked={isChecked}
        onChange={() => setIsChecked(!isChecked)}
        className="sr-only peer" 
      />
      <div className={cn(
        "w-11 h-6 rounded-full peer peer-focus:ring-2 peer-focus:ring-primary/30",
        "peer-checked:after:translate-x-full peer-checked:after:border-white after:content-['']",
        "after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300",
        "after:border after:rounded-full after:h-5 after:w-5 after:transition-all",
        { 'bg-primary': isChecked, 'bg-gray-200': !isChecked }
      )}></div>
    </label>
  );
};