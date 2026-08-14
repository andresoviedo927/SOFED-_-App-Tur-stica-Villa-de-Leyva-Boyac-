# Villa de Leyva - Guía Turística (Clean Architecture)

Aplicación turística oficial de Villa de Leyva diseñada con Arquitectura Limpia, Componentización Extrema y Centralización Estricta de recursos.

## 🏛️ Reglas Obligatorias de Desarrollo

1. **Textos Centralizados**: Ningún componente debe contener textos visibles escritos directamente en JSX. Todos los textos se almacenan en `src/constants/texts.ts`.
2. **Colores Centralizados**: Ningún componente debe declarar colores HEX/RGB arbitrarios. Todos los colores se consumen desde `src/styles/colors.css` y `src/styles/theme.ts`.
3. **Tipografías Centralizadas**: Las familias tipográficas (`Gochi Hand` para textos artesanales/culturales y `Lexend` para UI/labels) se definen exclusivamente en `src/styles/typography.css`.
4. **Imágenes Centralizadas**: Todas las imágenes se exportan desde `src/assets/images/index.ts`.
5. **Iconos Centralizados**: Todos los iconos se exportan y mapean desde `src/assets/icons/index.ts`.
6. **Props Tipadas**: Todos los componentes deben tener sus interfaces de props totalmente tipadas (`ComponentName.types.ts`).
7. **Cero `any`**: No se permite el uso del tipo `any` en ninguna parte del código base.

---

## 🛠️ Guía de Extensión y Mantenimiento

### 1. Cómo agregar nuevos textos
Abre `src/constants/texts.ts` y añade la clave dentro del namespace correspondiente:
```typescript
export const TEXTS = {
  home: {
    title: 'Villa de Leyva',
    // Nueva clave de texto
    newFeatureText: 'Texto descriptivo',
  }
};
```

### 2. Cómo agregar nuevos colores
Abre `src/styles/colors.css` y agrega la variable CSS:
```css
:root {
  --color-nuevo-acento: #FF5722;
}
```
Y regístrala en `src/styles/theme.ts`.

### 3. Cómo agregar estilos tipográficos
Edita `src/styles/typography.css` para definir nuevas variables de tamaño o clase auxiliar:
```css
:root {
  --font-size-display-lg: 32px;
}
```

### 4. Cómo agregar nuevas imágenes
Añade la imagen en `src/assets/images/` y expórtala en `src/assets/images/index.ts`:
```typescript
import miNuevaImagen from './mi_nueva_imagen.jpg';

export const IMAGES = {
  MI_NUEVA_IMAGEN: miNuevaImagen,
};
```

### 5. Cómo agregar nuevos iconos
Expórtalo desde `src/assets/icons/index.ts`:
```typescript
import { Sparkles } from 'lucide-react';

export const ICONS = {
  'fi-rr-sparkles': Sparkles,
};
```

### 6. Cómo crear un componente reutilizable
Sigue la estructura de componente atómico:
```
src/components/ui/MiComponente/
├── MiComponente.tsx
├── MiComponente.types.ts
├── MiComponente.css
└── index.ts
```

### 7. Cómo crear una nueva feature/módulo
Crea una carpeta dentro de `src/modules/` con la estructura independiente:
```
src/modules/mi-feature/
├── components/
├── hooks/
├── services/
└── types/
```

---

## 📁 Estructura del Proyecto

```
src/
├── assets/
│   ├── images/
│   └── icons/
├── styles/
│   ├── colors.css
│   ├── typography.css
│   ├── global.css
│   └── theme.ts
├── constants/
│   ├── texts.ts
│   ├── routes.ts
│   └── index.ts
├── components/
│   ├── ui/ (Button, IconButton, AppIcon, Input, Card)
│   ├── layout/ (Header, Footer, Sidebar)
│   └── shared/ (Modal, Loader, Toast)
├── modules/ (home, interactive, services-directory, lodging, events, games, augmented-reality, settings)
├── services/ (api.ts, storage.ts)
├── types/ (global.d.ts)
├── utils/ (formatters.ts, validators.ts)
├── hooks/ (useExample.ts)
├── App.tsx
└── main.tsx
```
