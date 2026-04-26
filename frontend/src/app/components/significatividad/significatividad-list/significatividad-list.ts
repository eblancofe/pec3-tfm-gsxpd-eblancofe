/**
 * ---------------------------------------------------------------
 *  Archivo:        significatividad-list.ts
 *  Descripción:    COMPONENTE->Realiza que muestra el listado paginado de niveles de 
 *                  significatividad, permitiendo buscarlos, editarlos o eliminarlos desde la interfaz.
 *  Autor:          Eugenio Blanco Fernández
 *  Universidad:    Universitat Oberta de Catalunya (UOC)
 *  Título Máster:  Máster Universitario en Desarrollo de sitios y aplicaciones Web
 *  Proyecto:       TFM - Sistema de Gestión de Expedientes Digitales (GSXPD)
 *  Fecha creación: 07/03/2026
 *  Última modif.:  10/04/2026
 *
 *  Detalles:
 *    - Obtiene niveles de significatividad paginados desde el backend.
 *    - Gestiona búsqueda, paginación y refresco de datos.
 *    - Permite editar o eliminar registros desde la lista.
 * ---------------------------------------------------------------
 */
//Importa herramientas de Angular
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SignificatividadService } from '../../../services/significatividad.service';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

//Angular Material
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-significatividad-list',
  standalone: true,
  templateUrl: './significatividad-list.html',
  styleUrl: './significatividad-list.scss',
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule
  ]
})
/*
export class SignificatividadListComponent implements OnInit {

  significatividad: any[] = [];
  search = '';
  page = 1;
  limit = 10;
  total = 0;

  constructor(
    private significatividadService: SignificatividadService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) { }

  get lastPage() {
    return Math.ceil(this.total / this.limit);
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.significatividadService.getAll(this.page, this.limit, this.search)
      .subscribe(res => {
        console.log('RESPUESTA BACKEND:', res);
        this.significatividad = res.data;
        this.total = res.total;
        this.cdr.detectChanges();// Fuerza a Angular a refrescar la vista
      });
  }

  onSearchChange() {
    this.page = 1;
    this.loadData();
  }

  nextPage() {
    if (this.page < this.lastPage) {
      this.page++;
      this.loadData();
    }
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.loadData();
    }
  }

  editSignificatividad(exp: any) {
    this.router.navigate(['/significatividad/editar', exp.id]);
  }

  deleteSignificatividad(id: number) {
    if (!confirm('¿Seguro que quieres eliminar la significatividad de este cambio?')) return;
    this.significatividadService.deleteSignificatividad(id).subscribe(() => this.loadData());
  }
}
*/
export class SignificatividadListComponent implements OnInit, AfterViewInit {
  columnas = ['nombre', 'acciones']; //Define las columnas de la tabla: nombre y acciones (editar/eliminar)
  dataSource = new MatTableDataSource<any>([]); //Crea una fuente de datos para la tabla

  @ViewChild(MatPaginator) paginator!: MatPaginator; //referencia a la paginación

  constructor(
    private significatividadService: SignificatividadService,
    private router: Router
  ) { }
  ngAfterViewInit() {   //ejecución después de que la vista se carga
    this.dataSource.paginator = this.paginator;
  }
  //Declaramos las variables a utilizar
  page = 1;
  limit = 5;
  lastPage = 1;
  search = '';

  ngOnInit() {   //ejecución al iniciar el componente
    this.cargarSignificatividad();
  }

  cargarSignificatividad() {
    this.significatividadService.getAll(this.page, this.limit, this.search)
      .subscribe(res => {
        this.dataSource.data = res.data; //Guarda los datos en la tabla
        this.lastPage = Math.ceil(res.total / this.limit); //Calcula el total de páginas
      });
  }

  filtrar(event: Event) { //Aplica filtro de búsqueda en la tabla
      const valor = (event.target as HTMLInputElement).value;
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  nextPage() { //Pasa a la página siguiente
      if (this.page < this.lastPage) {
      this.page++;
      this.cargarSignificatividad();
    }
  }

  prevPage() { //Vuelve a la página anterior
      if (this.page > 1) {
      this.page--;
      this.cargarSignificatividad();
    }
  }

  editSignificatividad(user: any) { //Redirige a la edición de Significatividad
      this.router.navigate(['/significatividad/editar', user.id]);
  }

  deleteSignificatividad(id: number) { //Elimina una Significatividad
    if (confirm('¿Seguro que quieres eliminar esta Significatividad del cambio?')) {
      this.significatividadService.deleteSignificatividad(id).subscribe(() => {
        this.dataSource.data = this.dataSource.data.filter(u => u.id !== id);
      });
    }
  }
}//de class