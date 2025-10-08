/**
 * Servicio de email usando Resend
 */

interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

interface AuditEmailData {
  name: string;
  website: string;
  taskId: string;
  statusUrl: string;
}

export class EmailService {
  private apiKey: string;
  private fromEmail: string;

  constructor() {
    this.apiKey = process.env.RESEND_API_KEY || '';
    this.fromEmail =
      process.env.FROM_EMAIL || 'noreply@fascinantedigital.com';

    if (!this.apiKey) {
      console.warn(
        'RESEND_API_KEY not found. Email notifications will not work.'
      );
    }
  }

  /**
   * Enviar email usando Resend API
   */
  async sendEmail(options: SendEmailOptions): Promise<boolean> {
    if (!this.apiKey) {
      console.error('Cannot send email: RESEND_API_KEY not configured');
      return false;
    }

    const { to, subject, html, from = this.fromEmail } = options;

    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          from,
          to,
          subject,
          html,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Resend API error: ${response.status} - ${error}`);
      }

      const result = await response.json();
      console.log('Email sent successfully:', result);
      return true;
    } catch (error) {
      console.error('Failed to send email:', error);
      return false;
    }
  }

  /**
   * Enviar email de confirmación de auditoría iniciada
   */
  async sendAuditStartedEmail(data: AuditEmailData): Promise<boolean> {
    const { name, website, taskId, statusUrl } = data;

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px; }
            .button { display: inline-block; padding: 12px 24px; background: #667eea; color: white; text-decoration: none; border-radius: 6px; margin: 20px 0; }
            .info-box { background: white; padding: 20px; border-left: 4px solid #667eea; margin: 20px 0; border-radius: 4px; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">🚀 Tu Auditoría SEO está en Proceso</h1>
            </div>
            <div class="content">
              <p>Hola <strong>${name}</strong>,</p>

              <p>¡Excelente noticia! Hemos comenzado el análisis completo de tu sitio web.</p>

              <div class="info-box">
                <h3 style="margin-top: 0;">📊 Detalles de tu Auditoría</h3>
                <p><strong>Sitio web:</strong> ${website}</p>
                <p><strong>ID de seguimiento:</strong> ${taskId}</p>
                <p><strong>Tiempo estimado:</strong> 10-15 minutos</p>
              </div>

              <h3>🔍 ¿Qué estamos analizando?</h3>
              <ul>
                <li>✅ Errores técnicos de SEO</li>
                <li>✅ Performance y velocidad de carga</li>
                <li>✅ Accesibilidad y mejores prácticas</li>
                <li>✅ SEO móvil y responsive</li>
                <li>✅ Contenido duplicado</li>
                <li>✅ Estructura de enlaces internos</li>
              </ul>

              <p style="text-align: center;">
                <a href="${statusUrl}" class="button">
                  Ver Estado de la Auditoría
                </a>
              </p>

              <p><strong>Te notificaremos por email</strong> cuando tu reporte esté listo con recomendaciones accionables para mejorar tu presencia digital.</p>

              <div style="background: #e3f2fd; padding: 15px; border-radius: 4px; margin-top: 20px;">
                <p style="margin: 0;"><strong>💡 Consejo:</strong> Mientras esperas, asegúrate de tener acceso a Google Search Console y Google Analytics para poder implementar nuestras recomendaciones.</p>
              </div>
            </div>

            <div class="footer">
              <p>Fascinante Digital - Datos reales de Google. Estrategias que dominan.</p>
              <p>2054 Vista Pkwy #400, West Palm Beach, FL 33411</p>
              <p><a href="https://fascinantedigital.com">fascinantedigital.com</a></p>
            </div>
          </div>
        </body>
      </html>
    `;

    return this.sendEmail({
      to: data.name,
      subject: '🚀 Tu Auditoría SEO está en Proceso - Fascinante Digital',
      html,
    });
  }

  /**
   * Enviar email con resultados de auditoría completa
   */
  async sendAuditCompletedEmail(
    to: string,
    data: {
      name: string;
      website: string;
      resultsUrl: string;
      summary: {
        score: number;
        criticalIssues: number;
        warnings: number;
        opportunities: number;
      };
    }
  ): Promise<boolean> {
    const { name, website, resultsUrl, summary } = data;

    const scoreColor =
      summary.score >= 80 ? '#10b981' : summary.score >= 50 ? '#f59e0b' : '#ef4444';

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px; }
            .button { display: inline-block; padding: 14px 28px; background: #667eea; color: white; text-decoration: none; border-radius: 6px; margin: 20px 0; font-weight: bold; }
            .score-circle { width: 120px; height: 120px; border-radius: 50%; background: ${scoreColor}; color: white; display: flex; align-items: center; justify-content: center; margin: 20px auto; font-size: 48px; font-weight: bold; }
            .stats { display: flex; justify-content: space-around; margin: 30px 0; }
            .stat { text-align: center; }
            .stat-number { font-size: 32px; font-weight: bold; color: #667eea; }
            .stat-label { font-size: 14px; color: #666; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">✅ Tu Auditoría SEO está Lista</h1>
            </div>
            <div class="content">
              <p>Hola <strong>${name}</strong>,</p>

              <p>¡Hemos terminado el análisis completo de <strong>${website}</strong>!</p>

              <div class="score-circle">
                ${summary.score}
              </div>
              <p style="text-align: center; font-size: 18px; color: #666;">
                Puntuación General SEO
              </p>

              <div class="stats">
                <div class="stat">
                  <div class="stat-number" style="color: #ef4444;">${summary.criticalIssues}</div>
                  <div class="stat-label">Errores Críticos</div>
                </div>
                <div class="stat">
                  <div class="stat-number" style="color: #f59e0b;">${summary.warnings}</div>
                  <div class="stat-label">Advertencias</div>
                </div>
                <div class="stat">
                  <div class="stat-number" style="color: #10b981;">${summary.opportunities}</div>
                  <div class="stat-label">Oportunidades</div>
                </div>
              </div>

              <p style="text-align: center;">
                <a href="${resultsUrl}" class="button">
                  🎯 Ver Reporte Completo
                </a>
              </p>

              <h3>📋 Tu reporte incluye:</h3>
              <ul>
                <li>✅ Lista detallada de problemas técnicos</li>
                <li>✅ Análisis de performance y Core Web Vitals</li>
                <li>✅ Recomendaciones priorizadas por impacto</li>
                <li>✅ Comparativa con competidores</li>
                <li>✅ Plan de acción paso a paso</li>
              </ul>

              <div style="background: #fef3c7; padding: 20px; border-left: 4px solid #f59e0b; border-radius: 4px; margin-top: 30px;">
                <h4 style="margin-top: 0;">🎁 ¿Necesitas ayuda para implementar?</h4>
                <p style="margin-bottom: 0;">Nuestro equipo puede implementar todas estas mejoras por ti. <a href="https://fascinantedigital.com/contact">Agenda una consulta gratuita</a>.</p>
              </div>
            </div>

            <div class="footer">
              <p>Fascinante Digital - Datos reales de Google. Estrategias que dominan.</p>
              <p>2054 Vista Pkwy #400, West Palm Beach, FL 33411</p>
              <p><a href="https://fascinantedigital.com">fascinantedigital.com</a></p>
            </div>
          </div>
        </body>
      </html>
    `;

    return this.sendEmail({
      to,
      subject: `✅ Tu Auditoría SEO está Lista (Score: ${summary.score}/100) - Fascinante Digital`,
      html,
    });
  }
}

/**
 * Factory function para obtener el servicio de email
 */
export function getEmailService(): EmailService {
  return new EmailService();
}
