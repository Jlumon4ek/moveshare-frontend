import { FileText } from 'lucide-react';

interface DocumentPreviewProps {
  name: string;
}

export const DocumentPreview = ({ name }: DocumentPreviewProps) => {
  return (
    <div className="text-center">
      <div className="bg-gray-100 rounded-lg p-6 flex items-center justify-center aspect-square">
        <FileText size={32} className="text-gray-400" />
      </div>
      <p className="text-xs text-gray-600 mt-2">{name}</p>
    </div>
  );
};