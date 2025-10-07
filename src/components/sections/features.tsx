import { PocketKnife } from 'lucide-react';

import FeaturesList from '../features-list';
import SectionHeader from '../section-header';

const Features = () => {
  return (
    <section id="smart-productivity" className="pt-12 lg:pt-20">
      <div className="border-y">
        <SectionHeader
          iconTitle="Características"
          title="Productividad inteligente con IA"
          icon={PocketKnife}
          description={
            'Desbloquea productividad más inteligente con funciones que te ayudan a gestionar tareas, tiempo y enfoque sin complicaciones.'
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
