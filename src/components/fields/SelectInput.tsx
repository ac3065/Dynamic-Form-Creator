import React from 'react';
import { FormField, SelectOption } from '../../types/form';
import { ChevronDown } from 'lucide-react';

interface SelectInputProps {
  field: FormField;
  value: string | string[];
  onChange: (value: string | string[]) => void;
  onBlur: () => void;
  error?: string;
  touched?: boolean;
}

export const SelectInput: React.FC<SelectInputProps> = ({
  field,
  value,
  onChange,
  onBlur,
  error,
  touched
}) => {
  const options = field.data as SelectOption[];
  const isMultiple = field.type === 'multiselect';

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (isMultiple) {
      const selectedValues = Array.from(e.target.selectedOptions, option => option.value);
      onChange(selectedValues);
    } else {
      onChange(e.target.value);
    }
  };

  const handleButtonClick = (optionId: string) => {
    if (field.type === 'buttons') {
      onChange(optionId);
    }
  };

  const handleMultiButtonClick = (optionId: string) => {
    if (field.type === 'buttons') return;
    
    const currentValues = Array.isArray(value) ? value : [];
    const newValues = currentValues.includes(optionId)
      ? currentValues.filter(v => v !== optionId)
      : [...currentValues, optionId];
    onChange(newValues);
  };

  if (field.type === 'buttons') {
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          {field.title}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </label>
        
        <div className="flex flex-wrap gap-2">
          {options?.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => handleButtonClick(option.id)}
              className={`px-4 py-2 rounded-lg border transition-colors ${
                value === option.id
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              {option.title}
            </button>
          ))}
        </div>
        
        {touched && error && (
          <p className="text-sm text-red-600 flex items-center gap-1">
            <span className="w-4 h-4">⚠</span>
            {error}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {field.title}
        {field.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <div className="relative">
        <select
          value={isMultiple ? (Array.isArray(value) ? value : []) : (value || '')}
          onChange={handleSelectChange}
          onBlur={onBlur}
          multiple={isMultiple}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors appearance-none ${
            touched && error ? 'border-red-500' : 'border-gray-300'
          } ${isMultiple ? 'min-h-[100px]' : ''}`}
        >
          {!isMultiple && (
            <option value="">{field.placeholder || 'Select an option'}</option>
          )}
          {options?.map((option) => (
            <option key={option.id} value={option.id}>
              {option.title}
            </option>
          ))}
        </select>
        
        {!isMultiple && (
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        )}
      </div>
      
      {touched && error && (
        <p className="text-sm text-red-600 flex items-center gap-1">
          <span className="w-4 h-4">⚠</span>
          {error}
        </p>
      )}
    </div>
  );
};