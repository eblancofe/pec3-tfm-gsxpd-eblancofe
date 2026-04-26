/**
 * ---------------------------------------------------------------
 *  Archivo:        unidad-organizativa.service.ts
 *  Descripción:    Servicio encargado de gestionar las operaciones CRUD relacionadas con la entidad 'UnidadOrganizativa'. 
 *                  Centraliza la lógica de negocio y el acceso a datos mediante TypeORM dentro del sistema GSXPD.
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
 *    - Implementa paginación y búsqueda mediante ILike() sobre el campo nombre_UnidadOrganizativa.
 *    - Permite obtener un registro por ID.
 *    - Gestiona la creación, actualización y eliminación de unidades organizativas.
 *    - Utiliza TypeORM para interactuar con la tabla 'unidad_organizativa'.
 * ---------------------------------------------------------------
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { UnidadOrganizativa } from './entities/unidad-organizativa.entity';

@Injectable()
export class UnidadOrganizativaService {
    constructor(
        @InjectRepository(UnidadOrganizativa)
        private repo: Repository<UnidadOrganizativa>,
    ) {}

    async getAll(page: number = 1, limit: number = 10, search: string = '') {
        const skip = (page - 1) * limit;

        const [data, total] = await this.repo.findAndCount({
            where: [
                { nombre_UnidadOrganizativa: ILike(`%${search}%`) }
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
        const titular = this.repo.create({
            nombre_UnidadOrganizativa: data.nombre,
        });

        return this.repo.save(titular);
    }

    update(id: number, data: any) {
        return this.repo.update(id, {
            nombre_UnidadOrganizativa: data.nombre,
        });
    }

    delete(id: number) {
        return this.repo.delete(id);
    }
}
