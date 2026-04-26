/**
 * ---------------------------------------------------------------
 *  Archivo:        unidad-organizativa.module.ts
 *  Descripción:    Módulo encargado de agrupar los componentes relacionados con la entidad 'UnidadOrganizativa', 
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
 *    - Importa la entidad 'UnidadOrganizativa' mediante TypeOrmModule.forFeature().
 *    - Registra el controlador y servicio asociados al módulo.
 *    - Permite la gestión completa de las unidades organizativas utilizadas como referencia en los expedientes.
 * ---------------------------------------------------------------
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnidadOrganizativaController } from './unidad-organizativa.controller';
import { UnidadOrganizativaService } from './unidad-organizativa.service';
import { UnidadOrganizativa } from './entities/unidad-organizativa.entity';

@Module({
    imports: [TypeOrmModule.forFeature([UnidadOrganizativa])],
    controllers: [UnidadOrganizativaController],
    providers: [UnidadOrganizativaService],
})
export class UnidadOrganizativaModule { }
