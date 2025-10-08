import { NextRequest, NextResponse } from 'next/server';

import { getLighthouseService } from '@/lib/dataforseo/lighthouse';
import { getOnPageService } from '@/lib/dataforseo/onpage';
import { getEmailService } from '@/lib/email/resend';
import { auditoriaFormSchema } from '@/schemas/auditoria';

/**
 * POST /api/auditoria/submit
 * Recibe el formulario de auditoría y crea las tareas en DataForSEO
 */
export async function POST(request: NextRequest) {
  try {
    // 1. Parsear y validar el body
    const body = await request.json();
    const validatedData = auditoriaFormSchema.parse(body);

    // 2. Generar URL de pingback
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const pingbackUrl = `${appUrl}/api/auditoria/webhook`;

    // 3. Crear tarea OnPage en DataForSEO
    const onPageService = getOnPageService();
    const emailTag = validatedData.email || 'no-email';
    const taskId = await onPageService.createTask(validatedData.website, {
      maxPages: 1, // Solo página raíz por ahora
      enableJavaScript: true,
      pingbackUrl,
      tag: `audit_${Date.now()}_${emailTag}`,
    });

    // 4. Crear tarea Lighthouse (opcional, para métricas de performance)
    let lighthouseTaskId: string | null = null;
    try {
      const lighthouseService = getLighthouseService();
      lighthouseTaskId = await lighthouseService.createTask(
        validatedData.website,
        {
          forMobile: true,
          languageCode: 'es',
          pingbackUrl,
          tag: `lighthouse_${Date.now()}_${emailTag}`,
        },
      );
    } catch (error) {
      console.error('Error creating Lighthouse task:', error);
      // No bloqueamos si falla Lighthouse
    }

    // 5. Construir URL de estado
    const statusUrl = `${appUrl}/auditoria/${taskId}`;

    // 6. Enviar email de confirmación (solo si proporcionó email)
    if (validatedData.email) {
      const emailService = getEmailService();

      await emailService.sendAuditStartedEmail({
        name: validatedData.email.split('@')[0], // Usamos la parte antes del @ como nombre
        website: validatedData.website,
        taskId,
        statusUrl,
      });
    }

    // 7. Retornar respuesta exitosa
    return NextResponse.json(
      {
        success: true,
        taskId,
        lighthouseTaskId,
        message: 'Auditoría iniciada exitosamente',
        estimatedTime: 15, // minutos
        statusUrl,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error in /api/auditoria/submit:', error);

    // Manejo de errores de validación
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        {
          success: false,
          message: 'Datos inválidos. Por favor verifica el formulario.',
          errors: error,
        },
        { status: 400 },
      );
    }

    // Errores de DataForSEO
    if (error instanceof Error && error.message.includes('DataForSEO')) {
      return NextResponse.json(
        {
          success: false,
          message:
            'Error al conectar con el servicio de auditoría. Por favor intenta de nuevo.',
        },
        { status: 503 },
      );
    }

    // Error genérico
    return NextResponse.json(
      {
        success: false,
        message: 'Error al procesar la solicitud. Por favor intenta de nuevo.',
      },
      { status: 500 },
    );
  }
}
