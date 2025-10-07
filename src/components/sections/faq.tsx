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
    question: '¿Hay una versión gratuita?',
    answer:
      '¡Sí! Ofrecemos un Plan Gratis con funciones esenciales. Puedes actualizar en cualquier momento para herramientas avanzadas e integraciones.',
  },
  {
    question: '¿Qué aplicaciones puedo integrar?',
    answer:
      'Nuestra plataforma soporta integración con varias aplicaciones y servicios populares. Las integraciones específicas disponibles dependen de tu nivel de plan.',
  },
  {
    question: '¿Cómo funciona la IA?',
    answer:
      'Nuestra tecnología de IA usa algoritmos avanzados de aprendizaje automático para analizar y procesar tus datos, proporcionando insights inteligentes y capacidades de automatización.',
  },
  {
    question: '¿Puedo usar esto con un equipo?',
    answer:
      '¡Absolutamente! Nuestra plataforma está diseñada para uso individual y de equipo. Puedes colaborar fácilmente y compartir recursos con miembros del equipo.',
  },
  {
    question: '¿Mis datos están seguros?',
    answer:
      'Tomamos la seguridad de datos en serio. Todos los datos están encriptados y almacenados de forma segura siguiendo las mejores prácticas y estándares de cumplimiento de la industria.',
  },
  {
    question: '¿Cómo gestiono mi suscripción?',
    answer:
      'Puedes gestionar tu suscripción fácilmente a través de tu dashboard de cuenta, donde puedes actualizar, bajar de nivel o modificar la configuración de tu plan.',
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
          title="Todo lo que Necesitas Saber"
          icon={MessageCircleQuestion}
          description={
            <>
              ¿Buscas respuestas rápidas? Consulta nuestra{' '}
              <span className="underline">sección de FAQ</span>.
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
