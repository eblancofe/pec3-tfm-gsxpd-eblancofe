/**
 * ---------------------------------------------------------------
 *  Archivo:        evaluador.service.ts
 *  Descripción:    Servicio encargado de gestionar las operaciones CRUD relacionadas con la entidad 'Evaluador'. Centraliza la 
 *                  lógica de acceso a datos y comunicación con la base de datos mediante TypeORM dentro del sistema GSXPD.
 *  Autor:          Eugenio Blanco Fernández
 *  Universidad:    Universitat Oberta de Catalunya (UOC)
 *  Título Máster:  Máster Universitario en Desarrollo de sitios y aplicaciones Web
 *  Proyecto:       TFM - Sistema de Gestión de Expedientes Digitales (GSXPD)
 *  Fecha creación: 07/03/2026
 *  Última modif.:  10/04/2026
 *
 *  Detalles:
 *    - Obtiene listados paginados y filtrados de evaluadores mediante ILike().
 *    - Permite consultar un evaluador por ID.
 *    - Gestiona la creación, actualización y eliminación de registros.
 *    - Utiliza TypeORM para interactuar con la tabla 'evaluador'.
 *    - Devuelve resultados estructurados con total de registros y datos.
 * ---------------------------------------------------------------
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Evaluador } from './entities/evaluador.entity';

@Injectable()
export class EvaluadorService {
    constructor(
        @InjectRepository(Evaluador)
        private repo: Repository<Evaluador>,
    ) {}

    async getAll(page: number = 1, limit: number = 10, search: string = '') {
        const skip = (page - 1) * limit;

        const [data, total] = await this.repo.findAndCount({
            where: [
                { nombre_Evaluador: ILike(`%${search}%`) }
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
            nombre_Evaluador: data.nombre,
			pais_Evaluador: data.pais,
			direccion_Evaluador: data.direccion,
			postal_Evaluador: data.postal,
			ciudad_Evaluador: data.ciudad,
			telefono_Evaluador: data.telefono,
			email_Evaluador: data.email,
			contacto_Evaluador: data.contacto,
			web_Evaluador: data.web
        });

        return this.repo.save(cambio);
    }

    update(id: number, data: any) {
        return this.repo.update(id, {
            nombre_Evaluador: data.nombre,
			pais_Evaluador: data.pais,
			direccion_Evaluador: data.direccion,
			postal_Evaluador: data.postal,
			ciudad_Evaluador: data.ciudad,
			telefono_Evaluador: data.telefono,
			email_Evaluador: data.email,
			contacto_Evaluador: data.contacto,
			web_Evaluador: data.web
        });
    }

    delete(id: number) {
        return this.repo.delete(id);
    }
}
