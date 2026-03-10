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
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';

import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

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
  @UseInterceptors(
    FilesInterceptor('files', 5, {
      // Allow up to 5 files
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const fileName = Date.now() + '-' + file.originalname;
          cb(null, fileName);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (file.originalname.match(/^.*\.(jpg|jpeg|pdf)$/)) {
          cb(null, true);
        } else {
          cb(
            new Error('Only image, pdf, and document files are allowed!'),
            false,
          );
        }
      },
      limits: { fileSize: 4 * 1024 * 1024 }, // 4MB Max file limit
    }),
  )
  public createUSer(
    @Body() createUserDto: CreateUserDto,
    @UploadedFiles() files: Express.Multer.File[],
  ): string {
    return `User created with body: ${JSON.stringify(createUserDto)} and files: ${files.map((file) => file.filename).join(', ')} `;
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
