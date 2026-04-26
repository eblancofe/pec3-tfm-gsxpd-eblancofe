/**
 * ---------------------------------------------------------------
 *  Archivo:        expedientes.entity.ts
 *  Descripción:    Entidad que representa la tabla 'expedientes' dentro del sistema GSXPD. Define la 
 *                  estructura de datos utilizada por TypeORM para mapear toda la información asociada 
 * 					a un expediente digital, incluyendo extractos, cambios, FGC, IPA y datos del evaluador AsBo.
 *  Autor:          Eugenio Blanco Fernández
 *  Universidad:    Universitat Oberta de Catalunya (UOC)
 *  Título Máster:  Máster Universitario en Desarrollo de sitios y aplicaciones Web
 *  Proyecto:       TFM - Sistema de Gestión de Expedientes Digitales (GSXPD)
 *  Fecha creación: 07/03/2026
 *  Última modif.:  10/04/2026
 *
 *  Detalles:
 *    - Mapea la tabla 'expedientes' mediante el decorador @Entity().
 *    - Incluye campos relacionados con:
 *        · Experto EER, DG, Titularidad y Actuaciones.
 *        · Extracto de la Definición del Sistema (DS).
 *        · Documentación de Significatividad.
 *        · Ficha de Gestión Compartida (FGC).
 *        · Informe de Pruebas de Aplicación (IPA).
 *        · Evaluador de Seguridad (AsBo).
 *    - Permite la gestión completa de expedientes mediante TypeORM.
 * ---------------------------------------------------------------
 */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('expedientes')   // <-- nombre de la tabla
export class Expedientes {
    @PrimaryGeneratedColumn()
    id: number;
/*
    @Column()
    nombre_EER: string;
	
	@Column()
	nombre_DG: string;
	
	@Column()
    nombre_Titular_Linea: string;    
	
	@Column()
	nombre_Actuacion: string;

	@Column()
    nombre_Subactuacion: string;
	
	@Column()
    nombre_Actuacion_Particular: string;
	
	@Column()
    nombre_Carpeta: string;
*/		
	@Column({ name: 'nombre_ExpertoEER', nullable: true })
	nombre_ExpertoEER: string; //relación con tabla Experto/nombre_EER
	
	@Column({ name: 'nombre_DG' })
    nombre_DG: string; //relación con tabla unidad-organziativa/nombre_UnidadOrganizativa	

	@Column({ name: 'nombre_Titular_Linea' })
	nombre_Titular_Linea: string; ////relación con tabla Titularidad/nombre_Titularidad

	@Column({ name: 'nombre_Actuacion' })
    nombre_Actuacion: string; //campo nombre de la Actuación Global del expediente

	@Column({ name: 'nombre_Subactuacion', nullable: true })
    nombre_Subactuacion: string; //campo nombre de la Subactuación Global del expediente

	@Column({ name: 'nombre_Actuacion_Particular', nullable: true })
    nombre_Actuacion_Particular: string; //campo nombre de la Actuación Particular del expediente

	@Column({ name: 'nombre_Carpeta', nullable: true })
    nombre_Carpeta: string; //campo nombre de la Carpeta del registro del expediente

	//2º bloque (Extracto)
	@Column({ name: 'nombre_Extracto' })
    nombre_Extracto: string; //campo nombre del extracto de la Definición del Sistema (DS)

	@Column({ name: 'nombre_Extracto_Referencia' })
	nombre_Extracto_Referencia: string; //campo nombre de Referencia del extracto de la (DS)    

	@Column({ name: 'nombre_Extracto_Version' })
	nombre_Extracto_Version: string; //campo nombre de la versión Referencia del extracto de la (DS)

	@Column({ name: 'nombre_Extracto_EEFF' })
    nombre_Extracto_EEFF: boolean; //campo Sí/No sobre envío de Extracto a EEFF

	@Column({ name: 'nombre_Extracto_Fecha' })
    nombre_Extracto_Fecha: Date; //campo Fecha() sobre la realziación del envío de Extracto a EEFF

