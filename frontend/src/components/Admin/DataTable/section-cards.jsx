import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export function SectionCards() {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:grid-cols-2 xl:grid-cols-4 lg:px-6">
      <Card>
        <CardHeader className="relative">
          <CardDescription>Total Revenue</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums md:text-3xl">
            $1,250.00
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              <TrendingUpIcon className="w-3 h-3" />
              +12.5%
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex flex-col items-start gap-1 text-sm">
          <div className="flex items-center gap-2 font-medium line-clamp-1">
            Trending up this month <TrendingUpIcon className="w-4 h-4" />
          </div>
          <div className="text-muted-foreground">Visitors for the last 6 months</div>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader className="relative">
          <CardDescription>New Customers</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums md:text-3xl">
            1,234
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              <TrendingDownIcon className="w-3 h-3" />
              -20%
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex flex-col items-start gap-1 text-sm">
          <div className="flex items-center gap-2 font-medium line-clamp-1">
            Down 20% this period <TrendingDownIcon className="w-4 h-4" />
          </div>
          <div className="text-muted-foreground">Acquisition needs attention</div>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader className="relative">
          <CardDescription>Active Accounts</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums md:text-3xl">
            45,678
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              <TrendingUpIcon className="w-3 h-3" />
              +12.5%
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex flex-col items-start gap-1 text-sm">
          <div className="flex items-center gap-2 font-medium line-clamp-1">
            Strong user retention <TrendingUpIcon className="w-4 h-4" />
          </div>
          <div className="text-muted-foreground">Engagement exceed targets</div>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader className="relative">
          <CardDescription>Growth Rate</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums md:text-3xl">
            4.5%
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              <TrendingUpIcon className="w-3 h-3" />
              +4.5%
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex flex-col items-start gap-1 text-sm">
          <div className="flex items-center gap-2 font-medium line-clamp-1">
            Steady performance <TrendingUpIcon className="w-4 h-4" />
          </div>
          <div className="text-muted-foreground">Meets growth projections</div>
        </CardFooter>
      </Card>
    </div>
  );
}
