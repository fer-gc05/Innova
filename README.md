# IN-NOVA - Red de Innovación de Córdoba

![IN-NOVA Logo](public/LOGO-copia.svg)

Una plataforma web moderna para la Red de Innovación de la Cámara de Comercio de Montería, desarrollada con Laravel, React, Inertia.js y Tailwind CSS.

## 📋 Tabla de Contenidos

- [Descripción del Proyecto](#-descripción-del-proyecto)
- [Características](#-características)
- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Requisitos del Sistema](#-requisitos-del-sistema)
- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Backend (Laravel)](#-backend-laravel)
- [Frontend (React + Inertia.js)](#-frontend-react--inertiajs)
- [Base de Datos](#-base-de-datos)
- [API Endpoints](#-api-endpoints)
- [Componentes React](#-componentes-react)
- [Páginas](#-páginas)
- [Estilos y Diseño](#-estilos-y-diseño)
- [Despliegue](#-despliegue)
- [Contribución](#-contribución)
- [Licencia](#-licencia)

## 🎯 Descripción del Proyecto

IN-NOVA es una plataforma web que conecta empresas, emprendedores y estudiantes en la región de Córdoba, Colombia. La plataforma facilita la colaboración, el intercambio de conocimientos y la adopción de tecnologías innovadoras para impulsar el crecimiento empresarial.

### Objetivos Principales:
- **Mejorar la Competitividad Empresarial**: Potenciar la capacidad de las empresas para competir en el mercado global
- **Fomentar la Colaboración**: Promover la cooperación entre empresas para compartir conocimientos
- **Acelerar la Adopción de Tecnologías**: Facilitar el acceso a tecnologías de vanguardia
- **Romper la Brecha Digital**: Reducir las desigualdades en el acceso a tecnologías digitales

## ✨ Características

### 🏢 Gestión de Empresas
- Registro y perfil de empresas
- Vitrina de empresas innovadoras
- Búsqueda y filtrado de empresas
- Estadísticas y métricas empresariales

### 🎯 Casos de Negocio
- Casos de éxito documentados
- Métricas de impacto
- Historias de transformación digital
- ROI y resultados medibles

### 🏖️ Cluster Turístico
- Destinos turísticos de Córdoba
- Oportunidades de inversión
- Información de destinos
- Servicios turísticos

### 🚀 Retos Actuales
- Retos empresariales activos
- Sistema de registro para retos
- Videos explicativos
- Fichas técnicas

### 📧 Servicios Digitales
- Email Marketing efectivo
- Chatbots inteligentes
- Redes sociales
- Herramientas de innovación

## 🛠️ Tecnologías Utilizadas

### Backend
- **Laravel 11** - Framework PHP para el backend
- **PHP 8.2+** - Lenguaje de programación
- **MySQL 8.0** - Base de datos relacional
- **Redis** - Cache y sesiones
- **Laravel Sanctum** - Autenticación API
- **Laravel Breeze** - Autenticación básica

### Frontend
- **React 18** - Biblioteca de interfaz de usuario
- **TypeScript** - Tipado estático
- **Inertia.js** - Puente entre Laravel y React
- **Tailwind CSS 4** - Framework de CSS utilitario
- **Lucide React** - Iconos
- **Vite** - Build tool y bundler

### Herramientas de Desarrollo
- **Node.js 18+** - Runtime de JavaScript
- **Composer** - Gestor de dependencias PHP
- **npm/yarn** - Gestor de paquetes Node.js
- **Git** - Control de versiones

## 📋 Requisitos del Sistema

### Servidor
- **PHP**: 8.2 o superior
- **Composer**: 2.0 o superior
- **MySQL**: 8.0 o superior
- **Redis**: 6.0 o superior (opcional)
- **Node.js**: 18.0 o superior
- **npm**: 9.0 o superior

### Extensiones PHP Requeridas
```bash
- BCMath PHP Extension
- Ctype PHP Extension
- cURL PHP Extension
- DOM PHP Extension
- Fileinfo PHP Extension
- JSON PHP Extension
- Mbstring PHP Extension
- OpenSSL PHP Extension
- PCRE PHP Extension
- PDO PHP Extension
- Tokenizer PHP Extension
- XML PHP Extension
```

## 🚀 Instalación

### 1. Clonar el Repositorio
```bash
git clone https://github.com/tu-usuario/in-nova.git
cd in-nova
```

### 2. Instalar Dependencias Backend
```bash
composer install
```

### 3. Instalar Dependencias Frontend
```bash
npm install
```

### 4. Configurar Variables de Entorno
```bash
cp .env.example .env
php artisan key:generate
```

### 5. Configurar Base de Datos
```bash
# Editar .env con credenciales de base de datos
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=in_nova
DB_USERNAME=tu_usuario
DB_PASSWORD=tu_password
```

### 6. Ejecutar Migraciones
```bash
php artisan migrate
php artisan db:seed
```

### 7. Compilar Assets
```bash
npm run build
```

### 8. Iniciar Servidor de Desarrollo
```bash
# Terminal 1 - Servidor Laravel
php artisan serve

# Terminal 2 - Servidor Vite (opcional para desarrollo)
npm run dev
```

## ⚙️ Configuración

### Variables de Entorno (.env)
```env
APP_NAME="IN-NOVA"
APP_ENV=local
APP_KEY=base64:tu_clave_aqui
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=in_nova
DB_USERNAME=root
DB_PASSWORD=

CACHE_DRIVER=file
SESSION_DRIVER=file
QUEUE_CONNECTION=sync

MAIL_MAILER=smtp
MAIL_HOST=mailpit
MAIL_PORT=1025
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS="hello@example.com"
MAIL_FROM_NAME="${APP_NAME}"
```

### Configuración de Cache
```bash
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

## 📁 Estructura del Proyecto

```
in-nova/
├── app/                    # Lógica de aplicación Laravel
│   ├── Http/              # Controladores y middleware
│   ├── Models/            # Modelos Eloquent
│   └── Providers/         # Proveedores de servicios
├── config/                # Archivos de configuración
├── database/              # Migraciones y seeders
├── public/                # Archivos públicos
│   ├── LOGO-copia.svg     # Logo de la aplicación
│   └── build/             # Assets compilados
├── resources/             # Recursos frontend
│   ├── css/               # Estilos CSS
│   ├── js/                # Código JavaScript/TypeScript
│   │   ├── components/    # Componentes React
│   │   ├── pages/         # Páginas React
│   │   └── types/         # Tipos TypeScript
│   └── views/             # Vistas Blade
├── routes/                # Definición de rutas
├── storage/               # Archivos de almacenamiento
└── tests/                 # Pruebas automatizadas
```

## 🔧 Backend (Laravel)

### Modelos Principales

#### User Model
```php
// app/Models/User.php
class User extends Authenticatable
{
    protected $fillable = [
        'name',
        'email',
        'password',
        'role', // admin, empresa, estudiante
    ];
}
```

#### Empresa Model
```php
// app/Models/Empresa.php
class Empresa extends Model
{
    protected $fillable = [
        'nombre',
        'descripcion',
        'sector',
        'ubicacion',
        'contacto',
        'website',
        'logo',
    ];
}
```

### Controladores

#### WelcomeController
```php
// app/Http/Controllers/WelcomeController.php
class WelcomeController extends Controller
{
    public function index()
    {
        return Inertia::render('welcome');
    }
}
```

#### EmpresasController
```php
// app/Http/Controllers/EmpresasController.php
class EmpresasController extends Controller
{
    public function index()
    {
        $empresas = Empresa::all();
        return Inertia::render('empresas', compact('empresas'));
    }
}
```

### Rutas Web
```php
// routes/web.php
Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/empresas', function () {
    return Inertia::render('empresas');
})->name('empresas');

Route::get('/cluster-turistico', function () {
    return Inertia::render('cluster-turistico');
})->name('cluster-turistico');

Route::get('/casos-negocio', function () {
    return Inertia::render('casos-negocio');
})->name('casos-negocio');

Route::get('/retos-actuales', function () {
    return Inertia::render('retos-actuales');
})->name('retos-actuales');
```

### Middleware
- **web.php**: Rutas web con middleware de sesión
- **api.php**: Rutas API con middleware de autenticación
- **auth.php**: Rutas protegidas por autenticación

## ⚛️ Frontend (React + Inertia.js)

### Configuración de Inertia.js
```typescript
// resources/js/app.tsx
import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'

createInertiaApp({
  resolve: name => {
    const pages = import.meta.glob('./pages/**/*.tsx', { eager: true })
    return pages[`./pages/${name}.tsx`]
  },
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />)
  },
})
```

### Tipos TypeScript
```typescript
// resources/js/types/index.ts
export interface SharedData {
  auth: {
    user: User | null
  }
}

export interface User {
  id: number
  name: string
  email: string
  role: string
}
```

### Componentes React

#### Header Component
```typescript
// resources/js/components/Header.tsx
import React, { useState } from 'react'
import { Link } from '@inertiajs/react'
import { Search, Menu, ChevronDown } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  
  return (
    <header className="bg-blue-900 text-white relative">
      {/* Navegación principal */}
    </header>
  )
}
```

#### HeroSection Component
```typescript
// resources/js/components/HeroSection.tsx
import React from 'react'
import { ChevronRight } from 'lucide-react'
import { Link } from '@inertiajs/react'

export default function HeroSection() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center">
      {/* Contenido hero */}
    </section>
  )
}
```

### Páginas React

#### Welcome Page
```typescript
// resources/js/pages/welcome.tsx
import { Head } from '@inertiajs/react'
import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import InnovationSection from '@/components/InnovationSection'
import NetworkSection from '@/components/NetworkSection'
import ServicesSection from '@/components/ServicesSection'
import Footer from '@/components/Footer'

export default function Welcome() {
  return (
    <>
      <Head title="IN-NOVA - Red de Innovación de Córdoba">
        <link rel="preconnect" href="https://fonts.bunny.net" />
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
      </Head>
      <div className="min-h-screen">
        <Header />
        <HeroSection />
        <InnovationSection />
        <NetworkSection />
        <ServicesSection />
        <Footer />
      </div>
    </>
  )
}
```

## 🗄️ Base de Datos

### Migraciones Principales

#### Users Table
```php
// database/migrations/xxxx_create_users_table.php
Schema::create('users', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->string('email')->unique();
    $table->timestamp('email_verified_at')->nullable();
    $table->string('password');
    $table->enum('role', ['admin', 'empresa', 'estudiante']);
    $table->rememberToken();
    $table->timestamps();
});
```

#### Empresas Table
```php
// database/migrations/xxxx_create_empresas_table.php
Schema::create('empresas', function (Blueprint $table) {
    $table->id();
    $table->string('nombre');
    $table->text('descripcion');
    $table->string('sector');
    $table->string('ubicacion');
    $table->string('contacto');
    $table->string('website')->nullable();
    $table->string('logo')->nullable();
    $table->timestamps();
});
```

### Seeders
```php
// database/seeders/DatabaseSeeder.php
public function run(): void
{
    User::factory(10)->create();
    Empresa::factory(20)->create();
}
```

## 🔌 API Endpoints

### Autenticación
```bash
POST /api/login          # Iniciar sesión
POST /api/logout         # Cerrar sesión
POST /api/register       # Registrarse
GET  /api/user           # Obtener usuario actual
```

### Empresas
```bash
GET    /api/empresas           # Listar empresas
POST   /api/empresas           # Crear empresa
GET    /api/empresas/{id}      # Obtener empresa
PUT    /api/empresas/{id}      # Actualizar empresa
DELETE /api/empresas/{id}      # Eliminar empresa
```

### Retos
```bash
GET    /api/retos              # Listar retos
POST   /api/retos              # Crear reto
GET    /api/retos/{id}         # Obtener reto
PUT    /api/retos/{id}         # Actualizar reto
DELETE /api/retos/{id}         # Eliminar reto
```

## 🧩 Componentes React

### Lista de Componentes
- **Header**: Navegación principal con menús desplegables
- **HeroSection**: Sección hero con llamada a la acción
- **InnovationSection**: Sección de innovación con métricas
- **NetworkSection**: Sección de red con objetivos
- **ServicesSection**: Sección de servicios con tarjetas
- **Footer**: Pie de página con información de contacto

### Props y Estados
```typescript
// Ejemplo de componente con props
interface HeroSectionProps {
  title: string
  subtitle: string
  description: string
  ctaText: string
  ctaLink: string
}

export default function HeroSection({
  title,
  subtitle,
  description,
  ctaText,
  ctaLink
}: HeroSectionProps) {
  return (
    // JSX del componente
  )
}
```

## 📄 Páginas

### Páginas Principales
1. **Welcome** (`/`) - Página de inicio
2. **Empresas** (`/empresas`) - Lista de empresas
3. **Cluster Turismo** (`/cluster-turistico`) - Información turística
4. **Casos de Negocio** (`/casos-negocio`) - Casos de éxito
5. **Retos Actuales** (`/retos-actuales`) - Retos empresariales

### Estructura de Páginas
```typescript
// Estructura típica de una página
import { Head } from '@inertiajs/react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function NombrePagina() {
  return (
    <>
      <Head title="Título de la Página - IN-NOVA">
        {/* Meta tags y enlaces */}
      </Head>
      <div className="min-h-screen">
        <Header />
        {/* Contenido específico de la página */}
        <Footer />
      </div>
    </>
  )
}
```

## 🎨 Estilos y Diseño

### Tailwind CSS 4
```css
/* resources/css/app.css */
@theme {
  --color-primary: #1e40af;
  --color-secondary: #3b82f6;
  --color-accent: #60a5fa;
}

@source '../views';
@source '../../vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php';
@source '../js/**/*.{js,ts,jsx,tsx}';

@custom-variant dark (&:is(.dark *));
```

### Paleta de Colores
- **Azul Principal**: `#1e40af` (blue-800)
- **Azul Secundario**: `#3b82f6` (blue-500)
- **Azul Claro**: `#60a5fa` (blue-400)
- **Gris Oscuro**: `#1f2937` (gray-800)
- **Gris Claro**: `#f3f4f6` (gray-100)

### Tipografía
- **Fuente Principal**: Instrument Sans (Google Fonts)
- **Tamaños**: 12px, 14px, 16px, 18px, 20px, 24px, 32px, 48px, 64px
- **Pesos**: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)

### Componentes de Diseño
- **Botones**: Estilos consistentes con hover effects
- **Tarjetas**: Sombras y bordes redondeados
- **Formularios**: Inputs con focus states
- **Navegación**: Menús desplegables y responsive

## 🚀 Despliegue

### Producción
```bash
# 1. Configurar variables de entorno
cp .env.example .env
# Editar .env con configuraciones de producción

# 2. Instalar dependencias
composer install --optimize-autoloader --no-dev
npm install
npm run build

# 3. Configurar base de datos
php artisan migrate --force

# 4. Optimizar Laravel
php artisan config:cache
php artisan route:cache
php artisan view:cache

# 5. Configurar servidor web (Apache/Nginx)
```

### Docker (Opcional)
```dockerfile
# Dockerfile
FROM php:8.2-fpm

# Instalar extensiones PHP
RUN docker-php-ext-install pdo pdo_mysql

# Instalar Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copiar código
COPY . /var/www/html
WORKDIR /var/www/html

# Instalar dependencias
RUN composer install --no-dev --optimize-autoloader
RUN npm install && npm run build

# Configurar permisos
RUN chown -R www-data:www-data /var/www/html
```

### Variables de Entorno de Producción
```env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://tu-dominio.com

DB_HOST=tu-host-db
DB_DATABASE=in_nova_prod
DB_USERNAME=usuario_prod
DB_PASSWORD=password_seguro

CACHE_DRIVER=redis
SESSION_DRIVER=redis
QUEUE_CONNECTION=redis

REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379
```

## 🤝 Contribución

### Guías de Contribución
1. **Fork** el repositorio
2. **Clone** tu fork localmente
3. **Crea** una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
4. **Commit** tus cambios (`git commit -am 'Agregar nueva funcionalidad'`)
5. **Push** a la rama (`git push origin feature/nueva-funcionalidad`)
6. **Crea** un Pull Request

### Estándares de Código
- **PHP**: PSR-12
- **JavaScript/TypeScript**: ESLint + Prettier
- **CSS**: Tailwind CSS classes
- **Commits**: Conventional Commits

### Pruebas
```bash
# Ejecutar pruebas PHP
php artisan test

# Ejecutar pruebas de frontend
npm test

# Ejecutar todas las pruebas
php artisan test && npm test
```

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

## 📞 Contacto

- **Email**: min.nova2024@gmail.com
- **Sitio Web**: [https://dev.reddeinnovacion.com.co/](https://dev.reddeinnovacion.com.co/)
- **Cámara de Comercio de Montería**: (57) 4 7858900 ext 2840

## 🙏 Agradecimientos

- Cámara de Comercio de Montería
- Red de Innovación de Córdoba
- Comunidad de desarrolladores Laravel y React
- Contribuidores del proyecto

---

**IN-NOVA** - Impulsando la innovación empresarial en Córdoba, Colombia 🇨🇴
