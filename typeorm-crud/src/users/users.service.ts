import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { PartialUpdateUserDto } from './dto/partial-update-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {}

  async create(createUserDto: CreateUserDto, imageUrl: string): Promise<Users> {
    const user = this.usersRepository.create({
      ...createUserDto,
      imageUrl,
    });

    return this.usersRepository.save(user);
  }

  async getAllUsers(): Promise<Users[]> {
    return this.usersRepository.find();
  }

  async getUserById(id: number): Promise<Users> {
    const user = await this.usersRepository.findOne({ where: { id: id } });
    if (!user) {
      throw new BadRequestException('user not Found');
    } else {
      return user;
    }
  }

  async deleteUser(id: number): Promise<string> {
    const user: Users | null = await this.getUserById(id);
    if (user == null) {
      throw new BadRequestException('user not Found');
    } else {
      await this.usersRepository.remove(user);
    }

    return `user deleted with id:${id}`;
  }

  async updateUser(
    updateUserDto: UpdateUserDto,
    id: number,
    imageUrl: string,
  ): Promise<Users> {
    const existingUser = await this.usersRepository.findOneBy({ id });

    if (!existingUser) {
      throw new BadRequestException('User not found');
    }

    const updatedUser = this.usersRepository.create({
      id,
      ...updateUserDto,
      imageUrl,
    });

    return await this.usersRepository.save(updatedUser);
  }

  async partialUpdateUser(
    partialUpdateUserDto: PartialUpdateUserDto,
    id: number,
  ): Promise<Users> {
    const existingUser = await this.usersRepository.findOneBy({ id });

    if (!existingUser) {
      throw new BadRequestException('User not found');
    }

    const updatedUser = this.usersRepository.merge(
      existingUser,
      partialUpdateUserDto,
    );

    return await this.usersRepository.save(updatedUser);
  }
}
