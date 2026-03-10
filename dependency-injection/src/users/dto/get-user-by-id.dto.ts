import { IsInt } from 'class-validator';
import { Transform } from 'class-transformer';

export class GetUserByIdDto {
  @IsInt()
  @Transform(({ value }) => parseInt(value, 10))
  id: number;
  // No validation needed for this DTO as it only contains an ID parameter
}
