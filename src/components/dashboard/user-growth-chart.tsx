"use client";

import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
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
import { fetchUserGrowth } from "@/lib/api";
import { Skeleton } from "../ui/skeleton";

const chartConfig = {
  totalUsers: {
    label: "Total Users",
    color: "hsl(var(--chart-1))",
  },
  activeUsers: {
    label: "Active Users",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function UserGrowthChart() {
  const { userGrowth, setUserGrowth } = useStore((state) => ({
    userGrowth: state.userGrowth,
    setUserGrowth: state.setUserGrowth,
  }));

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchUserGrowth().then((data) => {
      setUserGrowth(data);
      setIsLoading(false);
    });
  }, [setUserGrowth]);

  if (isLoading) {
    return (
      <Card className="h-[400px]">
        <CardHeader>
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-4 w-1/3 mt-2" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[200px] w-full" />
        </CardContent>
        <CardFooter className="flex-col items-start gap-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </CardFooter>
      </Card>
    );
  }

  const latestMonth = userGrowth[userGrowth.length - 1];
  const previousMonth = userGrowth[userGrowth.length - 2];
  const totalUsersTrend =
    ((latestMonth.totalUsers - previousMonth.totalUsers) /
      previousMonth.totalUsers) *
    100;
  const activeUsersTrend =
    ((latestMonth.activeUsers - previousMonth.activeUsers) /
      previousMonth.activeUsers) *
    100;

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Growth</CardTitle>
        <CardDescription>{`${userGrowth[0].date} - ${
          userGrowth[userGrowth.length - 1].date
        }`}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={userGrowth}
            margin={{
              left: 0,
              right: 5,
              top: 5,
              bottom: 5,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) =>
                new Date(value).toLocaleString("default", { month: "short" })
              }
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="totalUsers"
              type="monotone"
              stroke="var(--color-totalUsers)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="activeUsers"
              type="monotone"
              stroke="var(--color-activeUsers)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Total Users: {totalUsersTrend > 0 ? "Trending up" : "Trending down"}{" "}
          by {Math.abs(totalUsersTrend).toFixed(1)}% this month
          {totalUsersTrend > 0 ? (
            <TrendingUp className="h-4 w-4" />
          ) : (
            <TrendingDown className="h-4 w-4" />
          )}
        </div>
        <div className="flex gap-2 font-medium leading-none">
          Active Users: {activeUsersTrend > 0 ? "Trending up" : "Trending down"}{" "}
          by {Math.abs(activeUsersTrend).toFixed(1)}% this month
          {activeUsersTrend > 0 ? (
            <TrendingUp className="h-4 w-4" />
          ) : (
            <TrendingDown className="h-4 w-4" />
          )}
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total and active users for the last 12 months
        </div>
      </CardFooter>
    </Card>
  );
}
