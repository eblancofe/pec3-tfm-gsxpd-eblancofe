/**
 * ---------------------------------------------------------------
 *  Archivo:        unidad-organizativa.entity.ts
 *  Descripción:    Entidad que representa la tabla 'unidad_organizativa' dentro del sistema GSXPD. Define la  
 *                  estructura de datos utilizada por TypeORM para mapear las distintas unidades organizativas asociadas a los expedientes.
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
 *    - Mapea la tabla 'unidad_organizativa' mediante @Entity().
 *    - Incluye los campos:
 *        · id: identificador de la unidad organizativa.
 *        · nombre_UnidadOrganizativa: nombre o descripción de la unidad.
 *    - Utilizada como referencia en la gestión y clasificación de expedientes.
 * ---------------------------------------------------------------
 */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('unidad_organizativa')   // <-- nombre de la tabla
export class UnidadOrganizativa {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'nombre_UnidadOrganizativa' })
    nombre_UnidadOrganizativa: string;
	
}

