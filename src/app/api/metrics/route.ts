import { generateMetrics } from "@/lib/mock-data";
import { NextResponse } from "next/server";

export async function GET() {
    const metrics = generateMetrics();
    return NextResponse.json(metrics);
}