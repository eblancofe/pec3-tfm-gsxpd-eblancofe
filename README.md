# Sistema de Gestión de Expedientes Digitales (GSXPD)
## pec3-tfm-gsxpd-eblancofe

Máster Universitario en Desarrollo de Sitios y Aplicaciones Web (UOC)  
Trabajo Final de Máster (TFM)  
Alumno: **Eugenio Blanco Fernández**

Archivos código fuente en Angular del proyecto TFM, en concreto de la parte de "Backend" y "Frontend" de la aplicación Web llamada "GSXPD" sobre la Gestión de Expedientes Digitales sobre Riesgos operativos ferroviarios. 

---

## 📌 Descripción general del proyecto

**GSXPD** es una aplicación web completa (frontend + backend) diseñada para la **gestión de expedientes digitales** relacionados con **riesgos operativos ferroviarios**, siguiendo el **Reglamento (UE) 402/2013**.

El sistema permite:

- Registrar, consultar y gestionar expedientes digitales.
- Administrar usuarios, roles y permisos mediante autenticación JWT.
- Generar informes anuales, por titularidad y por unidades organizativas.
- Ofrecer una interfaz moderna, accesible y responsive basada en **Angular Material (M3)**.
- Integrar un backend robusto desarrollado con **NestJS + PostgreSQL**.

La aplicación está dividida en dos partes:

- **Backend** → API REST desarrollada con NestJS  
- **Frontend** → Aplicación web desarrollada con Angular 21

Ambas partes se incluyen en este repositorio como **submódulos Git**.

---

## 📁 Estructura del repositorio


pec3-tfm-gsxpd-eblancofe/   
│   
├── backend/   → Submódulo: https://github.com/eblancofe/gsxpd-backend   
├── frontend/  → Submódulo: https://github.com/eblancofe/gsxpd-frontend   
│   
├── README.md   
   

---

## 🛠️ Tecnologías utilizadas

### 🔹 Backend (API REST)
- NestJS (Node.js + TypeScript)
- TypeORM
- PostgreSQL
- JWT (Json Web Tokens)
- Bcrypt (hashing de contraseñas)

### 🔹 Frontend (Aplicación Web)
- Angular 21
- Angular Material (Material Design 3)
- Standalone Components
- RxJS
- SCSS

---

## ▶️ Ejecución del proyecto en local

## Ejecución del proyecto
## 1. Backend

```bash
cd backend

npm install

npm run start:dev
```

## 2. Frontend

```bash
cd frontend

npm install

npm run start
```

Dentro de nuestro navegador Web, insertamos la dirección URL = http://localhost:4200

---

## 🔐 Autenticación y roles

El sistema implementa autenticación mediante **JWT** y control de acceso basado en roles.

Roles disponibles:

- **admin**
- **eer**
- **secretaria**
- **lectura**

Los endpoints protegidos requieren:

- `JwtAuthGuard`
- `RolesGuard`

---

## 🗄️ Base de datos

El sistema utiliza **PostgreSQL** como motor de base de datos.


---

## 🌐 Despliegue

- **Frontend** desplegado en Vercel  
- **Backend** desplegado en Render 
- **Base de datos** alojada en Neon (PostgreSQL serverless)

---

## 👤 Autor

**Eugenio Blanco Fernández**  
Máster Universitario en Desarrollo de Sitios y Aplicaciones Web  
Universitat Oberta de Catalunya (UOC)

