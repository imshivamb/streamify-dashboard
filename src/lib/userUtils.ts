import { User } from '@/types';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src', 'data', 'users.json');


export function getUsers(): User[] {
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(fileContents);
  return data.users;
}

export function saveUsers(users: User[]): void {
  const data = { users };
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

export function findUser(email: string, password: string): User | undefined {
  const users = getUsers();
  return users.find(u => u.email === email && u.password === password);
}

export function addUser(user: Omit<User, 'id'>): User {
  const users = getUsers();
  const newUser = { ...user, id: String(users.length + 1) };
  users.push(newUser);
  saveUsers(users);
  return newUser;
}