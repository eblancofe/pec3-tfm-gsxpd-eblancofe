/**
 * ---------------------------------------------------------------
 *  Archivo:        users.module.ts
 *  Descripción:    Módulo encargado de agrupar los componentes relacionados con la entidad 'User',  
 *                  incluyendo su controlador, servicio y la integración con TypeORM dentro del sistema GSXPD.
 *
 *  Autor:          Eugenio Blanco Fernández
 *  Universidad:    Universitat Oberta de Catalunya (UOC)
 *  Título Máster:  Máster Universitario en Desarrollo de sitios y aplicaciones Web
 *  Proyecto:       TFM - Sistema de Gestión de Expedientes Digitales 
 *                  (GSXPD)
 *
 *  Fecha creación: 07/03/2026
 *  Última modif.:  10/04/2026
 *
 *  Detalles:
 *    - Importa la entidad 'User' mediante TypeOrmModule.forFeature().
 *    - Registra el controlador y servicio asociados al módulo.
 *    - Exporta UsersService para permitir su uso en otros módulos como parte del sistema de autenticación y gestión de roles.
 * ---------------------------------------------------------------
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule { }
