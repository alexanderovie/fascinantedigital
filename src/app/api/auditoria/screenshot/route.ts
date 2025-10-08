import { NextRequest, NextResponse } from 'next/server';

import { getOnPageService } from '@/lib/dataforseo/onpage';

/**
 * GET /api/auditoria/screenshot?url=[url]
 * Obtiene un screenshot de la página
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');

    if (!url) {
      return NextResponse.json(
        {
          success: false,
          message: 'URL is required',
        },
        { status: 400 },
      );
    }

    const onPageService = getOnPageService();
    const screenshot = await onPageService.getPageScreenshot(url);

    return NextResponse.json({
      success: true,
      url,
      screenshot,
    });
  } catch (error) {
    console.error('Error fetching screenshot:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Error fetching screenshot',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}
