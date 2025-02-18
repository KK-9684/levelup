import { Injectable } from '@nestjs/common';
import { Cat } from '../interfaces/cat.interface';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    this.cats.push(cat);
    console.log(this.cats);
    return 'This action adds a new cat';
  }

  findAll(): Cat[] {
    return this.cats;
  }
}
