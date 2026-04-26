/**
 * ---------------------------------------------------------------
 *  Archivo:        significatividad-form.ts
 *  Descripción:    COMPONENTE->Realiza y es encargado de crear y editar niveles de significatividad, 
 *                  gestionando un formulario reactivo con validación y cargando los datos existentes al
 *                  editar un registro.
 *  Autor:          Eugenio Blanco Fernández
 *  Universidad:    Universitat Oberta de Catalunya (UOC)
 *  Título Máster:  Máster Universitario en Desarrollo de sitios y aplicaciones Web
 *  Proyecto:       TFM - Sistema de Gestión de Expedientes Digitales (GSXPD)
 *  Fecha creación: 07/03/2026
 *  Última modif.:  10/04/2026
 *
 *  Detalles:
 *    - Construye un formulario reactivo para crear o editar niveles de significatividad.
 *    - Carga los datos existentes cuando se edita un registro.
 *    - Guarda los cambios y redirige al listado de significatividad.
 * ---------------------------------------------------------------
 */
//Importa herramientas de Angular
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { SignificatividadService } from '../../../services/significatividad.service';

//Angular Material
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-significatividad-form',
  standalone: true,
  templateUrl: './significatividad-form.html',
  styleUrl: './significatividad-form.scss',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatSnackBarModule
  ]
})
export class SignificatividadFormComponent implements OnInit {
  form: any; //Aquí se guardará el formulario
  id!: number; //ID del registro (si se está editando)
  editando = false; //Indica si estamos editando (true) o creando (false)

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private significatividadService: SignificatividadService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.significatividadService.getById(+id).subscribe(exp => {
        this.form.patchValue({
          nombre: exp.nombre_Significatividad
        });
      });
    }

    // AHORA SÍ: fb ya existe
    this.form = this.fb.group({
      nombre: ['', Validators.required]
    });

    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.editando = !!this.id;

    if (this.editando) {
      this.significatividadService.getById(this.id).subscribe(exp => {
        this.form.patchValue({
          nombre: exp.nombre_Significatividad
        });
      });
    }
  }

  guardar() { 
    const payload = this.form.value;

    if (this.editando) {
      this.significatividadService.updateSignificatividad(this.id, payload).subscribe({
        next: () => {
          this.mostrarExito('Significatividad de Expediente actualizado correctamente');
          this.router.navigate(['/significatividad']);
        },
          error: () => {
            this.mostrarError('Error al actualizar la Significatividad del Expediente');
          }        
      });
    } else {
      this.significatividadService.createSignificatividad(payload).subscribe({
        next: () => {
          this.mostrarExito('Significatividad de Expediente creada correctamente');
          this.router.navigate(['/significatividad']);
        },
          error: () => {
            this.mostrarError('Error al crear la Significatividad del Expediente');
          }
      });
    }
  }

  //Muestra un mensaje de éxito
  mostrarExito(mensaje: string) {
    this.snackBar.open(
      mensaje,
      'Cerrar',
      {
        duration: 4000, //duración mensaje 4 Seg.
        panelClass: ['snackbar-exito'],
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      }
    );
  }

  //Muestra un mensaje de error  
  mostrarError(mensaje: string) {
    this.snackBar.open(
      mensaje,
      'Cerrar',
      {
        duration: 4000, //duración mensaje 4 Seg.
        panelClass: ['snackbar-error'],
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      }
    );
  }

  volver() { //Vuelve al listado
    this.router.navigate(['/significatividad']);
  }

  volver_panel() { //Navega de vuelta al panel de control
    this.router.navigate(['/configuracion']);
  }
}//de class
