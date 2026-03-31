import { emailApi } from '../../../services/email/email.service';
import { ContactFormData } from '../types/contact.types';

export const contactService = {
  submitContactForm: async (data: ContactFormData) => {
    // Aqui podíamos adicionar lógica extra, validações ou transformações
    // Antes de enviar à API final.
    return emailApi.sendEmail(data);
  }
};