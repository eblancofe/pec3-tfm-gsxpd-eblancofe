/**
 * ---------------------------------------------------------------
 *  Archivo:        usuario.entity.ts
 *  Descripción:    Entidad que representa la tabla 'usuario' dentro del sistema GSXPD. Define la estructura  
 *                  de datos utilizada por TypeORM para gestionar usuarios, credenciales, roles y estados de actividad.
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
 *    - Mapea la tabla 'usuario' mediante @Entity().
 *    - Incluye campos de autenticación (username, password), contacto (email), permisos (role) y estado (isActive).
 *    - Registra automáticamente las fechas de creación y actualización mediante @CreateDateColumn y @UpdateDateColumn.
 *    - Los roles disponibles son: admin, eer, lectura y secretaria.
 * ---------------------------------------------------------------
 */
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('usuario')   // nombre real de la tabla
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'username', unique: true })
  username: string;

  @Column({ name: 'password' })
  password: string;

  @Column({ name: 'email', unique: true, nullable: true })
  email: string;

  @Column({
    type: 'enum',
    enum: ['admin', 'eer', 'lectura', 'secretaria'],
    default: 'lectura'
  })
  role: string;

  @Column({ name: 'isActive', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt: Date;
}
