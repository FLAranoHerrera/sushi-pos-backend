import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subcategory } from './entities/subcategory.entity';
import { Category } from '../categories/entities/category.entity';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';

@Injectable()
export class SubcategoriesService {
  constructor(
    @InjectRepository(Subcategory) private readonly subcategoryRepo: Repository<Subcategory>,
    @InjectRepository(Category) private readonly categoryRepo: Repository<Category>,
  ) {}

  async create(dto: CreateSubcategoryDto): Promise<Subcategory> {
    const category = await this.categoryRepo.findOne({ where: { id: dto.categoryId } });
    if (!category) throw new NotFoundException('Categoría no encontrada');

    const subcategory = this.subcategoryRepo.create({
      name: dto.name,
      category,
    });

    return this.subcategoryRepo.save(subcategory);
  }

  async findAll(): Promise<Subcategory[]> {
    return this.subcategoryRepo.find({ relations: ['category', 'products'] });
  }

  async findOne(id: string): Promise<Subcategory> {
    const subcategory = await this.subcategoryRepo.findOne({ where: { id }, relations: ['category', 'products'] });
    if (!subcategory) throw new NotFoundException('Subcategoría no encontrada');
    return subcategory;
  }

  async update(id: string, dto: UpdateSubcategoryDto): Promise<Subcategory> {
    const subcategory = await this.findOne(id);

    if (dto.categoryId) {
      const category = await this.categoryRepo.findOne({ where: { id: dto.categoryId } });
      if (!category) throw new NotFoundException('Categoría no encontrada');
      subcategory.category = category;
    }

    Object.assign(subcategory, dto);
    return this.subcategoryRepo.save(subcategory);
  }

  async remove(id: string): Promise<void> {
    const subcategory = await this.findOne(id);
    await this.subcategoryRepo.remove(subcategory);
  }
}
