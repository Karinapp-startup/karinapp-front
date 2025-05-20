export interface ReviewFormData {
  confirmed: boolean;
  signature?: string;
  attachments?: File[];
  reviewDate: Date;
}

export const defaultReviewFormData: ReviewFormData = {
  confirmed: false,
  reviewDate: new Date()
};

export interface ReviewSection {
  id: string;
  title: string;
  editPath: string;
}

export const reviewSections: ReviewSection[] = [
  {
    id: 'employer',
    title: 'Selección del empleador',
    editPath: '/employer'
  },
  {
    id: 'victim',
    title: 'Datos de la víctima',
    editPath: '/victim'
  },
  {
    id: 'relationship',
    title: 'Sobre la relación entre víctima y denunciado/a',
    editPath: '/relationship'
  },
  {
    id: 'situations',
    title: 'Situaciones que se denuncian',
    editPath: '/situations'
  },
  {
    id: 'witnesses',
    title: 'Testigos',
    editPath: '/witnesses'
  },
  {
    id: 'safeguard',
    title: 'Medidas de resguardo',
    editPath: '/safeguard'
  },
  {
    id: 'summary',
    title: 'Resumen de la denuncia',
    editPath: '/summary'
  }
]; 