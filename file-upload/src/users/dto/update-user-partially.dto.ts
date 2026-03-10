import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto'; // Change 'import type' to 'import'

export class UpdateUserPartiallyDto extends PartialType(CreateUserDto) {}
