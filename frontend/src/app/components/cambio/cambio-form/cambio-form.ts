/**
 * ---------------------------------------------------------------
 *  Archivo:        cambio-form.component.ts
 *  Descripción:    COMPONENTE->Realiza y es encargado de crear y editar tipos de cambio, 
 *                  gestionando un formulario reactivo con validación y guardando los datos en el backend.
 *  Autor:          Eugenio Blanco Fernández
 *  Universidad:    Universitat Oberta de Catalunya (UOC)
 *  Título Máster:  Máster Universitario en Desarrollo de sitios y aplicaciones Web
 *  Proyecto:       TFM - Sistema de Gestión de Expedientes Digitales (GSXPD)
 *  Fecha creación: 07/03/2026
 *  Última modif.:  10/04/2026
 *
 *  Detalles:
 *    - Construye un formulario reactivo para crear o editar un tipo de cambio.
 *    - Carga los datos existentes cuando se edita un registro.
 *    - Guarda los cambios y redirige al listado de tipos de cambio.
 * ---------------------------------------------------------------
 */
//Importaciones necesarias de Angular
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { CambioService } from '../../../services/cambio.service';

//Angular Material
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cambio-form',
  standalone: true,
  templateUrl: './cambio-form.html',
  styleUrl: './cambio-form.scss',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatSnackBarModule
  ]
})
export class CambioFormComponent implements OnInit {
  //declaración de variables necesarias del componente
  form: any;
  id!: number;
  editando = false; 

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private cambioService: CambioService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() { //carga al iniciar el componente
    const id = this.route.snapshot.paramMap.get('id');
    if (id) { //Indica si estamos editando o creando
      this.cambioService.getById(+id).subscribe(exp => {
        this.form.patchValue({
          nombre: exp.nombre_Cambio
        });
      });
    }   

    //Crea el formulario con validaciones
    //AHORA SÍ: fb ya existe
    this.form = this.fb.group({
      nombre: ['', Validators.required]
    });

    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.editando = !!this.id;

    if (this.editando) { //Si está editando, carga los datos del cambio
      this.cambioService.getById(this.id).subscribe(exp => {
        this.form.patchValue({
          nombre: exp.nombre_Cambio
        });
      });
    }
  }

  guardar() { //Guarda el formulario (crea o actualiza)
    const payload = this.form.value;
    if (this.editando) { //Actualiza el cambio existente
      this.cambioService.updateCambio(this.id, payload).subscribe({
        next: () => {
          this.mostrarExito('Tipo de Cambio se ha actualizado correctamente');
          this.router.navigate(['/cambio']);
        },
          error: () => {
            this.mostrarError('Error al actualizar el tipo de Cambio');
          }   
      });
    } else { //Crea nuevo cambio
      this.cambioService.createCambio(payload).subscribe({
        next: () => {
          this.mostrarExito('Tipo de Cambio se ha creado correctamente');
          this.router.navigate(['/cambio']);
        },
          error: () => {
            this.mostrarError('Error al crear tipo de Cambio');
          }            
      });
    }
  }

  mostrarExito(mensaje: string) { //Muestra un mensaje de éxito
    this.snackBar.open(
      mensaje,
      'Cerrar',
      {
        duration: 4000, //mensaje duración 4 Seg.
        panelClass: ['snackbar-exito'],
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      }
    );
  }

  mostrarError(mensaje: string) { //Muestra un mensaje de error
    this.snackBar.open(
      mensaje,
      'Cerrar',
      {
        duration: 4000, //mensaje duración 4 Seg.
        panelClass: ['snackbar-error'],
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      }
    );
  }

  volver() { //Navega de vuelta a la lista
    this.router.navigate(['/cambio']);
  }

  volver_panel() { //Navega de vuelta al panel de control
    this.router.navigate(['/configuracion']);
  }
}//de class
