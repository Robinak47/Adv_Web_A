import { Controller, Get, Param } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get(':id')
  public getPosts(@Param('id') id: string): object | undefined {
    return this.postsService.getPostsByUserId(id);
  }
}
