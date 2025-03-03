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
} from '@nestjs/common';
import { Request } from 'express';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import { HttpExceptionFilter } from 'src/utils/http-exception.filter';
import { CatsValidationPipe } from 'src/pipes/cats.validation.pipe';

export interface FindOneParams {
  id: number;
}

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  @UseFilters(new HttpExceptionFilter())
  create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get(':id')
  @UsePipes(new CatsValidationPipe())
  findOne(@Param() params: FindOneParams): string {
    console.log(params.id);
    return `This action returns a #${params.id} cat`;
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCatDto: UpdateCatDto,
  ) {
    console.log(updateCatDto);
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return `This action removes a #${id} cat`;
  }

  @Get()
  findAll(@Req() request: Request): Cat[] {
    console.log(request.query);
    return this.catsService.findAll();
  }

  @Get('female')
  findAllFemale(): string {
    return 'This action returns all female cats';
  }

  @Get('male')
  findAllMale(): string {
    return 'This action returns all male cats';
  }
}
