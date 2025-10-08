import type { Metadata } from 'next';

import Contact from '@/components/sections/contact';

export const metadata: Metadata = {
  title: 'Contacto',
  description:
    'Contáctanos para impulsar tu negocio. Llama al (8OO) 886-4981 o visita nuestra oficina en West Palm Beach, FL.',
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactPage() {
  return <Contact />;
}
