// src/components/Dashboard/SectionCards.jsx

import React from 'react';
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useDashboardMetrics } from '@/hooks/useDashboardMetrics';
import { MetricCardSkeleton } from '../../../components/Dashboard/MetricCardSkeleton';
import { AlertTriangle } from 'lucide-react';

/**
 * A dynamic component that displays key metrics for the dashboard.
 * It uses a custom hook to fetch data and handles loading and error states.
 */
export function SectionCards() {
  const { metrics, loading, error } = useDashboardMetrics();

  // Display a skeleton loading state while fetching data
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 lg:grid-cols-4 lg:px-6">
        {Array.from({ length: 8 }).map((_, idx) => (
          <MetricCardSkeleton key={idx} />
        ))}
      </div>
    );
  }

  // Display a user-friendly error message if the API call fails
  if (error) {
    return (
      <div className="col-span-full flex flex-col items-center justify-center gap-2 rounded-lg border border-destructive/50 bg-destructive/10 p-6 text-destructive">
        <AlertTriangle className="h-8 w-8" />
        <h3 className="font-semibold">{error}</h3>
      </div>
    );
  }

  // Render the metric cards once data is successfully loaded
  return (
    <div className="grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 lg:grid-cols-4 lg:px-6">
      {metrics.map((item) => {
        // Fallback for missing icon to prevent crashes
        const Icon = item.Icon || AlertTriangle; 
        
        return (
          <Card key={item.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardDescription>{item.title}</CardDescription>
              <Icon className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <div className="p-6 pt-0">
              <CardTitle className="text-3xl font-bold tabular-nums">
                {/* Format number with commas for readability */}
                {(item.value || 0).toLocaleString()}
              </CardTitle>
            </div>
          </Card>
        );
      })}
    </div>
  );
}