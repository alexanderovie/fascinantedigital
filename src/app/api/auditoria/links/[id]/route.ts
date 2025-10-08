import { NextRequest, NextResponse } from 'next/server';

import { getOnPageService } from '@/lib/dataforseo/onpage';

/**
 * GET /api/auditoria/links/[id]?pageFrom=[page]&limit=[limit]
 * Obtiene el análisis de enlaces para una auditoría
 */
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;
    const { searchParams } = new URL(request.url);
    const pageFrom = searchParams.get('pageFrom');
    const limit = parseInt(searchParams.get('limit') || '100');

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: 'Task ID is required',
        },
        { status: 400 },
      );
    }

    const onPageService = getOnPageService();
    const links = await onPageService.getLinks(
      id,
      pageFrom || undefined,
      limit,
    );

    // Calcular estadísticas de enlaces
    const stats = {
      total: links.length,
      internal: links.filter((l: any) => l.internal).length,
      external: links.filter((l: any) => !l.internal).length,
      dofollow: links.filter((l: any) => l.dofollow).length,
      nofollow: links.filter((l: any) => !l.dofollow).length,
    };

    return NextResponse.json({
      success: true,
      taskId: id,
      pageFrom,
      limit,
      stats,
      links,
    });
  } catch (error) {
    console.error('Error fetching links:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Error fetching links data',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}
