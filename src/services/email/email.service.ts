import { ContactFormData } from "../../features/contact/types/contact.types";

const API_URL = import.meta.env.VITE_API_URL || '';

export const emailApi = {
  sendEmail: async (data: ContactFormData): Promise<{ message?: string; error?: string }> => {
    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Falha ao enviar o contacto.');
      }

      return result;
    } catch (error: any) {
      console.error('Email service error:', error);
      throw new Error(error.message || 'Erro de conexão com o servidor de email.');
    }
  }
};
