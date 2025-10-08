import Image from 'next/image';

const DATA = [
  {
    subTitle: 'Análisis de keywords',
    title: 'Palabras que venden',
    description:
      'Te mostramos qué buscan tus clientes y qué oportunidades estás dejando pasar.',
    icon: 'CircleHelp',
    image: '/images/homepage/adaptive-1.png',
  },
  {
    subTitle: 'Inteligencia competitiva',
    title: 'Competencia bajo la lupa',
    description:
      'Analizamos cómo se están moviendo tus competidores y diseñamos estrategias para que los superes.',
    icon: 'Volume2',
    image: '/images/homepage/adaptive-2.png',
  },
  {
    subTitle: 'Marketing basado en datos',
    title: 'Estrategias efectivas',
    description:
      'Campañas diseñadas con base en datos reales de búsqueda para conectar con tus clientes ideales.',
    icon: 'Lightbulb',
    image: '/images/homepage/adaptive-3.png',
  },
];
const AdaptiveList = () => {
  return (
    <div className="items-center">
      <div className="grid flex-1 max-lg:divide-y max-lg:border-x lg:grid-cols-3 lg:divide-x">
        {DATA.map((item, index) => (
          <div
            key={index}
            className={`relative isolate pt-5 text-start lg:pt-20`}
          >
            <span className="px-1 tracking-[-0.32px] lg:px-8">
              {item.subTitle}
            </span>
            <h3 className={`mt-2 px-1 text-lg tracking-[-0.36px] lg:px-8`}>
              {item.title}
            </h3>
            <p className="text-muted-foreground px-1 py-4 tracking-[-0.32px] lg:px-8">
              {item.description}
            </p>
            <div className="border-t py-4 lg:px-2">
              <Image
                src={item.image}
                alt={item.title}
                width={416}
                height={233}
                sizes="(max-width: 768px) 300px, 416px"
                className="rounded-md shadow-md lg:rounded-xl lg:shadow-lg dark:invert"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdaptiveList;
