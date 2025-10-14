import { Controller, Post, Body, HttpCode, HttpStatus, Get, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignupAuthDto } from './dto/signup-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './decorators/roles.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

@Post('signup')
@ApiOperation({ summary: 'Registrar un nuevo usuario' })
@ApiResponse({ status: 201, description: 'Usuario registrado correctamente' })
@ApiResponse({ status: 400, description: 'Datos inválidos' })
async signup(@Body() dto: SignupAuthDto) {
  // Forzamos rol 'MESERO' para cualquier registro público
  return this.authService.signup({ ...dto, role: 'MESERO' });
}


  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Iniciar sesión y obtener token JWT' })
  @ApiResponse({ status: 200, description: 'Inicio de sesión exitoso' })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
  async login(@Body() dto: LoginAuthDto) {
    return this.authService.login(dto);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Obtener perfil del usuario autenticado' })
  @ApiResponse({ status: 200, description: 'Perfil del usuario' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async getProfile(@Req() req: any) {
    return this.authService.getProfile(req.user);
  }

  @Post('admin-signup')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Registrar un nuevo administrador (solo para admins)' })
  @ApiResponse({ status: 201, description: 'Administrador registrado correctamente' })
  @ApiResponse({ status: 403, description: 'Acceso denegado' })
  async adminSignup(@Body() dto: SignupAuthDto) {
    return this.authService.signup({ ...dto, role: 'ADMIN' });
  }
}
