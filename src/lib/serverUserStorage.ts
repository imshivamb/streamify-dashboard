import { User } from '@/types';

let users: User[] = [];

export const serverUserStorage = {
  addUser: (user: User) => {
    const existingUser = users.find(u => u.email === user.email);
    if (existingUser) {
      return null;
    }
    const newUser = { ...user, id: String(users.length + 1) };
    users.push(newUser);
    return newUser;
  },
  findUser: (email: string, password: string) => {
    return users.find(u => u.email === email && u.password === password) || null;
  }
};