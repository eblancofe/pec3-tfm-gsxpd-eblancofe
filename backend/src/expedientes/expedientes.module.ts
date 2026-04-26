/**
 * ---------------------------------------------------------------
 *  Archivo:        expedientes.module.ts
 *  Descripción:    Módulo encargado de agrupar los componentes relacionados con la entidad 'Expedientes', 
 *                  incluyendo su controlador, servicio y la integración con TypeORM dentro del sistema GSXPD.
 *  Autor:          Eugenio Blanco Fernández
 *  Universidad:    Universitat Oberta de Catalunya (UOC)
 *  Título Máster:  Máster Universitario en Desarrollo de sitios y aplicaciones Web
 *  Proyecto:       TFM - Sistema de Gestión de Expedientes Digitales (GSXPD)
 *  Fecha creación: 07/03/2026
 *  Última modif.:  10/04/2026
 *
 *  Detalles:
 *    - Importa la entidad 'Expedientes' mediante TypeOrmModule.forFeature().
 *    - Registra el controlador y servicio asociados al módulo.
 *    - Permite la gestión completa de expedientes dentro del sistema.
 *    - Incluye referencias comentadas a entidades relacionadas para futuras ampliaciones del modelo de datos.
 * ---------------------------------------------------------------
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpedientesController } from './expedientes.controller';
import { ExpedientesService } from './expedientes.service';
import { Expedientes } from './entities/expedientes.entity';
/*
import { Experto } from '../entidades/experto/experto.entity';
import { DireccionGeneral } from '../entidades/organizacion/organizacion.entity';
import { TitularLinea } from '../entidades/titular_linea/titular-linea.entity';
import { TipoCambio } from '../entidades/tipo_cambio/tipo-cambio.entity';
import { significativo } from '../entidades/significatividad/significatividad.entity';
import { Asbo } from '../entidades/asbo/asbo.entity';
*/

@Module({
    imports: [TypeOrmModule.forFeature([
        Expedientes,
        //Experto,
        //DireccionGeneral,
        //TitularLinea,
        //TipoCambio,
        //significativo,
        //Asbo
    ])],
    controllers: [ExpedientesController],
    providers: [ExpedientesService],
})
export class ExpedientesModule { }
