import { PocketKnife } from 'lucide-react';

import FeaturesList from '../features-list';
import SectionHeader from '../section-header';

const Features = () => {
  return (
    <section id="smart-productivity" className="pt-12 lg:pt-20">
      <div className="border-y">
        <SectionHeader
          iconTitle="Herramientas"
          title="Herramientas gratuitas con datos reales"
          icon={PocketKnife}
          description={
            'Obtén reportes instantáneos basados en APIs profesionales — sin compromiso.'
          }
        />
      </div>

      <div className="container border-x lg:!px-0">
        <FeaturesList />
      </div>

      <div className="h-8 w-full border-y md:h-12 lg:h-[112px]">
        <div className="container h-full w-full border-x"></div>
      </div>
    </section>
  );
};

export default Features;
