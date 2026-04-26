/* 
    ---------------------------------------------------------------
    Archivo:        main.ts
    Descripción:    Punto de entrada del backend desarrollado con NestJS para el sistema GSXPD. Inicializa la
                    aplicación, configura las políticas CORS para permitir la comunicación con el frontend Angular
                    y arranca el servidor HTTP.
    Autor:          Eugenio Blanco Fernández
    Universidad:    Universitat Oberta de Catalunya (UOC)
    Título Máster:  Máster Universitario en Desarrollo de sitios y aplicaciones Web
    Proyecto:       TFM - Sistema de Gestión de Expedientes Digitales (GSXPD)
    Fecha creación: 01/03/2026
    Última modif.:  10/04/2026

    Detalles:
      - Crea la instancia principal de la aplicación NestJS.
      - Configura CORS para permitir peticiones desde el frontend Angular (http://localhost:4200).
      - Habilita métodos y cabeceras necesarias para la API REST.
      - Inicia el servidor en el puerto 3000.
    ---------------------------------------------------------------
*/
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204
  });

  await app.listen(3000);
}
bootstrap();
