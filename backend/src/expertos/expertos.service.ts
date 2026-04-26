/**
 * ---------------------------------------------------------------
 *  Archivo:        expertos.service.ts
 *  Descripción:    Servicio encargado de gestionar las operaciones CRUD relacionadas con la entidad 'Experto'. 
 *                  Centraliza la lógica de negocio y el acceso a datos mediante TypeORM dentro del sistema GSXPD.
 *  Autor:          Eugenio Blanco Fernández
 *  Universidad:    Universitat Oberta de Catalunya (UOC)
 *  Título Máster:  Máster Universitario en Desarrollo de sitios y aplicaciones Web
 *  Proyecto:       TFM - Sistema de Gestión de Expedientes Digitales (GSXPD)
 *  Fecha creación: 07/03/2026
 *  Última modif.:  10/04/2026
 *
 *  Detalles:
 *    - Implementa paginación y búsqueda mediante ILike() sobre nombre y apellidos.
 *    - Permite obtener un experto por ID.
 *    - Gestiona la creación, actualización y eliminación de expertos EER.
 *    - Realiza el mapeo entre los datos recibidos desde el frontend y los campos reales de la entidad.
 *    - Utiliza TypeORM para interactuar con la tabla 'expertos'.
 * ---------------------------------------------------------------
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Experto } from './entities/expertos.entity';

@Injectable()
export class ExpertosService {
    constructor(
        @InjectRepository(Experto)
        private repo: Repository<Experto>,
    ) {}

    async getAll(page: number = 1, limit: number = 10, search: string = '') {
        const skip = (page - 1) * limit;

        const [data, total] = await this.repo.findAndCount({
            where: [
                { nombre_EER: ILike(`%${search}%`) },
                { apellidos_EER: ILike(`%${search}%`) }
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
        const experto = this.repo.create({
            nombre_EER: data.nombre,
            apellidos_EER: data.apellidos,
            //activo: data.activo,
        });

        return this.repo.save(experto);
    }

    update(id: number, data: any) {
        return this.repo.update(id, {
            nombre_EER: data.nombre,
            apellidos_EER: data.apellidos,
            //activo: data.activo,
        });
    }

    delete(id: number) {
        return this.repo.delete(id);
    }
}
