import { NextResponse } from 'next/server';
import { serverUserStorage } from '@/lib/serverUserStorage';

export async function POST(request: Request) {
  const { email, password, name } = await request.json();
  
  const newUser = serverUserStorage.addUser({ email, password, name });
  
  if (newUser) {
    const { password: _, ...userWithoutPassword } = newUser;
    return NextResponse.json({ user: userWithoutPassword, message: 'User registered successfully' });
  } else {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 });
  }
}