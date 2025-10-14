import { Injectable, UnauthorizedException, NotFoundException, ConflictException } from '@nestjs/common';
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
  // Crear usuario directamente sin pasar por el DTO de CreateUser
  const { email, password, name, phone } = dto;
  const existingUser = await this.usersService.findByEmailSafe(email);
  if (existingUser) {
    throw new ConflictException('El correo ya está registrado.');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  
  // Crear el usuario con rol MESERO por defecto
  const user = await this.usersService.createWithRole({
    name,
    email,
    password: hashedPassword,
    phone,
    roleName: 'MESERO'
  });

  return {
    message: 'Usuario registrado correctamente',
    user,
  };
}

async login(dto: LoginAuthDto) {
  const user = await this.usersService.findByEmail(dto.email);
  const isPasswordValid = await bcrypt.compare(dto.password, user.password);
  if (!isPasswordValid) throw new UnauthorizedException('Credenciales inválidas');

  const payload = { sub: user.id, email: user.email, role: user.role?.name || 'MESERO' };
  const token = this.jwtService.sign(payload);

  return { message: 'Inicio de sesión exitoso', token, user };
}

  // Validación de usuario desde JWT
  async validateUser(userId: string) {
    return this.usersService.findOne(userId);
  }

  async getProfile(user: any) {
    const { userId } = user;
    const userProfile = await this.usersService.findOne(userId);
    const { password, ...profile } = userProfile;
    return profile;
  }
}
