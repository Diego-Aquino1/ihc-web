# IHC Web - Proyectos VR

Una aplicación web moderna desarrollada en React que presenta proyectos de realidad virtual con un diseño centrado en la usabilidad y experiencia del usuario.

## 🚀 Características

- **Diseño Responsivo**: Optimizado para todos los dispositivos
- **Animaciones Suaves**: Implementadas con Framer Motion
- **Componentes Reutilizables**: Basados en Shadcn UI y TailwindCSS
- **Navegación Intuitiva**: Con breadcrumbs y routing claro
- **Principios de Usabilidad**: Visibilidad, feedback, affordance, constraints y mapeamiento
- **Dockerizado**: Fácil despliegue con Docker Compose

## 🛠️ Tecnologías Utilizadas

- **React 18** con TypeScript
- **Vite** como bundler
- **TailwindCSS** para estilos
- **Shadcn UI** para componentes
- **Framer Motion** para animaciones
- **React Router** para navegación
- **Lucide React** para iconos

## 📦 Instalación y Uso

### Desarrollo Local

1. **Clona el repositorio**
   ```bash
   git clone <repository-url>
   cd ihc-web
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   ```

3. **Ejecuta el servidor de desarrollo**
   ```bash
   npm run dev
   ```

4. **Abre tu navegador**
   ```
   http://localhost:5173
   ```

### Con Docker

1. **Construye y ejecuta con Docker Compose**
   ```bash
   docker-compose up --build
   ```

2. **Accede a la aplicación**
   ```
   http://localhost:8081
   ```

## 🎯 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── ui/             # Componentes base de Shadcn UI
│   ├── Navigation.tsx  # Barra de navegación
│   ├── ProjectCard.tsx # Tarjeta de proyecto
│   └── Breadcrumbs.tsx # Navegación breadcrumb
├── pages/              # Páginas de la aplicación
│   ├── Home.tsx        # Página principal
│   └── ProjectDetail.tsx # Detalle de proyecto
├── data/               # Datos y configuración
│   └── projects.ts     # Información de proyectos
├── types/              # Definiciones de TypeScript
│   └── project.ts      # Tipo de proyecto
└── lib/                # Utilidades
    └── utils.ts        # Funciones auxiliares
```

## 🎨 Principios de Usabilidad Implementados

### 1. **Visibilidad**
- Interfaz clara que comunica inmediatamente el propósito
- Estados del sistema claramente visibles
- Navegación intuitiva y predecible

### 2. **Feedback**
- Animaciones suaves que confirman acciones
- Estados hover y focus claramente definidos
- Transiciones fluidas entre estados

### 3. **Affordance**
- Botones y enlaces claramente identificables
- Elementos interactivos con estilos consistentes
- Iconografía clara y reconocible

### 4. **Constraints**
- Navegación limitada a opciones relevantes
- Diseño que guía al usuario sin confundirlo
- Información presentada de forma progresiva

### 5. **Mapeamiento**
- Navegación que responde a expectativas del usuario
- Breadcrumbs para orientación espacial
- Estructura lógica y predecible

## 🚀 Despliegue

La aplicación está configurada para ejecutarse en contenedores Docker:

- **Puerto**: 8081 (mapeado al 8000 del contenedor)
- **Imagen**: Node.js 18 Alpine
- **Servidor**: Serve para archivos estáticos

## 📝 Scripts Disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Construcción para producción
npm run preview  # Vista previa de la build
npm run lint     # Linter de código
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🎮 Proyectos Presentados

### 1. Escape Room VR - Nave Espacial
- **Tecnología**: Unity, C#, VR
- **Descripción**: Experiencia inmersiva de escape room en realidad virtual
- **Características**: Múltiples salas, puzzles únicos, modo multijugador

### 2. Próximo Proyecto
- **Estado**: En desarrollo
- **Descripción**: Algo increíble está por venir...

---

Desarrollado con ❤️ aplicando principios de usabilidad y experiencia de usuario.
