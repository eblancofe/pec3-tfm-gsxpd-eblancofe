/**
 * ---------------------------------------------------------------
 *  Archivo:        expertos.module.ts
 *  Descripción:    Módulo encargado de agrupar los componentes relacionados con la entidad 'Experto',  
 *                  incluyendo su controlador, servicio y la integración con TypeORM dentro del sistema GSXPD.
 *  Autor:          Eugenio Blanco Fernández
 *  Universidad:    Universitat Oberta de Catalunya (UOC)
 *  Título Máster:  Máster Universitario en Desarrollo de sitios y aplicaciones Web
 *  Proyecto:       TFM - Sistema de Gestión de Expedientes Digitales (GSXPD)
 *  Fecha creación: 07/03/2026
 *  Última modif.:  10/04/2026
 *
 *  Detalles:
 *    - Importa la entidad 'Experto' mediante TypeOrmModule.forFeature().
 *    - Registra el controlador y servicio asociados al módulo.
 *    - Permite la gestión completa de expertos EER dentro del sistema.
 * ---------------------------------------------------------------
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpertosController } from './expertos.controller';
import { ExpertosService } from './expertos.service';
import { Experto } from './entities/expertos.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Experto])],
    controllers: [ExpertosController],
    providers: [ExpertosService],
})
export class ExpertosModule { }
