'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';

import {
  AlertCircle,
  AlertTriangle,
  BarChart3,
  CheckCircle2,
  ChevronRight,
  Info,
  Loader2,
  TrendingUp
} from 'lucide-react';

import TitleTag from '@/components/title-tag';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import type { OnPageSummaryResult } from '@/types/dataforseo';

interface AuditResultsDashboardProps {
  summary: OnPageSummaryResult;
  taskId: string;
  isComplete: boolean;
}

// Función para categorizar y traducir problemas a lenguaje simple
const categorizeIssue = (checkType: string, count: number) => {
  // Problemas BUENOS (verde)
  const goodIssues: Record<
    string,
    { title: string; description: string; explanation: string }
  > = {
    is_https: {
      title: 'Conexión Segura',
      description: 'Tu sitio usa HTTPS (conexión segura)',
      explanation:
        'Google prefiere sitios seguros y los usuarios confían más en ellos.',
    },
    has_html_doctype: {
      title: 'Código HTML Correcto',
      description: 'Tu sitio tiene el código HTML bien estructurado',
      explanation:
        'Esto ayuda a que los navegadores muestren tu sitio correctamente.',
    },
    canonical: {
      title: 'URLs Bien Configuradas',
      description: 'Google sabe cuál es la versión oficial de cada página',
      explanation:
        'Evita que Google indexe páginas duplicadas y mejora tu posicionamiento.',
    },
  };

  // Problemas de MEJORA (amarillo)
  const improvementIssues: Record<
    string,
    { title: string; description: string; explanation: string }
  > = {
    low_content_rate: {
      title: 'Poco Contenido en Algunas Páginas',
      description: 'Algunas páginas tienen poco texto',
      explanation:
        'Google prefiere páginas con más contenido útil para los usuarios.',
    },
    no_image_title: {
      title: 'Faltan Títulos en Algunas Imágenes',
      description: 'Algunas imágenes no tienen títulos descriptivos',
      explanation:
        'Los títulos ayudan a Google a entender qué hay en las imágenes.',
    },
    seo_friendly_url_characters_check: {
      title: 'URLs Podrían Ser Más Simples',
      description: 'Algunas direcciones web son un poco complicadas',
      explanation: 'URLs simples son más fáciles de recordar y compartir.',
    },
    seo_friendly_url_dynamic_check: {
      title: 'URLs Podrían Ser Más Estáticas',
      description: 'Algunas direcciones cambian dinámicamente',
      explanation: 'URLs que no cambian son mejores para SEO.',
    },
    seo_friendly_url_relative_length_check: {
      title: 'URLs Podrían Ser Más Cortas',
      description: 'Algunas direcciones web son muy largas',
      explanation: 'URLs cortas son más fáciles de recordar y compartir.',
    },
    seo_friendly_url: {
      title: 'URLs Podrían Ser Más Amigables',
      description: 'Algunas direcciones no son muy descriptivas',
      explanation: 'URLs que describen el contenido son mejores para SEO.',
    },
    seo_friendly_url_keywords_check: {
      title: 'URLs Podrían Incluir Palabras Clave',
      description: 'Algunas direcciones no incluyen palabras importantes',
      explanation:
        'Incluir palabras clave en la URL ayuda con el posicionamiento.',
    },
    low_readability_rate: {
      title: 'Algunos Textos Son Difíciles de Leer',
      description: 'Algunas páginas tienen texto complejo',
      explanation: 'Textos más simples son mejores para los usuarios y Google.',
    },
    title_too_short: {
      title: 'Algunos Títulos Son Muy Cortos',
      description: 'Algunas páginas tienen títulos muy breves',
      explanation:
        'Títulos más largos (50-60 caracteres) son mejores para SEO.',
    },
    low_character_count: {
      title: 'Poco Texto en Alguna Página',
      description: 'Alguna página tiene muy poco contenido',
      explanation: 'Páginas con más texto (300+ palabras) se posicionan mejor.',
    },
  };

  // Problemas REALES (rojo)
  const realIssues: Record<
    string,
    { title: string; description: string; explanation: string }
  > = {
    has_render_blocking_resources: {
      title: 'Archivos Que Ralentizan la Página',
      description: 'Algunos archivos hacen que tu sitio cargue más lento',
      explanation:
        'Esto molesta a los usuarios y Google penaliza sitios lentos.',
    },
    no_h1_tag: {
      title: 'Faltan Títulos Principales',
      description: 'Algunas páginas no tienen títulos principales (H1)',
      explanation:
        'Los títulos H1 le dicen a Google cuál es el tema principal de la página.',
    },
    irrelevant_meta_keywords: {
      title: 'Palabras Clave Irrelevantes',
      description:
        'Algunas páginas tienen palabras clave que no coinciden con el contenido',
      explanation:
        'Google puede penalizar sitios que usan palabras clave engañosas.',
    },
  };

  if (goodIssues[checkType]) {
    return {
      ...goodIssues[checkType],
      type: 'good',
      icon: CheckCircle2,
      color: 'text-green-600',
      badgeColor:
        'bg-green-100 text-green-800 border-green-200 hover:bg-green-600 hover:text-white',
    };
  }

  if (improvementIssues[checkType]) {
    return {
      ...improvementIssues[checkType],
      type: 'improvement',
      icon: AlertTriangle,
      color: 'text-yellow-600',
      badgeColor:
        'bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-600 hover:text-white',
    };
  }

  if (realIssues[checkType]) {
    return {
      ...realIssues[checkType],
      type: 'problem',
      icon: AlertCircle,
      color: 'text-red-600',
      badgeColor:
        'bg-red-100 text-red-800 border-red-200 hover:bg-red-600 hover:text-white',
    };
  }

  // Fallback para problemas no categorizados
  return {
    title: checkType
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (l) => l.toUpperCase()),
    description: `${count} ${count === 1 ? 'instancia' : 'instancias'} encontrada${count === 1 ? '' : 's'}`,
    explanation: 'Este es un aspecto técnico que puede mejorarse.',
    type: 'unknown',
    icon: Info,
    color: 'text-gray-600',
    badgeColor:
      'bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-600 hover:text-white',
  };
};

