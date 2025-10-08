import { Shapes } from 'lucide-react';

import AdaptiveList from '../adaptive-list';
import SectionHeader from '../section-header';

const Adaptive = () => {
  return (
    <section id="adaptive-workflows" className="">
      <div className="border-b">
        <SectionHeader
          iconTitle="Estrategia"
          title="Cada decisión basada en datos reales"
          icon={Shapes}
          description={
            'No trabajamos con suposiciones. Tomamos decisiones con información real sobre tu negocio, tus clientes y tu competencia.'
          }
        />
      </div>

      <div className="container border-x lg:!px-0">
        <AdaptiveList />
      </div>

      <div className="h-8 w-full border-y md:h-12 lg:h-[112px]">
        <div className="container h-full w-full border-x"></div>
      </div>
    </section>
  );
};

export default Adaptive;
