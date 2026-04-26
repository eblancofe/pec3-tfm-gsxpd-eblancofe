/**
 * ---------------------------------------------------------------
 *  Archivo:        app.module.ts
 *  Descripción:    Módulo raíz del sistema GSXPD. Configura la conexión con la base de datos PostgreSQL  
 *                  mediante TypeORM e integra todos los módulos funcionales de la aplicación, incluyendo
 *                  autenticación, gestión de usuarios, expedientes y catálogos auxiliares.
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
 *    - Configura TypeORM con PostgreSQL, carga automática de entidades y sincronización deshabilitada para entornos seguros.
 *    - Importa todos los módulos funcionales del sistema:
 *        · Users, Auth, Expertos, Titularidad, UnidadOrganizativa,
 *          Cambio, Significatividad, Evaluador, Paises, Expedientes.
 *    - Define el controlador y servicio principal de la aplicación.
 * ---------------------------------------------------------------
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ExpertosModule } from './expertos/expertos.module';
import { TitularidadModule } from './titularidad/titularidad.module';
import { UnidadOrganizativaModule } from './unidad-organizativa/unidad-organizativa.module';
import { CambioModule } from './cambio/cambio.module';
import { SignificatividadModule } from './significatividad/significatividad.module';
import { EvaluadorModule } from './evaluador/evaluador.module';
import { PaisesModule } from './paises/paises.module';
import { ExpedientesModule } from './expedientes/expedientes.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'KpT5Fi2Dr3bJ',
      database: 'db_expedientes',
      autoLoadEntities: true,
      synchronize: false,
    }),
    UsersModule,
    ExpertosModule,
    TitularidadModule,
    UnidadOrganizativaModule,
    CambioModule,
    SignificatividadModule,
    EvaluadorModule,
    PaisesModule,
    ExpedientesModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

