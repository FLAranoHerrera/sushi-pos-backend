import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Extra } from './entities/extra.entity';
import { CreateExtraDto } from './dto/create-extra.dto';
import { UpdateExtraDto } from './dto/update-extra.dto';

@Injectable()
export class ExtrasService {
  constructor(
    @InjectRepository(Extra) private readonly extraRepo: Repository<Extra>,
  ) {}

  async create(dto: CreateExtraDto): Promise<Extra> {
    const extra = this.extraRepo.create(dto);
    return this.extraRepo.save(extra);
  }

  async findAll(page = 1, limit = 10): Promise<{ data: Extra[]; total: number; page: number; limit: number }> {
    limit = Math.min(limit, 50);
    const [extras, total] = await this.extraRepo.findAndCount({
      relations: ['products'],
      skip: (page - 1) * limit,
      take: limit,
    });
    return { data: extras, total, page, limit };
  }

  async findOne(id: string): Promise<Extra> {
    const extra = await this.extraRepo.findOne({ where: { id }, relations: ['products'] });
    if (!extra) throw new NotFoundException('Extra no encontrado');
    return extra;
  }

  async update(id: string, dto: UpdateExtraDto): Promise<Extra> {
    const extra = await this.findOne(id);
    Object.assign(extra, dto);
    return this.extraRepo.save(extra);
  }

  async remove(id: string): Promise<void> {
    const extra = await this.findOne(id);
    await this.extraRepo.remove(extra);
  }
}
