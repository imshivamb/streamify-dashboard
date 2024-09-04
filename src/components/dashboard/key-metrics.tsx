"use client";

import { useEffect } from "react";
import { useStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchMetrics } from "@/lib/api";
import { TrendingDown, TrendingUp } from "lucide-react";

const KeyMetrics = () => {
  const { metrics, setMetrics } = useStore((state) => ({
    metrics: state.metrics,
    setMetrics: state.setMetrics,
  }));

  useEffect(() => {
    fetchMetrics().then(setMetrics);
  }, [setMetrics]);

  // if (!metrics) return <div>Loading metrics...</div>;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-gray-500">Total Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2.5">
            <p className="text-[28px] tracking-tight font-bold">
              {metrics?.totalUsers.toLocaleString()}
            </p>
            <span className="flex gap-1 bg-red-500/10 text-red-500 px-2 py-1 rounded-lg font-semibold items-center text-xs">
              +0.54 <TrendingDown size={14} />
            </span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-gray-500">Active Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2.5">
            <p className="text-[28px] tracking-tight font-bold">
              {metrics?.activeUsers.toLocaleString()}
            </p>
            <span className="flex gap-1 bg-green-500/10 text-green-500 px-2 py-1 rounded-lg font-semibold items-center text-xs">
              +7.68 <TrendingUp size={14} />
            </span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-gray-500">Total Streams</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-1.5 items-center">
            <p className="text-[28px] tracking-tight font-bold">
              {metrics?.totalStreams.toLocaleString()}
            </p>
            <span className="flex gap-1 bg-green-500/10 text-green-500 px-2 py-1 rounded-lg font-semibold items-center text-xs">
              +6.03 <TrendingUp size={14} />
            </span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-gray-500">Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-1.5 items-center">
            <p className="text-[28px] tracking-tight font-bold">
              ${metrics?.revenue.toLocaleString()}
            </p>
            <span className="flex gap-1 bg-red-500/10 text-red-500 px-2 py-1 rounded-lg font-semibold items-center text-xs">
              +0.14 <TrendingDown size={14} />
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default KeyMetrics;
