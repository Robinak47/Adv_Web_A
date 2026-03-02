import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  getUSers(): string {
    return this.usersService.getAllUsers();
  }

  @Post()
  public createUSer(@Body() body: any): string {
    return `User created with body: ${JSON.stringify(body)}`;
  }

  //   @Get(':id')
  //   public getUSerById(id: string): string {
  //     return `User by id: ${id}`;
  //   }

  @Put(':id')
  public updateUser(id: string): string {
    return `User updated with id: ${id}`;
  }

  @Delete(':id')
  public deleteUser(@Param('id') id: string): string {
    return `User deleted with id: ${id}`;
  }

  @Get(':id')
  public searchUser(
    @Param('id') id: string,
    @Query('search') search: string,
  ): string {
    return `Searching for user with id: ${id} and search term: ${search}`;
  }
}
