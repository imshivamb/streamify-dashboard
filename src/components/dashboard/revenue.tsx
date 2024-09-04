"use client";

import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Pie, PieChart, Cell, Legend, ResponsiveContainer } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useStore } from "@/lib/store";
import { fetchRevenueDistribution } from "@/lib/api";
import { Skeleton } from "../ui/skeleton";

const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

export function RevenueDistributionChart() {
  const { revenueDistribution, setRevenueDistribution } = useStore((state) => ({
    revenueDistribution: state.revenueDistribution,
    setRevenueDistribution: state.setRevenueDistribution,
  }));

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchRevenueDistribution().then((data) => {
      setRevenueDistribution(data);
      setIsLoading(false);
    });
  }, [setRevenueDistribution]);

  if (isLoading) {
    return (
      <Card className="flex flex-col h-[400px]">
        <CardHeader className="items-start pb-0">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2 mt-2" />
        </CardHeader>
        <CardContent className="flex-1 pb-0 flex items-center justify-center">
          <Skeleton className="h-[150px] w-[150px]  rounded-full" />
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </CardFooter>
      </Card>
    );
  }

  const totalRevenue = revenueDistribution.reduce(
    (sum, item) => sum + item.amount,
    0
  );
  const chartConfig: ChartConfig = revenueDistribution.reduce(
    (config, item, index) => ({
      ...config,
      [item.source]: {
        label: item.source,
        color: COLORS[index % COLORS.length],
      },
    }),
    {}
  );

  const chartData = revenueDistribution.map((item) => ({
    ...item,
    fill: chartConfig[item.source].color,
  }));

  // Calculate the trend (you may need to adjust this based on your actual data)
  const previousTotalRevenue = totalRevenue * 0.95; // Assuming 5% growth for this example
  const trend =
    ((totalRevenue - previousTotalRevenue) / previousTotalRevenue) * 100;

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-start pb-0">
        <CardTitle>Revenue Distribution</CardTitle>
        <CardDescription>Current Financial Year</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[280px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="amount"
                nameKey="source"
                cx="50%"
                cy="50%"
                outerRadius={80}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          {trend > 0 ? "Trending up" : "Trending down"} by{" "}
          {Math.abs(trend).toFixed(1)}% this year
          {trend > 0 ? (
            <TrendingUp className="h-4 w-4" />
          ) : (
            <TrendingDown className="h-4 w-4" />
          )}
        </div>
        <div className="leading-none text-muted-foreground">
          Total Revenue: ${totalRevenue.toLocaleString()}
        </div>
      </CardFooter>
    </Card>
  );
}
