import { Injectable } from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Character } from '@prisma/client';

@Injectable()
export class CharactersService {
  charactersService: any;
  constructor(private prisma: PrismaService) {}
  create(createCharacterDto: CreateCharacterDto) {
    return this.prisma.character.create({ data: createCharacterDto });
  }

  findAll() {
    return this.prisma.character.findMany();
  }

  findAllOrdered() {
    return this.prisma.character.findMany({ orderBy: { name: 'asc' } });
  }

  async findBySmith(): Promise<Character[]> {
    return this.charactersService.findAll().then(characters => {
      return characters.filter(character => character.name.includes(" Smith"))
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} character`;
  }

  update(id: number, updateCharacterDto: UpdateCharacterDto) {
    return this.prisma.character.update({
      where: { id },
      data: updateCharacterDto,
    });
  }

  remove(id: number) {
    return this.prisma.character.delete({ where: { id } });
  }
}