	@Column({ name: 'nombre_Extracto_Archivo', nullable: true })
    nombre_Extracto_Archivo: string; //campo nombre de la ubicación de la carga del Extracto de la DS

	//3º bloque (Significatividad)
	@Column({ name: 'nombre_Cambio_Tipo' })
	nombre_Cambio_Tipo: string; //relación con tabla Cambio/nombre_Cambio

	@Column({ name: 'nombre_Cambio_Titulo' })
	nombre_Cambio_Titulo: string; //campo con el título del cambio del expediente

	@Column({ name: 'nombre_Cambio_Significativo' })
	nombre_Cambio_Significativo: string; //relación con tabla Significatividad/nombre_Significatividad

	@Column({ name: 'nombre_Cambio_Version' })
	nombre_Cambio_Version: string; //campo con la versión del documento de Significatividad

	@Column({ name: 'nombre_Cambio_Fecha' })
	nombre_Cambio_Fecha: Date; //campo Fecha() sobre la fecha del documento de Significatividad    

	@Column({ name: 'nombre_Cambio_Archivo', nullable: true })
	nombre_Cambio_Archivo: string; //campo nombre de la ubicación de la carga del documento de Significatividad

	//4º bloque (Ficha Gestión Compartida)
   @Column({ name: 'nombre_FGC' })
	nombre_FGC: string; //campo nombre de Ficha de Gestión Compartida (FGC)

	@Column({ name: 'nombre_FGC_Version' })
	nombre_FGC_Version: string; //campo con la versión del documento de (FGC)

	@Column({ name: 'nombre_FGC_Fecha' })
	nombre_FGC_Fecha: Date; //campo Fecha() sobre la fecha de Ficha de Gestión Compartida (FGC)

	@Column({ name: 'nombre_FGC_Archivo', nullable: true })
	nombre_FGC_Archivo: string; //campo nombre de la ubicación de la carga de (FGC)

	//5º bloque (Informe Pruebas Aplicación)
    @Column({ name: 'nombre_IPA' })
	nombre_IPA: string; //campo nombre Informe Pruebas Aplicación (IPA)

	@Column({ name: 'nombre_IPA_Referencia' })
	nombre_IPA_Referencia: String; //campo nombre de Referencia del documento (IPA)

	@Column({ name: 'nombre_IPA_Version' })
	nombre_IPA_Version: string; //campo con la versión Referencia del documento (IPA)

	@Column({ name: 'nombre_IPA_Fecha' })
	nombre_IPA_Fecha: Date; //campo Fecha sobre la fecha del documento (IPA)

	@Column({ name: 'nombre_IPA_Archivo', nullable: true })
	nombre_IPA_Archivo: string; //campo nombre de la ubicación de la carga de documento (IPA)    

	//6º bloque (AsBo)
	@Column({ name: 'nombre_Evaluador_ASBO' })
	nombre_Evaluador_ASBO: string; //campo nombre del evaluador de seguridad (AsBo)

	@Column({ name: 'nombre_Evaluador_Contrata' })
	nombre_Evaluador_Contrata: boolean; //campo Sí/No sobre subcontratación de evaluador (AsBo)

	@Column({ name: 'nombre_Evaluador_Fecha_Prevista', nullable: true })
	nombre_Evaluador_Fecha_Prevista: Date; //campo Fecha() sobre fecha PREVISTA del evaluador (AsBo)

	@Column({ name: 'nombre_Evaluador_Fecha_Ejecucion', nullable: true })
	nombre_Evaluador_Fecha_Ejecucion: Date; //campo Fecha() sobre fecha EJECUCIÓN del evaluador (AsBo)

	@Column({ name: 'nombre_Evaluador_Version' })
	nombre_Evaluador_Version: string; //campo con la versión del documento evaluador (AsBo)

	@Column({ name: 'nombre_Evaluador_Archivo', nullable: true })
	nombre_Evaluador_Archivo: string; //campo nombre de la ubicación de la carga de documento evaluador (AsBo)	
}

