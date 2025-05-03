import { NewComplaintFormData } from '../types';

export const validators = {
  isValidType: (type: string) => !!type && type.length > 0,
  
  isValidEmployer: (employerId: string) => !!employerId && employerId.length > 0,
  
  isValidDate: (date: Date | null) => {
    if (!date) return false;
    const today = new Date();
    return date instanceof Date && !isNaN(date.getTime()) && date <= today;
  },
  
  isValidVictimInfo: (victimInfo: NewComplaintFormData['victimInfo']) => {
    if (!victimInfo) return false;
    return !!victimInfo.name && !!victimInfo.contact;
  },
  
  isValidDetails: (details: string) => !!details && details.length >= 10,
  
  isValidStep: (step: number, formData: Partial<NewComplaintFormData>): boolean => {
    switch (step) {
      case 1:
        return validators.isValidType(formData.type || '');
      case 2:
        return validators.isValidEmployer(formData.employerId || '');
      case 3:
        return validators.isValidDate(formData.entryDate || null);
      default:
        return true;
    }
  }
}; 