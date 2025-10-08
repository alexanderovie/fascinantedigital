import type { DataForSEOResponse } from '@/types/dataforseo';

/**
 * Cliente Singleton para la API de DataForSEO
 * Implementa autenticación, retry logic y manejo de errores
 */
export class DataForSEOClient {
  private static instance: DataForSEOClient;
  private baseURL: string;
  private authHeader: string;

  private constructor() {
    this.baseURL =
      process.env.DATAFORSEO_API_URL || 'https://api.dataforseo.com';

    // Usar el token pre-codificado si está disponible
    if (process.env.DATAFORSEO_AUTH_BASE64) {
      this.authHeader = `Basic ${process.env.DATAFORSEO_AUTH_BASE64}`;
    } else {
      // Fallback: codificar las credenciales
      const username = process.env.DATAFORSEO_USERNAME;
      const password = process.env.DATAFORSEO_PASSWORD;

      if (!username || !password) {
        throw new Error(
          'DataForSEO credentials not found. Please set DATAFORSEO_USERNAME and DATAFORSEO_PASSWORD environment variables.',
        );
      }

      const token = Buffer.from(`${username}:${password}`).toString('base64');
      this.authHeader = `Basic ${token}`;
    }
  }

  /**
   * Obtener la instancia única del cliente
   */
  public static getInstance(): DataForSEOClient {
    if (!DataForSEOClient.instance) {
      DataForSEOClient.instance = new DataForSEOClient();
    }
    return DataForSEOClient.instance;
  }

  /**
   * Realizar una petición a la API de DataForSEO con retry logic
   */
  async request<T = any>(
    endpoint: string,
    data?: any,
    options?: {
      maxRetries?: number;
      retryDelay?: number;
    },
  ): Promise<DataForSEOResponse<T>> {
    const { maxRetries = 3, retryDelay = 1000 } = options || {};
    const url = `${this.baseURL}${endpoint}`;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            Authorization: this.authHeader,
            'Content-Type': 'application/json',
          },
          body: data ? JSON.stringify(data) : undefined,
        });

        if (!response.ok) {
          throw new Error(
            `DataForSEO API error: ${response.status} ${response.statusText}`,
          );
        }

        const result: DataForSEOResponse<T> = await response.json();

        // Verificar si la respuesta tiene errores
        if (result.status_code !== 20000) {
          throw new Error(
            `DataForSEO API error: ${result.status_message} (code: ${result.status_code})`,
          );
        }

        return result;
      } catch (error) {
        const isLastAttempt = attempt === maxRetries;

        if (isLastAttempt) {
          console.error('DataForSEO API request failed after retries:', error);
          throw error;
        }

        // Exponential backoff
        const delay = retryDelay * Math.pow(2, attempt - 1);
        console.warn(
          `DataForSEO API request failed (attempt ${attempt}/${maxRetries}). Retrying in ${delay}ms...`,
        );
        await this.sleep(delay);
      }
    }

    throw new Error('DataForSEO API request failed');
  }

  /**
   * Realizar una petición GET a la API de DataForSEO
   */
  async get<T = any>(endpoint: string): Promise<DataForSEOResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: this.authHeader,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(
          `DataForSEO API error: ${response.status} ${response.statusText}`,
        );
      }

      const result: DataForSEOResponse<T> = await response.json();

      if (result.status_code !== 20000) {
        throw new Error(
          `DataForSEO API error: ${result.status_message} (code: ${result.status_code})`,
        );
      }

      return result;
    } catch (error) {
      console.error('DataForSEO API GET request failed:', error);
      throw error;
    }
  }

  /**
   * Verificar el estado de las tareas listas
   */
  async getTasksReady(): Promise<DataForSEOResponse> {
    return this.get('/v3/on_page/tasks_ready');
  }

  /**
   * Verificar el costo estimado de una tarea
   */
  async checkCost(endpoint: string, data: any): Promise<number> {
    const response = await this.request(endpoint, data);
    return response.cost || 0;
  }

  /**
   * Helper para pausar la ejecución
   */
  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

/**
 * Hook para obtener el cliente de DataForSEO
 * @returns Instancia única del cliente
 */
export function getDataForSEOClient(): DataForSEOClient {
  return DataForSEOClient.getInstance();
}
