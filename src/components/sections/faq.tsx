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
    question: '¿Qué obtengo con el análisis gratuito?',
    answer:
      'Un resumen claro con tus principales oportunidades para atraer más clientes.',
  },
  {
    question: '¿Cuánto tardaré en ver resultados?',
    answer:
      'En la mayoría de los casos, notarás mejoras visibles en las primeras semanas.',
  },
  {
    question: '¿Qué diferencia tienen ustedes frente a otras agencias?',
    answer:
      'Trabajamos con datos reales, no con suposiciones, y te mostramos todo de forma simple.',
  },
  {
    question: '¿Puedo ver cómo va mi negocio?',
    answer:
      'Sí. Tendrás acceso a reportes visuales con tus avances y recomendaciones.',
  },
  {
    question: '¿Puedo saber qué hacen mis competidores?',
    answer:
      'Claro. Te mostramos su visibilidad y qué puedes hacer para superarlos.',
  },
  {
    question: '¿Qué pasa si mi negocio no aparece todavía en Google?',
    answer:
      'Te ayudamos a crear y optimizar tu perfil paso a paso hasta que empieces a recibir visitas.',
  },
  {
    question: '¿Por qué debería empezar ahora?',
    answer:
      'Porque cada día que pasa, otro negocio está ganando los clientes que podrían ser tuyos.',
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
          title="Preguntas frecuentes"
          icon={MessageCircleQuestion}
          description={
            <>
              Resolvemos las dudas más comunes sobre{' '}
              <span className="underline">cómo trabajamos</span> y qué resultados puedes esperar.
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
