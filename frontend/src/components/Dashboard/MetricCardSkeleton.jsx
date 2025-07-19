// src/components/Dashboard/MetricCardSkeleton.jsx

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export function MetricCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardDescription>
          <Skeleton className="h-4 w-24" />
        </CardDescription>
        <CardTitle>
          <Skeleton className="h-8 w-16" />
        </CardTitle>
      </CardHeader>
    </Card>
  );
}