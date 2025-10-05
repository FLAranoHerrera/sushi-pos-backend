import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExtrasService } from './extras.service';
import { ExtrasController } from './extras.controller';
import { Extra } from './entities/extra.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Extra])],
  providers: [ExtrasService],
  controllers: [ExtrasController],
  exports: [ExtrasService],
})
export class ExtrasModule {}
