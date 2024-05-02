import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { IsEmail, IsNotEmpty, Length } from "class-validator";

@Entity()
export class Film{

  @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    @IsNotEmpty({ message: 'The film name is required' })
    filmName: string

    @Column()
    @IsNotEmpty({ message: 'durationInMinutes' })
    durationInMinutes: number;

    @Column({ type: 'date' }) // Usando o tipo 'date' para representar a data
    releaseDate: Date;
}