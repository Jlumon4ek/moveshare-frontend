import { FolderUp, File as FileIcon, X } from 'lucide-react';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

export const Uploader = () => {
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(prev => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const removeFile = (fileToRemove: File) => {
    setFiles(prev => prev.filter(file => file !== fileToRemove));
  };

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
                <h3 className="text-lg font-semibold text-gray-800">Upload Truck Photos</h3>
                <p className="text-gray-500 text-sm">Drag & drop images here or click to browse</p>
                <div className="mt-4">
                    <button type="button" className="font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg px-4 py-2 flex items-center gap-2 shadow-sm hover:bg-gray-50">
                        <FolderUp size={16} />
                        Select Files
                    </button>
                </div>
            </div>
        </div>

        {files.length > 0 && (
            <div className="mt-4 space-y-2">
            <h4 className="font-semibold text-sm text-gray-600">Uploaded Files:</h4>
            {files.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-100 rounded-md">
                    <div className="flex items-center gap-2">
                        <FileIcon size={16} className="text-gray-500" />
                        <span className="text-sm">{file.name}</span>
                    </div>
                    <button onClick={() => removeFile(file)} className="text-gray-500 hover:text-red-500">
                        <X size={16} />
                    </button>
                </div>
            ))}
            </div>
        )}
    </div>
  );
};