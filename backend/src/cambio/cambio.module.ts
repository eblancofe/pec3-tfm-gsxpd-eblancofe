/**
 * ---------------------------------------------------------------
 *  Archivo:        cambio.module.ts
 *  Descripción:    Módulo encargado de agrupar los componentes relacionados con la entidad 'Cambio',  
 *                  incluyendo su controlador, servicio y la integración con TypeORM dentro del sistema GSXPD.
 *  Autor:          Eugenio Blanco Fernández
 *  Universidad:    Universitat Oberta de Catalunya (UOC)
 *  Título Máster:  Máster Universitario en Desarrollo de sitios y aplicaciones Web
 *  Proyecto:       TFM - Sistema de Gestión de Expedientes Digitales (GSXPD)
 *  Fecha creación: 07/03/2026
 *  Última modif.:  08/04/2026
 *
 *  Detalles:
 *    - Importa la entidad 'Cambio' mediante TypeOrmModule.forFeature().
 *    - Registra el controlador y servicio asociados a la entidad.
 *    - Permite la gestión completa de los cambios dentro del módulo.
 * ---------------------------------------------------------------
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CambioController } from './cambio.controller';
import { CambioService } from './cambio.service';
import { Cambio } from './entities/cambio.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Cambio])],
    controllers: [CambioController],
    providers: [CambioService],
})
export class CambioModule { }
