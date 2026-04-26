/**
 * ---------------------------------------------------------------
 *  Archivo:        jwt-auth.guard.ts
 *  Descripción:    Guard encargado de proteger rutas mediante autenticación JWT. Valida el token
 *                  incluido en la petición y permite el acceso únicamente a usuarios autenticados.
 *
 *  Autor:          Eugenio Blanco Fernández
 *  Universidad:    Universitat Oberta de Catalunya (UOC)
 *  Título Máster:  Máster Universitario en Desarrollo de sitios y aplicaciones Web
 *  Proyecto:       TFM - Sistema de Gestión de Expedientes Digitales (GSXPD)
 *
 *  Fecha creación: 07/03/2026
 *  Última modif.:  08/04/2026
 *
 *  Detalles:
 *  - Extiende AuthGuard('jwt') para aplicar la estrategia JWT.
 *  - Verifica la validez del token antes de permitir el acceso.
 *  - Se utiliza en controladores que requieren autenticación.
 * ---------------------------------------------------------------
 */
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
