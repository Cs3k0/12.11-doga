import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { ToysService } from './toys.service';
import { CreateToyDto } from './dto/create-toy.dto';
import { UpdateToyDto } from './dto/update-toy.dto';

@Controller('toys')
export class ToysController {
  constructor(private readonly toysService: ToysService) {}

  @Post()
  create(@Body() createToyDto: CreateToyDto) {
    return this.toysService.create(createToyDto);
  }

  @Get()
  findAll() {
    return this.toysService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    let toy = await this.toysService.findOne(+id);
    if (!toy) {
      throw new NotFoundException(`Toy with id ${id} not found`);
    }
    return toy;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateToyDto: UpdateToyDto) {
    let toy = await this.toysService.findOne(+id);
    if (!toy) {
      throw new NotFoundException(`Toy with id ${id} not found`);
    }
    return this.toysService.update(+id, updateToyDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    let toy = await this.toysService.findOne(+id);
    if (!toy) {
      throw new NotFoundException(`Toy with id ${id} not found`);
    }
    return this.toysService.remove(+id);
  }
}
