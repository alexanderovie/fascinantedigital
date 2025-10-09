import { NextRequest, NextResponse } from 'next/server';

import { getLighthouseService } from '@/lib/dataforseo/lighthouse';

/**
 * GET /api/auditoria/lighthouse/[id]
 * Obtiene los resultados de Lighthouse para un task ID específico
 */
export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: 'Task ID is required',
        },
        { status: 400 },
      );
    }

    const lighthouseService = getLighthouseService();
    const results = await lighthouseService.getResults(id);

    // Obtener métricas simplificadas
    const metrics = lighthouseService.getSimplifiedMetrics(results);

    return NextResponse.json({
      success: true,
      taskId: id,
      results,
      metrics,
    });
  } catch (error) {
    console.error('Error fetching Lighthouse results:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Error fetching Lighthouse results',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}
