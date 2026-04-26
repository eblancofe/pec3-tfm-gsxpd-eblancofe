/**
 * ---------------------------------------------------------------
 *  Archivo:        app.controller.ts
 *  Descripción:    Controlador principal de la aplicación. Expone el endpoint raíz del  
 *                  sistema GSXPD y delega la respuesta al servicio principal de la aplicación.
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
 *    - Expone el endpoint GET / que devuelve un mensaje básico de estado.
 *    - Sirve como punto de entrada mínimo para verificar que la API está operativa.
 * ---------------------------------------------------------------
 */
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
