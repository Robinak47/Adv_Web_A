import { IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class ParamDto {
  @IsNumber()
  @Type(() => Number)
  id: number;
}
