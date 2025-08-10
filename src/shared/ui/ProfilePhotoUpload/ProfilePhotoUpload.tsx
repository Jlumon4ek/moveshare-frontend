import { useState, useRef } from 'react';
import { Camera, Upload, X, Trash2 } from 'lucide-react';
import { profileApi } from '../../api/profile';

interface ProfilePhotoUploadProps {
  currentPhotoUrl?: string | null;
  onPhotoUpdate: (photoUrl: string | null) => void;
  className?: string;
  fallbackText?: string;
}

export const ProfilePhotoUpload = ({ 
  currentPhotoUrl, 
  onPhotoUpdate, 
  className = '',
  fallbackText = ''
}: ProfilePhotoUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    // Show preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Upload the file
    setIsUploading(true);
    try {
      const response = await profileApi.uploadProfilePhoto(file);
      onPhotoUpdate(response.photo_url || null);
      setPreviewUrl(null);
    } catch (error) {
      console.error('Error uploading photo:', error);
      alert('Failed to upload photo. Please try again.');
      setPreviewUrl(null);
    } finally {
      setIsUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDeletePhoto = async () => {
    if (!window.confirm('Are you sure you want to delete your profile photo?')) {
      return;
    }

    setIsUploading(true);
    try {
      await profileApi.deleteProfilePhoto();
      onPhotoUpdate(null);
    } catch (error) {
      console.error('Error deleting photo:', error);
      alert('Failed to delete photo. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const currentPhoto = previewUrl || currentPhotoUrl;

  return (
    <div className={`relative ${className}`}>
      {/* Photo Display */}
      <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
        {currentPhoto ? (
          <img 
            src={currentPhoto} 
            alt="Profile" 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {fallbackText || <Camera size={32} />}
          </div>
        )}
        
        {/* Upload overlay when uploading */}
        {isUploading && (
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="absolute -bottom-2 -right-2 flex gap-1">
        {/* Upload Button */}
        <button
          onClick={openFileDialog}
          disabled={isUploading}
          className="bg-primary text-white p-2 rounded-full hover:bg-primary/80 disabled:opacity-50 shadow-lg"
          title="Upload photo"
        >
          <Upload size={16} />
        </button>

        {/* Delete Button */}
        {currentPhotoUrl && (
          <button
            onClick={handleDeletePhoto}
            disabled={isUploading}
            className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 disabled:opacity-50 shadow-lg"
            title="Delete photo"
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Preview Modal */}
      {previewUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-4 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Preview</h3>
              <button
                onClick={() => setPreviewUrl(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            <img 
              src={previewUrl} 
              alt="Preview" 
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <div className="text-sm text-gray-600 text-center">
              {isUploading ? 'Uploading...' : 'Upload in progress...'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};