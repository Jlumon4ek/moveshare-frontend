import { useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { FolderUp, X } from 'lucide-react';

interface UploaderProps {
    files: File[];
    setFiles: (files: File[]) => void;
}

export const Uploader = ({ files, setFiles }: UploaderProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (files.length + acceptedFiles.length > 3) {
      alert("You can upload a maximum of 3 photos.");
      return;
    }
    setFiles([...files, ...acceptedFiles]);
  }, [files, setFiles]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop, 
    accept: { 'image/*': ['.jpeg', '.png', '.jpg'] },
    maxFiles: 3,
  });

  const removeFile = (fileToRemove: File) => {
    setFiles(files.filter(file => file !== fileToRemove));
  };

  // Создаем URL для предпросмотра и очищаем память после использования
  useEffect(() => {
    const filePreviews = files.map(file => ({...file, preview: URL.createObjectURL(file)}));
    
    // Очистка URL-ов для предотвращения утечек памяти
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
            <h3 className="text-lg font-semibold text-gray-800">Upload Truck Photos</h3>
            <p className="text-gray-500 text-sm">Drag & drop images here or click to browse (up to 3 files)</p>
            <div className="mt-4">
                <button type="button" className="font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg px-4 py-2 flex items-center gap-2 shadow-sm hover:bg-gray-50">
                    <FolderUp size={16} />
                    Select Files
                </button>
            </div>
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
                  onLoad={(e) => URL.revokeObjectURL((e.target as HTMLImageElement).src)} // Очистка после загрузки
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