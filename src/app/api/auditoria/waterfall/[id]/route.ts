import { NextRequest, NextResponse } from 'next/server';

import { getOnPageService } from '@/lib/dataforseo/onpage';

/**
 * GET /api/auditoria/waterfall/[id]?url=[url]
 * Obtiene el análisis de waterfall (carga de recursos) para una auditoría
 */
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');

    if (!id || !url) {
      return NextResponse.json(
        {
          success: false,
          message: 'Task ID and URL are required',
        },
        { status: 400 },
      );
    }

    const onPageService = getOnPageService();
    const waterfall = await onPageService.getWaterfall(id, url);

    return NextResponse.json({
      success: true,
      taskId: id,
      url,
      waterfall,
    });
  } catch (error) {
    console.error('Error fetching waterfall:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Error fetching waterfall data',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}
