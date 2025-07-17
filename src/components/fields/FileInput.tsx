import React, { useState } from 'react';
import { FormField, FileUploadConfig } from '../../types/form';
import { Upload, File, X, Check } from 'lucide-react';

interface FileInputProps {
  field: FormField;
  value: any;
  onChange: (value: any) => void;
  onBlur: () => void;
  error?: string;
  touched?: boolean;
}

export const FileInput: React.FC<FileInputProps> = ({
  field,
  value,
  onChange,
  onBlur,
  error,
  touched
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const uploadConfig = field.data as FileUploadConfig;

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadSuccess(false);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(uploadConfig.url, {
        method: uploadConfig.method,
        headers: uploadConfig.headers || {},
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        onChange({
          file: file,
          fileName: file.name,
          fileSize: file.size,
          uploadResponse: result,
          uploadedAt: new Date().toISOString()
        });
        setUploadSuccess(true);
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      console.error('File upload error:', error);
      onChange({
        file: file,
        fileName: file.name,
        fileSize: file.size,
        uploadError: error instanceof Error ? error.message : 'Upload failed'
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveFile = () => {
    onChange(null);
    setUploadSuccess(false);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {field.title}
        {field.required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {!value ? (
        <div className="relative">
          <input
            type="file"
            onChange={handleFileSelect}
            onBlur={onBlur}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={isUploading}
          />
          <div className={`w-full px-6 py-8 border-2 border-dashed rounded-lg text-center transition-colors ${
            touched && error ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
          } ${isUploading ? 'bg-gray-50' : 'hover:bg-gray-50'}`}>
            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600">
              {isUploading ? 'Uploading...' : field.placeholder || 'Click to upload a file'}
            </p>
            {isUploading && (
              <div className="mt-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mx-auto"></div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="border rounded-lg p-4 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <File className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-700">{value.fileName}</p>
                <p className="text-xs text-gray-500">{formatFileSize(value.fileSize)}</p>
              </div>
              {uploadSuccess && (
                <Check className="w-5 h-5 text-green-500" />
              )}
            </div>
            <button
              type="button"
              onClick={handleRemoveFile}
              className="text-red-500 hover:text-red-700 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          
          {value.uploadError && (
            <p className="text-sm text-red-600 mt-2">
              Upload failed: {value.uploadError}
            </p>
          )}
        </div>
      )}

      {touched && error && (
        <p className="text-sm text-red-600 flex items-center gap-1">
          <span className="w-4 h-4">⚠</span>
          {error}
        </p>
      )}
    </div>
  );
};