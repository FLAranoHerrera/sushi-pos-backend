import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CloudinaryService } from '../services/cloudinary.service';

@Module({
  imports: [ConfigModule],
  providers: [CloudinaryService],
  controllers: [],
  exports: [CloudinaryService],
})
export class FilesModule {}
