'use client';

import React from 'react';

import Link from 'next/link';

import { Building, ChevronRight, LucideIcon, Mail, Phone } from 'lucide-react';

import SectionHeader from '../section-header';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const contactMethods = [
  {
    icon: Mail,
    title: 'Email',
    description:
      '¿Tienes una pregunta o necesitas ayuda? Envíanos un email y responderemos en 24 horas.',
    contact: 'inf0@fascinantedigital.com',
  },
  {
    icon: Phone,
    title: 'Teléfono',
    description:
      '¿Prefieres conversar? Llámanos de lunes a viernes, de 8 AM a 5 PM (EST).',
    contact: '(8OO) 886-4981',
  },
  {
    icon: Building,
    title: 'Oficina',
    description:
      'Visita nuestra oficina en 2054 Vista Pkwy #400, West Palm Beach, FL 33411',
    contact: (
      <Link
        href="#"
        className="text-foreground inline-flex items-center gap-1 text-sm font-medium hover:underline"
      >
        Cómo llegar
        <ChevronRight className="size-4" />
      </Link>
    ),
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
    id: 'message',
    label: 'Mensaje',
    component: Textarea,
    required: true,

    props: {
      placeholder: 'Escribe tu mensaje...',
      rows: 4,
    },
  },
];
const Contact = () => {
  return (
    <section className="py-14 md:py-20 lg:py-24">
      <SectionHeader
        icon={Mail}
        iconTitle="Contáctanos"
        title="Ponte en contacto"
        description="Estamos aquí para ayudar—contáctanos con cualquier pregunta o comentario."
        className="border-none !pb-0"
      />

      <div className="container flex justify-between gap-10 py-12 max-md:flex-col">
        <form className="flex flex-1 flex-col gap-6">
          {formFields.map((field) => (
            <div key={field.id} className="space-y-2">
              <Label className="text-sm font-normal" htmlFor={field.id}>
                {field.label}
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
                Acepto los{' '}
                <Link href="/terms-of-service" className="underline">
                  Términos
                </Link>
              </Label>
            </div>
          </div>

          <Button type="submit">Enviar</Button>
        </form>

        <div className="grid flex-1 gap-6 self-start lg:grid-cols-2">
          {contactMethods.map((method, index) => (
            <ContactMethod key={index} {...method} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface ContactMethodProps {
  icon: LucideIcon;
  title: string;
  description: string;
  contact: React.ReactNode;
}

const ContactMethod = ({
  icon: Icon,
  title,
  description,
  contact,
}: ContactMethodProps) => (
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

export default Contact;
