'use client';

import Image from 'next/image';

import { FcGoogle } from 'react-icons/fc';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';

const LoginSection = () => {
  return (
    <section className="bg-sand-100 py-16 md:py-28 lg:py-32">
      <div className="container">
        <div className="flex flex-col gap-4">
          <Card className="mx-auto w-full max-w-sm">
            <CardHeader className="flex flex-col items-center space-y-0">
              <Image
                src="/logo-fascinante.svg"
                alt="Fascinante Digital Logo"
                width={140}
                height={40}
                className="mb-7"
              />
              <p className="mb-2 text-2xl font-bold">Bienvenido de Vuelta</p>
              <p className="text-muted-foreground">
                Por favor ingresa tus datos.
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <Input type="email" placeholder="Ingresa tu email" required />
                <div>
                  <Input
                    type="password"
                    placeholder="Ingresa tu contraseña"
                    required
                  />
                </div>
                <div className="flex justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      className="border-muted-foreground"
                    />
                    <label
                      htmlFor="remember"
                      className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Recuérdame
                    </label>
                  </div>
                  <a href="#" className="text-primary text-sm font-medium">
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
                <Button type="submit" className="mt-2 w-full">
                  Ingresar
                </Button>
                <Button variant="outline" className="w-full">
                  <FcGoogle className="mr-2 size-5" />
                  Ingresar con Google
                </Button>
              </div>
              <div className="text-muted-foreground mx-auto mt-8 flex justify-center gap-1 text-sm">
                <p>¿No tienes una cuenta?</p>
                <a href="/signup" className="text-primary font-medium">
                  Regístrate
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default LoginSection;
