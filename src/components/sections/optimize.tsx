import { Eye } from 'lucide-react';

import OptimizeList from '../optimize-list';
import SectionHeader from '../section-header';

const Optimize = () => {
  return (
    <section id="optimized-scheduling" className="">
      <div className="border-b">
        <SectionHeader
          iconTitle="Optimiza"
          title="Optimiza cada aspecto de tu día"
          icon={Eye}
          description={
            'Logra productividad perfecta con programación inteligente, analíticas perspicaces e integraciones sin esfuerzo.'
          }
        />
      </div>

      <div className="container border-x lg:!px-0">
        <OptimizeList />
      </div>

      <div className="h-8 w-full border-y md:h-12 lg:h-[112px]">
        <div className="container h-full w-full border-x"></div>
      </div>
    </section>
  );
};

export default Optimize;
