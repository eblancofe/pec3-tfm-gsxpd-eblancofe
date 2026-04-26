/**
 * ---------------------------------------------------------------
 *  Archivo:        roles.guard.ts
 *  Descripción:    Guard encargado de validar si el usuario autenticado posee alguno de los roles 
 *                  requeridos para acceder a un recurso protegido dentro del sistema GSXPD.
 *  Autor:          Eugenio Blanco Fernández
 *  Universidad:    Universitat Oberta de Catalunya (UOC)
 *  Título Máster:  Máster Universitario en Desarrollo de sitios y aplicaciones Web
 *  Proyecto:       TFM - Sistema de Gestión de Expedientes Digitales (GSXPD)
 *  Fecha creación: 07/03/2026
 *  Última modif.:  08/04/2026
 *
 *  Detalles:
 *    - Obtiene los roles requeridos mediante metadatos asignados con el decorador @Roles().
 *    - Accede al usuario autenticado desde la petición HTTP.
 *    - Permite el acceso solo si el rol del usuario coincide con alguno de los permitidos.
 * ---------------------------------------------------------------
 */
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!requiredRoles) return true;

    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.includes(user.role);
  }
}
