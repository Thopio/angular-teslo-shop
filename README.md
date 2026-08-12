#  TesloShop

E-commerce construido con **Angular 22** (standalone components, signals, `rxResource`) que incluye tienda pública, autenticación y panel de administración para gestionar productos.

![Angular](https://img.shields.io/badge/Angular-22-DD0031?logo=angular&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38B2AC?logo=tailwind-css&logoColor=white)
![daisyUI](https://img.shields.io/badge/daisyUI-4-5A0EF8)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?logo=typescript&logoColor=white)

##  Características

- **Tienda pública**: catálogo de productos con paginación, filtro por género (hombre / mujer / niño) y vista de detalle con carrusel de imágenes (Swiper).
- **Autenticación**: login y registro con JWT, interceptor de autenticación y guards (`NotAuthenticatedGuard`, `IsAdminGuard`) para proteger rutas.
- **Panel de administración**: listado de productos, alta/edición con formularios reactivos, subida de imágenes y validaciones personalizadas.
- **Signals + `rxResource`**: manejo de estado y peticiones HTTP reactivas sin necesidad de suscripciones manuales.
- **Cache en memoria** de productos para evitar peticiones repetidas.
- **UI** con TailwindCSS + daisyUI (tema `synthwave`).

##  Stack técnico

| Categoría | Tecnología |
|---|---|
| Framework | Angular 22 (standalone, signals, `provideHttpClient` con `withFetch`) |
| Estilos | TailwindCSS 3 + daisyUI 4 |
| Formularios | Reactive Forms + validadores personalizados |
| HTTP | `HttpClient` + interceptores (`auth`, `logging`) |
| Carrusel | Swiper |
| Testing | Vitest + Karma/Jasmine |
| Routing | Lazy loading por feature (`auth`, `admin-dashboard`, `store-front`) |

## 📁 Estructura del proyecto

```
src/app/
├── auth/                  # Login, registro, guards, interceptor, servicio de auth
├── store-front/           # Tienda pública (home, género, detalle de producto)
├── admin-dashboard/       # Panel admin (listado y edición de productos)
├── products/              # Servicio, interfaces, componentes y pipes de productos
├── shared/                # Componentes y utilidades compartidas (paginación, etc.)
└── utils/                 # Validadores y helpers de formularios
```

## Empezando

### Requisitos previos

- Node.js `^22.22.3 || ^24.15.0 || >=26.0.0`
- Angular CLI 22

### Instalación

```bash
git clone <url-del-repositorio>
cd teslo-shop
npm install
```

### Variables de entorno

El proyecto usa dos archivos de entorno según la configuración de build:

```ts
// src/environments/environment.development.ts (desarrollo)
export const environment = {
  baseUrl: 'http://localhost:3000/api',
};

// src/environments/environment.ts (producción)
export const environment = {
  baseUrl: 'https://tu-api.com/api',
};
```

> Este frontend necesita el backend de Teslo Shop corriendo (por defecto en `http://localhost:3000/api`) para poder autenticar usuarios y listar/crear productos.

### Levantar el proyecto

```bash
npm start
```

Abre [http://localhost:4200](http://localhost:4200) — la app se recarga automáticamente al modificar el código.

## Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm start` | Levanta el servidor de desarrollo (`ng serve`) |
| `npm run build` | Compila la app para producción en `dist/teslo-shop` |
| `npm run watch` | Compila en modo watch con configuración de desarrollo |
| `npm test` | Ejecuta las pruebas unitarias con Vitest |

## Rutas y protección

| Ruta | Descripción | Guard |
|---|---|---|
| `/auth/login`, `/auth/register` | Autenticación | `NotAuthenticatedGuard` (redirige si ya hay sesión) |
| `/` , `/gender/:gender`, `/product/:idSlug` | Tienda pública | — |
| `/admin/products`, `/admin/products/:id` | Panel de administración | `IsAdminGuard` (requiere rol `admin`) |

## Módulos destacados

- **`FormUtils`** (`src/app/utils/form-utils.ts`): centraliza expresiones regulares, mensajes de error y validadores asíncronos/personalizados (email en uso, username reservado, coincidencia de contraseñas, etc.).
- **`ProductsService`**: capa de acceso a la API de productos con cache en memoria para listados y detalle, y subida de imágenes vía `multipart/form-data`.
- **`AuthService`**: maneja estado de sesión (`checking` / `authenticated` / `not-authenticated`) con signals y `rxResource` para verificar el token al iniciar la app.
- **`Pagination`** (shared): componente reutilizable de paginación basado en query params.


##  Contribuir

1. Haz un fork del repositorio.
2. Crea una rama para tu feature: `git checkout -b feature/nombre-feature`.
3. Haz commit de tus cambios: `git commit -m 'feat: descripción del cambio'`.
4. Sube la rama: `git push origin feature/nombre-feature`.
5. Abre un Pull Request.

## Licencia

Este proyecto es de uso privado / educativo.
