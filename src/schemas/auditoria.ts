import { z } from 'zod';

/**
 * Schema de validación para el formulario de auditoría (simplificado)
 */
export const auditoriaFormSchema = z.object({
  // URL del sitio web (requerido)
  website: z
    .string()
    .url('Por favor ingresa una URL válida')
    .refine(
      (url) => url.startsWith('http://') || url.startsWith('https://'),
      'La URL debe comenzar con http:// o https://',
    )
    .refine((url) => {
      try {
        const parsedUrl = new URL(url);
        return parsedUrl.hostname.includes('.');
      } catch {
        return false;
      }
    }, 'La URL no parece ser válida')
    .transform((url) => url.toLowerCase().trim()),

  // Email (opcional - para recibir resultados)
  email: z
    .string()
    .email('Por favor ingresa un email válido')
    .toLowerCase()
    .trim()
    .optional()
    .or(z.literal('')),
});

export type AuditoriaFormData = z.infer<typeof auditoriaFormSchema>;

/**
 * Schema para la respuesta de la API
 */
export const auditoriaResponseSchema = z.object({
  success: z.boolean(),
  taskId: z.string().optional(),
  message: z.string(),
  estimatedTime: z.number().optional(), // en minutos
});

export type AuditoriaResponse = z.infer<typeof auditoriaResponseSchema>;

/**
 * Schema para el webhook de DataForSEO
 */
export const webhookPayloadSchema = z.object({
  id: z.string(),
  tag: z.string().optional(),
  status_code: z.number(),
  status_message: z.string(),
  time: z.string(),
  cost: z.number(),
  result: z.array(z.any()),
});

export type WebhookPayload = z.infer<typeof webhookPayloadSchema>;
