import { getDataForSEOClient } from './client';

import type {
  OnPagePageResult,
  OnPagePagesRequest,
  OnPageSummaryResult,
  OnPageTaskPostRequest,
  OnPageTaskPostResult,
} from '@/types/dataforseo';

/**
 * Servicio para la API OnPage de DataForSEO
 */
export class OnPageService {
  private client = getDataForSEOClient();

  /**
   * Crear una nueva tarea de auditoría OnPage
   */
  async createTask(
    url: string,
    options?: {
      maxPages?: number;
      enableJavaScript?: boolean;
      pingbackUrl?: string;
      tag?: string;
    },
  ): Promise<string> {
    const {
      maxPages = 100,
      enableJavaScript = true,
      pingbackUrl,
      tag,
    } = options || {};

    const taskData: OnPageTaskPostRequest[] = [
      {
        target: url,
        max_crawl_pages: maxPages,
        load_resources: true,
        enable_javascript: enableJavaScript,
        enable_browser_rendering: enableJavaScript,
        tag: tag || `audit_${Date.now()}`,
        pingback_url: pingbackUrl,
      },
    ];

    const response = await this.client.request<OnPageTaskPostResult>(
      '/v3/on_page/task_post',
      taskData,
    );

    // El task ID está en tasks[0].id, NO en tasks[0].result[0].id
    if (!response.tasks?.[0]?.id) {
      console.error('Task creation failed. Response:', response);
      throw new Error(
        `Failed to create OnPage task: ${response.tasks?.[0]?.status_message || 'No task ID returned'}`,
      );
    }

    const taskId = response.tasks[0].id;
    console.log('✅ OnPage task created successfully. Task ID:', taskId);

    return taskId;
  }

  /**
   * Obtener el resumen de una auditoría
   */
  async getSummary(taskId: string): Promise<OnPageSummaryResult> {
    const response = await this.client.get<OnPageSummaryResult>(
      `/v3/on_page/summary/${taskId}`,
    );

    if (!response.tasks?.[0]?.result?.[0]) {
      throw new Error('Failed to get OnPage summary: No result returned');
    }

    return response.tasks[0].result[0];
  }

  /**
   * Obtener las páginas analizadas
   */
  async getPages(
    taskId: string,
    options?: {
      limit?: number;
      offset?: number;
      filters?: any[];
    },
  ): Promise<OnPagePageResult[]> {
    const { limit = 100, offset = 0, filters = [] } = options || {};

    const requestData: OnPagePagesRequest[] = [
      {
        id: taskId,
        limit,
        offset,
        filters,
      },
    ];

    const response = await this.client.request<OnPagePageResult>(
      '/v3/on_page/pages',
      requestData,
    );

    return response.tasks?.[0]?.result || [];
  }

  /**
   * Obtener errores encontrados en la auditoría
   */
  async getErrors(taskId: string): Promise<any[]> {
    const requestData = [
      {
        id: taskId,
        limit: 100,
      },
    ];

    const response = await this.client.request(
      '/v3/on_page/errors',
      requestData,
    );

    return response.tasks?.[0]?.result || [];
  }

  /**
   * Obtener contenido duplicado
   */
  async getDuplicateContent(taskId: string, url: string): Promise<any[]> {
    const requestData = [
      {
        id: taskId,
        url: url,
      },
    ];

    const response = await this.client.request(
      '/v3/on_page/duplicate_content',
      requestData,
    );

    return response.tasks?.[0]?.result || [];
  }

  /**
   * Obtener tags duplicados (títulos, descripciones, etc.)
   */
  async getDuplicateTags(
    taskId: string,
    type: 'duplicate_title' | 'duplicate_description' | 'duplicate_h1',
  ): Promise<any[]> {
    const requestData = [
      {
        id: taskId,
        type: type,
        limit: 100,
      },
    ];

    const response = await this.client.request(
      '/v3/on_page/duplicate_tags',
      requestData,
    );

    return response.tasks?.[0]?.result || [];
  }

  /**
   * Verificar si una tarea está completa
   */
  async isTaskComplete(taskId: string): Promise<boolean> {
    try {
      const summary = await this.getSummary(taskId);
      return summary.crawl_progress === 'finished';
    } catch (error) {
      console.error('Error checking task status:', error);
      return false;
    }
  }

