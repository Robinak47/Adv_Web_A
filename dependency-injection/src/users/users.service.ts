import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { AuthService } from '../auth/providers/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}
  public getAllUsers(): string | undefined {
    const auth = this.authService.isAuth();
    if (auth) {
      return 'All users from service';
    }
  }

  public getUserById(id: string): object | undefined {
    const users = [
      {
        id: '1',
        name: 'John Doe',
      },
      {
        id: '2',
        name: 'Jane Doe',
      },
      {
        id: '3',
        name: 'Jim Doe',
      },
    ];

    return users.find((user) => user.id === id);
  }
}
