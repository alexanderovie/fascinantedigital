import type { Metadata } from 'next';

import Faq from '@/components/sections/faq';
import Pricing from '@/components/sections/pricing';
import Testimonials from '@/components/sections/testimonials';

export const metadata: Metadata = {
  title: 'Precios',
  description:
    'Planes de marketing digital desde $19/mes. Incluye acceso a herramientas profesionales SEO que otras agencias cobran $300-500/mes.',
  alternates: {
    canonical: '/pricing',
  },
};

const PricingPage = () => {
  return (
    <div className="py-14 md:py-20 lg:py-24">
      <Pricing withBorders={false} />
      <Testimonials withBorders={false} />
      <div className="pt-14 md:pt-20 lg:pt-24">
        <Faq withBorders={false} />
      </div>
    </div>
  );
};

export default PricingPage;
