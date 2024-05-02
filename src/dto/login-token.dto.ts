import { ApiProperty } from "@nestjs/swagger";

export class LoginTokenDTO{
  @ApiProperty({ example: 'userName Example', description: 'userName' })
  username: string;
  @ApiProperty({ example: 'password Example', description: 'password' })
  password: string;
}