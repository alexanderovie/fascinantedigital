import { NextRequest, NextResponse } from 'next/server';
import { getOnPageService } from '@/lib/dataforseo/onpage';

/**
 * GET /api/auditoria/status/[id]
 * Consulta el estado de una auditoría en progreso
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: 'Task ID is required',
        },
        { status: 400 }
      );
    }

    // Obtener el resumen de la tarea
    const onPageService = getOnPageService();
    const summary = await onPageService.getSummary(id);

    // Determinar el estado
    const isComplete = summary.crawl_progress === 'finished';
    const progress = summary.crawl_status?.pages_crawled || 0;
    const total = summary.crawl_status?.max_crawl_pages || 100;
    const progressPercentage = Math.round((progress / total) * 100);

    return NextResponse.json({
      success: true,
      taskId: id,
      status: isComplete ? 'completed' : 'processing',
      progress: {
        current: progress,
        total,
        percentage: progressPercentage,
      },
      summary: isComplete
        ? {
            score: summary.on_page_score || 0,
            totalPages: summary.items_count || 0,
            checks: summary.checks || {},
            domain: summary.domain_info?.name || '',
          }
        : null,
    });
  } catch (error) {
    console.error('Error getting audit status:', error);

    // Si la tarea no existe o hay error
    if (error instanceof Error && error.message.includes('No result')) {
      return NextResponse.json(
        {
          success: false,
          message: 'Audit not found or still initializing',
          status: 'pending',
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: 'Error getting audit status',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
