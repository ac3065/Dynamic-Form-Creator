import React from 'react';
import { FormField, FormData } from '../../types/form';
import { FieldRenderer } from '../FieldRenderer';

interface CardFieldProps {
  field: FormField;
  value: FormData;
  onChange: (value: FormData) => void;
  onBlur: () => void;
  error?: string;
  touched?: boolean;
}

export const CardField: React.FC<CardFieldProps> = ({
  field,
  value,
  onChange,
  onBlur,
  error,
  touched
}) => {
  const subFields = field.data as FormField[];

  const handleFieldChange = (fieldName: string, fieldValue: any) => {
    const newValue = { ...value, [fieldName]: fieldValue };
    onChange(newValue);
  };

  const handleFieldBlur = (fieldName: string) => {
    // Trigger blur for the card field
    onBlur();
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        {field.title}
        {field.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <div className={`border rounded-lg p-4 space-y-4 ${
        touched && error ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-gray-50'
      }`}>
        {subFields?.map((subField) => (
          <FieldRenderer
            key={subField.name}
            field={subField}
            value={value?.[subField.name]}
            onChange={(fieldValue) => handleFieldChange(subField.name, fieldValue)}
            onBlur={() => handleFieldBlur(subField.name)}
            error={error}
            touched={touched}
          />
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
};