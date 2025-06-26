import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) { }
  
  @Query(() => [User])
  users(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Mutation(() => User)
  createUser(@Args('input') input: CreateUserInput): Promise<User> {
    return this.userService.create(input);
  }

  @Query(() => User)
  user(@Args('id', { type: () => Number }) id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  @Mutation(() => User)
  updateUser(@Args('input') input: UpdateUserInput): Promise<User> {
    return this.userService.update(input);
  }

  @Mutation(() => Boolean)
  deleteUser(@Args('id', { type: () => Number }) id: number): Promise<boolean> {
    return this.userService.delete(id);
  }
}