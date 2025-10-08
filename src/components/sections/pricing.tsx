'use client';

import React from 'react';

import {
  BadgeCheck,
  BadgeDollarSign,
  Briefcase,
  Building,
  LucideIcon,
  Rocket,
} from 'lucide-react';

import SectionHeader from '../section-header';
import { Button } from '../ui/button';

interface PricingPlan {
  icon: LucideIcon;
  name: string;
  price: {
    monthly: number;
    yearly: number;
  };
  features: string[];
}

interface ComparisonFeature {
  name: string;
  basic: string | boolean;
  business: string | boolean;
  enterprise: string | boolean;
}

interface FeatureSection {
  category: string;
  features: ComparisonFeature[];
}

const pricingPlans: PricingPlan[] = [
  {
    icon: Rocket,
    name: 'Esencial',
    price: {
      monthly: 19,
      yearly: 199,
    },
    features: [
      'Revisión completa de tu presencia online',
      'Análisis de tus palabras clave más valiosas',
      'Diagnóstico de visibilidad y errores principales',
      'Comparativo con 2 competidores locales',
      'Soporte por email',
    ],
  },
  {
    icon: Briefcase,
    name: 'Estrategia Pro',
    price: {
      monthly: 29,
      yearly: 299,
    },
    features: [
      'Todo del plan Esencial, más:',
      'Monitoreo constante de tu crecimiento',
      'Seguimiento de enlaces y reputación',
      'Evaluación de reseñas y presencia local',
      'Panel de resultados actualizado cada semana',
      'Soporte prioritario',
    ],
  },
  {
    icon: Building,
    name: 'Crecimiento Total',
    price: {
      monthly: 49,
      yearly: 499,
    },
    features: [
      'Todo del plan Pro, más:',
      'Análisis completo de todo tu sector',
      'Revisión de posicionamiento y campañas en tiempo real',
      'Reporte personalizado mensual',
      'Acompañamiento estratégico 1 a 1',
      'Soporte 24/7 y asesoría continua',
    ],
  },
];

const comparisonFeatures: FeatureSection[] = [
  {
    category: 'Herramientas Principales',
    features: [
      {
        name: 'Gestión de Tareas',
        basic: '10',
        business: '25',
        enterprise: 'Ilimitado',
      },
      {
        name: 'Sincronización de Calendario',
        basic: true,
        business: true,
        enterprise: true,
      },
      {
        name: 'Recordatorios',
        basic: true,
        business: true,
        enterprise: true,
      },
      {
        name: 'Colaboración',
        basic: false,
        business: true,
        enterprise: true,
      },
      {
        name: 'Notificaciones',
        basic: false,
        business: false,
        enterprise: true,
      },
    ],
  },
  {
    category: 'Insights de Productividad',
    features: [
      {
        name: 'Analíticas',
        basic: '10 25 Ilimitado',
        business: '10 25 Ilimitado',
        enterprise: '10 25 Ilimitado',
      },
      {
        name: 'Reportes',
        basic: true,
        business: true,
        enterprise: true,
      },
      {
        name: 'Rastreo de Tiempo',
        basic: true,
        business: true,
        enterprise: true,
      },
      {
        name: 'Rastreo de Objetivos',
        basic: false,
        business: true,
        enterprise: true,
      },
      {
        name: 'Tendencias',
        basic: false,
        business: false,
        enterprise: true,
      },
    ],
  },
  {
    category: 'Automatización de Flujo',
    features: [
      {
        name: 'Automatización de Tareas',
        basic: '10',
        business: '25',
        enterprise: 'Ilimitado',
      },
      {
        name: 'Tareas Recurrentes',
        basic: true,
        business: true,
        enterprise: true,
      },
      {
        name: 'Integraciones',
        basic: true,
        business: true,
        enterprise: true,
      },
      {
        name: 'Acceso API',
        basic: false,
        business: true,
        enterprise: true,
      },
      {
        name: 'Plantillas de Flujo',
        basic: false,
        business: false,
        enterprise: true,
      },
    ],
  },
];

const Pricing = ({ withBorders = true }: { withBorders?: boolean }) => {
  const [isMonthly, setIsMonthly] = React.useState(true);

  return (
    <section className="">
      <div className={withBorders ? 'border-b' : ''}>
        <SectionHeader
          className={
            withBorders ? '' : 'border-none lg:items-center lg:text-center'
          }
          iconTitle="Planes"
          title="Planes hechos para crecer contigo"
          icon={BadgeDollarSign}
          description="Elige el plan que se adapta a tu negocio y empieza a ver resultados reales."
        />
      </div>

      <div className="container mt-10 lg:mt-14">
        <section className="grid border max-lg:divide-y lg:grid-cols-3 lg:divide-x">
          {pricingPlans.map((plan, index) => (
            <PricingCard
              key={index}
              plan={plan}
              index={index}
              isMonthly={isMonthly}
            />
          ))}
        </section>

        {!withBorders && (
          <section className="py-14 md:py-20 lg:py-24">
            <div className="flex justify-center">
              <div className="inline-flex gap-[2px] rounded-md border p-[2px]">
                <Button
                  variant={isMonthly ? 'default' : 'outline'}
                  onClick={() => setIsMonthly(true)}
                  className="transition-colors"
                >
                  Mensual
                </Button>
                <Button
                  variant={!isMonthly ? 'default' : 'outline'}
                  onClick={() => setIsMonthly(false)}
                  className="transition-colors"
                >
                  Anual
                </Button>
              </div>
            </div>
            <div className="mt-12 overflow-x-auto">
              <PlanHeaders isMonthly={isMonthly} />
              <FeatureSections />
            </div>
          </section>
        )}
      </div>

      {withBorders && (
        <div className="mt-12 h-8 w-full border-y md:h-12 lg:h-[112px]">
          <div className="container h-full w-full border-x"></div>
        </div>
      )}
    </section>
  );
};

