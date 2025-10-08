import { z } from 'zod';

/**
 * Schema de validación para el formulario de auditoría
 */
export const auditoriaFormSchema = z.object({
  // Información del negocio
  name: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre es demasiado largo'),

  email: z
    .string()
    .email('Por favor ingresa un email válido')
    .toLowerCase()
    .trim(),

  // URL del sitio web
  website: z
    .string()
    .url('Por favor ingresa una URL válida')
    .refine(
      (url) => url.startsWith('http://') || url.startsWith('https://'),
      'La URL debe comenzar con http:// o https://'
    )
    .refine(
      (url) => {
        try {
          const parsedUrl = new URL(url);
          return parsedUrl.hostname.includes('.');
        } catch {
          return false;
        }
      },
      'La URL no parece ser válida'
    )
    .transform((url) => url.toLowerCase().trim()),

  // Tipo de negocio
  businessType: z.enum(['local', 'ecommerce', 'corporate', 'blog'], {
    errorMap: () => ({ message: 'Por favor selecciona un tipo de negocio' }),
  }),

  // Ubicación (opcional para negocios locales)
  location: z
    .string()
    .max(100, 'La ubicación es demasiado larga')
    .optional()
    .or(z.literal('')),

  // Mensaje adicional (opcional)
  message: z
    .string()
    .max(500, 'El mensaje es demasiado largo')
    .optional()
    .or(z.literal('')),

  // Aceptación de términos
  acceptTerms: z
    .boolean()
    .refine((val) => val === true, 'Debes aceptar los términos de servicio'),
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

