/**
 * ---------------------------------------------------------------
 *  Archivo:        evaluador.module.ts
 *  Descripción:    Módulo encargado de agrupar los componentes relacionados con la entidad 'Evaluador',  
 *                  incluyendo su controlador, servicio y la integración con TypeORM dentro del sistema GSXPD.
 *  Autor:          Eugenio Blanco Fernández
 *  Universidad:    Universitat Oberta de Catalunya (UOC)
 *  Título Máster:  Máster Universitario en Desarrollo de sitios y aplicaciones Web
 *  Proyecto:       TFM - Sistema de Gestión de Expedientes Digitales (GSXPD)
 *  Fecha creación: 07/03/2026
 *  Última modif.:  10/04/2026
 *
 *  Detalles:
 *    - Importa la entidad 'Evaluador' mediante TypeOrmModule.forFeature().
 *    - Registra el controlador y servicio asociados a la entidad.
 *    - Permite la gestión completa de evaluadores dentro del módulo.
 * ---------------------------------------------------------------
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EvaluadorController } from './evaluador.controller';
import { EvaluadorService } from './evaluador.service';
import { Evaluador } from './entities/evaluador.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Evaluador])],
    controllers: [EvaluadorController],
    providers: [EvaluadorService],
})
export class EvaluadorModule { }
