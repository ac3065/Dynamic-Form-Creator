import { FormField, FormData } from '../types/form';

export const validateField = (field: FormField, value: any): string | null => {
  // Required validation
  if (field.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
    return field.error || `${field.title} is required`;
  }

  // Skip other validations if field is empty and not required
  if (!value || (typeof value === 'string' && value.trim() === '')) {
    return null;
  }

  // Regex validation
  if (field.validator) {
    try {
      const regex = new RegExp(field.validator);
      if (!regex.test(value.toString())) {
        return field.error || `${field.title} format is invalid`;
      }
    } catch (e) {
      console.error('Invalid regex pattern:', field.validator);
    }
  }

  // Min/Max validation for numbers
  if (field.type === 'number') {
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(numValue)) {
      return field.error || `${field.title} must be a valid number`;
    }
    if (field.min !== undefined && value < Number(field.min)) {
      return field.error || `${field.title} must be at least ${field.min}`;
    }
    if (field.max !== undefined && value > Number(field.max)) {
      return field.error || `${field.title} must be at most ${field.max}`;
    }
  }

  // Min/Max validation for dates
  if ((field.type === 'date' || field.type === 'datetime') && value) {
    const dateValue = new Date(value);
    if (field.min && dateValue < new Date(field.min)) {
      return field.error || `${field.title} must be after ${field.min}`;
    }
    if (field.max && dateValue > new Date(field.max)) {
      return field.error || `${field.title} must be before ${field.max}`;
    }
  }

  // Length validation for strings
  if (typeof value === 'string') {
    if (field.min !== undefined && value.length < Number(field.min)) {
      return field.error || `${field.title} must be at least ${field.min} characters`;
    }
    if (field.max !== undefined && value.length > Number(field.max)) {
      return field.error || `${field.title} must be at most ${field.max} characters`;
    }
  }

  return null;
};

export const validateForm = (schema: FormField[], formData: FormData): Record<string, string> => {
  const errors: Record<string, string> = {};

  const validateFields = (fields: FormField[], data: FormData, prefix = '') => {
    fields.forEach(field => {
      const fieldName = prefix ? `${prefix}.${field.name}` : field.name;
      const fieldValue = prefix ? data[prefix]?.[field.name] : data[field.name];

      const error = validateField(field, fieldValue);
      if (error) {
        errors[fieldName] = error;
      }

      // Recursively validate nested card fields
      if (field.type === 'card' && field.data && Array.isArray(field.data)) {
        validateFields(field.data as FormField[], data, fieldName);
      }
    });
  };

  validateFields(schema, formData);
  return errors;
};