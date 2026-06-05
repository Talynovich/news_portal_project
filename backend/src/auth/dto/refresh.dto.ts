import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshDto {
  @ApiProperty({
    description: 'refresh_token',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsInVzZXJuYW1lIjoidGVzdFVzZXIiLCJyb2xlIjoidXNlciIsImlhdCI6MTc4MDYyNzg2MSwiZXhwIjoxNzgwODg3MDYxfQ.sy8O83r22MhxwEk0DJh6bwrjugPR30D7nJ0i8rgPWI8',
  })
  @IsString()
  @IsNotEmpty()
  refresh_token: string;
}
