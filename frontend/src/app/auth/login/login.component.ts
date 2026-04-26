/**
 * ---------------------------------------------------------------
 *  Archivo:        login.component.ts
 *  Descripción:    COMPONENTE->Realiza y es encargado de gestionar el inicio de sesión del
 *                  usuario, validando credenciales y redirigiendo al panel principal tras autenticarse.
 *  Autor:          Eugenio Blanco Fernández
 *  Universidad:    Universitat Oberta de Catalunya (UOC)
 *  Título Máster:  Máster Universitario en Desarrollo de sitios y aplicaciones Web
 *  Proyecto:       TFM - Sistema de Gestión de Expedientes Digitales (GSXPD)
 *  Fecha creación: 07/04/2026
 *  Última modif.:  10/04/2026
 *
 *  Detalles:
 *    - Envía las credenciales al servicio de autenticación.
 *    - Gestiona errores de login y muestra mensajes al usuario.
 *    - Redirige al panel principal tras un inicio de sesión válido.
 * ---------------------------------------------------------------
 */
//Importaciones necesarias de Angular
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  //definimos variables utilizar
  username = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    this.authService.login({ username: this.username, password: this.password })
      .subscribe({
        next: (response) => {
          sessionStorage.setItem('token', response.access_token); //Guardar token correctamente
          this.router.navigate(['/panel']); //Redirigir al panel de control
        },
        error: (err) => {
          // Mostrar mensaje real del backend
          this.errorMessage = err.error.message || 'Usuario o contraseña incorrectos';
        }
    });
  }
}//de class
