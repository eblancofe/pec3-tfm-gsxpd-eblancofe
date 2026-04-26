/**
 * ---------------------------------------------------------------
 *  Archivo:        cambio.entity.ts
 *  Descripción:    Entidad que representa la tabla 'cambio' dentro del sistema GSXPD. Define la 
 *                  estructura de datos utilizada por TypeORM para mapear los cambios registrados.
 *  Autor:          Eugenio Blanco Fernández
 *  Universidad:    Universitat Oberta de Catalunya (UOC)
 *  Título Máster:  Máster Universitario en Desarrollo de sitios y aplicaciones Web
 *  Proyecto:       TFM - Sistema de Gestión de Expedientes Digitales (GSXPD)
 *  Fecha creación: 07/03/2026
 *  Última modif.:  08/04/2026
 *
 *  Detalles:
 *    - Mapea la tabla 'cambio' mediante el decorador @Entity().
 *    - Incluye un campo ID autogenerado como clave primaria.
 *    - Define el campo 'nombre_Cambio' como columna de texto.
 * ---------------------------------------------------------------
 */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('cambio')   // <-- nombre de la tabla
export class Cambio {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre_Cambio: string;
	
}

