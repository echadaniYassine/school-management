
"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

// Import the new hook and helper components
import { useAttendanceChart } from "../../hooks/useAttendanceChart";
import { ChartSkeleton, ChartError } from "../Dashboard/ChartSkeleton.jsx"; // Adjust path

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

// Updated Chart Config for the new data structure
const chartConfig = {
  students: {
    label: "Students",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function ChartAreaInteractive() {
  const [timeRange, setTimeRange] = React.useState("30d");
  
  // Use the custom hook to get dynamic data
  const { chartData, loading, error } = useAttendanceChart({ timeRange });

  return (
    <Card>
      <CardHeader className="flex-row items-start justify-between gap-4">
        <div>
          <CardTitle>Daily Attendance</CardTitle>
          <CardDescription>Student attendance over the selected period</CardDescription>
        </div>
        <div className="flex items-center gap-2">
          {/* Use ToggleGroup for desktop */}
          <ToggleGroup type="single" value={timeRange} onValueChange={setTimeRange} variant="outline" className="hidden sm:flex">
            <ToggleGroupItem value="90d" aria-label="Last 90 days">90d</ToggleGroupItem>
            <ToggleGroupItem value="30d" aria-label="Last 30 days">30d</ToggleGroupItem>
            <ToggleGroupItem value="7d" aria-label="Last 7 days">7d</ToggleGroupItem>
          </ToggleGroup>
          {/* Use Select for mobile */}
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-28 sm:hidden" aria-label="Select time range">
              <SelectValue placeholder="Select range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        {loading && <ChartSkeleton />}
        {error && <ChartError message={error} />}
        {!loading && !error && (
            <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="fillStudents" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-students)" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="var(--color-students)" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  minTickGap={32}
                  tickFormatter={(value) => new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Area dataKey="students" type="natural" fill="url(#fillStudents)" stroke="var(--color-students)" />
              </AreaChart>
            </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}