const PricingCard = ({
  plan,
  index,
  isMonthly,
}: {
  plan: PricingPlan;
  index: number;
  isMonthly: boolean;
}) => {
  const Icon = plan.icon;
  return (
    <div className="flex flex-col justify-between p-6">
      <div className="space-y-2 border-b pb-6">
        <div className="text-muted-foreground flex items-center gap-2.5">
          <Icon className="size-4" />
          <h3 className="text-xl tracking-[-0.8px]">{plan.name}</h3>
        </div>

        <PriceDisplay plan={plan} isMonthly={isMonthly} />
      </div>

      <FeatureList features={plan.features} />

      <Button variant={index === 1 ? 'default' : 'secondary'} className="mt-12">
        Comenzar
      </Button>
    </div>
  );
};

const PriceDisplay = ({
  plan,
  isMonthly,
}: {
  plan: PricingPlan;
  isMonthly: boolean;
}) => (
  <>
    <div className="flex items-baseline font-medium">
      <span className="text-[3.5rem] leading-[120%] tracking-[-3.92px]">
        ${isMonthly ? plan.price.monthly : plan.price.yearly}
      </span>
      <span className="text-muted-foreground-subtle text-2xl tracking-[-0.96px]">
        {isMonthly ? '/mo' : '/yr'}
      </span>
    </div>
    <p className="text-muted-foreground">
      {isMonthly
        ? `or $${plan.price.yearly} yearly`
        : `or $${plan.price.monthly}/mo monthly`}
    </p>
  </>
);

const FeatureList = ({ features }: { features: string[] }) => (
  <div className="pt-6">
    <h4 className="text-muted-foreground-subtle">Funciones Incluidas</h4>
    <ul className="mt-4 space-y-4">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center gap-4">
          <BadgeCheck className="text-muted-foreground size-6" />
          <span className="text-muted-foreground tracking-[-0.32px]">
            {feature}
          </span>
        </li>
      ))}
    </ul>
  </div>
);

const PlanHeaders = ({ isMonthly }: { isMonthly: boolean }) => (
  <div className="grid grid-cols-4">
    <div className="col-span-1 max-lg:hidden"></div>
    <div className="col-span-4 grid gap-4 border-t max-lg:divide-y max-lg:border lg:col-span-3 lg:grid-cols-3 lg:divide-x">
      {pricingPlans.map((plan, index) => (
        <div key={index} className="flex flex-col p-6">
          <div className="space-y-2 pb-6">
            <div className="text-muted-foreground flex items-center gap-2.5">
              <plan.icon className="size-4" />
              <h3 className="text-xl tracking-[-0.8px]">{plan.name}</h3>
            </div>
            <PriceDisplay plan={plan} isMonthly={isMonthly} />
          </div>
          <Button className="mt-auto">Comenzar</Button>
        </div>
      ))}
    </div>
  </div>
);

const FeatureSections = () => (
  <>
    {comparisonFeatures.map((section, sectionIndex) => (
      <div
        key={sectionIndex}
        className={`border-b first:border-t ${sectionIndex === 0 ? 'border-t' : ''}`}
      >
        <div className="py-4">
          <h3 className="text-lg tracking-[-0.36px]">{section.category}</h3>
        </div>
        {section.features.map((feature, featureIndex) => (
          <div
            key={featureIndex}
            className="text-muted-foreground grid border-t tracking-[-0.32px] max-lg:grid-rows-[auto_1fr] lg:grid-cols-4"
          >
            <span className="inline-flex items-center py-4">
              {feature.name}
            </span>
            <div className="col-span-3 grid grid-cols-3 divide-x text-center max-lg:border-t">
              {[feature.basic, feature.business, feature.enterprise].map(
                (value, i) => (
                  <FeatureValue key={i} value={value} />
                ),
              )}
            </div>
          </div>
        ))}
      </div>
    ))}
  </>
);

const FeatureValue = ({ value }: { value: string | boolean }) => (
  <div className={`flex items-center justify-center py-4`}>
    {typeof value === 'boolean' ? (
      value ? (
        <BadgeCheck className="text-muted-foreground mx-auto size-5" />
      ) : null
    ) : (
      <span className="text-muted-foreground-subtle font-semibold">
        {value}
      </span>
    )}
  </div>
);

export default Pricing;
