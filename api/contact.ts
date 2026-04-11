import nodemailer from 'nodemailer';

export interface EmailTemplateData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export const generatePremiumEmailTemplate = (data: EmailTemplateData): string => {
  const { name, email, phone, subject, message } = data;
  const currentYear = new Date().getFullYear();
  const phoneDisplay = phone && phone.trim() !== '' ? phone : 'Não fornecido';

  return `
<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nova Mensagem de Contacto - ITED</title>
    <style>
        body { font-family: 'Inter', sans-serif; background-color: #f4f7f6; color: #333; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 40px auto; background-color: #fff; border-radius: 16px; overflow: hidden; border: 1px solid #e1e8ed; }
        .header { background: #0f172a; padding: 35px 40px; text-align: center; }
        .header h1 { color: #fff; margin: 0; font-size: 24px; }
        .header p { color: #94a3b8; margin: 8px 0 0 0; font-size: 15px; }
        .content { padding: 40px; }
        .section-title { font-size: 14px; text-transform: uppercase; color: #64748b; font-weight: bold; margin-bottom: 25px; border-bottom: 2px solid #f1f5f9; padding-bottom: 10px; }
        .data-grid { display: grid; gap: 15px; margin-bottom: 35px; }
        .data-item { background-color: #f8fafc; padding: 16px 20px; border-radius: 12px; border-left: 4px solid #3b82f6; }
        .data-label { font-size: 12px; text-transform: uppercase; color: #64748b; font-weight: bold; margin-bottom: 6px; }
        .data-value { font-size: 16px; color: #0f172a; font-weight: bold; }
        .message-box { background-color: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 25px; font-size: 16px; line-height: 1.6; color: #334155; white-space: pre-wrap; }
        .footer { background-color: #f8fafc; padding: 24px 40px; text-align: center; border-top: 1px solid #e1e8ed; color: #64748b; font-size: 13px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Nova Solicitação Recebida</h1>
            <p>Os detalhes do contacto encontram-se abaixo</p>
        </div>
        <div class="content">
            <div class="section-title">Informações do Remetente</div>
            <div class="data-grid">
                <div class="data-item"><div class="data-label">Nome Completo</div><div class="data-value">${name}</div></div>
                <div class="data-item" style="border-left-color: #10b981;"><div class="data-label">E-mail</div><div class="data-value">${email}</div></div>
                <div class="data-item" style="border-left-color: #f59e0b;"><div class="data-label">Contacto</div><div class="data-value">${phoneDisplay}</div></div>
                <div class="data-item" style="border-left-color: #8b5cf6;"><div class="data-label">Assunto</div><div class="data-value">${subject}</div></div>
            </div>
            <div class="section-title">Mensagem / Observação</div>
            <div class="message-box">${message}</div>
        </div>
        <div class="footer">
            <p>Email automático ITED Church &copy; ${currentYear}</p>
        </div>
    </div>
</body>
</html>
  `;
};

export const generateAutoReplyTemplate = (name: string, subject: string): string => {
  const currentYear = new Date().getFullYear();
  return `
<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recebemos sua mensagem - ITED</title>
    <style>
        body { font-family: 'Inter', sans-serif; background-color: #f4f7f6; color: #333; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 40px auto; background-color: #fff; border-radius: 16px; overflow: hidden; border: 1px solid #e1e8ed; }
        .header { background: #0f172a; padding: 35px 40px; text-align: center; }
        .header h1 { color: #fff; margin: 0; font-size: 24px; }
        .content { padding: 40px; text-align: center; }
        .welcome-text { font-size: 18px; color: #0f172a; font-weight: bold; margin-bottom: 20px; }
        .message-text { font-size: 16px; line-height: 1.6; color: #475569; margin-bottom: 30px; }
        .status-badge { display: inline-block; background-color: #f1f5f9; padding: 8px 16px; border-radius: 20px; font-weight: bold; margin-bottom: 25px; }
        .footer { background-color: #f8fafc; padding: 24px 40px; text-align: center; border-top: 1px solid #e1e8ed; color: #64748b; font-size: 13px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header"><h1>Recebemos seu Contacto</h1></div>
        <div class="content">
            <p class="welcome-text">Olá, ${name}!</p>
            <p class="message-text">Agradecemos por entrar em contacto. Recebemos sua mensagem sobre o assunto <strong>"${subject}"</strong> e entraremos em contacto brevemente.</p>
            <div class="status-badge">Status: Solicitação Recebida</div>
            <p class="message-text">Que a paz do Senhor esteja com você!</p>
        </div>
        <div class="footer"><p>Email automático ITED Church &copy; ${currentYear}</p></div>
    </div>
</body>
</html>
  `;
};

export default async function handler(req: any, res: any) {
  try {
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

    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;

    if (!emailUser || !emailPass) {
      console.error('ERRO: Variáveis EMAIL_USER ou EMAIL_PASS não configuradas.');
      return res.status(500).json({ error: 'Erro de configuração: Variáveis de ambiente ausentes.' });
    }

    const { name, email, subject, message, phone } = req.body || {};

    if (!name || !subject || !message) {
      return res.status(400).json({ error: 'Os campos nome, assunto e mensagem são obrigatórios' });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: emailUser, pass: emailPass },
    });

    const mailOptions = {
      from: \`"\${name}" <\${email || 'no-reply@ited.com'}>\`,
      replyTo: email,
      to: emailUser,
      subject: \`[Site Contacto] \${subject}\`,
      text: \`Nome: \${name}\\nEmail: \${email}\\nTelefone: \${phone}\\n\\nMensagem:\\n\${message}\`,
      html: generatePremiumEmailTemplate({ name, email, phone, subject, message }),
    };

    await transporter.sendMail(mailOptions);

    if (email) {
      const autoReplyOptions = {
        from: \`"ITED (No-Reply)" <\${emailUser}>\`,
        to: email,
        subject: \`Recebemos sua mensagem: \${subject}\`,
        html: generateAutoReplyTemplate(name, subject),
      };
      
      transporter.sendMail(autoReplyOptions).catch(err => console.error('Erro auto-resposta:', err));
    }

    return res.status(200).json({ message: 'Email enviado com sucesso!' });
  } catch (error: any) {
    console.error('Erro global no handler:', error);
    return res.status(500).json({ 
      error: 'Falha interna inesperada',
      message: error?.message || String(error)
    });
  }
}
