'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface ContentAnalysisChartProps {
  content: {
    title?: string;
    meta_description?: string;
    h1?: string[];
    h2?: string[];
    h3?: string[];
    h4?: string[];
    h5?: string[];
    h6?: string[];
    plain_text_size?: number;
    plain_text_size_with_spaces?: number;
    plain_text_rate?: number;
    autolink_size?: number;
    internal_link_count?: number;
    external_link_count?: number;
    image_count?: number;
    words_count?: number;
    paragraph_count?: number;
    title_length?: number;
    meta_description_length?: number;
  };
}

const ContentAnalysisChart = ({ content }: ContentAnalysisChartProps) => {
  const getLengthColor = (length: number, min: number, max: number) => {
    if (length < min) return 'bg-red-100 text-red-800 border-red-200';
    if (length > max) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-green-100 text-green-800 border-green-200';
  };

  const getLengthLabel = (length: number, min: number, max: number) => {
    if (length < min) return 'Muy corto';
    if (length > max) return 'Muy largo';
    return 'Longitud óptima';
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Análisis de títulos y meta */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Títulos y Meta Tags</h3>
          <p className="text-muted-foreground text-sm">
            Análisis de elementos SEO principales
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Title Tag */}
            <div className="rounded-lg border p-4">
              <div className="mb-2 flex items-center justify-between">
                <h4 className="font-medium">Title Tag</h4>
                <Badge
                  className={getLengthColor(content.title_length || 0, 30, 60)}
                >
                  {getLengthLabel(content.title_length || 0, 30, 60)}
                </Badge>
              </div>
              <p className="text-muted-foreground mb-1 text-sm">
                Longitud: {content.title_length || 0} caracteres
              </p>
              <p className="rounded bg-gray-50 p-2 font-mono text-sm">
                {content.title || 'No encontrado'}
              </p>
            </div>

            {/* Meta Description */}
            <div className="rounded-lg border p-4">
              <div className="mb-2 flex items-center justify-between">
                <h4 className="font-medium">Meta Description</h4>
                <Badge
                  className={getLengthColor(
                    content.meta_description_length || 0,
                    120,
                    160,
                  )}
                >
                  {getLengthLabel(
                    content.meta_description_length || 0,
                    120,
                    160,
                  )}
                </Badge>
              </div>
              <p className="text-muted-foreground mb-1 text-sm">
                Longitud: {content.meta_description_length || 0} caracteres
              </p>
              <p className="rounded bg-gray-50 p-2 font-mono text-sm">
                {content.meta_description || 'No encontrado'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Análisis de contenido */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Análisis de Contenido</h3>
          <p className="text-muted-foreground text-sm">
            Métricas de contenido y estructura
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg border p-3 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {content.words_count || 0}
              </div>
              <div className="text-muted-foreground text-xs">Palabras</div>
            </div>
            <div className="rounded-lg border p-3 text-center">
              <div className="text-2xl font-bold text-green-600">
                {content.paragraph_count || 0}
              </div>
              <div className="text-muted-foreground text-xs">Párrafos</div>
            </div>
            <div className="rounded-lg border p-3 text-center">
              <div className="text-2xl font-bold text-purple-600">
                {content.image_count || 0}
              </div>
              <div className="text-muted-foreground text-xs">Imágenes</div>
            </div>
            <div className="rounded-lg border p-3 text-center">
              <div className="text-2xl font-bold text-orange-600">
                {(content.internal_link_count || 0) +
                  (content.external_link_count || 0)}
              </div>
              <div className="text-muted-foreground text-xs">Enlaces</div>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Enlaces internos:</span>
              <span className="font-medium">
                {content.internal_link_count || 0}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Enlaces externos:</span>
              <span className="font-medium">
                {content.external_link_count || 0}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Tasa de texto:</span>
              <span className="font-medium">
                {content.plain_text_rate?.toFixed(1) || 0}%
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Análisis de headers */}
      <Card className="md:col-span-2">
        <CardHeader>
          <h3 className="text-lg font-semibold">Estructura de Headers</h3>
          <p className="text-muted-foreground text-sm">
            Análisis de jerarquía H1-H6
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-6">
            {[
              {
                level: 'H1',
                content: content.h1,
                count: content.h1?.length || 0,
              },
              {
                level: 'H2',
                content: content.h2,
                count: content.h2?.length || 0,
              },
              {
                level: 'H3',
                content: content.h3,
                count: content.h3?.length || 0,
              },
              {
                level: 'H4',
                content: content.h4,
                count: content.h4?.length || 0,
              },
              {
                level: 'H5',
                content: content.h5,
                count: content.h5?.length || 0,
              },
              {
                level: 'H6',
                content: content.h6,
                count: content.h6?.length || 0,
              },
            ].map((header) => (
              <div
                key={header.level}
                className="rounded-lg border p-3 text-center"
              >
                <div
                  className={`text-xl font-bold ${
                    header.level === 'H1'
                      ? 'text-red-600'
                      : header.level === 'H2'
                        ? 'text-orange-600'
                        : header.level === 'H3'
                          ? 'text-yellow-600'
                          : 'text-gray-600'
                  }`}
                >
                  {header.count}
                </div>
                <div className="text-muted-foreground text-xs">
                  {header.level}
                </div>
                {header.content && header.content.length > 0 && (
                  <div className="mt-2 text-xs">
                    <details>
                      <summary className="cursor-pointer text-blue-600 hover:text-blue-800">
                        Ver títulos
                      </summary>
                      <div className="mt-1 space-y-1 text-left">
                        {header.content.slice(0, 3).map((title, idx) => (
                          <div
                            key={idx}
                            className="truncate text-xs"
                            title={title}
                          >
                            {title}
                          </div>
                        ))}
                        {header.content.length > 3 && (
                          <div className="text-muted-foreground text-xs">
                            +{header.content.length - 3} más...
                          </div>
                        )}
                      </div>
                    </details>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-lg bg-yellow-50 p-4">
            <h4 className="mb-2 font-medium text-yellow-900">
              Recomendaciones de Headers
            </h4>
            <div className="space-y-1 text-sm text-yellow-800">
              <p>
                • <strong>H1:</strong> Debe haber solo uno por página (
                {content.h1?.length || 0} encontrado
                {content.h1?.length !== 1 ? 's' : ''})
              </p>
              <p>
                • <strong>H2-H6:</strong> Usa una jerarquía lógica para
                estructurar tu contenido
              </p>
              <p>
                • <strong>Keywords:</strong> Incluye palabras clave relevantes
                en los headers
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentAnalysisChart;
