# Karin App

Sistema de gestión de denuncias desarrollado con Next.js 14, TypeScript y Tailwind CSS.

## Características

- 📱 Diseño responsive
- 🔍 Búsqueda y filtrado de denuncias
- 📊 Gestión de estados de denuncias
- 👤 Gestión de usuarios
- 🎨 UI moderna con Tailwind CSS y Shadcn/ui


## Estructura del Proyecto
bash
src/
├── app/ # Páginas de Next.js
├── components/
│ ├── common/ # Componentes compartidos
│ │ ├── sidebar/ # Navegación principal
│ │ ├── header/ # Encabezado de la aplicación
│ │ ├── layout/ # Layout principal
│ │ └── card/ # Componente de tarjeta
│ ├── complaints/ # Módulo de denuncias
│ │ ├── components/ # Componentes específicos
│ │ ├── data/ # Datos mock
│ │ ├── types/ # Tipos TypeScript
│ │ └── utils/ # Utilidades
│ └── ui/ # Componentes UI base
└── styles/ # Estilos globales



## Tecnologías

- [Next.js 14](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn/ui](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/)

## Instalación
bash
Clonar el repositorio
git clone https://github.com/tu-usuario/karin-app.git
Instalar dependencias
cd karin-app
npm install
Iniciar servidor de desarrollo
npm run dev


## Convenciones

- Nombres de carpetas en minúsculas
- Nombres de componentes en PascalCase
- Nombres de archivos en kebab-case
- Variables en inglés, contenido visible en español

## Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo
- `npm run build`: Construye la aplicación para producción
- `npm run start`: Inicia la aplicación en modo producción
- `npm run lint`: Ejecuta el linter

## Estado del Proyecto

En desarrollo activo. Versión actual: 0.1.0

## Licencia

MIT

