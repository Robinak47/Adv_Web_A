import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    type: 'varchar',
    length: 100,
  })
  name: string;
  @Column({
    type: 'int',
  })
  age: number;
  @Column({
    type: 'varchar',
    length: 200,
    unique: true,
  })
  email: string;
  @Column({
    type: 'varchar',
    length: 100,
  })
  password: string;
  @Column({
    type: 'varchar',
    length: 200,
    nullable: true,
  })
  imageUrl: string;
}
