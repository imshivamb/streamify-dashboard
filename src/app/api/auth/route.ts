import { NextResponse } from 'next/server';
import { serverUserStorage } from '@/lib/serverUserStorage';

export async function POST(request: Request) {
  const { email, password } = await request.json();
  
  const user = serverUserStorage.findUser(email, password);
  
  if (user) {
    const { password: _, ...userWithoutPassword } = user;
    return NextResponse.json({ user: userWithoutPassword, message: 'Login successful' });
  } else {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }
}