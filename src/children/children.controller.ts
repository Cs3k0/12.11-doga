import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, Put } from '@nestjs/common';
import { ChildrenService } from './children.service';
import { CreateChildDto } from './dto/create-child.dto';
import { UpdateChildDto } from './dto/update-child.dto';
import { ChildEntity } from './entities/child.entity';
import { ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiOperation } from '@nestjs/swagger';


@Controller('children')
export class ChildrenController {
  constructor(private readonly childrenService: ChildrenService) {}

  @Post()
  @ApiOperation({ 
    summary: 'Új gyermek létrehozása',
    description: 'Ezzel a végponttal új gyermeket hozhatunk létre az adatbázisban.',
  })
  @ApiOkResponse({
    description: 'A gyermek sikeresen létrehozva.',
    type: ChildEntity,
  })
  create(@Body() createChildDto: CreateChildDto) {
    return this.childrenService.create(createChildDto);
  }


  @Put('/:id/toys/:toysid')
  @ApiOperation({ 
    summary: 'Gyermek hozzáadása játékhoz',
    description: 'Ezzel a végponttal egy gyermeket adhatunk hozzá egy játékhoz.',
  })
  @ApiOkResponse({
    description: 'A gyermek sikeresen hozzáadva a játékhoz.',
  })
  @ApiParam({
    name: 'id',
    description: 'A gyermek egyedi azonosítója',
    example: 1,
  })
  @ApiParam({ 
    name: 'toysid',
    description: 'A játék egyedi azonosítója',
    example: 1,
  })
  async AddChildrenToToy(
    @Param('id') childId: string,
    @Param('toysid') toyId: string,
  ) {
    let child = await this.childrenService.findOne(+childId);
    let toy = await this.childrenService.findOne(+toyId);
    if(!child || !toy) {
      throw new NotFoundException(`Child or Toy not found`);
    }
    return this.childrenService.AddChildrenToToy({childId: +childId, toyId: +toyId});
  }

  
  @Delete('/:id/toys/:toysid')
  @ApiOperation({ 
    summary: 'Gyermek eltávolítása játékból',
    description: 'Ezzel a végponttal egy gyermeket távolíthatunk el egy játékból.',   
  })
  @ApiOkResponse({
    description: 'A gyermek sikeresen eltávolítva a játékból.',
  })
  async RemoveChildrenFromToy(
    @Param('id') childId: string,
    @Param('toysid') toyId: string,
  ) {
    let child = await this.childrenService.findOne(+childId);
    let toy = await this.childrenService.findOne(+toyId);
    if(!child || !toy) {
      throw new NotFoundException(`Child or Toy not found`);
    }
    return this.childrenService.RemoveChildrenFromToy({childId: +childId, toyId: +toyId});
  }


  @Get()
    @ApiOperation({
    summary: 'Gyermekek lekérdezése',
    description: 'Ezzel a végponttal lekérdezhetjük az összes gyermeket az adatbázisból.',
  })
  @ApiOkResponse({
    description: 'A gyermekek sikeresen lekérdezve.',
    type: [ChildEntity],
  })
  findAll() {
    return this.childrenService.findAll();
  }


  @Get(':id')
  @ApiOperation({
    summary: 'Gyermek lekérdezése ID alapján',
    description: 'Ezzel a végponttal lekérdezhetünk egy gyermeket az adatbázisból az egyedi azonosítója alapján.',
  })
  @ApiParam({
    name: 'id',
    description: 'A gyermek egyedi azonosítója',
    example: 1,
  })
  async findOne(@Param('id') id: string) {
    let child = await this.childrenService.findOne(+id);
    if (!child) {
      throw new NotFoundException(`Child with ID ${id} not found`);
      }
    return child;
  }


  @Patch(':id')
  @ApiOperation({
    summary: 'Gyermek adatainak frissítése',
    description: 'Ezzel a végponttal frissíthetjük egy gyermek adatait az adatbázisban.',
  })
  @ApiParam({
    name: 'id',
    description: 'A gyermek egyedi azonosítója',
    example: 1,
  })
  async update(@Param('id') id: string, @Body() updateChildDto: UpdateChildDto) {
    let child = await this.childrenService.findOne(+id);
    if (!child) {
      throw new NotFoundException(`Child with ID ${id} not found`);
      }
    return this.childrenService.update(+id, updateChildDto);
  }


  @Delete(':id')
  @ApiOperation({
    summary: 'Gyermek törlése',
    description: 'Ezzel a végponttal törölhetünk egy gyermeket az adatbázisból.',
  })
  @ApiParam({
    name: 'id',
    description: 'A gyermek egyedi azonosítója',
    example: 1,
  })
  async remove(@Param('id') id: string) {
    let child = await this.childrenService.findOne(+id);
    if (!child) {
      throw new NotFoundException(`Child with ID ${id} not found`);
      }
    return this.childrenService.remove(+id);
  }
}
