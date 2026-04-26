/**
 * ---------------------------------------------------------------
 *  Archivo:        unidad-organizativa.controller.ts
 *  Descripción:    Controlador encargado de gestionar las operaciones CRUD relacionadas con la entidad 'UnidadOrganizativa'. 
 *                  Expone los endpoints necesarios para crear, consultar, actualizar y eliminar unidades organizativas  
 *                  dentro del sistema GSXPD.
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
 *    - Expone el endpoint POST para crear nuevas unidades organizativas.
 *    - Permite obtener un registro por ID mediante GET /:id.
 *    - Ofrece paginación, búsqueda y listado general con GET /.
 *    - Implementa eliminación de registros mediante DELETE /:id.
 *    - Permite actualizar un registro mediante PUT /:id.
 * ---------------------------------------------------------------
 */
import { Controller, Post, Body, Get, Param, Delete, Put, Query } from '@nestjs/common';
import { UnidadOrganizativaService } from './unidad-organizativa.service';

@Controller('unidad-organizativa')
export class UnidadOrganizativaController {
  constructor(private readonly unidadorganizativaService: UnidadOrganizativaService) {}

  @Post()
  create(@Body() body: any) {
    return this.unidadorganizativaService.create(body);
  }

  @Get(':id')
  getById(@Param('id') id: number) {
    return this.unidadorganizativaService.getById(id);
  }

  @Get()
  getAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') search: string = ''
  ) {
    return this.unidadorganizativaService.getAll(page, limit, search);
  }

  @Delete(':id')
	delete(@Param('id') id: number) {
		return this.unidadorganizativaService.delete(id);
  }
  
  @Put(':id')
	update(@Param('id') id: number, @Body() body: any) {
		return this.unidadorganizativaService.update(id, body);
	}

}
