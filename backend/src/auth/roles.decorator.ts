/**
 * ---------------------------------------------------------------
 *  Archivo:        roles.decorator.ts
 *  Descripción:    Decorador personalizado que permite asignar roles a rutas o controladores. Almacena metadatos
 *                  que posteriormente serán evaluados por el RolesGuard para controlar el acceso según el rol del usuario.
 *  Autor:          Eugenio Blanco Fernández
 *  Universidad:    Universitat Oberta de Catalunya (UOC)
 *  Título Máster:  Máster Universitario en Desarrollo de sitios y aplicaciones Web
 *  Proyecto:       TFM - Sistema de Gestión de Expedientes Digitales (GSXPD)
 *  Fecha creación: 07/03/2026
 *  Última modif.:  08/04/2026
 *
 *  Detalles:
 *    - Utiliza SetMetadata para registrar los roles permitidos.
 *    - Se aplica sobre métodos o controladores completos.
 *    - Trabaja junto con RolesGuard para validar permisos.
 * ---------------------------------------------------------------
 */
import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
