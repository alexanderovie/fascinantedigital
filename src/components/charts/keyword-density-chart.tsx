'use client';

import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface KeywordDensityChartProps {
  keywords: Array<{
    keyword: string;
    keyword_length: number;
    keyword_count: number;
    keyword_density: number;
    position: number;
  }>;
}

const KeywordDensityChart = ({ keywords }: KeywordDensityChartProps) => {
  const [sortBy, setSortBy] = useState<'count' | 'density'>('count');

  const sortedKeywords = [...keywords].sort((a, b) => {
    if (sortBy === 'count') {
      return b.keyword_count - a.keyword_count;
    }
    return b.keyword_density - a.keyword_density;
  });

  const topKeywords = sortedKeywords.slice(0, 20);

  const getDensityColor = (density: number) => {
    if (density >= 5) return 'bg-red-100 text-red-800 border-red-200';
    if (density >= 2) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-green-100 text-green-800 border-green-200';
  };

  const getDensityLabel = (density: number) => {
    if (density >= 5) return 'Alta densidad';
    if (density >= 2) return 'Densidad moderada';
    return 'Buena densidad';
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">
              Análisis de Palabras Clave
            </h3>
            <p className="text-muted-foreground text-sm">
              Densidad y frecuencia de palabras clave encontradas
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setSortBy('count')}
              className={`rounded px-3 py-1 text-xs ${
                sortBy === 'count'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              Por Frecuencia
            </button>
            <button
              onClick={() => setSortBy('density')}
              className={`rounded px-3 py-1 text-xs ${
                sortBy === 'density'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              Por Densidad
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {topKeywords.map((keyword, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-lg border p-3"
            >
              <div className="flex items-center gap-3">
                <span className="text-muted-foreground font-mono text-sm">
                  #{index + 1}
                </span>
                <span className="font-medium">{keyword.keyword}</span>
                <Badge className={getDensityColor(keyword.keyword_density)}>
                  {getDensityLabel(keyword.keyword_density)}
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="text-center">
                  <div className="font-semibold">{keyword.keyword_count}</div>
                  <div className="text-muted-foreground text-xs">veces</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold">
                    {keyword.keyword_density.toFixed(2)}%
                  </div>
                  <div className="text-muted-foreground text-xs">densidad</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {keywords.length > 20 && (
          <div className="mt-4 text-center">
            <p className="text-muted-foreground text-sm">
              Mostrando las 20 palabras clave más relevantes de{' '}
              {keywords.length} encontradas
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default KeywordDensityChart;
