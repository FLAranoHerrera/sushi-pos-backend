import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { SignupAuthDto } from './dto/signup-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

async signup(dto: SignupAuthDto) {
  const createUserDto: CreateUserDto = { ...dto, role: 'cliente' };
  const user = await this.usersService.create(createUserDto);
  return {
    message: 'Usuario registrado correctamente',
    user,
  };
}

async login(dto: LoginAuthDto) {
  const user = await this.usersService.findByEmail(dto.email);
  const isPasswordValid = await bcrypt.compare(dto.password, user.password);
  if (!isPasswordValid) throw new UnauthorizedException('Credenciales inválidas');

  const payload = { sub: user.id, email: user.email, role: user.role?.name || 'cliente' };
  const token = this.jwtService.sign(payload);

  return { message: 'Inicio de sesión exitoso', token, user };
}

  // Validación de usuario desde JWT
  async validateUser(userId: string) {
    return this.usersService.findOne(userId);
  }
}
