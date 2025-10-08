import { Heart, Lightbulb, Shield, UserCog } from 'lucide-react';

import SectionHeader from '../section-header';

const values = [
  {
    title: 'Diseño centrado en el usuario',
    description:
      'Priorizamos la experiencia del usuario, asegurando que cada función agregue valor real y sea intuitiva de usar.',
    icon: UserCog,
  },
  {
    title: 'Innovación continua',
    description:
      'Estamos comprometidos a traspasar límites y evolucionar para satisfacer las necesidades de los equipos modernos.',
    icon: Lightbulb,
  },
  {
    title: 'Integridad y transparencia',
    description:
      'Construimos con honestidad y claridad, fomentando confianza con nuestros usuarios y socios.',
    icon: Shield,
  },
];

const Values = () => {
  return (
    <section>
      <SectionHeader
        iconTitle="Vivimos por"
        title="Nuestros valores fundamentales"
        icon={Heart}
        description="Creemos en principios que guían nuestro crecimiento e inspiran a nuestra comunidad."
        className="border-none"
      />

      <div className="container mt-10 grid gap-8 sm:grid-cols-2 md:mt-14 lg:grid-cols-3">
        {values.map((value, index) => {
          const Icon = value.icon;
          return (
            <div className="flex gap-2.5" key={index}>
              <Icon className="mt-0.5 size-[18px] shrink-0" />
              <div>
                <h3 className="text-lg !leading-none tracking-[-0.96px] lg:text-2xl">
                  {value.title}
                </h3>
                <p className="text-muted-foreground mt-2.5 text-sm tracking-[-0.36px]">
                  {value.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Values;
