export interface ContactFormData {
  name: string;
  email?: string;
  phone?: string;
  subject: string;
  message: string;
}

export type ContactStatus = 'idle' | 'loading' | 'success' | 'error';