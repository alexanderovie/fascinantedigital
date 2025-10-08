import Image from 'next/image';

const DATA = [
  {
    subTitle: 'Keyword insight local',
    title: 'Keyword insight local',
    description:
      'Estudiamos tus keywords con volumen, competencia y tendencias reales de tu ciudad para enfocar esfuerzos.',
    icon: 'CircleHelp',
    image: '/images/homepage/adaptive-1.png',
  },
  {
    subTitle: 'SEO técnico a nivel experto',
    title: 'SEO técnico a nivel experto',
    description:
      'Auditoría avanzada con posibles mejoras inmediatas: velocidad, estructura, links internos y más.',
    icon: 'Volume2',
    image: '/images/homepage/adaptive-2.png',
  },
  {
    subTitle: 'Seguimiento competitivo',
    title: 'Seguimiento competitivo',
    description:
      'Te mostramos cómo tus rivales están posicionados, qué les funciona y cómo superarlos.',
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
