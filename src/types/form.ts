export interface FormField {
  title: string;
  name: string;
  placeholder?: string;
  type: 'text' | 'buttons' | 'select' | 'multiselect' | 'typeahead' | 'number' | 'textarea' | 'tel' | 'email' | 'file' | 'date' | 'datetime' | 'card';
  validator?: string;
  min?: number | string;
  max?: number | string;
  resolution?: number | string;
  data?: SelectOption[] | FormField[] | FileUploadConfig;
  value?: any;
  required?: boolean;
  error?: string;
}

export interface SelectOption {
  id: string;
  title: string;
}

export interface FileUploadConfig {
  url: string;
  method: 'POST' | 'PUT' | 'PATCH';
  headers?: Record<string, string>;
}

export interface FormData {
  [key: string]: any;
}

export interface FormSchema {
  name: string;
  schema: FormField[];
}