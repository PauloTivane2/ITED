import nodemailer from 'nodemailer';
import { generatePremiumEmailTemplate, generateAutoReplyTemplate } from '../server/template';

export default async function handler(req: any, res: any) {
  // CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  // 1. Verificar Variáveis de Ambiente
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;

  if (!emailUser || !emailPass) {
    console.error('ERRO: Variáveis EMAIL_USER ou EMAIL_PASS não configuradas no Vercel.');
    return res.status(500).json({ 
      error: 'Erro de configuração no servidor (Variáveis de ambiente ausentes).',
      debug: 'Verifique o painel do Vercel em Settings -> Environment Variables'
    });
  }

  const { name, email, subject, message, phone } = req.body;

  if (!name || !subject || !message) {
    return res.status(400).json({ error: 'Os campos nome, assunto e mensagem são obrigatórios' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    const mailOptions = {
      from: `"${name}" <${email || 'no-reply@ited.com'}>`,
      replyTo: email,
      to: emailUser,
      subject: `[Site Contacto] ${subject}`,
      text: `Nome: ${name}\nEmail: ${email}\nTelefone: ${phone}\n\nMensagem:\n${message}`,
      html: generatePremiumEmailTemplate({ name, email, phone, subject, message }),
    };

    await transporter.sendMail(mailOptions);

    if (email) {
      const autoReplyOptions = {
        from: `"ITED (No-Reply)" <${emailUser}>`,
        to: email,
        subject: `Recebemos sua mensagem: ${subject}`,
        html: generateAutoReplyTemplate(name, subject),
      };
      
      // Envio em background (não aguardamos o 'await' aqui para ser mais rápido)
      transporter.sendMail(autoReplyOptions).catch(err => console.error('Erro na auto-resposta:', err));
    }

    return res.status(200).json({ message: 'Email enviado com sucesso!' });
  } catch (error: any) {
    console.error('Erro detalhado no envio:', error);
    return res.status(500).json({ 
      error: 'Falha ao enviar o email através do serviço.',
      message: error.message 
    });
  }
}
