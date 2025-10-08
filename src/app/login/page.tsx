import type { Metadata } from 'next';

import LoginSection from '@/components/sections/login-section';

export const metadata: Metadata = {
  title: 'Iniciar Sesión',
  description: 'Inicia sesión en tu cuenta de Fascinante Digital.',
  alternates: {
    canonical: '/login',
  },
  robots: {
    index: false,
    follow: true,
  },
};

const LoginPage = () => {
  return (
    <div className="py-14 md:py-20 lg:py-24">
      <LoginSection />
    </div>
  );
};

export default LoginPage;
