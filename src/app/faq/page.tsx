import type { Metadata } from 'next';

import Faq from '@/components/sections/faq';
import Testimonials from '@/components/sections/testimonials';

export const metadata: Metadata = {
  title: 'Preguntas Frecuentes',
  description:
    'Preguntas frecuentes sobre nuestras herramientas SEO, análisis de datos en tiempo real y planes de marketing digital.',
  alternates: {
    canonical: '/faq',
  },
};

const FaqPage = () => {
  return (
    <div className="py-14 md:py-20 lg:py-24">
      <Faq withBorders={false} />
      <div className="py-14 md:py-20 lg:py-24">
        <Testimonials withBorders={false} />
      </div>
    </div>
  );
};

export default FaqPage;
