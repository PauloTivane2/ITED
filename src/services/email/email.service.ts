import { ContactFormData } from "../../features/contact/types/contact.types";

const isProduction = import.meta.env.PROD;
// Em produção (Vercel), usamos caminhos relativos. Em desenvolvimento, usamos o localhost se configurado.
const API_URL = isProduction ? '' : (import.meta.env.VITE_API_URL || 'http://localhost:3001');

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
