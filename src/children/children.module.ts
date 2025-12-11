import { Module } from '@nestjs/common';
import { ChildrenService } from './children.service';
import { ChildrenController } from './children.controller';
import { PrismaService } from 'src/prisma.service';
import { ToysService } from 'src/toys/toys.service';

@Module({
  controllers: [ChildrenController],
  providers: [ChildrenService, PrismaService, ToysService],
})
export class ChildrenModule {}
