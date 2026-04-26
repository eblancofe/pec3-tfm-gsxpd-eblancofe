/**
 * ---------------------------------------------------------------
 *  Archivo:        titularidad.controller.ts
 *  Descripción:    Controlador encargado de gestionar las operaciones CRUD relacionadas con la entidad 'Titularidad'.  
 *                  Expone los endpoints necesarios para crear, consultar, actualizar y eliminar tipos de titularidad dentro del sistema GSXPD.
 *
 *  Autor:          Eugenio Blanco Fernández
 *  Universidad:    Universitat Oberta de Catalunya (UOC)
 *  Título Máster:  Máster Universitario en Desarrollo de sitios y aplicaciones Web
 *  Proyecto:       TFM - Sistema de Gestión de Expedientes Digitales (GSXPD)
 *
 *  Fecha creación: 07/03/2026
 *  Última modif.:  10/04/2026
 *
 *  Detalles:
 *    - Expone el endpoint POST para crear nuevos tipos de titularidad.
 *    - Permite obtener un registro por ID mediante GET /:id.
 *    - Ofrece paginación, búsqueda y listado general con GET /.
 *    - Implementa eliminación de registros mediante DELETE /:id.
 *    - Permite actualizar un registro mediante PUT /:id.
 * ---------------------------------------------------------------
 */
import { Controller, Post, Body, Get, Param, Delete, Put, Query } from '@nestjs/common';
import { TitularidadService } from './titularidad.service';

@Controller('titularidad')
export class TitularidadController {
  constructor(private readonly titularidadService: TitularidadService) {}

  @Post()
  create(@Body() body: any) {
    return this.titularidadService.create(body);
  }

  @Get(':id')
  getById(@Param('id') id: number) {
    return this.titularidadService.getById(id);
  }

  @Get()
  getAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') search: string = ''
  ) {
    return this.titularidadService.getAll(page, limit, search);
  }

  @Delete(':id')
	delete(@Param('id') id: number) {
		return this.titularidadService.delete(id);
  }
  
  @Put(':id')
	update(@Param('id') id: number, @Body() body: any) {
		return this.titularidadService.update(id, body);
	}

}
