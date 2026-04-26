/**
 * ---------------------------------------------------------------
 *  Archivo:        titularidad.entity.ts
 *  Descripción:    Entidad que representa la tabla 'titularidad' dentro del sistema GSXPD. Define la estructura de datos 
 *                  utilizada por TypeORM para mapear los distintos tipos de titularidad asociados a los expedientes.
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
 *    - Mapea la tabla 'titularidad' mediante @Entity().
 *    - Incluye los campos:
 *        · id: identificador del tipo de titularidad.
 *        · nombre_Titularidad: nombre o descripción del tipo.
 *    - Utilizada como referencia en la gestión de expedientes.
 * ---------------------------------------------------------------
 */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('titularidad')   // <-- nombre de la tabla
export class Titularidad {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name:'nombre_Titularidad' })
    nombre_Titularidad: string;
	
}

