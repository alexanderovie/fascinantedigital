'use client';

import { useState } from 'react';

import Link from 'next/link';

import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, CheckCircle2, Loader2, Search } from 'lucide-react';
import { useForm } from 'react-hook-form';

import SectionHeader from '../section-header';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  auditoriaFormSchema,
  type AuditoriaFormData,
} from '@/schemas/auditoria';

const Auditoria = ({ withBorders = true }: { withBorders?: boolean }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<AuditoriaFormData>({
    resolver: zodResolver(auditoriaFormSchema),
  });

  const acceptTerms = watch('acceptTerms');

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

      setSubmitStatus({
        type: 'success',
        message: `¡Perfecto! Tu auditoría está en proceso. Te enviaremos los resultados a ${data.email} en 10-15 minutos.`,
      });

      // Opcional: Redirigir a página de estado
      // router.push(`/auditoria/${result.taskId}`);
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message:
          error instanceof Error
            ? error.message
            : 'Hubo un error al procesar tu solicitud. Por favor intenta de nuevo.',
      });
    } finally {
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
              : '!max-w-[480px] !border-none lg:items-center lg:text-center'
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
            {/* Nombre */}
            <div className="space-y-2">
              <Label className="text-sm font-normal" htmlFor="name">
                Nombre <span className="ml-1 text-red-500">*</span>
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Tu nombre completo"
                className="border-border bg-card"
                {...register('name')}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label className="text-sm font-normal" htmlFor="email">
                Email <span className="ml-1 text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                className="border-border bg-card"
                {...register('email')}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

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
              />
              {errors.website && (
                <p className="text-sm text-red-500">{errors.website.message}</p>
              )}
            </div>

            {/* Tipo de negocio */}
            <div className="space-y-2">
              <Label className="text-sm font-normal" htmlFor="businessType">
                Tipo de negocio <span className="ml-1 text-red-500">*</span>
              </Label>
              <select
                id="businessType"
                className="border-border bg-card ring-offset-background focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                {...register('businessType')}
              >
                <option value="">Selecciona una opción</option>
                <option value="local">
                  Negocio Local (restaurante, tienda física, etc.)
                </option>
                <option value="ecommerce">E-commerce (tienda online)</option>
                <option value="corporate">
                  Corporativo (empresa, servicios B2B)
                </option>
                <option value="blog">Blog / Contenido</option>
              </select>
              {errors.businessType && (
                <p className="text-sm text-red-500">
                  {errors.businessType.message}
                </p>
              )}
            </div>

            {/* Ubicación (opcional) */}
            <div className="space-y-2">
              <Label className="text-sm font-normal" htmlFor="location">
                Ubicación (opcional)
              </Label>
              <Input
                id="location"
                type="text"
                placeholder="Ciudad, Estado"
                className="border-border bg-card"
                {...register('location')}
              />
              <p className="text-muted-foreground text-xs">
                Importante para negocios locales
              </p>
              {errors.location && (
                <p className="text-sm text-red-500">
                  {errors.location.message}
                </p>
              )}
            </div>

            {/* Mensaje adicional (opcional) */}
            <div className="space-y-2">
              <Label className="text-sm font-normal" htmlFor="message">
                ¿Qué te gustaría mejorar? (opcional)
              </Label>
              <Textarea
                id="message"
                placeholder="Cuéntanos sobre tu negocio y objetivos..."
                rows={4}
                className="border-border bg-card"
                {...register('message')}
              />
              {errors.message && (
                <p className="text-sm text-red-500">{errors.message.message}</p>
              )}
            </div>

            {/* Términos */}
            <div className="flex items-start space-x-2">
              <Checkbox
                id="terms"
                checked={acceptTerms}
                onCheckedChange={(checked) =>
                  setValue('acceptTerms', checked as boolean)
                }
              />
              <div className="grid gap-1.5 leading-none">
                <Label
                  htmlFor="terms"
                  className="text-sm font-normal peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Acepto recibir mi auditoría gratuita y{' '}
                  <Link href="/terms-of-service" className="underline">
                    términos de servicio
                  </Link>
                  <span className="ml-1 text-red-500">*</span>
                </Label>
              </div>
            </div>
            {errors.acceptTerms && (
              <p className="text-sm text-red-500">
                {errors.acceptTerms.message}
              </p>
            )}

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
                <p className="text-sm">{submitStatus.message}</p>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              className="gap-2"
              disabled={isSubmitting || submitStatus.type === 'success'}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Procesando...
                </>
              ) : (
                <>
                  <Search className="size-4" />
                  Obtener mi auditoría gratuita
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
      {withBorders && (
        <div className="h-8 w-full border-y md:h-12 lg:h-[112px]">
          <div className="container h-full w-full border-x"></div>
        </div>
      )}
    </section>
  );
};

export default Auditoria;
