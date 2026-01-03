'use client';

import { DefaultFormData, FieldValidator, FormData } from '@/lib/constants';
import { isValidEmail } from '@/lib/valid-email';
import { createContext, useContext, useState } from 'react';

type FormContextType = {
  dataForm: FormData;
  error: FormData;
  displayData: FormData | null;
  updateField: (field: keyof FormData, value: string) => void;
  isSubmit: () => void;
  isReset: () => void;
};

// Deafult form content
const FormContextDefault: FormContextType = {
  dataForm: DefaultFormData,
  error: DefaultFormData,
  displayData: null,
  updateField: (field, value) => {},
  isSubmit: () => {},
  isReset: () => {} 
};

const FormContext = createContext<FormContextType | null>(FormContextDefault);

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used inside FormProvider');
  }
  
  return context;
};

export const FormProvider = ({ children }: { children: React.ReactNode }) => {
  const [error, setError] = useState<FormData>(DefaultFormData);
  const [dataForm, setDataForm] = useState<FormData>(DefaultFormData);
  const [displayData, setDisplayData] = useState<FormData | null>(null);

  // Check if all contents are alphabets
  const isAlpha = (str: string) => {
    return /^[a-zA-Z\s]+$/.test(str);
  };

  const isAllNumber = (str: string) => {
    return /^\d+$/.test(str);
  };

  // Updates the form field state as well as validates input 
  const updateField = (field: keyof FormData, value: string) => {
    setDataForm((prev) => ({
      ...prev,
      [field]: value,
    }));
    validateInput(field, value);
  };

  const validateInput = (field: string, value: string) => {
    const validator = FieldValidator[field];
    let errorMessage = '';

    if (validator.required && !value.trim()) {
      errorMessage = 'Field is required';
    } else if (validator.minLength && value.length < validator.minLength) {
      errorMessage = `Minimum ${validator.minLength} characters required`;
    } else if (validator.maxLength && value.length > validator.maxLength) {
      errorMessage = `Maximum ${validator.maxLength} characters allowed`;
    } else if (validator.type) {
      if (validator.type === 'number') {
        if(!isAllNumber(value)) {
          errorMessage = 'Only positive numbers allowed';
        } else if (validator.minValue && Number(value) < validator.minValue) {
          errorMessage = `Minimum value is ${validator.minValue}`;
        } else if (validator.maxValue && Number(value) > validator.maxValue) {
          errorMessage = `Maximum value is ${validator.maxValue}`;
        }
      } else if (validator.type === 'string' && !isAlpha(value)) {
        errorMessage = 'Only alphabets allowed';
      } else if (validator.type === 'email' && !isValidEmail(value)) {
        errorMessage = 'Enter valid email';
      }
    }
    setError((prev) => ({ ...prev, [field]: errorMessage }));
  };

  const isSubmit = () => {
    let hasError = false;

    Object.keys(dataForm).forEach((field) => {
      validateInput(field, dataForm[field as keyof FormData]);
      if (!dataForm[field as keyof FormData]) hasError = true;
    });

    if (!hasError) setDisplayData(dataForm);
    setDataForm(DefaultFormData);
    setError(DefaultFormData);
  };

  const isReset = () => {
    setDataForm(DefaultFormData);
    setError(DefaultFormData);
    setDisplayData(null);
  };

  return (
    <FormContext.Provider
      value={{ dataForm, error, displayData, updateField, isSubmit, isReset }}
    >
      {children}
    </FormContext.Provider>
  );
};
