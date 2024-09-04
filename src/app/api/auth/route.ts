import { NextResponse } from 'next/server'

let mockUsers = [
  { id: '1', email: 'user@example.com', password: 'password', name: 'Test User' }
]

export async function POST(request: Request) {
  const { email, password } = await request.json()
  
  const user = mockUsers.find(u => u.email === email && u.password === password)
  if (user) {
    const { password, ...userWithoutPassword } = user
    return NextResponse.json({ user: userWithoutPassword })
  } else {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }
}