/* 
    ---------------------------------------------------------------
    Archivo:        app.service.ts
    Descripción:    Servicio principal del backend NestJS para el sistema GSXPD. Proporciona métodos básicos de
                    respuesta utilizados para pruebas iniciales y verificación del correcto funcionamiento del
                    servidor.
    Autor:          Eugenio Blanco Fernández
    Universidad:    Universitat Oberta de Catalunya (UOC)
    Título Máster:  Máster Universitario en Desarrollo de sitios y aplicaciones Web
    Proyecto:       TFM - Sistema de Gestión de Expedientes Digitales (GSXPD)
    Fecha creación: 07/03/2026
    Última modif.:  10/04/2026

    Detalles:
      - Servicio marcado con @Injectable() para su inyección en controladores u otros servicios.
      - Incluye un método básico getHello() utilizado como endpoint de prueba o verificación del backend.
      - Forma parte del módulo raíz AppModule.
    ---------------------------------------------------------------
*/
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
