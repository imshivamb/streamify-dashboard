import { NextResponse } from 'next/server';
import { findUser } from '@/lib/userUtils';

export async function POST(request: Request) {
  const { email, password } = await request.json();
  
  const user = findUser(email, password);
  if (user) {
    const { password: _, ...userWithoutPassword } = user;
    return NextResponse.json({ user: userWithoutPassword });
  } else {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }
}