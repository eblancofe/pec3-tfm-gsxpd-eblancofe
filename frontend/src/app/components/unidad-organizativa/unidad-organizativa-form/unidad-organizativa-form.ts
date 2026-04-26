/**
 * ---------------------------------------------------------------
 *  Archivo:        unidad-organizativa-form.ts
 *  Descripción:    COMPONENTE->Realiza, encargado de crear y editar unidades organizativas, 
 *                  gestionando un formulario reactivo con validación y cargando los datos 
 *                  existentes al editar un registro.
 *  Autor:          Eugenio Blanco Fernández
 *  Universidad:    Universitat Oberta de Catalunya (UOC)
 *  Título Máster:  Máster Universitario en Desarrollo de sitios y aplicaciones Web
 *  Proyecto:       TFM - Sistema de Gestión de Expedientes Digitales (GSXPD)
 *  Fecha creación: 07/03/2026
 *  Última modif.:  10/04/2026
 *
 *  Detalles:
 *    - Construye un formulario reactivo para crear o editar unidades organizativas.
 *    - Carga los datos existentes cuando se edita un registro.
 *    - Guarda los cambios y redirige al listado de unidades organizativas.
 * ---------------------------------------------------------------
 */
//Componente para crear o editar una unidad organizativa
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { UnidadOrganizativaService } from '../../../services/unidad-organizativa.service';

//Angular Material
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-unidad-organizativa-form',
  standalone: true,
  templateUrl: './unidad-organizativa-form.html',
  styleUrl: './unidad-organizativa-form.scss',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatSnackBarModule
  ]
})
export class UnidadOrganizativaFormComponent implements OnInit {
  form: any; //Formulario reactivo
  id!: number; //ID del registro (si está editando)
  editando = false; //Indica si es modo edición

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private unidadorganizativaService: UnidadOrganizativaService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.unidadorganizativaService.getById(+id).subscribe(exp => {
        this.form.patchValue({
          nombre: exp.nombre_UnidadOrganizativa
        });
      });
    }

    //AHORA SÍ: fb ya existe
    this.form = this.fb.group({ //Crea el formulario con validación (el campo "nombre" es obligatorio)
      nombre: ['', Validators.required]
    });
    
    this.id = Number(this.route.snapshot.paramMap.get('id')); //Detecta si hay un ID en la URL (modo edición)
    this.editando = !!this.id;

    if (this.editando) { //Si está editando, carga los datos del registro
      this.unidadorganizativaService.getById(this.id).subscribe(exp => {
        this.form.patchValue({
          nombre: exp.nombre_UnidadOrganizativa
        });
      });
    }
  }

  guardar() { //Guarda el formulario (crea o actualiza)
    const payload = this.form.value;

    if (this.editando) { //Actualiza registro existente
      this.unidadorganizativaService.updateUnidadOrganizativa(this.id, payload).subscribe({
        next: () => {
          this.mostrarExito('La Unidad Organizativa del Expediente se ha actualizado correctamente');
          this.router.navigate(['/unidad-organizativa']);
        },
        error: () => {
          this.mostrarError('Error al actualizar la Unidad Organizativa del Expediente');
        }          
      });
    } else { //Crea nuevo registro
      this.unidadorganizativaService.createUnidadOrganizativa(payload).subscribe({
        next: () => {
          this.mostrarExito('La Unidad Organizativa del Expediente se ha creado correctamente');
          this.router.navigate(['/unidad-organizativa']);
        },
          error: () => {
            this.mostrarError('Error al crear la Unidad Organizativa del Expediente');
          }       
      });
    }
  }

  mostrarExito(mensaje: string) { //Muestra mensaje de éxito
    this.snackBar.open(
      mensaje,
      'Cerrar',
      {
        duration: 4000, //duración del mensaje 4 Seg.
        panelClass: ['snackbar-exito'],
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      }
    );
  }

  mostrarError(mensaje: string) { //Muestra mensaje de error
    this.snackBar.open(
      mensaje,
      'Cerrar',
      {
        duration: 4000, //duración del mensaje 4 Seg.
        panelClass: ['snackbar-error'],
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      }
    );
  }

  volver() { //Vuelve a la lista
    this.router.navigate(['/unidad-organizativa']);
  }

  volver_panel() { //Navega de vuelta al panel de control
    this.router.navigate(['/configuracion']);
  }
}//de class
