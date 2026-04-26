/**
 * ---------------------------------------------------------------
 *  Archivo:        paises.entity.ts
 *  Descripción:    Entidad que representa la tabla 'paises' dentro del sistema GSXPD. Define la 
 *                  estructura de datos utilizada por TypeORM para mapear los países disponibles en el 
 *                  sistema, utilizados como valores de referencia.
 *  Autor:          Eugenio Blanco Fernández
 *  Universidad:    Universitat Oberta de Catalunya (UOC)
 *  Título Máster:  Máster Universitario en Desarrollo de sitios y aplicaciones Web
 *  Proyecto:       TFM - Sistema de Gestión de Expedientes Digitales (GSXPD)
 *  Fecha creación: 07/03/2026
 *  Última modif.:  10/04/2026
 *
 *  Detalles:
 *    - Mapea la tabla 'paises' mediante @Entity().
 *    - Incluye los campos:
 *        · id: identificador del país.
 *        · nombre_Paises: nombre del país según la tabla original.
 * ---------------------------------------------------------------
 */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('paises', { synchronize: false }) // <-- nombre de la tabla, quitamos que sincronice para no dar error
export class Pais {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'nombre_Paises' })
  nombre_Paises: string;

}