const AuditResultsDashboard = ({
  summary,
  taskId,
  isComplete,
}: AuditResultsDashboardProps) => {
  const [_refreshing, setRefreshing] = useState(false);
  const [expandedIssues, setExpandedIssues] = useState<Set<string>>(new Set());
  const [pagesData, setPagesData] = useState<Record<string, string[]>>({});

  // Función para obtener las páginas específicas de un problema
  const fetchPagesForIssue = async (checkType: string) => {
    if (pagesData[checkType]) return; // Ya tenemos los datos

    try {
      const response = await fetch(
        `/api/auditoria/pages/${taskId}?checkType=${checkType}`,
      );
      if (response.ok) {
        const data = await response.json();
        setPagesData((prev) => ({
          ...prev,
          [checkType]: data.pages || [],
        }));
      }
    } catch (error) {
      console.error('Error fetching pages:', error);
    }
  };

  // Función para manejar la expansión del acordeón
  const handleAccordionChange = (checkType: string, isExpanded: boolean) => {
    if (isExpanded) {
      setExpandedIssues((prev) => new Set([...prev, checkType]));
      fetchPagesForIssue(checkType);
    } else {
      setExpandedIssues((prev) => {
        const newSet = new Set(prev);
        newSet.delete(checkType);
        return newSet;
      });
    }
  };

  useEffect(() => {
    // Si la auditoría no está completa, recargar cada 5 segundos
    if (!isComplete) {
      const interval = setInterval(() => {
        setRefreshing(true);
        window.location.reload();
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isComplete]);

  const score = summary.page_metrics?.onpage_score || 0;
  const scoreColor =
    score >= 80
      ? 'text-green-600'
      : score >= 50
        ? 'text-yellow-600'
        : 'text-red-600';

  const totalIssues = summary.page_metrics?.checks
    ? Object.values(summary.page_metrics.checks).reduce(
      (sum, count) => sum + count,
      0,
    )
    : 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="container flex !max-w-[480px] flex-col gap-6 border-x !border-none py-4 max-lg:border-x lg:items-center lg:py-8 lg:text-center">
        <TitleTag title="Auditoría" icon={BarChart3} />
        <h2 className="text-3xl leading-tight tracking-tight md:text-4xl lg:text-6xl">
          Resultados de tu Auditoría SEO
        </h2>
        <p className="text-muted-foreground max-w-[600px] tracking-[-0.32px]">
          Análisis de:{' '}
          <strong>{summary.domain_info?.name || 'Tu sitio'}</strong>
          <br />
          <span className="text-sm">Task ID: {taskId}</span>
        </p>
      </div>

      {/* Estado */}
      {!isComplete && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="flex items-center gap-3 pt-6">
            <Loader2 className="size-6 animate-spin text-yellow-600" />
            <div>
              <p className="font-medium text-yellow-900">
                Auditoría en proceso...
              </p>
              <p className="text-sm text-yellow-700">
                Páginas analizadas: {summary.crawl_status?.pages_crawled || 0}{' '}
                de {summary.crawl_status?.max_crawl_pages || 100}
              </p>
              <p className="text-xs text-yellow-600">
                Esta página se actualizará automáticamente cada 5 segundos
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Score Principal */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Puntuación General SEO</h2>
            {isComplete && (
              <Badge
                variant="outline"
                className="border-green-600 text-green-600"
              >
                <CheckCircle2 className="mr-1 size-3" />
                Completado
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-8">
            <div
              className={`flex size-32 items-center justify-center rounded-full border-8 ${scoreColor}`}
            >
              <span className="text-5xl font-bold">{Math.round(score)}</span>
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <TrendingUp className="size-5" />
                <span className="text-lg font-medium">
                  {score >= 80
                    ? '¡Excelente! Tu sitio está bien optimizado'
                    : score >= 50
                      ? 'Hay oportunidades de mejora'
                      : 'Se requieren mejoras urgentes'}
                </span>
              </div>
              <p className="text-muted-foreground text-sm">
                Basado en el análisis de{' '}
                {summary.page_metrics
                  ? summary.page_metrics.links_internal +
                  summary.page_metrics.links_external
                  : 0}{' '}
                elementos
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Métricas de Crawl */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader>
            <h3 className="text-sm font-medium">Páginas Analizadas</h3>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {summary.crawl_status?.pages_crawled || 0}
            </p>
            <p className="text-muted-foreground text-sm">
              de {summary.crawl_status?.max_crawl_pages || 100} configuradas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-sm font-medium">Enlaces Internos</h3>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-600">
              {summary.page_metrics?.links_internal || 0}
            </p>
            <p className="text-muted-foreground text-sm">
              Enlaces dentro del sitio
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-sm font-medium">Enlaces Externos</h3>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">
              {summary.page_metrics?.links_external || 0}
            </p>
            <p className="text-muted-foreground text-sm">
              Enlaces a otros sitios
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-sm font-medium">Issues Detectados</h3>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-red-600">{totalIssues}</p>
            <p className="text-muted-foreground text-sm">
              Errores y advertencias
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Resumen por Categorías */}
      {summary.page_metrics?.checks &&
        Object.keys(summary.page_metrics.checks).length > 0 && (
          <Card>
            <CardHeader>
              <h2 className="text-xl font-bold">Resumen del Análisis</h2>
              <p className="text-muted-foreground text-sm">
                Aquí tienes un resumen de lo que está bien y lo que se puede
                mejorar
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                {(() => {
                  const issues = Object.entries(
                    summary.page_metrics.checks,
                  ).filter(([_, count]) => count > 0);
                  const goodCount = issues.filter(
                    ([type]) => categorizeIssue(type, 0).type === 'good',
                  ).length;
                  const improvementCount = issues.filter(
                    ([type]) => categorizeIssue(type, 0).type === 'improvement',
                  ).length;
                  const problemCount = issues.filter(
                    ([type]) => categorizeIssue(type, 0).type === 'problem',
                  ).length;

                  return (
                    <>
                      <div className="flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 p-4">
                        <CheckCircle2 className="size-6 text-green-600" />
                        <div>
                          <p className="font-semibold text-green-900">
                            {goodCount}
                          </p>
                          <p className="text-sm text-green-700">
                            Cosas que están bien
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 rounded-lg border border-yellow-200 bg-yellow-50 p-4">
                        <AlertTriangle className="size-6 text-yellow-600" />
                        <div>
                          <p className="font-semibold text-yellow-900">
                            {improvementCount}
                          </p>
                          <p className="text-sm text-yellow-700">
                            Se pueden mejorar
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
                        <AlertCircle className="size-6 text-red-600" />
                        <div>
                          <p className="font-semibold text-red-900">
                            {problemCount}
                          </p>
                          <p className="text-sm text-red-700">
                            Necesitan atención
                          </p>
                        </div>
                      </div>
                    </>
                  );
                })()}
              </div>
            </CardContent>
          </Card>
        )}

      {/* Análisis Detallado */}
      {summary.page_metrics?.checks &&
        Object.keys(summary.page_metrics.checks).length > 0 && (
          <Card>
            <CardHeader>
              <h2 className="text-xl font-bold">
                Análisis Detallado de tu Sitio
              </h2>
              <p className="text-muted-foreground text-sm">
                Aquí tienes todo lo que encontramos, explicado de forma simple.
                Haz clic en cada elemento para ver las páginas específicas.
              </p>
            </CardHeader>
            <CardContent>
              <Accordion type="multiple" className="space-y-2">
                {Object.entries(summary.page_metrics.checks)
                  .filter(([_, count]) => count > 0)
                  .sort(([_, a], [__, b]) => b - a)
                  .map(([checkType, count]) => {
                    const issueInfo = categorizeIssue(checkType, count);
                    const IconComponent = issueInfo.icon;
                    const isExpanded = expandedIssues.has(checkType);
                    const pages = pagesData[checkType] || [];

                    return (
                      <AccordionItem
                        key={checkType}
                        value={checkType}
                        className={`rounded-lg border ${issueInfo.type === 'good'
                            ? 'border-green-200 bg-green-50'
                            : issueInfo.type === 'improvement'
                              ? 'border-yellow-200 bg-yellow-50'
                              : issueInfo.type === 'problem'
                                ? 'border-red-200 bg-red-50'
                                : 'border-gray-200 bg-gray-50'
                          }`}
                      >
                        <AccordionTrigger
                          className="px-4 py-3 hover:no-underline"
                          onClick={() =>
                            handleAccordionChange(checkType, !isExpanded)
                          }
                        >
                          <div className="flex flex-1 items-center gap-3">
                            <IconComponent
                              className={`size-5 ${issueInfo.color} flex-shrink-0`}
                            />
                            <div className="flex-1 text-left">
                              <div className="flex items-center justify-between">
                                <h3 className="font-semibold text-gray-900">
                                  {issueInfo.title}
                                </h3>
                              <Badge
                                className={`${issueInfo.badgeColor} ml-2`}
                              >
                                {count} {count !== 1 ? 'instancias' : 'instancia'}
                              </Badge>
                              </div>
                              <p className="mt-1 text-sm text-gray-700">
                                {issueInfo.description}
                              </p>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-3">
                          <div className="space-y-3">
                            <div className="rounded-md bg-white/70 p-3">
                              <p className="text-xs text-gray-600">
                                <strong>¿Por qué es importante?</strong>{' '}
                                {issueInfo.explanation}
                              </p>
                            </div>

                            {pages.length > 0 ? (
                              <div className="rounded-md bg-white/50 p-3">
                                <h4 className="mb-2 font-medium text-gray-800">
                                  Páginas afectadas ({pages.length}):
                                </h4>
                                <div className="max-h-40 space-y-1 overflow-y-auto">
                                  {pages.map((url, index) => (
                                    <div
                                      key={index}
                                      className="flex items-center gap-2 text-sm"
                                    >
                                      <span className="text-gray-500">•</span>
                                      <a
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="truncate text-blue-600 hover:text-blue-800 hover:underline"
                                        title={url}
                                      >
                                        {url}
                                      </a>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ) : isExpanded ? (
                              <div className="rounded-md bg-white/50 p-3">
                                <p className="text-sm text-gray-600">
                                  Cargando páginas específicas...
                                </p>
                              </div>
                            ) : (
                              <div className="rounded-md bg-white/50 p-3">
                                <p className="text-sm text-gray-600">
                                  Haz clic en la flecha para ver las páginas
                                  específicas
                                </p>
                              </div>
                            )}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    );
                  })}
              </Accordion>
            </CardContent>
          </Card>
        )}

      {/* Información del Dominio */}
      {summary.domain_info && (
        <Card>
          <CardHeader>
            <h2 className="text-xl font-bold">Información del Dominio</h2>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-sm font-medium">Dominio</p>
                <p className="text-muted-foreground">
                  {summary.domain_info.name}
                </p>
              </div>
              {summary.domain_info.cms && (
                <div>
                  <p className="text-sm font-medium">CMS Detectado</p>
                  <p className="text-muted-foreground">
                    {summary.domain_info.cms}
                  </p>
                </div>
              )}
              {summary.domain_info.ip && (
                <div>
                  <p className="text-sm font-medium">IP del Servidor</p>
                  <p className="text-muted-foreground">
                    {summary.domain_info.ip}
                  </p>
                </div>
              )}
              {summary.domain_info.server && (
                <div>
                  <p className="text-sm font-medium">Servidor</p>
                  <p className="text-muted-foreground">
                    {summary.domain_info.server}
                  </p>
                </div>
              )}
              {summary.domain_info.ssl_info?.valid_certificate !==
                undefined && (
                  <div>
                    <p className="text-sm font-medium">Certificado SSL</p>
                    <div className="flex items-center gap-2">
                      {summary.domain_info.ssl_info.valid_certificate ? (
                        <>
                          <CheckCircle2 className="size-4 text-green-600" />
                          <span className="text-green-600">Válido</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="size-4 text-red-600" />
                          <span className="text-red-600">Inválido</span>
                        </>
                      )}
                    </div>
                  </div>
                )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* CTA */}
      {isComplete && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-xl font-bold text-blue-900">
                ¿Quieres que arreglemos todo esto por ti?
              </h3>
              <p className="mt-2 mb-4 text-blue-700">
                Nuestro equipo puede mejorar tu sitio web y hacer que aparezca
                mejor en Google. Te explicamos todo paso a paso y trabajamos
                contigo.
              </p>
              <div className="flex flex-col justify-center gap-3 sm:flex-row">
                <Button asChild className="gap-1">
                  <Link href="/contact">
                    Agenda una Consulta Gratuita
                    <ChevronRight className="size-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="gap-1">
                  <Link href="/pricing">
                    Ver Nuestros Planes
                    <ChevronRight className="size-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AuditResultsDashboard;
