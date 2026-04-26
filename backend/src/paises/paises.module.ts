/**
 * ---------------------------------------------------------------
 *  Archivo:        paises.module.ts
 *  Descripción:    Módulo encargado de agrupar los componentes relacionados con la entidad 'Pais',  
 *                  incluyendo su controlador, servicio y la integración con TypeORM dentro del sistema GSXPD.
 *  Autor:          Eugenio Blanco Fernández
 *  Universidad:    Universitat Oberta de Catalunya (UOC)
 *  Título Máster:  Máster Universitario en Desarrollo de sitios y aplicaciones Web
 *  Proyecto:       TFM - Sistema de Gestión de Expedientes Digitales (GSXPD)
 *  Fecha creación: 07/03/2026
 *  Última modif.:  10/04/2026
 *
 *  Detalles:
 *    - Importa la entidad 'Pais' mediante TypeOrmModule.forFeature().
 *    - Registra el controlador y servicio asociados al módulo.
 *    - Permite consultar la tabla de países, utilizada como referencia en distintos formularios del sistema.
 * ---------------------------------------------------------------
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pais } from './entities/paises.entity';
import { PaisesController } from './paises.controller';
import { PaisesService } from './paises.service';

@Module({
  imports: [TypeOrmModule.forFeature([Pais])],
  controllers: [PaisesController],
  providers: [PaisesService],
})
export class PaisesModule {}
