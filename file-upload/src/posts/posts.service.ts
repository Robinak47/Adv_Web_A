import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PostsService {
  postList = [
    {
      title: 'Post 1',
      content: 'This is the content of post 1',
    },
    {
      title: 'Post 2',
      content: 'This is the content of post 2',
    },
    {
      title: 'Post 3',
      content: 'This is the content of post 3',
    },
  ];

  constructor(private readonly userService: UsersService) {}
  public getPostsByUserId(id: string): object | undefined {
    const user = this.userService.getUserById(id);
    if (user) {
      return this.postList;
    }
  }
}
