import { generateMetrics, generateRecentStreams } from "@/lib/mock-data";
import { NextResponse } from "next/server";

export async function GET() {
    const recentStreams = generateRecentStreams(100);
    return NextResponse.json(recentStreams);
}