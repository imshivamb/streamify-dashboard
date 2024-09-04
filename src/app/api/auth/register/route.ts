import { NextResponse } from 'next/server';
import { getUsers, addUser } from '@/lib/userUtils';

export async function POST(request: Request) {
  const { email, password, name } = await request.json();
  
  const users = getUsers();
  if (users.some(u => u.email === email)) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 });
  }

  const newUser = addUser({ email, password, name });
  const { password: _, ...userWithoutPassword } = newUser;
  
  return NextResponse.json({ user: userWithoutPassword });
}