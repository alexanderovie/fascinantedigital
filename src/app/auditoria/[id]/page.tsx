import { notFound } from 'next/navigation';

import type { Metadata } from 'next';

import AuditResultsDashboard from '@/components/sections/audit-results-dashboard';
import { getOnPageService } from '@/lib/dataforseo/onpage';

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

    // Intentar obtener el resumen
    let summary;
    try {
      summary = await onPageService.getSummary(id);
    } catch (_error) {
      // Si no hay resultados aún, crear un objeto temporal con datos iniciales
      console.log('Task is initializing, showing loading state...');
      summary = {
        crawl_progress: 'in_progress',
        crawl_status: {
          max_crawl_pages: 1,
          pages_in_queue: 1,
          pages_crawled: 0,
        },
        domain_info: null,
        page_metrics: null,
      } as any; // Temporal hasta que DataForSEO devuelva datos reales
    }

    // Verificar si la auditoría está completa
    const isComplete = summary.crawl_progress === 'finished';

    return (
      <div className="container py-14 md:py-20 lg:py-24">
        <AuditResultsDashboard
          summary={summary}
          taskId={id}
          isComplete={isComplete}
        />
      </div>
    );
  } catch (error) {
    console.error('Error loading audit results:', error);
    notFound();
  }
};

export default AuditResultsPage;
