/**
 * ---------------------------------------------------------------
 *  Archivo:        experto.entity.ts
 *  Descripción:    Entidad que representa la tabla 'expertos' dentro del sistema GSXPD. Define la estructura 
 *                  de datos utilizada por TypeORM para mapear la información de los expertos EER asociados a los expedientes.
 *  Autor:          Eugenio Blanco Fernández
 *  Universidad:    Universitat Oberta de Catalunya (UOC)
 *  Título Máster:  Máster Universitario en Desarrollo de sitios y aplicaciones Web
 *  Proyecto:       TFM - Sistema de Gestión de Expedientes Digitales (GSXPD)
 *  Fecha creación: 07/03/2026
 *  Última modif.:  10/04/2026
 *
 *  Detalles:
 *    - Mapea la tabla 'expertos' mediante el decorador @Entity().
 *    - Incluye los campos básicos del experto EER:
 *        · Nombre
 *        · Apellidos
 *        · Estado de actividad
 *    - Utilizado como referencia en la gestión de expedientes.
 * ---------------------------------------------------------------
 */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('expertos')   // <-- nombre de la tabla
export class Experto {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre_EER: string;

    @Column()
    apellidos_EER: string;

}

