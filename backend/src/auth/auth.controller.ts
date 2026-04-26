/**
 * ---------------------------------------------------------------
 *  Archivo:        auth.controller.ts
 *  Descripción:    Controlador encargado de gestionar la autenticación del sistema GSXPD. 
 *                  Expone los endpoints de login y obtención del perfil del usuario autenticado.
 *  Autor:          Eugenio Blanco Fernández
 *  Universidad:    Universitat Oberta de Catalunya (UOC)
 *  Título Máster:  Máster Universitario en Desarrollo de sitios y aplicaciones Web
 *  Proyecto:       TFM - Sistema de Gestión de Expedientes Digitales (GSXPD)
 *  Fecha creación:  07/03/2026
 *  Última modif.:   08/04/2026
 *
 *  Detalles:
 *  - Utiliza LocalAuthGuard para validar credenciales mediante estrategia local.
 *  - Genera y devuelve un JWT mediante AuthService tras autenticación correcta.
 *  - Protege el endpoint /profile mediante JwtAuthGuard para garantizar acceso seguro.
 * ---------------------------------------------------------------
 */
import { Controller, Post, UseGuards, Request, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
