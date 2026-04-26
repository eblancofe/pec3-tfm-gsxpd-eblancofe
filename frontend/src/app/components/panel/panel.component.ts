/**
 * ---------------------------------------------------------------
 *  Archivo:        panel.component.ts
 *  Descripción:    COMPONENTE->Realiza la principal del panel de inicio del sistema, encargado
 *                  de mostrar las opciones disponibles según el rol del usuario autenticado.
 *  Autor:          Eugenio Blanco Fernández
 *  Universidad:    Universitat Oberta de Catalunya (UOC)
 *  Título Máster:  Máster Universitario en Desarrollo de sitios y aplicaciones Web
 *  Proyecto:       TFM - Sistema de Gestión de Expedientes Digitales (GSXPD)
 *  Fecha creación: 07/03/2026
 *  Última modif.:  10/04/2026
 *
 *  Detalles:
 *    - Obtiene el rol y nombre del usuario desde AuthService.
 *    - Filtra las opciones del panel según los permisos definidos en PermisosPanelService.
 *    - Muestra únicamente las secciones accesibles para cada rol.
 *    - Permite cerrar sesión y redirige al login.
 * ---------------------------------------------------------------
 */
//Importamos herramientas necesarias de Angular
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { PermisosPanelService } from '../../services/permisos-panel.service';

//Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    MatDividerModule,
    RouterModule
  ],
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {
  //Datos del usuario: rol y nombre
  role = sessionStorage.getItem('role') ?? '';
  username = sessionStorage.getItem('username') ?? '';
  //Opciones del menú que se mostrarán al usuario
  opcionesVisibles: any[] = [];
  //Todas las opciones posibles del panel
  opciones = [
    { id: 'usuarios', texto: 'Gestión de usuarios', ruta: '/gestion' },
    { id: 'configuracion', texto: 'Administración', ruta: '/configuracion' },
    { id: 'expedientes', texto: 'Expedientes', ruta: '/expediente' },
    { id: 'expedientes_SECRETARIA', texto: 'Expedientes', ruta: '/expedientes' },
    //{ id: 'informes', texto: 'Informes', ruta: '/expedientes/seleccionar' }
    { id: 'informes', texto: 'Informes', ruta: '/informe' }
  ];

  constructor(
    private authService: AuthService,
    private permisos: PermisosPanelService,
    private router: Router
  ) { }
  
  ngOnInit() {   //ejecución al cargar el componente
    //Aseguramos que el rol viene del AuthService (más fiable que localStorage)
    this.role = this.authService.getRole() ?? '';
    this.username = sessionStorage.getItem('username') ?? '';
    //Obtenemos el nombre de usuario
    //Filtramos las opciones según el rol del usuario
    const permitidas = this.permisos.getOpcionesParaRol(this.role);
    this.opcionesVisibles = this.opciones.filter(op =>
      permitidas.includes(op.id)
    );
  }

  logout() { //cierre de sesión
    this.authService.logout(); //Limpia la sesión
    this.router.navigate(['/login']); //Redirige al login
  }
}//de class
