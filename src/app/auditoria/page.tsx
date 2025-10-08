import type { Metadata } from 'next';

import Auditoria from '@/components/sections/auditoria';
import Testimonials from '@/components/sections/testimonials';

export const metadata: Metadata = {
  title: 'Auditoría SEO Gratuita',
  description:
    'Obtén tu auditoría SEO gratuita y descubre cómo mejorar tu presencia digital. Análisis completo de tu sitio web, palabras clave y competencia.',
  alternates: {
    canonical: '/auditoria',
  },
};

const AuditoriaPage = () => {
  return (
    <div className="py-14 md:py-20 lg:py-24">
      <Auditoria withBorders={false} />
      <div className="py-14 md:py-20 lg:py-24">
        <Testimonials withBorders={false} />
      </div>
    </div>
  );
};

export default AuditoriaPage;
