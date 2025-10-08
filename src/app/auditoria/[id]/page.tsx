import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getOnPageService } from '@/lib/dataforseo/onpage';
import AuditResultsDashboard from '@/components/sections/audit-results-dashboard';

export const metadata: Metadata = {
  title: 'Resultados de Auditoría SEO',
  description:
    'Visualiza los resultados completos de tu auditoría SEO con recomendaciones accionables.',
  robots: {
    index: false,
    follow: false,
  },
};

interface PageProps {
  params: Promise<{ id: string }>;
}

const AuditResultsPage = async ({ params }: PageProps) => {
  const { id } = await params;

  try {
    // Obtener los resultados de la auditoría
    const onPageService = getOnPageService();
    const summary = await onPageService.getSummary(id);

    // Verificar si la auditoría está completa
    const isComplete = summary.crawl_progress === 'finished';

    return (
      <div className="container py-14 md:py-20 lg:py-24">
        <AuditResultsDashboard summary={summary} taskId={id} isComplete={isComplete} />
      </div>
    );
  } catch (error) {
    console.error('Error loading audit results:', error);
    notFound();
  }
};

export default AuditResultsPage;

