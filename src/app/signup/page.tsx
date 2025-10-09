import type { Metadata } from 'next';

import SignupSection from '@/components/sections/signup-section';

// Forzar renderizado dinámico para páginas con autenticación
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Registrarse',
  description:
    'Crea tu cuenta en Fascinante Digital y comienza a impulsar tu negocio.',
  alternates: {
    canonical: '/signup',
  },
  robots: {
    index: false,
    follow: true,
  },
};

const LoginPage = () => {
  return (
    <div className="py-14 md:py-20 lg:py-24">
      <SignupSection />
    </div>
  );
};

export default LoginPage;
