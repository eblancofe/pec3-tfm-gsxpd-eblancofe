/**
 * ---------------------------------------------------------------
 *  Archivo:        expedientes-form.component.ts
 *  Descripción:    COMPONENTE->Realiza, es encargado de crear y editar expedientes.
 *                  Carga todas las listas auxiliares (expertos, DG, titularidad, cambios, 
 *                  significatividad y ASBO) y gestiona el formulario reactivo para guardar o
 *                  actualizar (update) un expediente de riesgos.
 *  Autor:          Eugenio Blanco Fernández
 *  Universidad:    Universitat Oberta de Catalunya (UOC)
 *  Título Máster:  Máster Universitario en Desarrollo de sitios y aplicaciones Web
 *  Proyecto:       TFM - Sistema de Gestión de Expedientes Digitales (GSXPD)
 *  Fecha creación: 07/04/2026
 *  Última modif.:  25/04/2026
 *
 *  Detalles:
 *    - Construye un formulario reactivo con validaciones para todos los campos.
 *    - Carga datos auxiliares desde múltiples servicios y resuelve dependencias.
 *    - Permite crear nuevos expedientes o editar uno existente mediante patching.
 * ---------------------------------------------------------------
 */
//Importaciones necesarias de Angular
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ExpedientesService } from '../../../services/expedientes.service';
import { ExpertosService } from '../../../services/experto.service';
import { SignificatividadService } from '../../../services/significatividad.service';
import { TitularidadService } from '../../../services/titularidad.service';
import { UnidadOrganizativaService } from '../../../services/unidad-organizativa.service';
import { CambioService } from '../../../services/cambio.service';
import { EvaluadorService } from '../../../services/evaluador.service';

//Angular Material
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-expedientes-form',
  standalone: true,
  templateUrl: './expedientes-form.html',
  styleUrl: './expedientes-form.scss',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatSnackBarModule
  ]
})
export class ExpedientesFormComponent implements OnInit {
  //declaración de variables necesarias del componente
  form: any;
  id!: number;
  editando = false;
  expertos: any[] = [];
  unidadorganizativa: any[] = [];
  titularidad: any[] = [];
  cambio: any[] = [];
  significativo: any[] = [];
  asbo: any[] = [];
  expedienteCargado: any = null;
  expertosFiltrados: any[] = [];
  expedienteListo = false;
  expertosListos = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private expedientesService: ExpedientesService,
    private expertosService: ExpertosService,
    private significatividadService: SignificatividadService,
    private titularidadService: TitularidadService,
    private unidadorganizativaService: UnidadOrganizativaService,
    private cambioService: CambioService,
    private evaluadorService: EvaluadorService,
    private cdr: ChangeDetectorRef,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    //1. Crear formulario
    this.form = this.fb.group({
      //expedienteNombreEER: ['', Validators.required],
      expedienteNombreEER: [[], Validators.required],
      expedienteNombreDG: ['', Validators.required],
      expedienteNombreTitular: ['', Validators.required],
      expedienteNombreActuacion: ['', Validators.required],
      expedienteNombreSubactuacion: [''],
      expedienteNombreActuacionParticular: [''],
      expedienteNombreCarpeta: [''],
      expedienteNombreExtracto: ['', Validators.required],
      expedienteNombreReferenciaExtracto: ['', Validators.required],
      expedienteNombreVersionExtracto: ['', Validators.required],
      expedienteNombreEnvioExtracto: [true],
      expedienteNombreFechaExtracto: ['', Validators.required],
      expedienteNombreArchivoExtracto: [''],
      expedienteNombreCambio: ['', Validators.required],
      expedienteNombreTituloCambio: ['', Validators.required],
      expedienteNombreSignificativoCambio: ['', Validators.required],
      expedienteNombreVersionCambio: ['', Validators.required],
      expedienteNombreFechaCambio: ['', Validators.required],
      expedienteNombreArchivoCambio: [''],
      expedienteNombreFicha: ['', Validators.required],
      expedienteNombreFechaFicha: ['', Validators.required],
      expedienteNombreVersionFicha: ['', Validators.required],
      expedienteNombreArchivoFicha: [''],
      expedienteNombreIPA: ['', Validators.required],
      expedienteNombreReferenciaIPA: ['', Validators.required],
      expedienteNombreVersionIPA: ['', Validators.required],
      expedienteNombreFechaIPA: ['', Validators.required],
      expedienteNombreArchivoIPA: [''],
      expedienteNombreASBOEvaluador: ['', Validators.required],
      expedienteNombreContrataEvaluador: [false],
      expedienteNombrePrevistaEvaluador: [''],
      expedienteNombreEjecucionEvaluador: [''],
      expedienteNombreVersionEvaluador: ['', Validators.required],
      expedienteNombreArchivoEvaluador: [''],
    });

