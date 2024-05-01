import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { IsEmail, IsNotEmpty, Length } from "class-validator";

@Entity()
export class User{
  
  @PrimaryGeneratedColumn("uuid")
    id: number

    @Column()
    @IsNotEmpty({ message: 'The first name is required' })
    firstName: string

    @Column()
    @IsNotEmpty({ message: 'The last name is required' })
    lastName: string

    @Column({ unique: true })
    @IsEmail({}, { message: 'Incorrect email' })
    @IsNotEmpty({ message: 'The email is required' })
    email: string

    @Column({ unique: true })
    @IsNotEmpty({ message: 'The username is required' })
    @Length(3, 30, { message: 'The username must be at least 3 but not longer than 30 characters' })
    userName: string

    @Column()
    @IsNotEmpty({ message: 'The password is required' })
    @Length(6, 30, { message: 'The password must be at least 6 but not longer than 30 characters' })
    password: string
}