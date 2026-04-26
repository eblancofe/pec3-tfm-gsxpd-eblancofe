/**
 * ---------------------------------------------------------------
 *  Archivo:        local-auth.guard.ts
 *  Descripción:    Guard encargado de gestionar la autenticación mediante la estrategia Local. 
 *                  Valida las credenciales enviadas por el usuario antes de permitir el acceso al endpoint de login.
 *  Autor:          Eugenio Blanco Fernández
 *  Universidad:    Universitat Oberta de Catalunya (UOC)
 *  Título Máster:  Máster Universitario en Desarrollo de sitios y aplicaciones Web
 *  Proyecto:       TFM - Sistema de Gestión de Expedientes Digitales (GSXPD)
 *  Fecha creación: 07/03/2026
 *  Última modif.:  08/04/2026
 *
 *  Detalles:
 *    - Extiende AuthGuard('local') para aplicar la estrategia Local.
 *    - Valida usuario y contraseña antes de generar el token JWT.
 *    - Se utiliza exclusivamente en el endpoint de login.
 * ---------------------------------------------------------------
 */
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}
