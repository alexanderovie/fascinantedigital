import { NextRequest, NextResponse } from 'next/server';

import { getOnPageService } from '@/lib/dataforseo/onpage';

/**
 * GET /api/auditoria/content/[id]?url=[url]
 * Obtiene el análisis de contenido (parsing) para una auditoría
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
    const content = await onPageService.getContentParsing(id, url);

    return NextResponse.json({
      success: true,
      taskId: id,
      url,
      content,
    });
  } catch (error) {
    console.error('Error fetching content:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Error fetching content data',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}
