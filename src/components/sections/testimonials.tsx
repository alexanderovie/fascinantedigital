import Image from 'next/image';

import { Handshake } from 'lucide-react';

import SectionHeader from '../section-header';
import { Card } from '../ui/card';

const testimonials: TestimonialProps[] = [
  {
    logo: {
      src: '/images/logos/zerostatic.png',
      alt: 'Zerostatic logo',
      width: 155,
      height: 36,
    },
    quote:
      'En menos de dos meses empecé a recibir clientes nuevos gracias a los cambios que me hicieron. Ahora entiendo por qué no me encontraban antes.',
    author: {
      name: 'María López',
      role: 'Propietaria de salón de belleza, Miami',
      image: '/images/testimonials/1.png',
    },
  },
  {
    logo: {
      src: '/images/logos/notion.svg',
      alt: 'Notion logo',
      width: 96.75,
      height: 36,
    },
    quote:
      'Antes gastaba en publicidad sin saber si funcionaba. Con Fascinante Digital veo los resultados y sé qué campañas traerán más ventas.',
    author: {
      name: 'José Ramírez',
      role: 'Dueño de tienda de repuestos, West Palm Beach',
      image: '/images/testimonials/2.png',
    },
  },
  {
    logo: {
      src: '/images/logos/slack.svg',
      alt: 'Slack logo',
      width: 90.75,
      height: 36,
    },
    quote:
      'Nos ayudaron a mejorar todo: perfil de Google, Instagram y sitio web. Lo mejor es que ahora los clientes nos encuentran solos.',
    author: {
      name: 'Carolina Gómez',
      role: 'Administradora de clínica dental, Orlando',
      image: '/images/testimonials/3.png',
    },
  },
  {
    logo: {
      src: '/images/logos/github.svg',
      alt: 'GitHub logo',
      width: 101.25,
      height: 36,
    },
    quote:
      'Pasé de recibir 2 mensajes por semana a más de 15 clientes interesados cada día. No son promesas, son resultados.',
    author: {
      name: 'Luis Hernández',
      role: 'Servicio de limpieza, Tampa',
      image: '/images/testimonials/4.png',
    },
  },
  {
    logo: {
      src: '/images/logos/figma.svg',
      alt: 'Figma logo',
      width: 81.75,
      height: 36,
    },
    quote:
      'Pensé que tener solo mi Instagram era suficiente, pero después de trabajar con ellos mi negocio aparece en Google y ya no dependo solo de las redes.',
    author: {
      name: 'Andrea Torres',
      role: 'Fotógrafa profesional, Fort Lauderdale',
      image: '/images/testimonials/5.png',
    },
  },
  {
    logo: {
      src: '/images/logos/loom.svg',
      alt: 'Loom logo',
      width: 87.75,
      height: 36,
    },
    quote:
      'Lo mejor es la claridad: sé exactamente qué hacer para seguir creciendo. Ya no adivino, ahora trabajo con estrategia.',
    author: {
      name: 'Carlos Méndez',
      role: 'Propietario de restaurante, Palm Beach',
      image: '/images/testimonials/6.png',
    },
  },
];

const Testimonials = ({ withBorders = true }: { withBorders?: boolean }) => {
  return (
    <section className="">
      <div className={withBorders ? 'border-b' : ''}>
        <SectionHeader
          iconTitle="nos aman"
          title="Lo que dicen nuestros clientes"
          icon={Handshake}
          description="Empresas reales, resultados reales."
          className={withBorders ? '' : 'border-none'}
        />
      </div>

      <div className="container mt-10 grid gap-8 sm:grid-cols-2 md:mt-14 lg:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={index} {...testimonial} />
        ))}
      </div>

      {withBorders && (
        <div className="mt-12 h-8 w-full border-y md:h-12 lg:h-[112px]">
          <div className="container h-full w-full border-x"></div>
        </div>
      )}
    </section>
  );
};

export default Testimonials;

interface TestimonialProps {
  logo: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  quote: string;
  author: {
    name: string;
    role: string;
    image: string;
  };
}
function TestimonialCard({ logo, quote, author }: TestimonialProps) {
  return (
    <Card className="bg-background flex flex-col gap-6 rounded-md p-6 shadow-sm">
      <Image
        src={logo.src}
        alt={logo.alt}
        width={logo.width}
        height={logo.height}
        className="object-contain dark:invert"
      />

      <blockquote className="text-muted-foreground-subtle text-lg font-normal italic">{`“${quote}”`}</blockquote>

      <div className="mt-auto flex items-center gap-4">
        <Image
          src={author.image}
          alt={`${author.name}'s profile picture`}
          width={48}
          height={48}
          sizes="48px"
          className="rounded-full object-cover"
        />
        <div>
          <p className="text-lg tracking-[-0.36px]">{author.name}</p>
          <p className="text-muted-foreground">{author.role}</p>
        </div>
      </div>
    </Card>
  );
}
