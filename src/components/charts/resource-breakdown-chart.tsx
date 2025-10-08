'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface ResourceBreakdownChartProps {
  stats: {
    total: number;
    html: number;
    css: number;
    js: number;
    images: number;
    other: number;
    totalSize: number;
    compressedSize: number;
  };
}

const ResourceBreakdownChart = ({ stats }: ResourceBreakdownChartProps) => {
  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const compressionRate =
    stats.totalSize > 0
      ? Math.round(
          ((stats.totalSize - stats.compressedSize) / stats.totalSize) * 100,
        )
      : 0;

  const resourceTypes = [
    { name: 'HTML', count: stats.html, color: 'bg-blue-500' },
    { name: 'CSS', count: stats.css, color: 'bg-green-500' },
    { name: 'JavaScript', count: stats.js, color: 'bg-yellow-500' },
    { name: 'Imágenes', count: stats.images, color: 'bg-purple-500' },
    { name: 'Otros', count: stats.other, color: 'bg-gray-500' },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Gráfico de pastel visual */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Desglose de Recursos</h3>
          <p className="text-muted-foreground text-sm">
            Distribución de {stats.total} recursos encontrados
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {resourceTypes.map((type) => {
              const percentage =
                stats.total > 0
                  ? Math.round((type.count / stats.total) * 100)
                  : 0;
              return (
                <div
                  key={type.name}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className={`h-4 w-4 rounded ${type.color}`} />
                    <span className="text-sm font-medium">{type.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground text-sm">
                      {type.count}
                    </span>
                    <span className="text-muted-foreground text-xs">
                      ({percentage}%)
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Estadísticas de tamaño */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Tamaño de Descarga</h3>
          <p className="text-muted-foreground text-sm">
            Optimización de recursos
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Tamaño Original</span>
              <span className="font-mono text-sm">
                {formatBytes(stats.totalSize)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Tamaño Comprimido</span>
              <span className="font-mono text-sm">
                {formatBytes(stats.compressedSize)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Compresión</span>
              <span
                className={`text-sm font-semibold ${
                  compressionRate >= 60
                    ? 'text-green-600'
                    : compressionRate >= 40
                      ? 'text-yellow-600'
                      : 'text-red-600'
                }`}
              >
                {compressionRate}%
              </span>
            </div>
            <div className="h-2 w-full rounded-full bg-gray-200">
              <div
                className={`h-2 rounded-full ${
                  compressionRate >= 60
                    ? 'bg-green-500'
                    : compressionRate >= 40
                      ? 'bg-yellow-500'
                      : 'bg-red-500'
                }`}
                style={{ width: `${compressionRate}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResourceBreakdownChart;
