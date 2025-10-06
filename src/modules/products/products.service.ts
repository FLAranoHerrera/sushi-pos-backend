import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Product } from './entities/product.entity';
import { Subcategory } from '../subcategories/entities/subcategory.entity';
import { Extra } from '../extras/entities/extra.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { isUUID } from 'class-validator';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private readonly productRepo: Repository<Product>,
    @InjectRepository(Subcategory) private readonly subcategoryRepo: Repository<Subcategory>,
    @InjectRepository(Extra) private readonly extraRepo: Repository<Extra>,
  ) {}

  async create(dto: CreateProductDto): Promise<Product> {
    if (!isUUID(dto.subcategoryId)) throw new BadRequestException('El ID de la subcategoría debe ser un UUID válido');

    const subcategory = await this.subcategoryRepo.findOne({ where: { id: dto.subcategoryId } });
    if (!subcategory) throw new NotFoundException('Subcategoría no encontrada');

    let extras: Extra[] = [];
    if (dto.extrasIds?.length) {
      const validExtrasIds = dto.extrasIds.filter(id => isUUID(id));
      extras = validExtrasIds.length ? await this.extraRepo.find({ where: { id: In(validExtrasIds) } }) : [];
    }

    const product = this.productRepo.create({ ...dto, subcategory, extras });
    return this.productRepo.save(product);
  }

  async update(id: string, dto: UpdateProductDto): Promise<Product> {
    if (!isUUID(id)) throw new BadRequestException('El ID del producto debe ser un UUID válido');

    const product = await this.productRepo.findOne({ where: { id }, relations: ['subcategory', 'extras'] });
    if (!product) throw new NotFoundException('Producto no encontrado');

    if (dto.subcategoryId) {
      if (!isUUID(dto.subcategoryId)) throw new BadRequestException('El ID de la subcategoría debe ser un UUID válido');
      const subcategory = await this.subcategoryRepo.findOne({ where: { id: dto.subcategoryId } });
      if (!subcategory) throw new NotFoundException('Subcategoría no encontrada');
      product.subcategory = subcategory;
    }

    if (dto.extrasIds) {
      const validExtrasIds = dto.extrasIds.filter(id => isUUID(id));
      product.extras = validExtrasIds.length ? await this.extraRepo.find({ where: { id: In(validExtrasIds) } }) : [];
    }

    Object.assign(product, dto);
    return this.productRepo.save(product);
  }

  async findAll(page = 1, limit = 10): Promise<{ data: Product[]; total: number; page: number; limit: number }> {
    limit = Math.min(limit, 50);
    const [products, total] = await this.productRepo.findAndCount({
      relations: ['subcategory', 'extras'],
      skip: (page - 1) * limit,
      take: limit,
    });
    return { data: products, total, page, limit };
  }

  async findOne(id: string): Promise<Product> {
    if (!isUUID(id)) throw new BadRequestException('El ID del producto debe ser un UUID válido');

    const product = await this.productRepo.findOne({ where: { id }, relations: ['subcategory', 'extras'] });
    if (!product) throw new NotFoundException('Producto no encontrado');
    return product;
  }

  async remove(id: string): Promise<void> {
    if (!isUUID(id)) throw new BadRequestException('El ID del producto debe ser un UUID válido');

    const result = await this.productRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException('Producto no encontrado');
  }
}
