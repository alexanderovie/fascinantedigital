import { NextRequest, NextResponse } from 'next/server';

import { getOnPageService } from '@/lib/dataforseo/onpage';

/**
 * GET /api/auditoria/keywords/[id]?length=[length]
 * Obtiene el análisis de densidad de palabras clave para una auditoría
 */
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;
    const { searchParams } = new URL(request.url);
    const length = parseInt(searchParams.get('length') || '2');

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
    const keywords = await onPageService.getKeywordDensity(id, length);

    return NextResponse.json({
      success: true,
      taskId: id,
      keywordLength: length,
      keywords,
    });
  } catch (error) {
    console.error('Error fetching keywords:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Error fetching keyword data',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}
