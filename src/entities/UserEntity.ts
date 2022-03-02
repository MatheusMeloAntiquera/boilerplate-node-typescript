import { IsBoolean, IsDate, IsEmail, IsNotEmpty, IsString, Length } from "class-validator";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @IsNotEmpty()
  id: number;

  @Column({
    type: "varchar",
    length: 100,
  })
  @IsNotEmpty()
  name: string;

  @Column({
    type: "varchar",
    length: 100,
    unique: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column({
    type: "varchar",
    length: 100,
  })
  @IsString()
  @IsNotEmpty()
  @Length(8, 15)
  password: string;

  @Column({ default: true })
  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;

  @CreateDateColumn()
  @IsDate()
  createdAt: Date;

  @UpdateDateColumn()
  @IsDate()
  updatedAt: Date;
}
