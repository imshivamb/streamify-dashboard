"use client";

import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";
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
import { fetchTopStreamedSongs } from "@/lib/api";
import { Skeleton } from "../ui/skeleton";

const chartConfig = {
  streams: {
    label: "Streams",
    color: "hsl(var(--chart-1))",
  },
  label: {
    color: "hsl(var(--background))",
  },
} satisfies ChartConfig;

export function TopStreamedSongsChart() {
  const { topStreamedSongs, setTopStreamedSongs } = useStore((state) => ({
    topStreamedSongs: state.topStreamedSongs,
    setTopStreamedSongs: state.setTopStreamedSongs,
  }));

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchTopStreamedSongs().then((data) => {
      setTopStreamedSongs(data);
      setIsLoading(false);
    });
  }, [setTopStreamedSongs]);

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
          <Skeleton className="h-4 w-1/2" />
        </CardFooter>
      </Card>
    );
  }

  const chartData = topStreamedSongs.map((song) => ({
    song: song.title,
    streams: song.streams,
  }));

  const totalStreams = topStreamedSongs.reduce(
    (sum, song) => sum + song.streams,
    0
  );
  const previousTotalStreams = totalStreams * 0.95;
  const trend =
    ((totalStreams - previousTotalStreams) / previousTotalStreams) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top 5 Streamed Songs</CardTitle>
        <CardDescription>Current Month</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              right: 16,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="song"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              hide
            />
            <XAxis dataKey="streams" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="streams"
              layout="vertical"
              fill="var(--color-streams)"
              radius={4}
            >
              <LabelList
                dataKey="song"
                position="insideLeft"
                offset={8}
                className="fill-[--color-label]"
                fontSize={12}
              />
              <LabelList
                dataKey="streams"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
                formatter={(value: any) => `${(value / 1000).toFixed(1)}k`}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          {trend > 0 ? "Trending up" : "Trending down"} by{" "}
          {Math.abs(trend).toFixed(1)}% this month
          {trend > 0 ? (
            <TrendingUp className="h-4 w-4" />
          ) : (
            <TrendingDown className="h-4 w-4" />
          )}
        </div>
        <div className="leading-none text-muted-foreground">
          Total streams for top 5 songs: {totalStreams.toLocaleString()}
        </div>
      </CardFooter>
    </Card>
  );
}
