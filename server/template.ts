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

  return `<!DOCTYPE html>
<html lang="pt">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Notificação Oficial de Contacto - ITED</title>
</head>
<body style="margin:0; padding:0; background-color:#060911; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color:#E2E8F0; -webkit-text-size-adjust:100%;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#060911; padding:30px 10px;">
    <tr>
      <td align="center">
        <!-- Main Container -->
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width:620px; background-color:#0B101D; border-radius:16px; border:1px solid rgba(212,175,55,0.3); overflow:hidden; box-shadow:0 20px 40px rgba(0,0,0,0.6);">
          
          <!-- Top Gold Accent Line -->
          <tr>
            <td height="4" style="background: linear-gradient(90deg, #C59B27 0%, #D4AF37 50%, #C59B27 100%); line-height:4px; font-size:4px;">&nbsp;</td>
          </tr>

          <!-- Institutional Header Lockup -->
          <tr>
            <td style="padding:36px 40px 28px 40px; background-color:#060911; border-bottom:1px solid rgba(255,255,255,0.08); text-align:center;">
              <table role="presentation" align="center" border="0" cellspacing="0" cellpadding="0" style="margin:0 auto;">
                <tr>
                  <td width="42" height="42" align="center" valign="middle" style="background-color:#0E1528; border:1px solid #D4AF37; border-radius:10px; font-family:Georgia, serif; font-size:22px; font-weight:bold; color:#D4AF37; text-align:center; line-height:42px;">
                    I
                  </td>
                  <td width="14">&nbsp;</td>
                  <td align="left">
                    <div style="font-size:20px; font-weight:900; color:#FFFFFF; line-height:1.2;">ITED</div>
                    <div style="font-size:9px; font-weight:700; color:#D4AF37; text-transform:uppercase; letter-spacing:2px; margin-top:2px;">Tenda do Encontro com Deus</div>
                  </td>
                </tr>
              </table>
              <div style="margin-top:20px; display:inline-block; padding:4px 14px; background-color:rgba(212,175,55,0.12); border:1px solid rgba(212,175,55,0.3); border-radius:20px; font-size:10px; font-weight:700; color:#D4AF37; text-transform:uppercase; letter-spacing:1.5px;">
                MOÇAMBIQUE • NOTIFICAÇÃO MINISTERIAL
              </div>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding:36px 36px 28px 36px;">
              
              <!-- Title -->
              <h1 style="margin:0 0 8px 0; font-size:22px; font-weight:800; color:#FFFFFF; text-align:left; letter-spacing:-0.3px;">
                Nova Mensagem Recebida
              </h1>
              <p style="margin:0 0 28px 0; font-size:14px; color:#94A3B8; line-height:1.5;">
                Um novo contacto foi submetido através do portal oficial da igreja. Os detalhes encontram-se abaixo:
              </p>

              <!-- Data Section Title -->
              <div style="font-size:11px; font-weight:700; color:#D4AF37; text-transform:uppercase; letter-spacing:1.5px; margin-bottom:14px; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:6px;">
                Informações do Remetente
              </div>

              <!-- Data Grid Cards -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom:28px;">
                
                <!-- Row 1: Nome -->
                <tr>
                  <td style="padding:14px 18px; background-color:#0E1528; border-left:4px solid #D4AF37; border-radius:8px;">
                    <div style="font-size:10px; font-weight:700; color:#94A3B8; text-transform:uppercase; letter-spacing:1px; margin-bottom:4px;">Nome Completo</div>
                    <div style="font-size:15px; font-weight:700; color:#FFFFFF;">${name}</div>
                  </td>
                </tr>
                <tr><td height="10"></td></tr>

                <!-- Row 2: Email -->
                <tr>
                  <td style="padding:14px 18px; background-color:#0E1528; border-left:4px solid #10B981; border-radius:8px;">
                    <div style="font-size:10px; font-weight:700; color:#94A3B8; text-transform:uppercase; letter-spacing:1px; margin-bottom:4px;">Endereço de E-mail</div>
                    <div style="font-size:15px; font-weight:700; color:#FFFFFF;">
                      <a href="mailto:${email}" style="color:#10B981; text-decoration:none;">${email}</a>
                    </div>
                  </td>
                </tr>
                <tr><td height="10"></td></tr>

                <!-- Row 3: Telefone & Assunto -->
                <tr>
                  <td>
                    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td width="48%" style="padding:14px 18px; background-color:#0E1528; border-left:4px solid #3B82F6; border-radius:8px;" valign="top">
                          <div style="font-size:10px; font-weight:700; color:#94A3B8; text-transform:uppercase; letter-spacing:1px; margin-bottom:4px;">Telefone / WhatsApp</div>
                          <div style="font-size:14px; font-weight:700; color:#FFFFFF;">${phoneDisplay}</div>
                        </td>
                        <td width="4%">&nbsp;</td>
                        <td width="48%" style="padding:14px 18px; background-color:#0E1528; border-left:4px solid #8B5CF6; border-radius:8px;" valign="top">
                          <div style="font-size:10px; font-weight:700; color:#94A3B8; text-transform:uppercase; letter-spacing:1px; margin-bottom:4px;">Assunto Referenciado</div>
                          <div style="font-size:14px; font-weight:700; color:#D4AF37;">${subject}</div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Message Section Title -->
              <div style="font-size:11px; font-weight:700; color:#D4AF37; text-transform:uppercase; letter-spacing:1.5px; margin-bottom:12px; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:6px;">
                Conteúdo da Mensagem
              </div>

              <!-- Message Content Box -->
              <div style="background-color:#070C18; border:1px solid rgba(255,255,255,0.1); border-left:4px solid #D4AF37; border-radius:10px; padding:22px; font-size:14px; line-height:1.65; color:#CBD5E1; white-space:pre-wrap; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
${message}
              </div>

              <!-- Quick Reply Action Button -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top:28px;">
                <tr>
                  <td align="center">
                    <a href="mailto:${email}?subject=Re:%20${encodeURIComponent(subject)}" style="display:inline-block; padding:14px 30px; background-color:#D4AF37; color:#060911; font-size:12px; font-weight:800; text-transform:uppercase; letter-spacing:1.2px; text-decoration:none; border-radius:8px; border:1px solid #FFF5DC;">
                      Responder Directamente ao Remetente
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 36px; background-color:#060911; border-top:1px solid rgba(255,255,255,0.08); text-align:center;">
              <p style="margin:0 0 6px 0; font-size:12px; color:#94A3B8; font-weight:600;">
                Igreja Internacional Tenda do Encontro com Deus
              </p>
              <p style="margin:0 0 10px 0; font-size:11px; color:#64748B;">
                Matacuane, Beira — Moçambique | Tel: +258 848083482 | E-mail: itedmidia@gmail.com
              </p>
              <p style="margin:0; font-size:10px; color:#475569; text-transform:uppercase; letter-spacing:1px;">
                &copy; ${currentYear} ITED Church. Todos os direitos reservados.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
};

export const generateAutoReplyTemplate = (name: string, subject: string): string => {
  const currentYear = new Date().getFullYear();

  return `<!DOCTYPE html>
<html lang="pt">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Confirmação de Mensagem - ITED</title>
</head>
<body style="margin:0; padding:0; background-color:#060911; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color:#E2E8F0; -webkit-text-size-adjust:100%;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#060911; padding:30px 10px;">
    <tr>
      <td align="center">
        <!-- Main Container -->
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width:620px; background-color:#0B101D; border-radius:16px; border:1px solid rgba(212,175,55,0.3); overflow:hidden; box-shadow:0 20px 40px rgba(0,0,0,0.6);">
          
          <!-- Top Gold Accent Line -->
          <tr>
            <td height="4" style="background: linear-gradient(90deg, #C59B27 0%, #D4AF37 50%, #C59B27 100%); line-height:4px; font-size:4px;">&nbsp;</td>
          </tr>

          <!-- Institutional Header Lockup -->
          <tr>
            <td style="padding:36px 40px 28px 40px; background-color:#060911; border-bottom:1px solid rgba(255,255,255,0.08); text-align:center;">
              <table role="presentation" align="center" border="0" cellspacing="0" cellpadding="0" style="margin:0 auto;">
                <tr>
                  <td width="42" height="42" align="center" valign="middle" style="background-color:#0E1528; border:1px solid #D4AF37; border-radius:10px; font-family:Georgia, serif; font-size:22px; font-weight:bold; color:#D4AF37; text-align:center; line-height:42px;">
                    I
                  </td>
                  <td width="14">&nbsp;</td>
                  <td align="left">
                    <div style="font-size:20px; font-weight:900; color:#FFFFFF; line-height:1.2;">ITED</div>
                    <div style="font-size:9px; font-weight:700; color:#D4AF37; text-transform:uppercase; letter-spacing:2px; margin-top:2px;">Tenda do Encontro com Deus</div>
                  </td>
                </tr>
              </table>
              <div style="margin-top:20px; display:inline-block; padding:4px 14px; background-color:rgba(16,185,129,0.12); border:1px solid rgba(16,185,129,0.3); border-radius:20px; font-size:10px; font-weight:700; color:#10B981; text-transform:uppercase; letter-spacing:1.5px;">
                CONFIRMAÇÃO DE RECEÇÃO OFICIAL
              </div>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding:36px 36px 28px 36px; text-align:left;">
              
              <!-- Greeting -->
              <h1 style="margin:0 0 14px 0; font-size:22px; font-weight:800; color:#FFFFFF; letter-spacing:-0.3px;">
                Paz seja contigo, ${name}!
              </h1>
              
              <p style="margin:0 0 20px 0; font-size:14px; color:#CBD5E1; line-height:1.6;">
                Confirmamos a receção da sua mensagem enviada através do portal oficial da <strong style="color:#FFFFFF;">Igreja Internacional Tenda do Encontro com Deus</strong>.
              </p>

              <!-- Subject Card -->
              <div style="background-color:#0E1528; border:1px solid rgba(212,175,55,0.25); border-radius:10px; padding:18px 20px; margin-bottom:24px;">
                <div style="font-size:10px; font-weight:700; color:#94A3B8; text-transform:uppercase; letter-spacing:1.2px; margin-bottom:4px;">Assunto Registado</div>
                <div style="font-size:15px; font-weight:700; color:#D4AF37;">"${subject}"</div>
                <div style="margin-top:10px; font-size:11px; font-weight:700; color:#10B981; display:inline-block; background-color:rgba(16,185,129,0.1); padding:4px 10px; border-radius:6px;">
                  Status: Encaminhado à Equipe Ministerial
                </div>
              </div>

              <p style="margin:0 0 24px 0; font-size:14px; color:#CBD5E1; line-height:1.6;">
                A nossa equipe ministerial irá ler atentamente o seu contacto e responderá com a maior brevidade possível.
              </p>

              <!-- Scripture Card -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom:28px;">
                <tr>
                  <td style="padding:20px; background-color:#070C18; border-left:4px solid #D4AF37; border-radius:10px;">
                    <p style="margin:0 0 8px 0; font-family:Georgia, serif; font-style:italic; font-size:15px; color:#F8FAFC; line-height:1.5;">
                      "Alegrai-vos na esperança, sede pacientes na tribulação, perseverai na oração."
                    </p>
                    <span style="font-size:11px; font-weight:700; color:#D4AF37; text-transform:uppercase; letter-spacing:1px;">
                      — Romanos 12:12
                    </span>
                  </td>
                </tr>
              </table>

              <p style="margin:0; font-size:13px; color:#94A3B8; line-height:1.5;">
                Fraternalmente,<br>
                <strong style="color:#FFFFFF; font-size:14px;">Equipe de Atendimento & Intercessão ITED</strong>
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 36px; background-color:#060911; border-top:1px solid rgba(255,255,255,0.08); text-align:center;">
              <p style="margin:0 0 6px 0; font-size:12px; color:#94A3B8; font-weight:600;">
                Igreja Internacional Tenda do Encontro com Deus
              </p>
              <p style="margin:0 0 10px 0; font-size:11px; color:#64748B;">
                Matacuane, Beira — Moçambique | Tel: +258 848083482 | E-mail: itedmidia@gmail.com
              </p>
              <p style="margin:0; font-size:10px; color:#475569; text-transform:uppercase; letter-spacing:1px;">
                &copy; ${currentYear} ITED Church. Todos os direitos reservados.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
};
