import { useState } from 'react';
import { ContactFormData, ContactStatus } from '../types/contact.types';
import { contactService } from '../service/contact.service';

export const useContact = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState<ContactStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage(null);

    try {
      await contactService.submitContactForm(formData);
      setStatus('success');
      // Limpa os dados se for com sucesso
      setFormData({ name: '', email: '', subject: '', message: '' });

      // Voltar a idle depois de 5 segundos
      setTimeout(() => {
        setStatus('idle');
      }, 5000);
    } catch (error: any) {
      console.error(error);
      setStatus('error');
      setErrorMessage(error.message || 'Falha ao enviar a mensagem. Tente novamente.');
    }
  };

  return {
    formData,
    status,
    errorMessage,
    handleChange,
    handleSubmit,
  };
};