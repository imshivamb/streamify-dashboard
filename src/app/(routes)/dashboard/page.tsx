import KeyMetrics from "@/components/dashboard/key-metrics";
import { UserGrowthChart } from "@/components/dashboard/user-growth-chart";
import { RevenueDistributionChart } from "@/components/dashboard/revenue";
import { TopStreamedSongsChart } from "@/components/dashboard/top-streams";
import { RecentStreamsTable } from "@/components/dashboard/recent-streams";

export default function DashboardPage() {
  return (
    <div>
      <h2 className="text-3xl font-bold tracking-tight ml-4">
        Dashboard Overview
      </h2>
      <div className="space-y-6 px-3 my-5">
        <KeyMetrics />
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        <UserGrowthChart />
        <RevenueDistributionChart />
        <TopStreamedSongsChart />
      </div>
      <div className="mt-6">
        <RecentStreamsTable />
      </div>
    </div>
  );
}
