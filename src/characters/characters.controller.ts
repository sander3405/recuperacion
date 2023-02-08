import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Character } from '@prisma/client';
import { CharactersService } from './characters.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';

@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) { }

  @Post()
  create(@Body() createCharacterDto: CreateCharacterDto) {
    return this.charactersService.create(createCharacterDto);
  }

  @Get()
  findAll() {
    return this.charactersService.findAll();
  }

  @Get('ordered')
  async findAllOrdered(): Promise<Character[]> {
    return this.charactersService.findAllOrdered();
  }
  
  @Get('/smith')
  async findBySmith(): Promise<Character[]> {
  return this.charactersService.findAll().then(characters => {
  return characters.filter(character => character.name.includes(" Smith"))
  });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.charactersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCharacterDto: UpdateCharacterDto) {
    return this.charactersService.update(+id, updateCharacterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.charactersService.remove(+id);
  }
}
