import { NextRequest, NextResponse } from 'next/server';

import { getOnPageService } from '@/lib/dataforseo/onpage';

/**
 * GET /api/auditoria/pages/[id]
 * Obtiene las páginas específicas que tienen un problema determinado
 */
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;
    const { searchParams } = new URL(request.url);
    const checkType = searchParams.get('checkType');

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: 'Task ID is required',
        },
        { status: 400 },
      );
    }

    if (!checkType) {
      return NextResponse.json(
        {
          success: false,
          message: 'Check type is required',
        },
        { status: 400 },
      );
    }

    // Obtener las páginas con el problema específico
    const onPageService = getOnPageService();
    
    // Por ahora, simulamos las páginas basándonos en el dominio
    // En una implementación real, haríamos una llamada específica a DataForSEO
    // para obtener las páginas que tienen el problema específico
    
    const summary = await onPageService.getSummary(id);
    const domain = summary.domain_info?.name || '';
    
    // Simulamos las páginas afectadas basándonos en el tipo de problema
    const mockPages = generateMockPages(domain, checkType);

    return NextResponse.json({
      success: true,
      checkType,
      pages: mockPages,
      total: mockPages.length,
    });
  } catch (error) {
    console.error('Error getting pages for issue:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Error getting pages for issue',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}

/**
 * Genera páginas mock basadas en el dominio y tipo de problema
 * En producción, esto sería reemplazado por llamadas reales a DataForSEO
 */
function generateMockPages(domain: string, checkType: string): string[] {
  const baseUrl = `https://${domain}`;
  
  // Páginas comunes que podrían tener problemas
  const commonPages = [
    '',
    '/about',
    '/contact',
    '/pricing',
    '/faq',
    '/terms-of-service',
    '/privacy',
  ];

  // Simulamos que algunas páginas tienen problemas
  // En producción, esto vendría de la API real de DataForSEO
  switch (checkType) {
    case 'has_render_blocking_resources':
      return commonPages.slice(0, 6).map(page => `${baseUrl}${page}`);
    case 'no_h1_tag':
      return commonPages.slice(0, 4).map(page => `${baseUrl}${page}`);
    case 'no_image_title':
      return commonPages.slice(0, 6).map(page => `${baseUrl}${page}`);
    case 'low_content_rate':
      return commonPages.slice(0, 6).map(page => `${baseUrl}${page}`);
    case 'low_readability_rate':
      return commonPages.slice(0, 4).map(page => `${baseUrl}${page}`);
    case 'title_too_short':
      return commonPages.slice(0, 2).map(page => `${baseUrl}${page}`);
    case 'irrelevant_meta_keywords':
      return commonPages.slice(0, 2).map(page => `${baseUrl}${page}`);
    case 'low_character_count':
      return [`${baseUrl}/contact`];
    case 'is_https':
      return commonPages.slice(0, 7).map(page => `${baseUrl}${page}`);
    case 'has_html_doctype':
      return commonPages.slice(0, 7).map(page => `${baseUrl}${page}`);
    case 'canonical':
      return commonPages.slice(0, 6).map(page => `${baseUrl}${page}`);
    default:
      return commonPages.slice(0, 3).map(page => `${baseUrl}${page}`);
  }
}
