import Image from 'next/image';
import Link from 'next/link';

import { Github, Twitter, Users } from 'lucide-react';

import SectionHeader from '../section-header';

const teamMembers = [
  {
    name: 'Alex Johnson',
    role: 'CEO y Fundador',
    image: '/images/team/1.png',
    bio: 'Con experiencia en desarrollo de software y una visión para la productividad, Alex lidera el equipo con pasión por la innovación centrada en el usuario.',
    social: {
      twitter: '#',
      github: '#',
    },
  },
  {
    name: 'Jamie Lee',
    role: 'Director de Producto',
    image: '/images/team/2.png',
    bio: 'Jamie aporta años de experiencia en diseño y estrategia de producto, asegurando que cada función cumpla con los más altos estándares de funcionalidad y diseño.',
    social: {
      twitter: '#',
    },
  },
  {
    name: 'Taylor Smith',
    role: 'Jefe de Ingeniería',
    image: '/images/team/3.png',
    bio: 'Taylor impulsa la visión técnica, supervisando el desarrollo y asegurando que el producto sea robusto, seguro y escalable para los usuarios.',
    social: {
      twitter: '#',
      github: '#',
    },
  },
  {
    name: 'Morgan Davis',
    role: 'Líder de Marketing',
    image: '/images/team/4.png',
    bio: 'Con talento para contar historias y un profundo entendimiento del mercado, Morgan comunica nuestra misión y beneficios del producto al mundo.',
    social: {
      twitter: '#',
    },
  },
];

const Team = () => {
  return (
    <section className="">
      <SectionHeader
        iconTitle="¡En equipo!"
        title="Las mentes detrás de la misión"
        icon={Users}
        description="Un equipo dedicado y apasionado por dar forma al futuro de la productividad."
        className={'border-none'}
      />

      <div className="container mt-10 grid gap-x-12 gap-y-16 sm:grid-cols-2 md:mt-14 lg:grid-cols-4">
        {teamMembers.map((member) => (
          <div key={member.name} className="group flex flex-col">
            <Image
              src={member.image}
              alt={member.name}
              width={80}
              height={80}
              className="rounded-full object-contain"
            />
            <div className="mt-6 flex flex-col tracking-[-0.32px]">
              <h3 className="text-lg">{member.name}</h3>
              <p className="text-muted-foreground-subtle">{member.role}</p>
              <p className="text-muted-foreground mt-4 text-sm tracking-[-0.36px]">
                {member.bio}
              </p>
              <div className="mt-6 flex gap-2">
                {member.social.twitter && (
                  <Link
                    href={member.social.twitter}
                    className="hover:text-foreground"
                  >
                    <Twitter className="size-4" />
                  </Link>
                )}
                {member.social.github && (
                  <Link
                    href={member.social.github}
                    className="hover:text-foreground"
                  >
                    <Github className="size-4" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Team;
