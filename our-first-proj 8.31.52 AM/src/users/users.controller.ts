import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Patch,
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
  public createUSer(@Body() data: any): string {
    return `User created with body: ${JSON.stringify(data)}`;
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
    @Query('limit') limit: string,
  ): string {
    console.log('type of id is ', typeof id);
    return `Searching for user with id: ${id} and limit: ${limit}`;
  }

  @Patch(':id')
  public patchUser(@Param('id') id: string, @Body() data: any): string {
    return `Patching user with id: ${id} and body: ${JSON.stringify(data)}`;
  }
}
