import { generateUserGrowth } from "@/lib/mock-data";
import { NextResponse } from "next/server";

export async function GET() {
    const userGrowth = generateUserGrowth();
    return NextResponse.json(userGrowth);
}