/**
 * ---------------------------------------------------------------
 *  Archivo:        paises.service.ts
 *  Descripción:    Servicio encargado de gestionar las operaciones de consulta relacionadas con la entidad 'Pais'.  
 *                  Proporciona acceso a la tabla de países utilizada como referencia dentro del sistema GSXPD.
 *  Autor:          Eugenio Blanco Fernández
 *  Universidad:    Universitat Oberta de Catalunya (UOC)
 *  Título Máster:  Máster Universitario en Desarrollo de sitios y aplicaciones Web
 *  Proyecto:       TFM - Sistema de Gestión de Expedientes Digitales (GSXPD)
 *  Fecha creación: 07/03/2026
 *  Última modif.:  10/04/2026
 *
 *  Detalles:
 *    - Utiliza TypeORM para consultar la tabla 'paises'.
 *    - Ofrece un método para obtener el listado completo de países.
 *    - Ordena los resultados alfabéticamente por nombre para facilitar su uso en formularios y listas desplegables.
 * ---------------------------------------------------------------
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pais } from './entities/paises.entity';

@Injectable()
export class PaisesService {
  constructor(
    @InjectRepository(Pais)
    private repo: Repository<Pais>,
  ) {}

  getAll() {
    return this.repo.find({ order: { nombre_Paises: 'ASC' } });
  }
}
