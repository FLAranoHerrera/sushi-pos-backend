import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from './entities/user.entity';
import { Role } from '../roles/entities/roles.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { email, password, role } = createUserDto;
    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) throw new ConflictException('El correo ya está registrado.');

    const hashedPassword = await bcrypt.hash(password, 10);

    if (role?.toUpperCase() === 'ADMIN') {
      throw new BadRequestException('No se puede asignar rol ADMIN al crear un usuario.');
    }

    const roleEntity =
      (role && (await this.roleRepository.findOne({ where: { name: role.toUpperCase() } }))) ||
      (await this.roleRepository.findOne({ where: { name: 'USER' } }));

    if (!roleEntity) throw new NotFoundException(`Rol '${role || 'USER'}' no encontrado.`);

    const newUser = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
      role: roleEntity,
    });

    return this.userRepository.save(newUser);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email }, relations: ['role'] });
    if (!user) throw new NotFoundException('Usuario no encontrado.');
    return user;
  }

  async findByEmailSafe(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email }, relations: ['role'] });
  }

  async createWithRole(data: { name: string; email: string; password: string; phone?: string; roleName: string }): Promise<User> {
    const { name, email, password, phone, roleName } = data;
    
    const roleEntity = await this.roleRepository.findOne({ where: { name: roleName.toUpperCase() } });
    if (!roleEntity) throw new NotFoundException(`Rol '${roleName}' no encontrado.`);

    const newUser = this.userRepository.create({
      name,
      email,
      password,
      phone,
      role: roleEntity,
    });

    return this.userRepository.save(newUser);
  }

  async findAll(page = 1, limit = 10): Promise<{ data: Partial<User>[]; total: number; page: number; limit: number }> {
    limit = Math.min(limit, 50); // límite máximo
    const [users, total] = await this.userRepository.findAndCount({
      relations: ['role'],
      skip: (page - 1) * limit,
      take: limit,
    });
    const data = users.map(({ password, ...rest }) => rest);
    return { data, total, page, limit };
  }

  async findOne(id: string): Promise<Partial<User>> {
    const user = await this.userRepository.findOne({ where: { id }, relations: ['role', 'orders'] });
    if (!user) throw new NotFoundException('Usuario no encontrado.');
    const { password, ...result } = user;
    return result;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: { id }, relations: ['role'] });
    if (!user) throw new NotFoundException('Usuario no encontrado.');

    if (updateUserDto.role) {
      const roleEntity = await this.roleRepository.findOne({ where: { name: updateUserDto.role } });
      if (!roleEntity) throw new NotFoundException(`Rol '${updateUserDto.role}' no encontrado.`);
      user.role = roleEntity;
      delete updateUserDto.role;
    }

    Object.assign(user, updateUserDto);
    return this.userRepository.save(user);
  }

  async remove(id: string): Promise<{ message: string }> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('Usuario no encontrado.');
    await this.userRepository.remove(user);
    return { message: `Usuario con ID ${id} eliminado correctamente.` };
  }

  async updateRole(id: string, role: string) {
    const user = await this.userRepository.findOne({ where: { id }, relations: ['role'] });
    if (!user) throw new NotFoundException('Usuario no encontrado.');

    if (role.toUpperCase() === 'ADMIN') {
      throw new BadRequestException('No se puede asignar rol ADMIN manualmente.');
    }

    const roleEntity = await this.roleRepository.findOne({ where: { name: role.toUpperCase() } });
    if (!roleEntity) throw new NotFoundException(`Rol '${role}' no encontrado.`);

    user.role = roleEntity;
    return this.userRepository.save(user);
  }
}
