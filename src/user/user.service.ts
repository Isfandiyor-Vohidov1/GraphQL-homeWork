import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
@Injectable()
export class UserService {
  private users: User[] = [];

  async create(input: CreateUserInput): Promise<User> {
    const newUser: User = {
      id: this.users.length ? Math.max(...this.users.map(u => u.id)) + 1 : 1,
      ...input,
    };
    this.users.push(newUser);
    return newUser;
  } н

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async findOne(id: number): Promise<User> {
    const user = this.users.find(u => u.id === id);
    if (!user) throw new Error(`User with ID ${id} not found`);
    return user;
  }

  async update(input: UpdateUserInput): Promise<User> {
    const index = this.users.findIndex(u => u.id === input.id);
    if (index < 0) throw new Error('User not found');

    this.users[index] = { ...this.users[index], ...input };
    return this.users[index];
  }

  async delete(id: number): Promise<boolean> {
    const initialLength = this.users.length;
    this.users = this.users.filter(u => u.id !== id);
    return this.users.length < initialLength;
  }
}