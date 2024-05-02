import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDTO{
  @ApiProperty({ example: 'firstName Example', description: 'firstName' })
  firstname: string;
  @ApiProperty({ example: 'lastName Example', description: 'lastName' })
  lastname: string;
  @ApiProperty({ example: 'userName Example', description: 'userName' })
  username: string;
  @ApiProperty({ example: 'email', description: 'email' })
  email: string;
  @ApiProperty({ example: 'password Example', description: 'password' })
  password: string;
}