/* 
    ---------------------------------------------------------------
    Archivo:        jwt.strategy.ts
    Descripción:    Estrategia JWT utilizada para validar tokens enviados por el cliente. 
                    Extrae el token del encabezado Authorization (Bearer) y verifica su 
                    validez utilizando la clave secreta configurada en el sistema GSXPD.
    Autor:          Eugenio Blanco Fernández
    Universidad:    Universitat Oberta de Catalunya (UOC)
    Título Máster:  Máster Universitario en Desarrollo de sitios y aplicaciones Web
    Proyecto:       TFM - Sistema de Gestión de Expedientes Digitales (GSXPD)
    Fecha creación: 07/03/2026
    Última modif.:  08/04/2026

    Detalles:
      - Implementa la estrategia JWT extendiendo PassportStrategy.
      - Extrae el token del encabezado Authorization como Bearer Token.
      - Valida el payload y devuelve los datos esenciales del usuario autenticado.
    ---------------------------------------------------------------
*/
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'supersecretkey',
    });
  }

  async validate(payload: any) {
    return { id: payload.sub, username: payload.username, role: payload.role };
  }
}
