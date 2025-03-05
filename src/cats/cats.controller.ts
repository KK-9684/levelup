import {
  Controller,
  Get,
  Req,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UseFilters,
  ParseIntPipe,
  UsePipes,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import { HttpExceptionFilter } from 'src/utils/http-exception.filter';
import { CatsValidationPipe } from 'src/pipes/cats.validation.pipe';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CatDto } from './dto/cat.dto';
import { RolesGuard } from 'src/guards/roles.guard';

export interface FindOneParams {
  id: number;
}

@Controller('cats')
@UseGuards(RolesGuard)
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  @UseFilters(new HttpExceptionFilter())
  @ApiOperation({ summary: 'Create a new cat' })
  @ApiResponse({
    status: 201,
    description: 'The cat has been successfully created.',
    type: CatDto,
  })
  create(@Body() createCatDto: CatDto) {
    this.catsService.create(createCatDto);
  }

  @Get(':id')
  @UsePipes(new CatsValidationPipe())
  @ApiOperation({ summary: 'Get a cat by ID' })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the cat',
    required: true,
    type: Number, // Define the type of the parameter
  })
  @ApiResponse({
    status: 200,
    description: 'The cat has been successfully retrieved.',
    type: String,
  })
  @ApiResponse({
    status: 404,
    description: 'Cat not found.',
  })
  findOne(@Param() params: FindOneParams): CatDto {
    console.log(params.id);
    return {
      id: 1,
      name: 'cat',
      breed: 'female',
      age: 1,
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a cat by ID' })
  @ApiResponse({
    status: 200,
    description: 'The cat has been successfully updated.',
    type: CatDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Cat not found.',
  })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateCatDto: CatDto) {
    console.log(updateCatDto);
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a cat by ID' })
  @ApiResponse({
    status: 200,
    description: 'The cat has been successfully removed.',
  })
  @ApiResponse({
    status: 404,
    description: 'Cat not found.',
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return `This action removes a #${id} cat`;
  }

  @Get()
  @ApiOperation({ summary: 'Get all cats' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all cats.',
    type: [CatDto],
  })
  findAll(@Req() request: Request): Cat[] {
    console.log(request.query);
    return this.catsService.findAll();
  }

  @Get('female')
  @ApiOperation({ summary: 'Get all female cats' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all female cats.',
    type: String,
  })
  findAllFemale(): string {
    return 'This action returns all female cats';
  }

  @Get('male')
  @ApiOperation({ summary: 'Get all male cats' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all male cats.',
    type: String,
  })
  findAllMale(): string {
    return 'This action returns all male cats';
  }
}
