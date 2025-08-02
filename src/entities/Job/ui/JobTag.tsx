import cn from 'classnames';

interface JobTagProps {
  children: React.ReactNode;
  type: 'verified' | 'payment' | 'escrow';
}

export const JobTag = ({ children, type }: JobTagProps) => {
  const typeStyles = {
    verified: 'bg-blue-100 text-blue-700',
    payment: 'bg-green-100 text-green-700',
    escrow: 'bg-yellow-100 text-yellow-700',
  };

  return (
    <div className={cn(
      "text-xs font-medium px-3 py-1 rounded-md",
      typeStyles[type]
    )}>
      {children}
    </div>
  );
};