'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface LinksAnalysisChartProps {
  stats: {
    total: number;
    internal: number;
    external: number;
    dofollow: number;
    nofollow: number;
  };
}

const LinksAnalysisChart = ({ stats }: LinksAnalysisChartProps) => {
  const internalPercentage =
    stats.total > 0 ? Math.round((stats.internal / stats.total) * 100) : 0;
  const externalPercentage =
    stats.total > 0 ? Math.round((stats.external / stats.total) * 100) : 0;
  const dofollowPercentage =
    stats.total > 0 ? Math.round((stats.dofollow / stats.total) * 100) : 0;
  const nofollowPercentage =
    stats.total > 0 ? Math.round((stats.nofollow / stats.total) * 100) : 0;

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Distribución por tipo */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Distribución de Enlaces</h3>
          <p className="text-muted-foreground text-sm">
            Enlaces internos vs externos
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-4 w-4 rounded bg-blue-500" />
                <span className="text-sm font-medium">Enlaces Internos</span>
              </div>
              <div className="text-right">
                <div className="font-semibold">{stats.internal}</div>
                <div className="text-muted-foreground text-xs">
                  ({internalPercentage}%)
                </div>
              </div>
            </div>
            <div className="h-2 w-full rounded-full bg-gray-200">
              <div
                className="h-2 rounded-full bg-blue-500"
                style={{ width: `${internalPercentage}%` }}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-4 w-4 rounded bg-green-500" />
                <span className="text-sm font-medium">Enlaces Externos</span>
              </div>
              <div className="text-right">
                <div className="font-semibold">{stats.external}</div>
                <div className="text-muted-foreground text-xs">
                  ({externalPercentage}%)
                </div>
              </div>
            </div>
            <div className="h-2 w-full rounded-full bg-gray-200">
              <div
                className="h-2 rounded-full bg-green-500"
                style={{ width: `${externalPercentage}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Distribución por atributos */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Atributos de Enlaces</h3>
          <p className="text-muted-foreground text-sm">Dofollow vs Nofollow</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-4 w-4 rounded bg-purple-500" />
                <span className="text-sm font-medium">Dofollow</span>
              </div>
              <div className="text-right">
                <div className="font-semibold">{stats.dofollow}</div>
                <div className="text-muted-foreground text-xs">
                  ({dofollowPercentage}%)
                </div>
              </div>
            </div>
            <div className="h-2 w-full rounded-full bg-gray-200">
              <div
                className="h-2 rounded-full bg-purple-500"
                style={{ width: `${dofollowPercentage}%` }}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-4 w-4 rounded bg-orange-500" />
                <span className="text-sm font-medium">Nofollow</span>
              </div>
              <div className="text-right">
                <div className="font-semibold">{stats.nofollow}</div>
                <div className="text-muted-foreground text-xs">
                  ({nofollowPercentage}%)
                </div>
              </div>
            </div>
            <div className="h-2 w-full rounded-full bg-gray-200">
              <div
                className="h-2 rounded-full bg-orange-500"
                style={{ width: `${nofollowPercentage}%` }}
              />
            </div>
          </div>

          <div className="mt-6 rounded-lg bg-blue-50 p-4">
            <h4 className="mb-2 font-medium text-blue-900">
              ¿Qué significan estos datos?
            </h4>
            <div className="space-y-1 text-sm text-blue-800">
              <p>
                <strong>Enlaces internos:</strong> Ayudan a distribuir autoridad
                dentro de tu sitio
              </p>
              <p>
                <strong>Enlaces externos:</strong> Pueden dar autoridad a otros
                sitios
              </p>
              <p>
                <strong>Dofollow:</strong> Pasan autoridad SEO a la página de
                destino
              </p>
              <p>
                <strong>Nofollow:</strong> No pasan autoridad SEO
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LinksAnalysisChart;
