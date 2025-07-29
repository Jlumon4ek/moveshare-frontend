import type { ReactNode } from 'react';

interface SelectCardProps {
  icon: ReactNode;
  title: string;
  subtitle: string;
  name: string;
  value: string;
  type: 'radio' | 'checkbox';
  layout?: 'vertical' | 'horizontal';
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SelectCard = ({
  icon,
  title,
  subtitle,
  name,
  value,
  type,
  layout = 'horizontal',
  checked,
  onChange,
}: SelectCardProps) => {
  const isVertical = layout === 'vertical';

  return (
    <label className="relative h-full">
      <input
        type={type}
        name={name}
        value={value}
        className="peer sr-only"
        checked={checked}
        onChange={onChange}
      />
      <div
        className={`
          h-full p-4 border rounded-xl cursor-pointer transition-all
          ${isVertical ? 'flex flex-col items-center justify-center text-center' : 'flex items-center gap-4'}
          bg-gray-50 border-transparent
          peer-checked:border-primary peer-checked:bg-primary/10
          hover:bg-gray-100
        `}
      >
        <div className={`bg-white p-3 rounded-lg text-primary shadow-sm flex-shrink-0 ${isVertical ? 'mb-2' : ''}`}>
          {icon}
        </div>
        <div className={isVertical ? 'text-center' : ''}>
          {/* Применяем стили для выравнивания только к вертикальным карточкам */}
          <p 
            className={`font-semibold text-gray-800 ${isVertical ? 'flex items-center justify-center' : ''}`}
            style={isVertical ? { minHeight: '50px' } : {}}
          >
            {title}
          </p>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
      </div>
    </label>
  );
};