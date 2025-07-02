# Marvel Heroes - Aplicación de Personajes

Una aplicación web moderna para explorar el universo de Marvel, desarrollada con **Lit.dev**, **TailwindCSS** y **Vite**.

## 🚀 Características

- **Listado de Personajes**: Muestra los primeros 50 personajes de Marvel o resultados de búsqueda
- **Búsqueda en Tiempo Real**: Filtra personajes por nombre con actualización instantánea
- **Sistema de Favoritos**: Agrega/quita personajes de favoritos con persistencia en localStorage
- **Vista de Detalle**: Información completa del personaje con lista de cómics
- **Diseño Responsive**: Optimizado para dispositivos móviles y desktop
- **Accesibilidad**: Implementa las mejores prácticas de accesibilidad web
- **Testing**: Cobertura de tests con Vitest

## 🛠️ Stack Tecnológico

- **Frontend Framework**: [Lit.dev](https://lit.dev/) - Biblioteca de componentes web
- **Styling**: [TailwindCSS v3](https://tailwindcss.com/) - Framework CSS utility-first
- **Build Tool**: [Vite](https://vitejs.dev/) - Bundler moderno y rápido
- **Testing**: [Vitest](https://vitest.dev/) - Framework de testing
- **Linting**: ESLint + Prettier
- **API**: [Marvel API](http://gateway.marvel.com/v1/) - API oficial de Marvel

## 📋 Requisitos Previos

- Node.js (versión 18 o superior)
- npm o yarn

## 🚀 Instalación

1. **Clonar el repositorio**

   ```bash
   git clone <url-del-repositorio>
   cd marvel-app
   ```

2. **Instalar dependencias**

   ```bash
   npm install
   ```

3. **Configurar la API de Marvel (Opcional)**

   Para usar la API real de Marvel, necesitas obtener claves de acceso:

   - Ve a [Marvel Developer Portal](https://developer.marvel.com/)
   - Regístrate y obtén tu API Key pública y privada
   - Edita `src/services/marvel-api.js` y reemplaza:
     ```javascript
     const PUBLIC_KEY = 'TU_PUBLIC_KEY';
     const PRIVATE_KEY = 'TU_PRIVATE_KEY';
     ```
   - Cambia la línea de exportación de `MockMarvelAPI` a `MarvelAPI`

4. **Ejecutar en modo desarrollo**

   ```bash
   npm run dev
   ```

   La aplicación estará disponible en `http://localhost:3000`

## 📜 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia el servidor de desarrollo
npm run build        # Construye para producción
npm run preview      # Previsualiza la build de producción

# Testing
npm run test         # Ejecuta tests en modo watch
npm run test:run     # Ejecuta tests una vez
npm run test:ui      # Ejecuta tests con interfaz gráfica

# Linting y Formateo
npm run lint         # Ejecuta ESLint
npm run lint:fix     # Corrige errores de ESLint automáticamente
npm run format       # Formatea código con Prettier
```

## 🏗️ Arquitectura del Proyecto

```
src/
├── components/          # Componentes Lit
│   ├── marvel-app.js    # Componente principal
│   ├── header.js        # Header con búsqueda y favoritos
│   ├── character-list.js # Lista de personajes
│   ├── character-card.js # Tarjeta individual de personaje
│   └── character-detail.js # Vista de detalle
├── services/            # Servicios y APIs
│   └── marvel-api.js    # Cliente de la API de Marvel
├── utils/               # Utilidades
│   └── favorites-store.js # Store para favoritos
├── styles/              # Estilos adicionales
├── main.js              # Punto de entrada
└── style.css            # Estilos globales con TailwindCSS
```

## 🎨 Componentes

### MarvelApp

Componente principal que maneja el estado global de la aplicación:

- Lista de personajes
- Estado de carga
- Vista actual (lista/detalle)
- Filtros de búsqueda

### Header

Barra de navegación superior con:

- Logo de Marvel (navegación principal)
- Campo de búsqueda
- Contador de favoritos
- Botón de filtro de favoritos

### CharacterList

Muestra la grilla de personajes con:

- Contador de resultados
- Mensajes de estado vacío
- Grid responsive

### CharacterCard

Tarjeta individual de personaje con:

- Imagen del personaje
- Nombre y descripción
- Botón de favorito
- Interacciones hover

### CharacterDetail

Vista detallada del personaje con:

- Información completa
- Lista de cómics ordenados por fecha
- Botón de favorito
- Navegación de regreso

## 🔧 Configuración

### TailwindCSS

El proyecto usa TailwindCSS v3 con configuración personalizada:

- Colores de marca Marvel
- Fuente Roboto
- Breakpoints responsive

### Vite

Configurado para:

- Desarrollo rápido con HMR
- Build optimizado para producción
- Soporte para ES modules
- Testing con Vitest

### ESLint + Prettier

Configurado para:

- Código consistente
- Mejores prácticas
- Formateo automático

## 🧪 Testing

El proyecto incluye tests para:

- **Utils**: Store de favoritos
- **Services**: API de Marvel (mock)
- **Components**: Componentes principales

Ejecutar tests:

```bash
npm run test
```

## 📱 Responsive Design

La aplicación es completamente responsive con:

- **Mobile First**: Diseño optimizado para móviles
- **Breakpoints**: sm, md, lg, xl
- **Grid Adaptativo**: Se ajusta automáticamente
- **Touch Friendly**: Interacciones optimizadas para touch

## ♿ Accesibilidad

Implementa las mejores prácticas de accesibilidad:

- **ARIA Labels**: Etiquetas descriptivas
- **Keyboard Navigation**: Navegación completa con teclado
- **Screen Reader Support**: Compatible con lectores de pantalla
- **Color Contrast**: Contraste adecuado
- **Focus Management**: Gestión correcta del foco

## 🚀 Despliegue

### Build de Producción

```bash
npm run build
```

Los archivos optimizados se generan en `dist/`

### Despliegue en Vercel/Netlify

1. Conecta tu repositorio
2. Configura el comando de build: `npm run build`
3. Configura el directorio de salida: `dist`

## 🔑 API de Marvel

### Configuración

Para usar la API real de Marvel:

1. Obtén tus claves en [Marvel Developer Portal](https://developer.marvel.com/)
2. Edita `src/services/marvel-api.js`
3. Reemplaza las claves mock con las reales

### Endpoints Utilizados

- `GET /public/characters` - Lista de personajes
- `GET /public/characters/{id}` - Detalle de personaje
- `GET /public/characters/{id}/comics` - Cómics del personaje

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🙏 Agradecimientos

- [Marvel](https://www.marvel.com/) por proporcionar la API
- [Lit.dev](https://lit.dev/) por el framework de componentes
- [TailwindCSS](https://tailwindcss.com/) por el framework CSS
- [Vite](https://vitejs.dev/) por el bundler

## 📞 Soporte

Si tienes alguna pregunta o problema:

- Abre un issue en GitHub
- Contacta al equipo de desarrollo

---

Desarrollado con ❤️ usando tecnologías web modernas