    //2. Cargamos los datos de los combos
    this.cargarExpertos();
    this.cargarDG();
    this.cargarTitularidad();
    this.cargarTipoCambio();
    this.cargarSignificatividad();
    this.cargarASBO();

    //3. Si estamos editando, cargar datos
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.editando = !!this.id;    

    //4. Si estamos editando, cargar expediente
    if (this.editando) {
      this.expedientesService.getById(this.id).subscribe(exp => {
        console.log('EXPEDIENTE AL EDITAR:', exp.nombre_ExpertoEER);
        this.expedienteCargado = exp;
        this.expedienteListo = true;
        this.intentarPatch();   // ← AQUÍ SE INTENTA PATCH
      });
    }//de if
  }

  intentarPatch() {
    console.log('INTENTAR PATCH → editando:', this.editando, 'expedienteListo:', this.expedienteListo, 'expertosListos:', this.expertosListos);
/*
    if (!this.editando) return;
    if (!this.expedienteListo) return;
    if (!this.expertosListos) return;
*/
    if (!this.editando || !this.expedienteListo || !this.expertosListos) return;   

    console.log('HACER PATCH CON:', this.expedienteCargado);

    //if (!this.editando || !this.expedienteCargado || !this.expertos.length) return;

    const exp = this.expedienteCargado;

    let eerIds: number[] = [];

    if (exp.nombre_ExpertoEER) {
      const limpio = exp.nombre_ExpertoEER
        .replace('{', '')
        .replace('}', '')
        .trim();

      eerIds = limpio
        ? limpio.split(',').map((x: string) => Number(x.trim()))
        : [];
    }

    this.form.patchValue({
      /*
      expedienteNombreEER: exp.nombre_ExpertoEER
        ? JSON.parse(
          exp.nombre_ExpertoEER
            .replace('{', '[')
            .replace('}', ']')
        ).map(Number)
        : [],*/
      expedienteNombreEER: eerIds,
      expedienteNombreDG: exp.nombre_DG,
      expedienteNombreTitular: exp.nombre_Titular_Linea,
      expedienteNombreActuacion: exp.nombre_Actuacion,
      expedienteNombreSubactuacion: exp.nombre_Subactuacion,
      expedienteNombreActuacionParticular: exp.nombre_Actuacion_Particular,
      expedienteNombreCarpeta: exp.nombre_Carpeta,
      expedienteNombreExtracto: exp.nombre_Extracto,
      expedienteNombreReferenciaExtracto: exp.nombre_Extracto_Referencia,
      expedienteNombreVersionExtracto: exp.nombre_Extracto_Version,
      expedienteNombreEnvioExtracto: exp.nombre_Extracto_EEFF,
      expedienteNombreFechaExtracto: this.toInputDate(exp.nombre_Extracto_Fecha),
      expedienteNombreArchivoExtracto: exp.nombre_Extracto_Archivo,
      expedienteNombreCambio: exp.nombre_Cambio_Tipo,
      expedienteNombreTituloCambio: exp.nombre_Cambio_Titulo,
      expedienteNombreSignificativoCambio: exp.nombre_Cambio_Significativo,
      expedienteNombreVersionCambio: exp.nombre_Cambio_Version,
      expedienteNombreFechaCambio: this.toInputDate(exp.nombre_Cambio_Fecha),
      expedienteNombreArchivoCambio: exp.nombre_Cambio_Archivo,
      expedienteNombreFicha: exp.nombre_FGC,
      expedienteNombreFechaFicha: this.toInputDate(exp.nombre_FGC_Fecha),
      expedienteNombreVersionFicha: exp.nombre_FGC_Version,
      expedienteNombreArchivoFicha: exp.nombre_FGC_Archivo,
      expedienteNombreIPA: exp.nombre_IPA,
      expedienteNombreReferenciaIPA: exp.nombre_IPA_Referencia,
      expedienteNombreVersionIPA: exp.nombre_IPA_Version,
      expedienteNombreFechaIPA: this.toInputDate(exp.nombre_IPA_Fecha),
      expedienteNombreArchivoIPA: exp.nombre_IPA_Archivo,
      expedienteNombreASBOEvaluador: exp.nombre_Evaluador_ASBO,
      expedienteNombreContrataEvaluador: exp.nombre_Evaluador_Contrata,
      expedienteNombrePrevistaEvaluador: this.toInputDate(exp.nombre_Evaluador_Fecha_Prevista),
      expedienteNombreEjecucionEvaluador: this.toInputDate(exp.nombre_Evaluador_Fecha_Ejecucion),
      expedienteNombreVersionEvaluador: exp.nombre_Evaluador_Version,
      expedienteNombreArchivoEvaluador: exp.nombre_Evaluador_Archivo,
    });
  }
  
  guardar() {
  console.log("DATOS QUE ENVÍO:", this.form.value);
  const payload = this.form.value;

  if (this.editando) {
    this.expedientesService.updateExpedientes(this.id, payload).subscribe({
      next: () => {
        this.mostrarExito('Expediente actualizado correctamente');
        this.router.navigate(['/expedientes']);
      },
      error: () => {
        this.mostrarError('Error al actualizar el expediente');
      }
    });
  } else {
    this.expedientesService.createExpedientes(payload).subscribe({
      next: () => {
        this.mostrarExito('Expediente creado correctamente');
        this.router.navigate(['/expedientes']);
      },
      error: () => {
        this.mostrarError('Error al crear el expediente');
      }
      });
    }
  }

  mostrarExito(mensaje: string) { //mostrar mensaje de éxito
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

  mostrarError(mensaje: string) { //mostrar mensaje de error
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

  volver() { //Volver a listado Expedientes
    this.router.navigate(['/expedientes']);
  }

  volver_panel() { //Navega de vuelta al panel de control
    this.router.navigate(['/configuracion']);
  }

  cargarExpertos() {
    //this.expertosService.getExpertos(1, 1000, '').subscribe(res => {
      //const data = res.data ?? [];
      //this.expertos = Array.isArray(data) ? data : [];
    this.expertosService.getAll().subscribe(res => {
      this.expertos = res.data;
      this.expertosFiltrados = [...this.expertos];
      console.log("EXPERTOS FINALES:", this.expertos);
      this.cdr.detectChanges();
      this.expertosListos = true;
      this.intentarPatch();
    });
  }

  cargarDG() {
    //this.unidadorganizativaService.getUnidadOrganizativa(1, 1000,'').subscribe(res => {
      //const data = res.data ?? [];
      //this.unidadorganizativa = Array.isArray(data) ? data : [];
    this.unidadorganizativaService.getAll().subscribe(res => {
      this.unidadorganizativa = res.data;
      console.log("DG FINALES:", this.unidadorganizativa);
      this.cdr.detectChanges(); //Fuerza a Angular a refrescar la vista
    });
  }

  cargarTitularidad() {
    this.titularidadService.getAll().subscribe(res => {
      this.titularidad=res.data;
      console.log("TITULARIDAD FINALES:", this.titularidad);
      this.cdr.detectChanges(); //Fuerza a Angular a refrescar la vista
    });
  }

  cargarSignificatividad() {
    this.significatividadService.getAll().subscribe(res => {
      this.significativo = res.data;
      console.log("SIGNIFICATIVIDAD FINALES:", this.significativo);
      this.cdr.detectChanges(); //Fuerza a Angular a refrescar la vista
    });
  }

  cargarTipoCambio() {
    this.cambioService.getAll().subscribe(res => {
      this.cambio = res.data;
      console.log("TIPO CAMBIO FINALES:", this.cambio);
      this.cdr.detectChanges(); //Fuerza a Angular a refrescar la vista
    });
  }

  cargarASBO() {
    this.evaluadorService.getAll().subscribe(res => {
      this.asbo = res.data;
      console.log("ASBO FINALES:", this.asbo);
      this.cdr.detectChanges(); //Fuerza a Angular a refrescar la vista
    });
  }

  toDate(d: string) {
    if (!d) return null;
    const [day, month, year] = d.split('/');
    return `${year}-${month}-${day}`;
  }

  toInputDate(date: any) {
    if (!date) return '';
    const d = new Date(date);
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    return `${d.getFullYear()}-${month}-${day}`;
  }

  filtrarExpertos(event: any) {
    const texto = event.target.value.toLowerCase();
    this.expertosFiltrados = this.expertos.filter(e =>
      (e.nombre_EER + ' ' + e.apellidos_EER)
        .toLowerCase()
        .includes(texto)
    );
    this.cdr.detectChanges();
  }
}//de class

