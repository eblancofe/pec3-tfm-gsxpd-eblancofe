/**
 * ---------------------------------------------------------------
 *  Archivo:        auth.service.ts
 *  Descripción:    Servicio encargado de gestionar la autenticación del sistema GSXPD. Valida 
 *                  credenciales de usuario, compara contraseñas mediante bcrypt y genera tokens
 *                  JWT para sesiones autenticadas.
 *
 *  Autor:          Eugenio Blanco Fernández
 *  Universidad:    Universitat Oberta de Catalunya (UOC)
 *  Título Máster:  Máster Universitario en Desarrollo de sitios y aplicaciones Web
 *  Proyecto:       TFM - Sistema de Gestión de Expedientes Digitales (GSXPD)
 *
 *  Fecha creación: 07/03/2026
 *  Última modif.:  08/04/2026
 *
 *  Detalles:
 *  - Utiliza UsersService para obtener usuarios desde la base de datos.
 *  - Compara contraseñas cifradas mediante bcrypt.
 *  - Genera tokens JWT con información del usuario (username, id, role).
 *  - Incluye utilidades para comprobar sesión y obtener datos del token.
 * ---------------------------------------------------------------
 */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string) {
    const user = await this.usersService.findByUsername(username);
    //console.log('Usuario encontrado:', user);
    //console.log('isActive:', user.isActive);

    if (!user) throw new UnauthorizedException('Usuario no encontrado');

    //Validación correcta de usuario desactivado
    if (!user.isActive) {
      throw new UnauthorizedException('Usuario desactivado');
    }

    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) throw new UnauthorizedException('Contraseña incorrecta');

    const { password, ...rest } = user;
    return rest;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id, role: user.role };

    return {
      access_token: this.jwtService.sign(payload),
      username: user.username,
      role: user.role,
    };
  }
  
  isLoggedIn(): boolean {
	  return !!localStorage.getItem('token');
	}

  getUser() {
	const token = localStorage.getItem('token');
	if (!token) return null;
	  const payload = JSON.parse(atob(token.split('.')[1]));
	  return payload;
	}
	  
}
