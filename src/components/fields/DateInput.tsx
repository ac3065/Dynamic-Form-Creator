import React from 'react';
import { FormField } from '../../types/form';

interface DateInputProps {
  field: FormField;
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  error?: string;
  touched?: boolean;
}

export const DateInput: React.FC<DateInputProps> = ({
  field,
  value,
  onChange,
  onBlur,
  error,
  touched
}) => {
  const inputType = field.type === 'datetime' ? 'datetime-local' : 'date';

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {field.title}
        {field.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <input
        type={inputType}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
          touched && error ? 'border-red-500' : 'border-gray-300'
        }`}
        min={field.min}
        max={field.max}
        step={field.resolution}
      />
      
      {touched && error && (
        <p className="text-sm text-red-600 flex items-center gap-1">
          <span className="w-4 h-4">⚠</span>
          {error}
        </p>
      )}
    </div>
  );
};