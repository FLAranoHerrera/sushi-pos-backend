import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignupAuthDto } from './dto/signup-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

@Post('signup')
@ApiOperation({ summary: 'Registrar un nuevo usuario' })
@ApiResponse({ status: 201, description: 'Usuario registrado correctamente' })
@ApiResponse({ status: 400, description: 'Datos inválidos' })
async signup(@Body() dto: SignupAuthDto) {
  // Forzamos rol 'USER' para cualquier registro público
  return this.authService.signup({ ...dto, role: 'USER' });
}


  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Iniciar sesión y obtener token JWT' })
  @ApiResponse({ status: 200, description: 'Inicio de sesión exitoso' })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
  async login(@Body() dto: LoginAuthDto) {
    return this.authService.login(dto);
  }
}
