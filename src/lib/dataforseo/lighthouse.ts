import { getDataForSEOClient } from './client';

import type {
  LighthouseTaskPostRequest,
  LighthouseResult,
} from '@/types/dataforseo';

/**
 * Servicio para la API Lighthouse de DataForSEO
 */
export class LighthouseService {
  private client = getDataForSEOClient();

  /**
   * Crear una tarea de análisis Lighthouse
   */
  async createTask(
    url: string,
    options?: {
      forMobile?: boolean;
      languageCode?: string;
      pingbackUrl?: string;
      tag?: string;
    },
  ): Promise<string> {
    const {
      forMobile = true,
      languageCode = 'es',
      pingbackUrl,
      tag,
    } = options || {};

    const taskData: LighthouseTaskPostRequest[] = [
      {
        url,
        for_mobile: forMobile,
        language_code: languageCode,
        tag: tag || `lighthouse_${Date.now()}`,
        pingback_url: pingbackUrl,
      },
    ];

    const response = await this.client.request(
      '/v3/on_page/lighthouse/task_post',
      taskData,
    );

    if (!response.tasks?.[0]?.result?.[0]?.id) {
      throw new Error('Failed to create Lighthouse task: No task ID returned');
    }

    return response.tasks[0].result[0].id;
  }

  /**
   * Obtener resultados de Lighthouse
   */
  async getResults(taskId: string): Promise<LighthouseResult> {
    const response = await this.client.get<LighthouseResult>(
      `/v3/on_page/lighthouse/task_get/json/${taskId}`,
    );

    if (!response.tasks?.[0]?.result?.[0]) {
      throw new Error('Failed to get Lighthouse results: No result returned');
    }

    return response.tasks[0].result[0];
  }

  /**
   * Ejecutar análisis Lighthouse en modo "live" (sin esperar callback)
   */
  async runLiveAnalysis(
    url: string,
    forMobile: boolean = true,
  ): Promise<LighthouseResult> {
    const taskData: LighthouseTaskPostRequest[] = [
      {
        url,
        for_mobile: forMobile,
        language_code: 'es',
      },
    ];

    const response = await this.client.request<LighthouseResult>(
      '/v3/on_page/lighthouse/live/json',
      taskData,
    );

    if (!response.tasks?.[0]?.result?.[0]) {
      throw new Error(
        'Failed to run live Lighthouse analysis: No result returned',
      );
    }

    return response.tasks[0].result[0];
  }

  /**
   * Obtener resumen simplificado de métricas de Lighthouse
   */
  getSimplifiedMetrics(result: LighthouseResult) {
    const { categories, audits } = result;

    return {
      scores: {
        performance: Math.round((categories.performance?.score || 0) * 100),
        accessibility: Math.round((categories.accessibility?.score || 0) * 100),
        bestPractices: Math.round(
          (categories['best-practices']?.score || 0) * 100,
        ),
        seo: Math.round((categories.seo?.score || 0) * 100),
      },
      coreWebVitals: {
        lcp: audits['largest-contentful-paint']?.displayValue || 'N/A',
        fid: audits['max-potential-fid']?.displayValue || 'N/A',
        cls: audits['cumulative-layout-shift']?.displayValue || 'N/A',
        fcp: audits['first-contentful-paint']?.displayValue || 'N/A',
        tti: audits['interactive']?.displayValue || 'N/A',
        tbt: audits['total-blocking-time']?.displayValue || 'N/A',
      },
      opportunities: Object.entries(audits)
        .filter(
          ([_, audit]) =>
            audit.scoreDisplayMode === 'numeric' &&
            audit.score !== null &&
            audit.score < 0.9,
        )
        .map(([id, audit]) => ({
          id,
          title: audit.title,
          description: audit.description,
          score: audit.score,
          displayValue: audit.displayValue,
        }))
        .slice(0, 10),
    };
  }
}

/**
 * Factory function para obtener el servicio Lighthouse
 */
export function getLighthouseService(): LighthouseService {
  return new LighthouseService();
}
