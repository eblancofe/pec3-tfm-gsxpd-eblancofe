/**
 * ---------------------------------------------------------------
 *  Archivo:        cambio.service.ts
 *  Descripción:    Servicio encargado de gestionar las operaciones CRUD relacionadas con la entidad 'Cambio'. 
 *                  Centraliza la lógica de acceso a datos y comunicación con la base de datos mediante TypeORM 
 *                  dentro del sistema GSXPD.
 *  Autor:          Eugenio Blanco Fernández
 *  Universidad:    Universitat Oberta de Catalunya (UOC)
 *  Título Máster:  Máster Universitario en Desarrollo de sitios y aplicaciones Web
 *  Proyecto:       TFM - Sistema de Gestión de Expedientes Digitales (GSXPD)
 *  Fecha creación: 07/03/2026
 *  Última modif.:  08/04/2026
 *
 *  Detalles:
 *    - Obtiene listados paginados y filtrados de cambios mediante ILike().
 *    - Permite consultar un cambio por ID.
 *    - Gestiona la creación, actualización y eliminación de registros.
 *    - Utiliza TypeORM para interactuar con la tabla 'cambio'.
 *    - Devuelve resultados estructurados con total de registros y datos.
 * ---------------------------------------------------------------
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Cambio } from './entities/cambio.entity';

@Injectable()
export class CambioService {
    constructor(
        @InjectRepository(Cambio)
        private repo: Repository<Cambio>,
    ) {}

    async getAll(page: number = 1, limit: number = 10, search: string = '') {
        const skip = (page - 1) * limit;

        const [data, total] = await this.repo.findAndCount({
            where: [
                { nombre_Cambio: ILike(`%${search}%`) }
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

    create(data: any) {
        const cambio = this.repo.create({
            nombre_Cambio: data.nombre,
        });

        return this.repo.save(cambio);
    }

    update(id: number, data: any) {
        return this.repo.update(id, {
            nombre_Cambio: data.nombre,
        });
    }

    delete(id: number) {
        return this.repo.delete(id);
    }
}
