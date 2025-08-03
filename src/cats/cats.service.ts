import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';

export interface Cat {
  id: number;
  name: string;
  age: number;
}

@Injectable()
export class CatsService {
  private cats: Cat[] = [];
  private nextId = 1;

  create(createCatDto: CreateCatDto): Cat {
    const newCat: Cat = {
      id: this.nextId++,
      ...createCatDto,
    };
    this.cats.push(newCat);
    return newCat;
  }

  findAll(): Cat[] {
    return this.cats;
  }

  findOne(id: number): Cat {
    const cat = this.cats.find(cat => cat.id === id);
    if (!cat) {
      throw new NotFoundException(`Cat with ID ${id} not found`);
    }
    return cat;
  }

  update(id: number, updateCatDto: UpdateCatDto): Cat {
    const catIndex = this.cats.findIndex(cat => cat.id === id);
    if (catIndex === -1) {
      throw new NotFoundException(`Cat with ID ${id} not found`);
    }

    const updatedCat = {
      ...this.cats[catIndex],
      ...updateCatDto,
    };

    this.cats[catIndex] = updatedCat;
    return updatedCat;
  }

  remove(id: number): void {
    const catIndex = this.cats.findIndex(cat => cat.id === id);
    if (catIndex === -1) {
      throw new NotFoundException(`Cat with ID ${id} not found`);
    }
    this.cats.splice(catIndex, 1);
  }
}
