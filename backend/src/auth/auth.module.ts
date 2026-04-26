/**
 * ---------------------------------------------------------------
 *  Archivo:        auth.module.ts
 *  Descripción:    Módulo encargado de gestionar la autenticación del sistema GSXPD. Configura las estrategias
 *                  Local y JWT, registra el servicio de autenticación y expone el controlador correspondiente.
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
 *  - Registra JwtModule con clave secreta y expiración de 8 horas.
 *  - Importa UsersModule para validar credenciales de usuario.
 *  - Habilita estrategias LocalStrategy y JwtStrategy.
 * ---------------------------------------------------------------
 */
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'supersecretkey',
      signOptions: { expiresIn: '8h' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
