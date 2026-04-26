/**
 * ---------------------------------------------------------------
 *  Archivo:        significatividad.entity.ts
 *  Descripción:    Entidad que representa la tabla 'significatividad' dentro del sistema GSXPD. Define la 
 *                  estructura de  datos utilizada por TypeORM para mapear los niveles de significatividad 
 *                  asociados a los cambios de un expediente.
 *  Autor:          Eugenio Blanco Fernández
 *  Universidad:    Universitat Oberta de Catalunya (UOC)
 *  Título Máster:  Máster Universitario en Desarrollo de sitios y aplicaciones Web
 *  Proyecto:       TFM - Sistema de Gestión de Expedientes Digitales (GSXPD)
 *  Fecha creación: 07/03/2026
 *  Última modif.:  10/04/2026
 *
 *  Detalles:
 *    - Mapea la tabla 'significatividad' mediante @Entity().
 *    - Incluye los campos:
 *        · id: identificador del nivel de significatividad.
 *        · nombre_Significatividad: descripción del nivel.
 *    - Utilizada como referencia en la documentación de cambios dentro de los expedientes.
 * ---------------------------------------------------------------
 */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('significatividad')   // <-- nombre de la tabla
export class Significatividad {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name:'nombre_Significatividad' })
    nombre_Significatividad: string;
	
}
