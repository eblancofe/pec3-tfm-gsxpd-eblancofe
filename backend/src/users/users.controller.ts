/**
 * ---------------------------------------------------------------
 *  Archivo:        users.controller.ts
 *  Descripción:    Controlador encargado de gestionar las operaciones relacionadas con la entidad 'User'. Expone  
 *                  los endpoints protegidos para la administración de usuarios dentro del sistema GSXPD, incluyendo 
 *                  creación, consulta, actualización y eliminación.
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
 *    - Todos los endpoints están protegidos mediante JwtAuthGuard y RolesGuard.
 *    - Solo los usuarios con rol 'admin' pueden acceder a estas operaciones.
 *    - Incluye endpoints para:
 *        · Crear usuarios (POST)
 *        · Listar usuarios (GET)
 *        · Consultar usuario por ID (GET /:id)
 *        · Actualizar parcialmente (PATCH) o completamente (PUT)
 *        · Eliminar usuarios (DELETE)
 * ---------------------------------------------------------------
 */
import { Controller, Get, Post, Body, Param, Patch, Delete, Put } from '@nestjs/common';

import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  // Crear usuario
  @Post()
  create(@Body() body: any) {
    return this.usersService.createUser(body);
  }  

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  // Listar todos los usuarios
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  // Buscar usuario por ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  // Actualizar usuario
  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.usersService.update(+id, body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  // Borrar usuario
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
  
  @UseGuards(JwtAuthGuard, RolesGuard)
	@Roles('admin')
	// Actualza usuario
	@Put(':id')
	replace(@Param('id') id: string, @Body() body: any) {
	  return this.usersService.update(+id, body);
	}

  @Patch(':id/deactivate')
  deactivate(@Param('id') id: number) {
    return this.usersService.deactivateUser(id);
  }

  @Patch(':id/activate')
  activate(@Param('id') id: number) {
    return this.usersService.activateUser(id);
  }

}
