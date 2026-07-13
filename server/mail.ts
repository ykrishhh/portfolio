import nodemailer from 'nodemailer';

const FROM = process.env.SMTP_FROM || process.env.SMTP_USER || 'noreply@krish.engineer';
const TO = process.env.NOTIFICATION_EMAIL || process.env.SMTP_USER || '';

let transporter: nodemailer.Transporter | null = null;

function initTransporter() {
  if (transporter) return transporter;

  // SMTP needed for sending — without it, notifications are silently skipped
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    return null;
  }

  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  return transporter;
}

export async function sendContactNotification(data: {
  name: string;
  email: string;
  message: string;
}): Promise<void> {
  if (!TO) return;

  const t = initTransporter();
  if (!t) return;

  await t.sendMail({
    from: FROM,
    to: TO,
    subject: `Portfolio contact — ${data.name}`,
    text: [
      `From: ${data.name} <${data.email}>`,
      '',
      data.message,
      '',
      `---`,
      `Sent via krish.engineer contact form`,
    ].join('\n'),
    html: [
      `<p><strong>From:</strong> ${escapeHtml(data.name)} &lt;${escapeHtml(data.email)}&gt;</p>`,
      `<hr style="border:none;border-top:1px solid #333">`,
      `<p style="white-space:pre-wrap">${escapeHtml(data.message)}</p>`,
      `<hr style="border:none;border-top:1px solid #eee">`,
      `<p style="color:#999;font-size:12px">Sent via krish.engineer contact form</p>`,
    ].join('\n'),
  });
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
