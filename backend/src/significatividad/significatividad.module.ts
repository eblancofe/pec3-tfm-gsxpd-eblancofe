/**
 * ---------------------------------------------------------------
 *  Archivo:        significatividad.module.ts
 *  Descripción:    Módulo encargado de agrupar los componentes relacionados con la entidad 'Significatividad', 
 *                  incluyendo su controlador, servicio y la integración con TypeORM dentro del sistema GSXPD.
 *  Autor:          Eugenio Blanco Fernández
 *  Universidad:    Universitat Oberta de Catalunya (UOC)
 *  Título Máster:  Máster Universitario en Desarrollo de sitios y aplicaciones Web
 *  Proyecto:       TFM - Sistema de Gestión de Expedientes Digitales (GSXPD)
 *  Fecha creación: 07/03/2026
 *  Última modif.:  10/04/2026
 *
 *  Detalles:
 *    - Importa la entidad 'Significatividad' mediante TypeOrmModule.forFeature().
 *    - Registra el controlador y servicio asociados al módulo.
 *    - Permite la gestión completa de los niveles de significatividad utilizados en los expedientes.
 * ---------------------------------------------------------------
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SignificatividadController } from './significatividad.controller';
import { SignificatividadService } from './significatividad.service';
import { Significatividad } from './entities/significatividad.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Significatividad])],
    controllers: [SignificatividadController],
    providers: [SignificatividadService],
})
export class SignificatividadModule { }
