import { NextRequest, NextResponse } from 'next/server';

import { getOnPageService } from '@/lib/dataforseo/onpage';
import { getEmailService } from '@/lib/email/resend';
import { webhookPayloadSchema } from '@/schemas/auditoria';

/**
 * POST /api/auditoria/webhook
 * Recibe callbacks de DataForSEO cuando las tareas se completan
 */
export async function POST(request: NextRequest) {
  try {
    // 1. Parsear el payload
    const body = await request.json();
    console.log('Webhook received:', body);

    // 2. Validar el payload
    const validatedPayload = webhookPayloadSchema.parse(body);

    // 3. Verificar que la tarea se completó exitosamente
    if (validatedPayload.status_code !== 20000) {
      console.error('Task failed:', validatedPayload.status_message);
      return NextResponse.json(
        {
          success: false,
          message: 'Task failed',
        },
        { status: 200 }, // Retornamos 200 para que DataForSEO no reintente
      );
    }

    // 4. Extraer información del tag (contiene el email del usuario)
    const tag = validatedPayload.tag || '';
    const emailMatch = tag.match(
      /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/,
    );
    const userEmail = emailMatch ? emailMatch[1] : null;

    if (!userEmail) {
      console.error('No email found in tag:', tag);
      return NextResponse.json(
        {
          success: false,
          message: 'No email found',
        },
        { status: 200 },
      );
    }

    // 5. Obtener el resumen de la auditoría
    const onPageService = getOnPageService();
    const summary = await onPageService.getSummary(validatedPayload.id);

    // 6. Calcular métricas simplificadas
    const totalIssues = summary.page_metrics?.checks ? 
      Object.values(summary.page_metrics.checks).reduce((sum, count) => sum + count, 0) : 0;
    const criticalIssues = summary.page_metrics?.checks?.['broken_links'] || 0;
    const warnings = summary.page_metrics?.checks?.['duplicate_title'] || 0;
    const score = summary.page_metrics?.onpage_score || 0;

    // 7. Enviar email con resultados
    const emailService = getEmailService();
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const resultsUrl = `${appUrl}/auditoria/${validatedPayload.id}`;

    await emailService.sendAuditCompletedEmail(userEmail, {
      name: userEmail.split('@')[0], // Usamos la parte antes del @ como nombre
      website: summary.domain_info?.name || 'tu sitio',
      resultsUrl,
      summary: {
        score: Math.round(score),
        criticalIssues,
        warnings,
        opportunities: Math.max(0, 10 - criticalIssues - warnings),
      },
    });

    // 8. Aquí podrías guardar los resultados en una base de datos
    // Por ahora solo logueamos
    console.log('Audit completed for:', userEmail, 'Score:', score);

    return NextResponse.json(
      {
        success: true,
        message: 'Webhook processed successfully',
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error processing webhook:', error);

    // Retornamos 200 para que DataForSEO no reintente
    return NextResponse.json(
      {
        success: false,
        message: 'Error processing webhook',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 200 },
    );
  }
}

/**
 * GET /api/auditoria/webhook
 * Endpoint de verificación (opcional)
 */
export async function GET() {
  return NextResponse.json({
    message: 'Webhook endpoint is active',
    timestamp: new Date().toISOString(),
  });
}
