/**
 * ---------------------------------------------------------------
 *  Archivo:        significatividad.service.ts
 *  Descripción:    Servicio encargado de gestionar las operaciones CRUD relacionadas con la entidad 'Significatividad'. 
 *                  Centraliza la lógica de negocio y el acceso a datos mediante TypeORM dentro del sistema GSXPD.
 *  Autor:          Eugenio Blanco Fernández
 *  Universidad:    Universitat Oberta de Catalunya (UOC)
 *  Título Máster:  Máster Universitario en Desarrollo de sitios y aplicaciones Web
 *  Proyecto:       TFM - Sistema de Gestión de Expedientes Digitales (GSXPD)
 *
 *  Fecha creación: 07/03/2026
 *  Última modif.:  10/04/2026
 *
 *  Detalles:
 *    - Implementa paginación y búsqueda mediante ILike() sobre el campo nombre_Significatividad.
 *    - Permite obtener un registro por ID.
 *    - Gestiona la creación, actualización y eliminación de niveles de significatividad.
 *    - Utiliza TypeORM para interactuar con la tabla 'significatividad'.
 * ---------------------------------------------------------------
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Significatividad } from './entities/significatividad.entity';

@Injectable()
export class SignificatividadService {
    constructor(
        @InjectRepository(Significatividad)
        private repo: Repository<Significatividad>,
    ) {}

    async getAll(page: number = 1, limit: number = 10, search: string = '') {
        const skip = (page - 1) * limit;

        const [data, total] = await this.repo.findAndCount({
            where: [
                { nombre_Significatividad: ILike(`%${search}%`) }
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
            nombre_Significatividad: data.nombre,
        });

        return this.repo.save(cambio);
    }

    update(id: number, data: any) {
        return this.repo.update(id, {
            nombre_Significatividad: data.nombre,
        });
    }

    delete(id: number) {
        return this.repo.delete(id);
    }
}
