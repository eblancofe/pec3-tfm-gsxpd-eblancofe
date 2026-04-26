/**
 * ---------------------------------------------------------------
 *  Archivo:        titularidad.module.ts
 *  Descripción:    Módulo encargado de agrupar los componentes relacionados con la entidad 'Titularidad', 
 *                  incluyendo su controlador, servicio y la integración con TypeORM dentro del sistema GSXPD.
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
 *    - Importa la entidad 'Titularidad' mediante TypeOrmModule.forFeature().
 *    - Registra el controlador y servicio asociados al módulo.
 *    - Permite la gestión completa de los tipos de titularidad utilizados como referencia en los expedientes.
 * ---------------------------------------------------------------
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TitularidadController } from './titularidad.controller';
import { TitularidadService } from './titularidad.service';
import { Titularidad } from './entities/titularidad.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Titularidad])],
    controllers: [TitularidadController],
    providers: [TitularidadService],
})
export class TitularidadModule { }
