import React, { useState, useCallback } from 'react';
import { FieldRenderer } from './FieldRenderer';
import { validateField, validateForm } from '../utils/validation';
import { FormField, FormData } from '../types/form';
import { Send, AlertCircle } from 'lucide-react';

interface FormRendererProps {
  schema: FormField[];
  onSubmit: (data: FormData) => void;
}

export const FormRenderer: React.FC<FormRendererProps> = ({ schema, onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleFieldChange = useCallback((name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Real-time validation
    const field = findFieldByName(schema, name);
    if (field) {
      const error = validateField(field, value);
      setErrors(prev => ({
        ...prev,
        [name]: error || ''
      }));
    }
  }, [schema]);

  const handleFieldBlur = useCallback((name: string) => {
    setTouched(prev => ({ ...prev, [name]: true }));
  }, []);

  const findFieldByName = (fields: FormField[], name: string): FormField | null => {
    for (const field of fields) {
      if (field.name === name) return field;
      if (field.type === 'card' && field.data) {
        const found = findFieldByName(field.data as FormField[], name);
        if (found) return found;
      }
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate all fields
    const validationErrors = validateForm(schema, formData);
    setErrors(validationErrors);

    // Mark all fields as touched
    const allTouched: Record<string, boolean> = {};
    const collectFieldNames = (fields: FormField[]) => {
      fields.forEach(field => {
        allTouched[field.name] = true;
        if (field.type === 'card' && field.data) {
          collectFieldNames(field.data as FormField[]);
        }
      });
    };
    collectFieldNames(schema);
    setTouched(allTouched);

    // If no errors, submit the form
    if (Object.keys(validationErrors).filter(key => validationErrors[key]).length === 0) {
      onSubmit(formData);
    }

    setIsSubmitting(false);
  };

  const hasErrors = Object.values(errors).some(error => error && error.trim() !== '');

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {schema.map((field) => (
        <FieldRenderer
          key={field.name}
          field={field}
          value={formData[field.name]}
          onChange={(value) => handleFieldChange(field.name, value)}
          onBlur={() => handleFieldBlur(field.name)}
          error={errors[field.name]}
          touched={touched[field.name]}
        />
      ))}

      <div className="pt-4">
        <button
          type="submit"
          disabled={isSubmitting || hasErrors}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Submitting...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              Submit Form
            </>
          )}
        </button>

        {hasErrors && (
          <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center gap-2 text-red-700">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm font-medium">Please fix the errors above</span>
            </div>
          </div>
        )}
      </div>
    </form>
  );
};