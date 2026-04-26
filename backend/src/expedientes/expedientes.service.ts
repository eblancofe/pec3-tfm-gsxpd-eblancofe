/**
 * ---------------------------------------------------------------
 *  Archivo:        expedientes.service.ts
 *  Descripción:    Servicio encargado de gestionar las operaciones CRUD relacionadas con la entidad 'Expedientes'. 
 *                  Centraliza la lógica de negocio y el acceso a datos mediante TypeORM dentro del sistema GSXPD.
 *  Autor:          Eugenio Blanco Fernández
 *  Universidad:    Universitat Oberta de Catalunya (UOC)
 *  Título Máster:  Máster Universitario en Desarrollo de sitios y aplicaciones Web
 *  Proyecto:       TFM - Sistema de Gestión de Expedientes Digitales (GSXPD)
 *  Fecha creación: 07/03/2026
 *  Última modif.:  09/04/2026
 *
 *  Detalles:
 *    - Implementa paginación y búsqueda mediante ILike() sobre varios campos.
 *    - Permite obtener un expediente por ID.
 *    - Gestiona la creación, actualización y eliminación de expedientes.
 *    - Realiza el mapeo entre los datos recibidos desde el frontend y los campos reales de la entidad, 
 *      incluyendo tratamiento especial para listas (como el campo nombre_ExpertoEER).
 *    - Utiliza TypeORM para interactuar con la tabla 'expedientes'.
 * ---------------------------------------------------------------
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Expedientes } from './entities/expedientes.entity';

@Injectable()
export class ExpedientesService {
  //expedienteRepository: any;
  constructor(
    @InjectRepository(Expedientes)
    private repo: Repository<Expedientes>,
  ) {}

  async getAll(page: number = 1, limit: number = 10, search: string = '') {
    const skip = (page - 1) * limit;

    const [data, total] = await this.repo.findAndCount({
      where: [
        { nombre_Actuacion: ILike(`%${search}%`) },
        { nombre_Subactuacion: ILike(`%${search}%`) },
        { nombre_Actuacion_Particular: ILike(`%${search}%`) }
      ],
      skip,
      take: limit,
      order: { id: 'ASC' }
    });

    return { data, total };
  }

  getById(id: number) {
    return this.repo.findOneBy({ id });
  }
  /*
  async findOne(id: number) {
    const expediente = await this.expedienteRepository.findOne({
      where: { id },
      relations: {
        expertosEER: true,
        dg: true,
        titularLinea: true
      }
    });

    return {
      id: expediente.id,
      expertosEER: expediente.expertosEER.map(e => e.nombre),
      dg: expediente.dg?.nombre,
      titularLinea: expediente.titularLinea?.nombre,
      nombre_Actuacion: expediente.nombre_Actuacion
    };
  }
*/
async findOne(id: number) {
  return this.repo.findOne({
    where: { id }
  });
}

  // -----------------------------
  // CREATE
  // -----------------------------
  create(data: any) {
    console.log("BACKEND RECIBE:", data);
    const expediente = this.repo.create({

      // BLOQUE 1
      //nombre_ExpertoEER: data.expedienteNombreEER,
	  nombre_ExpertoEER: Array.isArray(data.expedienteNombreEER)
	  ? data.expedienteNombreEER.join(',')
	  : data.expedienteNombreEER,
	  
      nombre_DG: data.expedienteNombreDG,
      nombre_Titular_Linea: data.expedienteNombreTitular,
      nombre_Actuacion: data.expedienteNombreActuacion,
      nombre_Subactuacion: data.expedienteNombreSubactuacion,
      nombre_Actuacion_Particular: data.expedienteNombreActuacionParticular,
      nombre_Carpeta: data.expedienteNombreCarpeta,

      // BLOQUE 2
      nombre_Extracto: data.expedienteNombreExtracto,
      nombre_Extracto_Referencia: data.expedienteNombreReferenciaExtracto,
      nombre_Extracto_Version: data.expedienteNombreVersionExtracto,
      nombre_Extracto_EEFF: data.expedienteNombreEnvioExtracto,
      nombre_Extracto_Fecha: data.expedienteNombreFechaExtracto,
      nombre_Extracto_Archivo: data.expedienteNombreArchivoExtracto,

      // BLOQUE 3
      nombre_Cambio_Tipo: data.expedienteNombreCambio,
      nombre_Cambio_Titulo: data.expedienteNombreTituloCambio,
      nombre_Cambio_Significativo: data.expedienteNombreSignificativoCambio,
      nombre_Cambio_Version: data.expedienteNombreVersionCambio,
      nombre_Cambio_Fecha: data.expedienteNombreFechaCambio,
      nombre_Cambio_Archivo: data.expedienteNombreArchivoCambio,

      // BLOQUE 4
      nombre_FGC: data.expedienteNombreFicha,
      nombre_FGC_Version: data.expedienteNombreVersionFicha,
      nombre_FGC_Fecha: data.expedienteNombreFechaFicha,
      nombre_FGC_Archivo: data.expedienteNombreArchivoFicha,

      // BLOQUE 5
      nombre_IPA: data.expedienteNombreIPA,
      nombre_IPA_Referencia: data.expedienteNombreReferenciaIPA,
      nombre_IPA_Version: data.expedienteNombreVersionIPA,
      nombre_IPA_Fecha: data.expedienteNombreFechaIPA,
      nombre_IPA_Archivo: data.expedienteNombreArchivoIPA,

      // BLOQUE 6
      nombre_Evaluador_ASBO: data.expedienteNombreASBOEvaluador,
      nombre_Evaluador_Contrata: data.expedienteNombreContrataEvaluador,
      nombre_Evaluador_Fecha_Prevista: data.expedienteNombrePrevistaEvaluador,
      nombre_Evaluador_Fecha_Ejecucion: data.expedienteNombreEjecucionEvaluador,
      nombre_Evaluador_Version: data.expedienteNombreVersionEvaluador,
      nombre_Evaluador_Archivo: data.expedienteNombreArchivoEvaluador
    });

    return this.repo.save(expediente);
  }

  // -----------------------------
  // UPDATE
  // -----------------------------
  update(id: number, data: any) {
    return this.repo.update(id, {

      //nombre_ExpertoEER: data.expedienteNombreEER,
	  nombre_ExpertoEER: Array.isArray(data.expedienteNombreEER)
	  ? data.expedienteNombreEER.join(',')
	  : data.expedienteNombreEER,
	  
      nombre_DG: data.expedienteNombreDG,
      nombre_Titular_Linea: data.expedienteNombreTitular,
      nombre_Actuacion: data.expedienteNombreActuacion,
      nombre_Subactuacion: data.expedienteNombreSubactuacion,
      nombre_Actuacion_Particular: data.expedienteNombreActuacionParticular,
      nombre_Carpeta: data.expedienteNombreCarpeta,

      nombre_Extracto: data.expedienteNombreExtracto,
      nombre_Extracto_Referencia: data.expedienteNombreReferenciaExtracto,
      nombre_Extracto_Version: data.expedienteNombreVersionExtracto,
      nombre_Extracto_EEFF: data.expedienteNombreEnvioExtracto,
      nombre_Extracto_Fecha: data.expedienteNombreFechaExtracto,
      nombre_Extracto_Archivo: data.expedienteNombreArchivoExtracto,

      nombre_Cambio_Tipo: data.expedienteNombreCambio,
      nombre_Cambio_Titulo: data.expedienteNombreTituloCambio,
      nombre_Cambio_Significativo: data.expedienteNombreSignificativoCambio,
      nombre_Cambio_Version: data.expedienteNombreVersionCambio,
      nombre_Cambio_Fecha: data.expedienteNombreFechaCambio,
      nombre_Cambio_Archivo: data.expedienteNombreArchivoCambio,

      nombre_FGC: data.expedienteNombreFicha,
      nombre_FGC_Version: data.expedienteNombreVersionFicha,
      nombre_FGC_Fecha: data.expedienteNombreFechaFicha,
      nombre_FGC_Archivo: data.expedienteNombreArchivoFicha,

      nombre_IPA: data.expedienteNombreIPA,
      nombre_IPA_Referencia: data.expedienteNombreReferenciaIPA,
      nombre_IPA_Version: data.expedienteNombreVersionIPA,
      nombre_IPA_Fecha: data.expedienteNombreFechaIPA,
      nombre_IPA_Archivo: data.expedienteNombreArchivoIPA,

      nombre_Evaluador_ASBO: data.expedienteNombreASBOEvaluador,
      nombre_Evaluador_Contrata: data.expedienteNombreContrataEvaluador,
      nombre_Evaluador_Fecha_Prevista: data.expedienteNombrePrevistaEvaluador,
      nombre_Evaluador_Fecha_Ejecucion: data.expedienteNombreEjecucionEvaluador,
      nombre_Evaluador_Version: data.expedienteNombreVersionEvaluador,
      nombre_Evaluador_Archivo: data.expedienteNombreArchivoEvaluador
    });
  }

  // -----------------------------
  // DELETE
  // -----------------------------
  delete(id: number) {
    return this.repo.delete(id);
  }
}
