import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  public getAllUsers(): string {
    return 'All users from service';
  }
}
