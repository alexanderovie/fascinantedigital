'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, CheckCircle2, Loader2, Search } from 'lucide-react';
import { useForm } from 'react-hook-form';

import SectionHeader from '../section-header';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  auditoriaFormSchema,
  type AuditoriaFormData,
} from '@/schemas/auditoria';

const Auditoria = ({ withBorders = true }: { withBorders?: boolean }) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuditoriaFormData>({
    resolver: zodResolver(auditoriaFormSchema),
  });

  const onSubmit = async (data: AuditoriaFormData) => {
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/auditoria/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Error al enviar la auditoría');
      }

      // Redirigir a la página de resultados
      router.push(`/auditoria/${result.taskId}`);
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message:
          error instanceof Error
            ? error.message
            : 'Hubo un error al procesar tu solicitud. Por favor intenta de nuevo.',
      });
      setIsSubmitting(false);
    }
  };

  return (
    <section className="">
      <div className="">
        <SectionHeader
          className={
            withBorders
              ? ''
              : '!max-w-[600px] !border-none lg:items-center lg:text-center'
          }
          iconTitle="Auditoría"
          title="Obtén tu auditoría SEO gratuita"
          icon={Search}
          description={
            <>
              Descubre{' '}
              <span className="underline">cómo está tu presencia digital</span>{' '}
              y qué oportunidades tienes para atraer más clientes.
            </>
          }
        />
      </div>

      <div className={withBorders ? 'container border-x' : 'container'}>
        <div className="mx-auto max-w-3xl pt-8 pb-4 md:pb-8 lg:pt-[3.75rem] lg:pb-[50px]">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            {/* URL del sitio web */}
            <div className="space-y-2">
              <Label className="text-sm font-normal" htmlFor="website">
                URL de tu sitio web <span className="ml-1 text-red-500">*</span>
              </Label>
              <Input
                id="website"
                type="url"
                placeholder="https://tusitio.com"
                className="border-border bg-card"
                {...register('website')}
                disabled={isSubmitting}
              />
              {errors.website && (
                <p className="text-sm text-red-500">{errors.website.message}</p>
              )}
            </div>

            {/* Email (opcional) */}
            <div className="space-y-2">
              <Label className="text-sm font-normal" htmlFor="email">
                Email (opcional)
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                className="border-border bg-card"
                {...register('email')}
                disabled={isSubmitting}
              />
              <p className="text-muted-foreground text-xs">
                Te enviaremos los resultados por email si lo proporcionas
              </p>
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Status Messages */}
            {submitStatus.type && (
              <div
                className={`flex items-start gap-3 rounded-lg border p-4 ${
                  submitStatus.type === 'success'
                    ? 'border-green-200 bg-green-50 text-green-800'
                    : 'border-red-200 bg-red-50 text-red-800'
                }`}
              >
                {submitStatus.type === 'success' ? (
                  <CheckCircle2 className="mt-0.5 size-5 flex-shrink-0" />
                ) : (
                  <AlertCircle className="mt-0.5 size-5 flex-shrink-0" />
                )}
                <div className="flex-1">
                  <p className="text-sm">{submitStatus.message}</p>
                </div>
              </div>
            )}

            {/* Botón de envío */}
            <div className="pt-4">
              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
                size="lg"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    Procesando...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 size-4" />
                    Analizar mi sitio ahora
                  </>
                )}
              </Button>
              <p className="text-muted-foreground mt-3 text-center text-xs">
                Análisis 100% gratuito. Sin tarjeta de crédito.
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Auditoria;
