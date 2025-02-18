import {
  Controller,
  Get,
  Req,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { Request } from 'express';
import { CreateCatDto } from './create-cat.dto';
import { UpdateCatDto } from './update-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from '../interfaces/cat.interface';

interface FindOneParams {
  id: string;
}

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get(':id')
  findOne(@Param() params: FindOneParams): string {
    console.log(params.id);
    return `This action returns a #${params.id} cat`;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    console.log(updateCatDto);
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
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
