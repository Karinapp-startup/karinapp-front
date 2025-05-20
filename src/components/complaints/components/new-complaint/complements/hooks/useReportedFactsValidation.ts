import { useState } from "react";
import { ReportedFactsFormData } from "@/interfaces/complaints/forms/reported-facts";
import { ReportedFactsFormState } from "../types/reported-facts";

const initialState: ReportedFactsFormState = {
  formData: {
    date: new Date(),
    location: '',
    commune: '',
    street: '',
    description: '',
    number: '',
    addressReference: ''
  },
  isValid: false,
  touched: {
    date: false,
    location: false,
    commune: false,
    street: false,
    description: false,
    number: false,
    addressReference: false
  },
  errors: {}
};

export const useReportedFactsValidation = (defaultValues: ReportedFactsFormData) => {
  const [state, setState] = useState<ReportedFactsFormState>({
    ...initialState,
    formData: defaultValues
  });

  const validate = (data: ReportedFactsFormData) => {
    const errors: ReportedFactsFormState['errors'] = {};

    if (!data.date) {
      errors.date = 'La fecha es requerida';
    }

    if (!data.location?.trim()) {
      errors.location = 'La ubicación es requerida';
    }

    if (!data.commune?.trim()) {
      errors.commune = 'La comuna es requerida';
    }

    if (!data.street?.trim()) {
      errors.street = 'La calle es requerida';
    }

    if (!data.description?.trim()) {
      errors.description = 'La descripción es requerida';
    }

    return errors;
  };

  const handleChange = (field: keyof ReportedFactsFormData, value: any) => {
    const updatedData = {
      ...state.formData,
      [field]: value
    };

    const errors = validate(updatedData);

    setState({
      ...state,
      formData: updatedData,
      errors,
      isValid: Object.keys(errors).length === 0
    });
  };

  const handleBlur = (field: keyof ReportedFactsFormData) => {
    setState({
      ...state,
      touched: {
        ...state.touched,
        [field]: true
      }
    });
  };

  return {
    formData: state.formData,
    errors: state.errors,
    touched: state.touched,
    isValid: state.isValid,
    handleChange,
    handleBlur
  };
}; 