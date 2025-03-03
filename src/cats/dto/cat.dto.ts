// dto/cat.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class CatDto {
  @ApiProperty({
    description: 'The unique identifier of the cat',
    example: 1,
    required: false,
  })
  id?: number;

  @ApiProperty({
    description: 'The name of the cat',
    example: 'Whiskers',
  })
  name: string;

  @ApiProperty({
    description: 'The breed of the cat',
    example: 'Siamese',
  })
  breed: string;

  @ApiProperty({
    description: 'The age of the cat',
    example: 3,
  })
  age: number;
}