  /**
   * Esperar a que una tarea se complete
   */
  async waitForCompletion(
    taskId: string,
    options?: {
      maxWaitTime?: number; // en milisegundos
      checkInterval?: number; // en milisegundos
    },
  ): Promise<OnPageSummaryResult> {
    const { maxWaitTime = 300000, checkInterval = 5000 } = options || {}; // 5 min max
    const startTime = Date.now();

    while (Date.now() - startTime < maxWaitTime) {
      const isComplete = await this.isTaskComplete(taskId);

      if (isComplete) {
        return await this.getSummary(taskId);
      }

      await new Promise((resolve) => setTimeout(resolve, checkInterval));
    }

    throw new Error('Task did not complete within the maximum wait time');
  }

  /**
   * Obtener análisis de waterfall (carga de recursos)
   */
  async getWaterfall(taskId: string, url: string): Promise<any[]> {
    const requestData = [
      {
        id: taskId,
        url: url,
      },
    ];

    const response = await this.client.request(
      '/v3/on_page/waterfall',
      requestData,
    );
    return response.tasks?.[0]?.result || [];
  }

  /**
   * Obtener screenshot de la página
   */
  async getPageScreenshot(url: string): Promise<any> {
    const requestData = [
      {
        url: url,
      },
    ];

    const response = await this.client.request(
      '/v3/on_page/page_screenshot',
      requestData,
    );
    return response.tasks?.[0]?.result?.[0] || null;
  }

  /**
   * Obtener análisis de densidad de palabras clave
   */
  async getKeywordDensity(
    taskId: string,
    url: string,
    keywordLength: number = 2,
  ): Promise<any[]> {
    const requestData = [
      {
        id: taskId,
        keyword_length: keywordLength,
        url: url,
      },
    ];

    const response = await this.client.request(
      '/v3/on_page/keyword_density',
      requestData,
    );
    return response.tasks?.[0]?.result || [];
  }

  /**
   * Obtener análisis de microdata/schema
   */
  async getMicrodata(taskId: string, url: string): Promise<any[]> {
    const requestData = [
      {
        id: taskId,
        url: url,
      },
    ];

    const response = await this.client.request(
      '/v3/on_page/microdata',
      requestData,
    );
    return response.tasks?.[0]?.result || [];
  }

  /**
   * Obtener análisis de contenido (parsing)
   */
  async getContentParsing(taskId: string, url: string): Promise<any> {
    const requestData = [
      {
        url: url,
        id: taskId,
      },
    ];

    const response = await this.client.request(
      '/v3/on_page/content_parsing',
      requestData,
    );
    return response.tasks?.[0]?.result?.[0] || null;
  }

  /**
   * Obtener análisis de enlaces
   */
  async getLinks(
    taskId: string,
    pageFrom?: string,
    limit: number = 100,
  ): Promise<any[]> {
    const requestData = [
      {
        id: taskId,
        page_from: pageFrom,
        limit: limit,
      },
    ];

    const response = await this.client.request(
      '/v3/on_page/links',
      requestData,
    );
    return response.tasks?.[0]?.result || [];
  }

  /**
   * Obtener análisis de recursos
   */
  async getResources(taskId: string, limit: number = 100): Promise<any[]> {
    const requestData = [
      {
        id: taskId,
        limit: limit,
      },
    ];

    const response = await this.client.request(
      '/v3/on_page/resources',
      requestData,
    );
    return response.tasks?.[0]?.result || [];
  }

  /**
   * Obtener páginas no indexables
   */
  async getNonIndexable(taskId: string, limit: number = 100): Promise<any[]> {
    const requestData = [
      {
        id: taskId,
        limit: limit,
      },
    ];

    const response = await this.client.request(
      '/v3/on_page/non_indexable',
      requestData,
    );
    return response.tasks?.[0]?.result || [];
  }

  /**
   * Obtener cadenas de redirección
   */
  async getRedirectChains(taskId: string, url: string): Promise<any[]> {
    const requestData = [
      {
        id: taskId,
        url: url,
      },
    ];

    const response = await this.client.request(
      '/v3/on_page/redirect_chains',
      requestData,
    );
    return response.tasks?.[0]?.result || [];
  }
}

/**
 * Factory function para obtener el servicio OnPage
 */
export function getOnPageService(): OnPageService {
  return new OnPageService();
}
