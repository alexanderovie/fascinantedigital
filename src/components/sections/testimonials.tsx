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
      'Nuestro equipo en Zerostatic depende mucho de la automatización, y esta app lo lleva a otro nivel. Es como tener un asistente virtual integrado en mi flujo de trabajo.',
    author: {
      name: 'Abdulsalam Abdulsalam',
      role: 'Diseñador de Producto, Zerostatic',
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
      'Me encanta especialmente las integraciones de calendario perfectas y las funciones avanzadas de gestión de tareas que mantienen a todos alineados y organizados.',
    author: {
      name: 'Emma Lee',
      role: 'Gerente de Producto, Notion',
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
      'Necesitábamos una app de productividad que creciera con las necesidades de nuestro equipo, esta ha sido el ajuste perfecto. Las herramientas de automatización nos han ahorrado horas.',
    author: {
      name: 'Ryan Chen',
      role: 'Líder de Operaciones, Slack',
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
      'Esta plataforma ha sido invaluable para gestionar proyectos entre equipos distribuidos. Su integración con nuestras herramientas existentes hace la configuración fácil.',
    author: {
      name: 'Ryan Patel',
      role: 'Gerente de Ingeniería, GitHub',
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
      'Como diseñador, aprecio lo intuitiva y visualmente atractiva que es esta app. Simplifica la gestión de tareas sin sacrificar funciones poderosas.',
    author: {
      name: 'Carlos Diaz',
      role: 'Líder de Diseño, Figma',
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
      'Los recordatorios inteligentes y la programación automatizada mantienen a nuestro equipo enfocado y en el camino. También hemos encontrado las funciones colaborativas muy útiles.',
    author: {
      name: 'Matthew Kim',
      role: 'Estratega de Contenido, Loom',
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
          title="Lo que dicen los expertos de la industria"
          icon={Handshake}
          description="Confiado por Profesionales de Empresas Tecnológicas Líderes"
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
