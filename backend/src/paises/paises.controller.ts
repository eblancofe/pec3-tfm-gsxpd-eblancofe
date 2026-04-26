/**
 * ---------------------------------------------------------------
 *  Archivo:        paises.controller.ts
 *  Descripción:    Controlador encargado de exponer los endpoints relacionados con la entidad 'Pais'.  
 *                  Permite obtener el listado completo de países disponibles en el sistema GSXPD.
 *  Autor:          Eugenio Blanco Fernández
 *  Universidad:    Universitat Oberta de Catalunya (UOC)
 *  Título Máster:  Máster Universitario en Desarrollo de sitios y aplicaciones Web
 *  Proyecto:       TFM - Sistema de Gestión de Expedientes Digitales (GSXPD)
 *  Fecha creación: 07/03/2026
 *  Última modif.:  10/04/2026
 *
 *  Detalles:
 *    - Expone el endpoint GET /paises para obtener todos los países.
 *    - Utiliza el servicio PaisesService para acceder a los datos.
 *    - No requiere parámetros ni paginación al tratarse de una tabla estática o de referencia.
 * ---------------------------------------------------------------
 */
import { Controller, Get } from '@nestjs/common';
import { PaisesService } from './paises.service';

@Controller('paises')
export class PaisesController {
  constructor(private readonly service: PaisesService) {}

  @Get()
  getAll() {
    return this.service.getAll();
  }
}
