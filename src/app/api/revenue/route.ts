import { NextResponse } from 'next/server'
import { generateRevenueDistribution } from '@/lib/mock-data'

export async function GET() {
  const revenueDistribution = generateRevenueDistribution()
  return NextResponse.json(revenueDistribution)
}