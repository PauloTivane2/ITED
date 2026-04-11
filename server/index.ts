import express, { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';
import { generatePremiumEmailTemplate, generateAutoReplyTemplate } from './template';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Configurar CORS para o Frontend local (5173) e futuro (quando fizer Deploy)
const allowedOrigins = [
  'http://localhost:5173',
  process.env.FRONTEND_URL
].filter(Boolean) as string[];

app.use(cors({
  origin: allowedOrigins,
}));

app.use(express.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post('/api/contact', async (req: Request, res: Response) => {
  const { name, email, subject, message, phone } = req.body;

  if (!name || !subject || !message) {
    return res.status(400).json({ error: 'Os campos nome, assunto e mensagem são obrigatórios' });
  }

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

    // Enviar confirmação automática para o usuário (Auto-Reply)
    if (email) {
      const autoReplyOptions = {
        from: `"ITED (No-Reply)" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: `Recebemos sua mensagem: ${subject}`,
        html: generateAutoReplyTemplate(name, subject),
      };
      
      // Enviamos em segundo plano para não atrasar a resposta do administrador
      transporter.sendMail(autoReplyOptions).catch((err: any) => {
        console.error('Erro ao enviar email de auto-resposta:', err);
      });
    }

    res.status(200).json({ message: 'Email enviado com sucesso!' });
  } catch (error: any) {
    console.error('Erro ao enviar email:', error);
    res.status(500).json({ error: 'Falha ao enviar o email. Verifique as credenciais.' });
  }
});

app.listen(port, () => {
  console.log(`  Servidor de Email a aguardar mensagens na porta ${port}`);
});
