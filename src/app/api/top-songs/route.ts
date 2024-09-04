import { NextResponse } from 'next/server'
import { generateTopStreamedSongs } from '@/lib/mock-data'

export async function GET() {
  const topStreamedSongs = generateTopStreamedSongs()
  return NextResponse.json(topStreamedSongs)
}