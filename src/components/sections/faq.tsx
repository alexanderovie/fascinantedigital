import { MessageCircleQuestion } from 'lucide-react';

import SectionHeader from '../section-header';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqData = [
  {
    question: '¿Qué datos muestran estas herramientas?',
    answer:
      'Verás posiciones exactas en tiempo real, fragmentos destacados, enlaces perdidos/nuevos, reseñas, visibilidad local y comparativas con competidores.',
  },
  {
    question: '¿Con qué frecuencia se actualizan los datos?',
    answer:
      'Cada semana o diariamente, dependiendo del plan. Estamos conectados directamente con el motor de búsqueda.',
  },
  {
    question: '¿Quién puede ver mis datos?',
    answer:
      'Solo tú y tu equipo. No compartimos ni filtramos con otras marcas.',
  },
  {
    question: '¿Puedo ver los datos de mi competencia?',
    answer:
      'Sí, puedes comparar tu dominio con hasta 3 competidores en palabras clave, enlaces y visibilidad.',
  },
  {
    question:
      '¿Por qué trabajar con ustedes en vez de usar SEMrush o Ahrefs gratis?',
    answer:
      'Porque esos servicios usan estimaciones. Nosotros usamos datos directos del motor de búsqueda, no suposiciones.',
  },
  {
    question: '¿Qué pasa si pierdo posicionamientos?',
    answer:
      'Detectamos pérdidas inmediatas y sugerimos ajustes para recuperarte rápido.',
  },
  {
    question: '¿Qué tan actualizados son los datos?',
    answer:
      'En planes intermedios se actualizan semanalmente. En los niveles superiores, puedes tener datos prácticamente en tiempo real.',
  },
];

const Faq = ({ withBorders = true }: { withBorders?: boolean }) => {
  return (
    <section className="">
      <div className="">
        <SectionHeader
          className={
            withBorders
              ? ''
              : '!max-w-[480px] !border-none lg:items-center lg:text-center'
          }
          iconTitle="FAQ"
          title="Preguntas Frecuentes"
          icon={MessageCircleQuestion}
          description={
            <>
              Resolvemos tus dudas sobre datos, herramientas y análisis en{' '}
              <span className="underline">tiempo real</span>.
            </>
          }
        />
      </div>

      <div className={withBorders ? 'container border-x' : 'container'}>
        <div className="mx-auto max-w-3xl pt-8 pb-4 md:pb-8 lg:pt-[3.75rem] lg:pb-[50px]">
          <Accordion type="single" collapsible className="space-y-4">
            {faqData.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="text-primary rounded-[7px] border px-6 data-[state=open]:pb-2"
              >
                <AccordionTrigger className="py-5 text-base tracking-[-0.32px]">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base tracking-[-0.32px]">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
      {withBorders && (
        <div className="h-8 w-full border-y md:h-12 lg:h-[112px]">
          <div className="container h-full w-full border-x"></div>
        </div>
      )}
    </section>
  );
};

export default Faq;
