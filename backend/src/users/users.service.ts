/**
 * ---------------------------------------------------------------
 *  Archivo:        users.service.ts
 *  Descripción:    Servicio encargado de gestionar la lógica de negocio relacionada con la entidad 'User'.  
 *                  Incluye operaciones de autenticación, gestión de usuarios, paginación, búsqueda y actualización  
 *                  segura de credenciales dentro del sistema GSXPD.
 *
 *  Autor:          Eugenio Blanco Fernández
 *  Universidad:    Universitat Oberta de Catalunya (UOC)
 *  Título Máster:  Máster Universitario en Desarrollo de sitios y aplicaciones Web
 *  Proyecto:       TFM - Sistema de Gestión de Expedientes Digitales 
 *                  (GSXPD)
 *
 *  Fecha creación: 07/03/2026
 *  Última modif.:  10/04/2026
 *
 *  Detalles:
 *    - Implementa búsqueda paginada mediante ILike() sobre username y email.
 *    - Incluye método findByUsername() utilizado por el módulo de autenticación.
 *    - Crea usuarios con contraseñas encriptadas mediante bcrypt.
 *    - Actualiza usuarios de forma segura, permitiendo modificar campos individuales y re-hashear la contraseña solo cuando se envía.
 *    - Gestiona eliminación de usuarios mediante delete().
 * ---------------------------------------------------------------
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  
  async getAll(page: number = 1, limit: number = 10, search: string = '') {
        const skip = (page - 1) * limit;

        const [data, total] = await this.userRepository.findAndCount({
            where: [
                { username: ILike(`%${search}%`) },
                { email: ILike(`%${search}%`) }
            ],
            skip,
            take: limit,
            order: { id: 'ASC' }
        });

        return { data, total };
    }

  // Buscar usuario por username (para login)
  async findByUsername(username: string): Promise<User | null> {
	  const user = await this.userRepository.findOne({ where: { username } });
	  return user ?? null;
	}


  // Crear usuario con contraseña encriptada
  async createUser(data: any): Promise<User> {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newUser = this.userRepository.create({
      username: data.username,
      password: hashedPassword,
      email: data.email,
      role: data.role ?? 'lectura',
    });

    return this.userRepository.save(newUser);
  }

  // Listar todos los usuarios
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  // Buscar usuario por ID
  async findOne(id: number): Promise<User | null> {
	  const user = await this.userRepository.findOne({ where: { id } });
	  return user ?? null;
	}

  // Actualizar usuario
  /*
  async update(id: number, data: any): Promise<User | null> {
	  await this.userRepository.update(id, data);
	  return this.findOne(id);
	}
*/
  async update(id: number, data: any): Promise<User | null> {
	  const user = await this.userRepository.findOne({ where: { id } });
	  if (!user) return null;

	  // Si el username viene y es distinto, actualizar
	  if (data.username !== undefined && data.username !== user.username) {
		user.username = data.username;
	  }

	  if (data.email !== undefined && data.email !== user.email) {
		user.email = data.email;
	  }

	  if (data.role !== undefined) user.role = data.role;

	  if (data.isActive !== undefined) {
		user.isActive = data.isActive === true || data.isActive === 'true';
	  }

	  if (data.password && data.password.trim() !== '') {
		user.password = await bcrypt.hash(data.password, 10);
	  }

	  return this.userRepository.save(user);
	}

  // Borrar usuario
  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  async deactivateUser(id: number): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) return null;

    user.isActive = false;
    return this.userRepository.save(user);
  }

  async activateUser(id: number): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) return null;

    user.isActive = true;
    return this.userRepository.save(user);
  }
}
