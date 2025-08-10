import { useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { FolderUp, X } from 'lucide-react';

interface UploaderProps {
    files: File[];
    setFiles: (files: File[]) => void;
    title: string;
    description: string;
    maxFiles?: number;
}

export const Uploader = ({ 
    files, 
    setFiles,
    title,
    description,
    maxFiles = 3,
}: UploaderProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (files.length + acceptedFiles.length > maxFiles) {
      alert(`You can upload a maximum of ${maxFiles} files.`);
      return;
    }
    setFiles([...files, ...acceptedFiles]);
  }, [files, setFiles, maxFiles]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop, 
    accept: { 
        'image/*': ['.jpeg', '.png', '.jpg'],
        'application/pdf': ['.pdf']
    },
    maxFiles,
  });

  const removeFile = (fileToRemove: File) => {
    setFiles(files.filter(file => file !== fileToRemove));
  };

  useEffect(() => {
    const filePreviews = files.map(file => ({...file, preview: URL.createObjectURL(file)}));
    
    return () => filePreviews.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);
  
  return (
    <div>
      <div
        {...getRootProps()}
        className={`
          w-full p-8 border-2 border-dashed rounded-xl text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-primary bg-primary/5' : 'border-gray-200 bg-white'}
        `}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center gap-2">
            <FolderUp size={24} className="text-primary"/>
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
            <p className="text-gray-500 text-sm">{description}</p>
        </div>
      </div>

      {files.length > 0 && (
        <div className="mt-4">
          <h4 className="font-semibold text-sm text-gray-600 mb-2">Uploaded Files:</h4>
          <div className="grid grid-cols-3 gap-4">
            {files.map((file, index) => (
              <div key={index} className="relative border rounded-lg p-2">
                <img 
                  src={URL.createObjectURL(file)} 
                  alt={file.name} 
                  className="w-full h-24 object-cover rounded-md"
                  onLoad={(e) => URL.revokeObjectURL((e.target as HTMLImageElement).src)}
                />
                <button 
                  onClick={() => removeFile(file)} 
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};