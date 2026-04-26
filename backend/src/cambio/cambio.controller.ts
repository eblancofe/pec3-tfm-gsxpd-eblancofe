/**
 * ---------------------------------------------------------------
 *  Archivo:        cambio.controller.ts
 *  Descripción:    Controlador encargado de gestionar las operaciones CRUD relacionadas con la entidad 'Cambio'. 
 *                  Expone los endpoints necesarios para crear, consultar, actualizar y eliminar registros dentro 
 *                  del sistema GSXPD.
 *  Autor:          Eugenio Blanco Fernández
 *  Universidad:    Universitat Oberta de Catalunya (UOC)
 *  Título Máster:  Máster Universitario en Desarrollo de sitios y aplicaciones Web
 *  Proyecto:       TFM - Sistema de Gestión de Expedientes Digitales (GSXPD)
 *  Fecha creación: 12/03/2026
 *  Última modif.:  08/04/2026
 *
 *  Detalles:
 *    - Expone el endpoint POST para crear nuevos registros de cambio.
 *    - Permite obtener un cambio por ID mediante GET /:id.
 *    - Ofrece paginación, búsqueda y listado general con GET /.
 *    - Implementa eliminación de registros mediante DELETE /:id.
 *    - Permite actualizar un cambio mediante PUT /:id.
 * ---------------------------------------------------------------
 */
import { Controller, Post, Body, Get, Param, Delete, Put, Query } from '@nestjs/common';
import { CambioService } from './cambio.service';

@Controller('cambio')
export class CambioController {
  constructor(private readonly cambioService: CambioService) {}

  @Post()
  create(@Body() body: any) {
    return this.cambioService.create(body);
  }

  @Get(':id')
  getById(@Param('id') id: number) {
    return this.cambioService.getById(id);
  }

  @Get()
  getAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') search: string = ''
  ) {
    return this.cambioService.getAll(page, limit, search);
  }

  @Delete(':id')
	delete(@Param('id') id: number) {
		return this.cambioService.delete(id);
  }
  
  @Put(':id')
	update(@Param('id') id: number, @Body() body: any) {
		return this.cambioService.update(id, body);
	}

}
