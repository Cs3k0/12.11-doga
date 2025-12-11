import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, Put } from '@nestjs/common';
import { ChildrenService } from './children.service';
import { CreateChildDto } from './dto/create-child.dto';
import { UpdateChildDto } from './dto/update-child.dto';

@Controller('children')
export class ChildrenController {
  constructor(private readonly childrenService: ChildrenService) {}

  @Post()
  create(@Body() createChildDto: CreateChildDto) {
    return this.childrenService.create(createChildDto);
  }

  @Put('/:id/toys/:toysid')
  AddChildrenToToy(
    @Param('id') childId: string,
    @Param('toysid') toyId: string,
  ) {
    return this.childrenService.AddChildrenToToy({childId: +childId, toyId: +toyId});
  }
  
  @Delete('/:id/toys/:toysid')
  RemoveChildrenFromToy(
    @Param('id') childId: string,
    @Param('toysid') toyId: string,
  ) {
    return this.childrenService.RemoveChildrenFromToy({childId: +childId, toyId: +toyId});
  }

  @Get()
  findAll() {
    return this.childrenService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    let child = await this.childrenService.findOne(+id);
    if (!child) {
      throw new NotFoundException(`Child with ID ${id} not found`);
      }
    return child;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateChildDto: UpdateChildDto) {
    let child = await this.childrenService.findOne(+id);
    if (!child) {
      throw new NotFoundException(`Child with ID ${id} not found`);
      }
    return this.childrenService.update(+id, updateChildDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    let child = await this.childrenService.findOne(+id);
    if (!child) {
      throw new NotFoundException(`Child with ID ${id} not found`);
      }
    return this.childrenService.remove(+id);
  }
}
