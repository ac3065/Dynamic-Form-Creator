import React from 'react';
import { FormField } from '../../types/form';

interface TextInputProps {
  field: FormField;
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  error?: string;
  touched?: boolean;
}

export const TextInput: React.FC<TextInputProps> = ({
  field,
  value,
  onChange,
  onBlur,
  error,
  touched
}) => {
  const inputType = field.type === 'email' ? 'email' : 
                   field.type === 'tel' ? 'tel' : 
                   field.type === 'number' ? 'number' : 'text';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    if (field.type === 'number') {
      // For number fields, convert to number if valid, otherwise keep as string for validation
      const numValue = parseFloat(newValue);
      onChange(isNaN(numValue) ? newValue : numValue);
    } else {
      onChange(newValue);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {field.title}
        {field.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      {field.type === 'textarea' ? (
        <textarea
          value={value || ''}
          onChange={handleChange}
          onBlur={onBlur}
          placeholder={field.placeholder}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
            touched && error ? 'border-red-500' : 'border-gray-300'
          }`}
          rows={4}
        />
      ) : (
        <input
          type={inputType}
          value={value || ''}
          onChange={handleChange}
          onBlur={onBlur}
          placeholder={field.placeholder}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
            touched && error ? 'border-red-500' : 'border-gray-300'
          }`}
          min={field.min}
          max={field.max}
          step={field.resolution}
        />
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