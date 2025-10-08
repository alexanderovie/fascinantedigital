'use client';

import React from 'react';

import Link from 'next/link';

import { Search } from 'lucide-react';

import SectionHeader from '../section-header';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const formFields = [
  {
    id: 'business',
    label: 'Nombre de tu negocio',
    type: 'text',
    component: Input,
    required: true,
    props: {
      placeholder: 'Ej: Restaurante El Buen Sabor, Clínica Dental Miami...',
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

      <div className="container mx-auto max-w-md py-12">
        <form className="flex flex-col gap-6">
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
      </div>
    </section>
  );
};


export default Auditoria;
