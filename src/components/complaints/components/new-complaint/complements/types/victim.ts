import { PersonData, VictimFormData } from "@/interfaces/complaints/forms/victim";

export interface VictimFormState {
    victim: PersonData;
    complainant?: PersonData;
    isComplainant: boolean;
    isValid: boolean;
    touched: {
        victim: Record<keyof PersonData, boolean>;
        complainant?: Record<keyof PersonData, boolean>;
    };
    errors: {
        victim: Partial<Record<keyof PersonData, string>>;
        complainant?: Partial<Record<keyof PersonData, string>>;
    };
}

export interface VictimFormValidation {
    formData: {
        victim: PersonData;
        isComplainant: boolean;
        complainant?: PersonData;
        isValid: boolean;
        touched: {
            victim: Record<keyof PersonData, boolean>;
            complainant?: Record<keyof PersonData, boolean>;
        };
        errors: {
            victim: Partial<Record<keyof PersonData, string>>;
            complainant?: Partial<Record<keyof PersonData, string>>;
        };
    };
    errors: {
        victim: Partial<Record<keyof PersonData, string>>;
        complainant?: Partial<Record<keyof PersonData, string>>;
    };
    touched: {
        victim: Record<keyof PersonData, boolean>;
        complainant?: Record<keyof PersonData, boolean>;
    };
    isValid: boolean;
    handleChange: (field: keyof PersonData, value: string, type?: 'victim' | 'complainant') => void;
    handleBlur: (field: keyof PersonData, type?: 'victim' | 'complainant') => void;
    handleIsVictimChange: (checked: boolean) => void;
    validateForm: () => boolean;
} 