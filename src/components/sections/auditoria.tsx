'use client';

import React from 'react';

import Link from 'next/link';

import {
  LucideIcon,
  Search,
  Target,
  TrendingUp,
} from 'lucide-react';

import SectionHeader from '../section-header';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const auditoriaMethods = [
  {
    icon: Search,
    title: 'Análisis SEO completo',
    description:
      'Revisamos tu sitio web, palabras clave, velocidad de carga y estructura técnica para identificar oportunidades.',
    contact: 'Informe detallado en 24-48 horas',
  },
  {
    icon: Target,
    title: 'Análisis de competencia',
    description:
      'Identificamos qué están haciendo tus competidores y cómo puedes superarlos en búsquedas locales.',
    contact: 'Comparativo con 3 competidores directos',
  },
  {
    icon: TrendingUp,
    title: 'Plan de mejora',
    description:
      'Te entregamos un plan paso a paso con las acciones específicas para mejorar tu presencia online.',
    contact: 'Roadmap personalizado y priorizado',
  },
];

const formFields = [
  {
    id: 'name',
    label: 'Nombre',
    type: 'text',
    component: Input,
    required: true,
  },
  {
    id: 'email',
    label: 'Email',
    type: 'email',
    component: Input,
    required: true,
  },
  {
    id: 'website',
    label: 'Sitio web o perfil de Google',
    type: 'url',
    component: Input,
    required: true,
    props: {
      placeholder: 'https://tu-sitio.com o Google My Business',
    },
  },
  {
    id: 'business',
    label: 'Tipo de negocio',
    type: 'text',
    component: Input,
    required: true,
    props: {
      placeholder: 'Ej: Restaurante, Clínica dental, Tienda de ropa...',
    },
  },
  {
    id: 'message',
    label: '¿Qué te gustaría saber sobre tu presencia online?',
    component: Textarea,
    required: false,
    props: {
      placeholder: 'Cuéntanos qué problemas tienes o qué quieres mejorar...',
      rows: 4,
    },
  },
];

const Auditoria = () => {
  return (
    <section className="py-14 md:py-20 lg:py-24">
      <SectionHeader
        icon={Search}
        iconTitle="Auditoría gratuita"
        title="Descubre qué está pasando con tu presencia digital"
        description="Obtén un análisis completo y gratuito de tu sitio web, palabras clave y competencia local."
        className="border-none !pb-0"
      />

      <div className="container flex justify-between gap-10 py-12 max-md:flex-col">
        <form className="flex flex-1 flex-col gap-6">
          {formFields.map((field) => (
            <div key={field.id} className="space-y-2">
              <Label className="text-sm font-normal" htmlFor={field.id}>
                {field.label}
                {field.required && <span className="ml-1 text-red-500">*</span>}
              </Label>
              <field.component
                id={field.id}
                type={field.type}
                required={field.required}
                className="border-border bg-card"
                {...field.props}
              />
            </div>
          ))}

          <div className="flex items-center space-x-2">
            <Checkbox id="terms" required />
            <div className="grid gap-1.5 leading-none">
              <Label
                htmlFor="terms"
                className="text-sm font-normal peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Acepto recibir mi auditoría gratuita y{' '}
                <Link href="/terms-of-service" className="underline">
                  términos de servicio
                </Link>
              </Label>
            </div>
          </div>

          <Button type="submit" className="gap-2">
            <Search className="size-4" />
            Obtener mi auditoría gratuita
          </Button>
        </form>

        <div className="grid flex-1 gap-6 self-start lg:grid-cols-1">
          {auditoriaMethods.map((method, index) => (
            <AuditoriaMethod key={index} {...method} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface AuditoriaMethodProps {
  icon: LucideIcon;
  title: string;
  description: string;
  contact: React.ReactNode;
}

const AuditoriaMethod = ({
  icon: Icon,
  title,
  description,
  contact,
}: AuditoriaMethodProps) => (
  <div className="space-y-2">
    <div className="flex items-center gap-2">
      <Icon className="size-5" />
      <h3 className="text-2xl tracking-[-0.96px]">{title}</h3>
    </div>
    <div className="space-y-2 tracking-[-0.32px]">
      <p className="text-muted-foreground text-sm">{description}</p>
      <div className="text-muted-foreground text-sm">{contact}</div>
    </div>
  </div>
);

export default Auditoria;
