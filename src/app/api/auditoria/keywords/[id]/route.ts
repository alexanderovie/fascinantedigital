import { NextRequest, NextResponse } from 'next/server';

import { getOnPageService } from '@/lib/dataforseo/onpage';

/**
 * GET /api/auditoria/keywords/[id]?url=[url]&length=[length]
 * Obtiene el análisis de densidad de palabras clave para una auditoría
 */
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');
    const length = parseInt(searchParams.get('length') || '2');

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
    const keywords = await onPageService.getKeywordDensity(id, url, length);

    // Manejar cuando DataForSEO devuelve null o array vacío
    // Esto es normal cuando hay pocas páginas analizadas
    const keywordsArray =
      Array.isArray(keywords) && keywords.length > 0 ? keywords : [];

    return NextResponse.json({
      success: true,
      taskId: id,
      url,
      keywordLength: length,
      keywords: keywordsArray,
      note:
        keywordsArray.length === 0
          ? 'No hay suficientes datos para análisis de palabras clave. Intenta aumentar el número de páginas analizadas.'
          : undefined,
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
