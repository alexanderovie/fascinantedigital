import { Eye } from 'lucide-react';

import OptimizeList from '../optimize-list';
import SectionHeader from '../section-header';

const Optimize = () => {
  return (
    <section id="optimized-scheduling" className="">
      <div className="border-b">
        <SectionHeader
          iconTitle="Presencia"
          title="Haz que te encuentren donde importa"
          icon={Eye}
          description={
            'Aparece en las búsquedas, mapas y redes donde tus clientes te están buscando cada día.'
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
