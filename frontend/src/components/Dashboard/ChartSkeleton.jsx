// src/components/Dashboard/ChartSkeleton.jsx

import { Skeleton } from "@/components/ui/skeleton";

export function ChartSkeleton() {
  return (
    <div className="flex h-[250px] w-full items-end gap-2 p-4">
      <Skeleton className="h-2/5 w-8" />
      <Skeleton className="h-3/5 w-8" />
      <Skeleton className="h-4/5 w-8" />
      <Skeleton className="h-2/3 w-8" />
      <Skeleton className="h-1/2 w-8" />
      <Skeleton className="h-3/4 w-8" />
      <Skeleton className="h-full w-8" />
    </div>
  );
}

// You can place this inside the chart component or make it reusable
import { AlertTriangle } from "lucide-react";
export function ChartError({ message }) {
    return (
        <div className="flex h-[250px] w-full flex-col items-center justify-center gap-2 text-destructive">
            <AlertTriangle className="h-10 w-10" />
            <p className="font-semibold">{message}</p>
        </div>
    );
}