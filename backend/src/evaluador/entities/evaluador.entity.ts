/**
 * ---------------------------------------------------------------
 *  Archivo:        evaluador.entity.ts
 *  Descripción:    Entidad que representa la tabla 'evaluador' dentro del sistema GSXPD. Define la 
 *                  estructura de datos utilizada por TypeORM para mapear la información de los evaluadores.
 *  Autor:          Eugenio Blanco Fernández
 *  Universidad:    Universitat Oberta de Catalunya (UOC)
 *  Título Máster:  Máster Universitario en Desarrollo de sitios y aplicaciones Web
 *  Proyecto:       TFM - Sistema de Gestión de Expedientes Digitales (GSXPD)
 *  Fecha creación: 07/03/2026
 *  Última modif.:  08/04/2026
 *
 *  Detalles:
 *    - Mapea la tabla 'evaluador' mediante el decorador @Entity().
 *    - Incluye un campo ID autogenerado como clave primaria.
 *    - Define todos los campos de información del evaluador: nombre, país, dirección, código postal, ciudad, teléfono, email, contacto y web.
 *    - Permite la gestión completa de evaluadores mediante TypeORM.
 * ---------------------------------------------------------------
 */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('evaluador')   // <-- nombre de la tabla
export class Evaluador {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre_Evaluador: string;
	
	@Column()
	pais_Evaluador: string;
	
	@Column()
    direccion_Evaluador: string;    
	
	@Column()
	postal_Evaluador: string;

	@Column()
    ciudad_Evaluador: string;
	
	@Column()
    telefono_Evaluador: string;
	
	@Column()
    email_Evaluador: string;
	
	@Column()
    contacto_Evaluador: string;
	
	@Column()
    web_Evaluador: string;
}
/*
@Entity('evaluador')
export class Evaluador {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'nombre_Evaluador' })
    nombre: string;
    
    @Column({ name: 'pais_Evaluador' })
    pais: string;
    
    @Column({ name: 'direccion_Evaluador' })
    direccion: string;    
    
    @Column({ name: 'postal_Evaluador' })
    postal: number;
    
    @Column({ name: 'ciudad_Evaluador' })
    ciudad: string;
    
    @Column({ name: 'telefono_Evaluador' })
    telefono: string;
    
    @Column({ name: 'email_Evaluador' })
    email: string;
    
    @Column({ name: 'contacto_Evaluador' })
    contacto: string;
    
    @Column({ name: 'web_Evaluador' })
    web: string;
}
*/