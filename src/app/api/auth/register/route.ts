import { NextResponse } from 'next/server'

let mockUsers = [
  { id: '1', email: 'user@example.com', password: 'password', name: 'Test User' }
]

export async function POST(request: Request) {
  const { email, password, name } = await request.json()
  
  if (mockUsers.some(u => u.email === email)) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 })
  }

  const newUser = { id: String(mockUsers.length + 1), email, password, name }
  mockUsers.push(newUser)

  const { password: _, ...userWithoutPassword } = newUser
  return NextResponse.json({ user: userWithoutPassword })
}