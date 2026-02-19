import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { ToysService } from './toys.service';
import { CreateToyDto } from './dto/create-toy.dto';
import { UpdateToyDto } from './dto/update-toy.dto';
import { ToyEntity } from './entities/toy.entity';
import { ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiOperation } from '@nestjs/swagger';

@Controller('toys')
export class ToysController {
  constructor(private readonly toysService: ToysService) {}

  @Post()
  @ApiOperation({ 
    summary: 'Új játék létrehozása',
    description: 'Ezzel a végponttal új játékot hozhatunk létre az adatbázisban.',
  })
  @ApiOkResponse({
    description: 'A játék sikeresen létrehozva.',
    type: ToyEntity,
  })
  create(@Body() createToyDto: CreateToyDto) {
    return this.toysService.create(createToyDto);
  }


  @Get()
  @ApiOperation({
    summary: 'Játékok lekérdezése',
    description: 'Ezzel a végponttal lekérdezhetjük az összes játékot az adatbázisból.',
  })
  @ApiOkResponse({
    description: 'A játékok sikeresen lekérdezve.',
    type: [ToyEntity],
  })
  findAll() {
    return this.toysService.findAll();
  }


  @Get(':id')
  @ApiOperation({
    summary: 'Játék lekérdezése ID alapján',
    description: 'Ezzel a végponttal lekérdezhetünk egy játékot az adatbázisból az egyedi azonosítója alapján.',
  })
  @ApiOkResponse({
    description: 'A játék sikeresen lekérdezve.',
    type: ToyEntity,
  })
  @ApiParam({
    name: 'id',
    description: 'A játék egyedi azonosítója',
    example: 1,
  })
  async findOne(@Param('id') id: string) {
    let toy = await this.toysService.findOne(+id);
    if (!toy) {
      throw new NotFoundException(`Toy with id ${id} not found`);
    }
    return toy;
  }


  @Patch(':id')
  @ApiOperation({
    summary: 'Játék adatainak frissítése',
    description: 'Ezzel a végponttal frissíthetjük egy játék adatait az adatbázisban.',
  })
  @ApiOkResponse({
    description: 'A játék sikeresen frissítve.',
    type: ToyEntity,
  })
  @ApiNotFoundResponse({
    description: 'A játék nem található.',
  })
  @ApiParam({
    name: 'id',
    description: 'A játék egyedi azonosítója',
    example: 1,
  })
  async update(@Param('id') id: string, @Body() updateToyDto: UpdateToyDto) {
    let toy = await this.toysService.findOne(+id);
    if (!toy) {
      throw new NotFoundException(`Toy with id ${id} not found`);
    }
    return this.toysService.update(+id, updateToyDto);
  }


  @Delete(':id')
  @ApiOperation({
    summary: 'Játék törlése',
    description: 'Ezzel a végponttal törölhetünk egy játékot az adatbázisból az egyedi azonosítója alapján.',
  })
  @ApiNotFoundResponse({
    description: 'A játék nem található.',
  })
  @ApiParam({
    name: 'id',
    description: 'A játék egyedi azonosítója',
    example: 1,
  })
  async remove(@Param('id') id: string) {
    let toy = await this.toysService.findOne(+id);
    if (!toy) {
      throw new NotFoundException(`Toy with id ${id} not found`);
    }
    return this.toysService.remove(+id);
  }
}
