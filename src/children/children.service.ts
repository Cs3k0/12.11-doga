import { Injectable, ConflictException } from '@nestjs/common';
import { CreateChildDto } from './dto/create-child.dto';
import { UpdateChildDto } from './dto/update-child.dto';
import { PrismaService } from 'src/prisma.service';
import { ToysService } from 'src/toys/toys.service';

@Injectable()
export class ChildrenService {
  constructor(
    private readonly db: PrismaService,
    private readonly toysService: ToysService,

  ) {}

  create(createChildDto: CreateChildDto) {
    return this.db.child.create({
      data: createChildDto,
    });
  }

  async AddChildrenToToy({childId, toyId}: {childId: number, toyId: number}) {
    let toy =  await this.toysService.findOne(toyId);
    if (!toy) {
      throw new ConflictException(`Toy with ID ${toyId} does not exist`);
    }   
    return this.db.childrenToToy.create({
      data: {
        childId, 
        toyId,
      },
    });   

  }

  async RemoveChildrenFromToy({childId, toyId}: {childId: number, toyId: number}) {
    let toy =  await this.toysService.findOne(toyId);
    if (!toy) {
      throw new ConflictException(`Toy with ID ${toyId} does not exist`);
    }
    return this.db.childrenToToy.deleteMany({
      where: {
        childId,
        toyId,
      },
    });
  }

  findAll() {
    return this.db.child.findMany();
  }

  findOne(id: number) {
    return this.db.child.findUnique({
      where: { id },
    });
  }

  update(id: number, updateChildDto: UpdateChildDto) {
    return this.db.child.update({
      where: { id },
      data: updateChildDto,
    });
  }

  remove(id: number) {
    return this.db.child.delete({
      where: { id },
    });
  }
}
