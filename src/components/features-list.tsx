'use client';

import Image from 'next/image';

import { CalendarClock, ChartBar, SquarePen } from 'lucide-react';

import DiagonalPattern from './diagonal-pattern';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const FEATURES_DATA = [
  {
    title: 'Gestión Inteligente de Tareas',
    description:
      'Crea, prioriza y delega tareas sin esfuerzo. La IA te ayuda a identificar lo más importante con recomendaciones inteligentes y flujos automatizados.',
    icon: SquarePen,
    image: '/images/homepage/features-1.png',
  },
  {
    title: 'Programación Automatizada',
    description:
      'Deja que la IA encuentre los mejores horarios para reuniones, recordatorios y tareas según tu calendario y hábitos laborales. Mantente organizado sin complicaciones.',
    icon: CalendarClock,
    image: '/images/homepage/features-2.png',
  },
  {
    title: 'Insights Personalizados',
    description:
      'Rastrea tu productividad con insights de IA. Recibe resúmenes semanales y consejos prácticos para mejorar tu flujo de trabajo y gestionar mejor tus cargas.',
    icon: ChartBar,
    image: '/images/homepage/features-3.png',
  },
];

const FeaturesList = () => {
  return (
    <Tabs
      defaultValue={FEATURES_DATA[0].title}
      className="flex items-center max-lg:flex-col lg:divide-x"
    >
      <TabsList className="flex h-auto flex-1 flex-col bg-transparent p-0 max-lg:border-x lg:border-t">
        {FEATURES_DATA.map((item) => (
          <TabsTrigger
            key={item.title}
            value={item.title}
            className="group relative border-b px-1 py-5 text-start whitespace-normal data-[state=active]:shadow-none lg:px-8"
          >
            <div
              className={`absolute bottom-[-1px] left-0 z-10 h-[1px] w-0 bg-gradient-to-r from-blue-600 via-sky-300 to-transparent transition-all duration-300 group-data-[state=active]:w-1/2`}
            />
            <div className="">
              <div className="flex items-center gap-1.5">
                <item.icon className="size-4" />
                <h3 className="text-lg tracking-[-0.36px]">{item.title}</h3>
              </div>
              <p className="text-muted-foreground mt-2.5 tracking-[-0.32px]">
                {item.description}
              </p>
            </div>
          </TabsTrigger>
        ))}
      </TabsList>

      <div className="flex-1">
        {FEATURES_DATA.map((item, index) => (
          <TabsContent
            key={index}
            value={item.title}
            className="m-0 px-6 py-[38px] max-lg:border-x"
          >
            <div className="flex justify-center">
              <div>
                <div className="px-6 lg:px-10">
                  <DiagonalPattern className="h-6 lg:h-10" />
                </div>
                <div className="relative grid grid-cols-[auto_1fr_auto] items-stretch">
                  <DiagonalPattern className="h-full w-6 lg:w-10" />
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={400}
                    height={510}
                    className="m-3 rounded-md object-contain shadow-md lg:rounded-xl lg:shadow-lg dark:invert"
                  />
                  <DiagonalPattern className="w-6 lg:w-10" />
                </div>
                <div className="px-6 lg:px-10">
                  <DiagonalPattern className="h-6 lg:h-10" />
                </div>
              </div>
            </div>
          </TabsContent>
        ))}
      </div>
    </Tabs>
  );
};

export default FeaturesList;
