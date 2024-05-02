import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { IsEmail, IsNotEmpty, Length } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import * as process from "process"

@Entity()
export class Film{

  @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    @IsNotEmpty({ message: 'The film name is required' })
    @ApiProperty({ example: 'Film Example', description: 'Name of the film' })
    filmName: string

    @Column()
    @IsNotEmpty({ message: 'durationInMinutes' })
    @ApiProperty({ example: 90, description: 'Duration of the film' })
    durationInMinutes: number;

    @Column({ type: 'date' }) // Usando o tipo 'date' para representar a data
    @ApiProperty({ example: '2022-05-06', description: 'Date of the film' })
    releaseDate: Date;
}