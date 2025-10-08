import { NextRequest, NextResponse } from 'next/server';

import { getOnPageService } from '@/lib/dataforseo/onpage';

/**
 * GET /api/auditoria/resources/[id]?limit=[limit]
 * Obtiene el análisis de recursos (CSS, JS, imágenes) para una auditoría
 */
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;
    const { searchParams } = new URL(request.url);
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
    const resources = await onPageService.getResources(id, limit);

    // Calcular estadísticas de recursos
    const stats = {
      total: resources.length,
      html: resources.filter((r: any) => r.resource_type === 'html').length,
      css: resources.filter((r: any) => r.resource_type === 'css').length,
      js: resources.filter((r: any) => r.resource_type === 'javascript').length,
      images: resources.filter((r: any) => r.resource_type === 'image').length,
      other: resources.filter(
        (r: any) =>
          !['html', 'css', 'javascript', 'image'].includes(r.resource_type),
      ).length,
      totalSize: resources.reduce(
        (sum: number, r: any) => sum + (r.size || 0),
        0,
      ),
      compressedSize: resources.reduce(
        (sum: number, r: any) => sum + (r.compressed_size || 0),
        0,
      ),
    };

    return NextResponse.json({
      success: true,
      taskId: id,
      limit,
      stats,
      resources,
    });
  } catch (error) {
    console.error('Error fetching resources:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Error fetching resources data',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}
