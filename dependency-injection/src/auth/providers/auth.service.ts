import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
  ) {}
  public login(id: string): object | undefined {
    const user = this.userService.getUserById(id);
    if (user) {
      return {
        message: 'Login successful',
        user,
      };
    } else {
      return {
        message: 'Login failed. User not found.',
      };
    }
  }

  public isAuth(): boolean {
    return false;
  }
}
