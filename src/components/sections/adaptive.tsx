import { Shapes } from 'lucide-react';

import AdaptiveList from '../adaptive-list';
import SectionHeader from '../section-header';

const Adaptive = () => {
  return (
    <section id="adaptive-workflows" className="">
      <div className="border-b">
        <SectionHeader
          iconTitle="Estrategia"
          title="Cada decisión respaldada por datos"
          icon={Shapes}
          description={
            'No actuamos al azar. Tu estrategia se basa en tu ranking real, tendencias locales y comparativas de competencia.'
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
