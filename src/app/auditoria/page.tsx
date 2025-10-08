import type { Metadata } from 'next';

import Auditoria from '@/components/sections/auditoria';

export const metadata: Metadata = {
  title: 'Auditoría SEO Gratuita',
  description:
    'Obtén tu auditoría SEO gratuita y descubre cómo mejorar tu presencia digital. Análisis completo de tu sitio web, palabras clave y competencia.',
  alternates: {
    canonical: '/auditoria',
  },
};

export default function AuditoriaPage() {
  return <Auditoria />;
}
