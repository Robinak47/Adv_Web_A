import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
  ValidationPipe,
  Patch,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserByIdDto } from './dto/get-user-by-id.dto';
import { UpdateUserPartiallyDto } from './dto/update-user-partially.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  getUSers(): string | undefined {
    return this.usersService.getAllUsers();
  }

  @Post()
  public createUSer(@Body() createUserDto: CreateUserDto): string {
    return `User created with body: ${JSON.stringify(createUserDto)}`;
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
  public searchUser(@Param('id') id: string): object | undefined {
    return this.usersService.getUserById(id);
  }

  @Patch(':id')
  public patchUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserPartiallyDto: UpdateUserPartiallyDto,
  ): string {
    return `Patching user with id: ${id} and body: ${JSON.stringify(updateUserPartiallyDto)}`;
  }
}
