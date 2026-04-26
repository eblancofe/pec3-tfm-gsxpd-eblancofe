/**
 * ---------------------------------------------------------------
 *  Archivo:        main.ts
 *  Descripción:    Punto de entrada principal de la aplicación
 *                  Angular. Encargado de inicializar el arranque
 *                  de la aplicación mediante bootstrapApplication,
 *                  aplicando la configuración global definida en
 *                  app.config.ts.
 *  Autor:          Eugenio Blanco Fernández
 *  Universidad:    Universitat Oberta de Catalunya (UOC)
 *  Título Máster:  Máster Universitario en Desarrollo de sitios y aplicaciones Web
 *  Proyecto:       TFM - Sistema de Gestión de Expedientes Digitales (GSXPD)
 *  Fecha creación: 01/03/2026
 *  Última modif.:  10/04/2026
 *
 *  Detalles:
 *    - Inicializa la aplicación cargando el componente raíz AppComponent.
 *    - Aplica la configuración global definida en app.config.ts, incluyendo interceptores, router y listeners globales.
 *    - Gestiona errores de arranque mediante captura de excepciones.
 * ---------------------------------------------------------------
 */
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error(err));
