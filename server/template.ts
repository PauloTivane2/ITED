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
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f7f6;
            color: #333333;
        }
        .container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
            border: 1px solid #e1e8ed;
        }
        .header {
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
            padding: 35px 40px;
            text-align: center;
        }
        .header h1 {
            color: #ffffff;
            margin: 0;
            font-size: 24px;
            font-weight: 700;
            letter-spacing: 0.5px;
        }
        .header p {
            color: #94a3b8;
            margin: 8px 0 0 0;
            font-size: 15px;
        }
        .content {
            padding: 40px;
        }
        .section-title {
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 1.2px;
            color: #64748b;
            font-weight: 700;
            margin-bottom: 25px;
            border-bottom: 2px solid #f1f5f9;
            padding-bottom: 10px;
        }
        .data-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 20px;
            margin-bottom: 35px;
        }
        .data-item {
            background-color: #f8fafc;
            padding: 16px 20px;
            border-radius: 12px;
            border-left: 4px solid #3b82f6;
        }
        .data-label {
            font-size: 12px;
            text-transform: uppercase;
            color: #64748b;
            font-weight: 700;
            margin-bottom: 6px;
        }
        .data-value {
            font-size: 16px;
            color: #0f172a;
            font-weight: 600;
            word-break: break-word;
        }
        .message-box {
            background-color: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            padding: 25px;
            font-size: 16px;
            line-height: 1.6;
            color: #334155;
            white-space: pre-wrap;
            box-shadow: inset 0 2px 4px rgba(0,0,0,0.02);
        }
        .footer {
            background-color: #f8fafc;
            padding: 24px 40px;
            text-align: center;
            border-top: 1px solid #e1e8ed;
        }
        .footer p {
            margin: 0;
            color: #64748b;
            font-size: 13px;
        }
        .highlight {
            color: #3b82f6;
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <h1>Nova Solicitação Recebida</h1>
            <p>Os detalhes do contacto encontram-se abaixo</p>
        </div>

        <!-- Content -->
        <div class="content">
            <div class="section-title">Informações do Remetente</div>
            
            <div class="data-grid">
                <div class="data-item">
                    <div class="data-label">Nome Completo</div>
                    <div class="data-value">${name}</div>
                </div>
                
                <div class="data-item" style="border-left-color: #10b981;">
                    <div class="data-label">E-mail</div>
                    <div class="data-value"><a href="mailto:${email}" style="color: #10b981; text-decoration: none;">${email}</a></div>
                </div>

                <div class="data-item" style="border-left-color: #f59e0b;">
                    <div class="data-label">Contacto Telefónico</div>
                    <div class="data-value">${phoneDisplay}</div>
                </div>
                
                <div class="data-item" style="border-left-color: #8b5cf6;">
                    <div class="data-label">Assunto Referenciado</div>
                    <div class="data-value">${subject}</div>
                </div>
            </div>

            <div class="section-title">Mensagem / Observação</div>
            
            <div class="message-box">${message}</div>
        </div>

        <!-- Footer -->
        <div class="footer">
            <p>Este email foi gerado automaticamente pelo sistema da Instituição ITED.</p>
            <p style="margin-top: 8px;">&copy; ${currentYear} ITED Church. Todos os direitos reservados.</p>
        </div>
    </div>
</body>
</html>
  `;
};
