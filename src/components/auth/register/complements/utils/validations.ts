import { RegisterFormData } from '@/interfaces/auth/register';
import { VALIDATION_RULES, ERROR_MESSAGES } from '../data/constants';

export const validateRegisterForm = (formData: RegisterFormData) => {
  const errors: Partial<Record<keyof RegisterFormData, string>> = {};

  // Personal information validations
  if (!formData.firstName?.trim()) {
    errors.firstName = ERROR_MESSAGES.REQUIRED;
  } else if (formData.firstName.length < VALIDATION_RULES.NAME.MIN_LENGTH) {
    errors.firstName = ERROR_MESSAGES.NAME_MIN_LENGTH(VALIDATION_RULES.NAME.MIN_LENGTH);
  }

  if (!formData.lastName?.trim()) {
    errors.lastName = ERROR_MESSAGES.REQUIRED;
  } else if (formData.lastName.length < VALIDATION_RULES.NAME.MIN_LENGTH) {
    errors.lastName = ERROR_MESSAGES.LASTNAME_MIN_LENGTH(VALIDATION_RULES.NAME.MIN_LENGTH);
  }

  if (formData.registerType === 'legalRep') {
    if (!formData.documentId?.trim()) {
      errors.documentId = ERROR_MESSAGES.REQUIRED;
    } else if (!VALIDATION_RULES.DOCUMENT_ID.PATTERN.test(formData.documentId)) {
      errors.documentId = ERROR_MESSAGES.INVALID_DOCUMENT_ID;
    }
  }

  if (!formData.email?.trim()) {
    errors.email = ERROR_MESSAGES.REQUIRED;
  } else if (!VALIDATION_RULES.EMAIL.PATTERN.test(formData.email)) {
    errors.email = ERROR_MESSAGES.INVALID_EMAIL;
  }

  if (!formData.password?.trim()) {
    errors.password = ERROR_MESSAGES.REQUIRED;
  } else if (!VALIDATION_RULES.PASSWORD.PATTERN.test(formData.password)) {
    errors.password = ERROR_MESSAGES.INVALID_PASSWORD;
  }

  // Terms validations (solo para representantes legales)
  if (formData.registerType === 'legalRep') {
    if (!formData.acceptTerms) {
      errors.acceptTerms = ERROR_MESSAGES.TERMS_REQUIRED;
    }
    if (!formData.acceptPrivacyPolicy) {
      errors.acceptPrivacyPolicy = ERROR_MESSAGES.PRIVACY_REQUIRED;
    }
  }

  return errors;
}; 