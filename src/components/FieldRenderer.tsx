import React from 'react';
import { FormField } from '../types/form';
import { TextInput } from './fields/TextInput';
import { SelectInput } from './fields/SelectInput';
import { FileInput } from './fields/FileInput';
import { DateInput } from './fields/DateInput';
import { CardField } from './fields/CardField';

interface FieldRendererProps {
  field: FormField;
  value: any;
  onChange: (value: any) => void;
  onBlur: () => void;
  error?: string;
  touched?: boolean;
}

export const FieldRenderer: React.FC<FieldRendererProps> = ({
  field,
  value,
  onChange,
  onBlur,
  error,
  touched
}) => {
  // Set default value if provided and current value is undefined
  React.useEffect(() => {
    if (field.value !== undefined && value === undefined) {
      onChange(field.value);
    }
  }, [field.value, value, onChange]);

  switch (field.type) {
    case 'text':
    case 'email':
    case 'tel':
    case 'number':
    case 'textarea':
      return (
        <TextInput
          field={field}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          error={error}
          touched={touched}
        />
      );

    case 'select':
    case 'multiselect':
    case 'buttons':
    case 'typeahead':
      return (
        <SelectInput
          field={field}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          error={error}
          touched={touched}
        />
      );

    case 'file':
      return (
        <FileInput
          field={field}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          error={error}
          touched={touched}
        />
      );

    case 'date':
    case 'datetime':
      return (
        <DateInput
          field={field}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          error={error}
          touched={touched}
        />
      );

    case 'card':
      return (
        <CardField
          field={field}
          value={value || {}}
          onChange={onChange}
          onBlur={onBlur}
          error={error}
          touched={touched}
        />
      );

    default:
      return (
        <div className="text-red-500 text-sm">
          Unsupported field type: {field.type}
        </div>
      );
  }
};