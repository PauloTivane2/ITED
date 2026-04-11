import nodemailer from 'nodemailer';
import { generatePremiumEmailTemplate, generateAutoReplyTemplate } from '../server/template';

export default async function handler(req: any, res: any) {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { name, email, subject, message, phone } = req.body;

  if (!name || !subject || !message) {
    return res.status(400).json({ error: 'Os campos nome, assunto e mensagem são obrigatórios' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    const mailOptions = {
      from: `"${name}" <${email || 'no-reply@ited.com'}>`,
      replyTo: email,
      to: process.env.EMAIL_USER,
      subject: `[Site Contacto] ${subject}`,
      text: `Nome: ${name}\nEmail: ${email}\nTelefone: ${phone}\n\nMensagem:\n${message}`,
      html: generatePremiumEmailTemplate({ name, email, phone, subject, message }),
    };

    await transporter.sendMail(mailOptions);

    // Enviar confirmação automática (Auto-Reply)
    if (email) {
      const autoReplyOptions = {
        from: `"ITED (No-Reply)" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: `Recebemos sua mensagem: ${subject}`,
        html: generateAutoReplyTemplate(name, subject),
      };
      
      // Enviamos sem esperar para acelerar a resposta
      transporter.sendMail(autoReplyOptions).catch(err => console.error('Auto-reply error:', err));
    }

    return res.status(200).json({ message: 'Email enviado com sucesso!' });
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    return res.status(500).json({ error: 'Falha ao enviar o email.' });
  }
}
