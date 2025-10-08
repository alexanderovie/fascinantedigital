'use client';

import Link from 'next/link';

import { Search } from 'lucide-react';

import SectionHeader from '../section-header';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

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
    id: 'message',
    label: 'Mensaje',
    component: Textarea,
    required: true,
    props: {
      placeholder: 'Cuéntanos sobre tu negocio y qué te gustaría mejorar...',
      rows: 4,
    },
  },
];

const Auditoria = ({ withBorders = true }: { withBorders?: boolean }) => {
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
          <form className="flex flex-col gap-6">
            {formFields.map((field) => (
              <div key={field.id} className="space-y-2">
                <Label className="text-sm font-normal" htmlFor={field.id}>
                  {field.label}
                  {field.required && (
                    <span className="ml-1 text-red-500">*</span>
                  )}
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