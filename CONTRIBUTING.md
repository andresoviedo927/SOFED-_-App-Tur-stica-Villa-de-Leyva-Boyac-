# Guía de Contribución

¡Gracias por tu interés en contribuir a la Guía Turística de Villa de Leyva!

## Reglas Obligatorias de Desarrollo

Este proyecto sigue una arquitectura limpia con centralización estricta de recursos:

### 1. **Textos Centralizados**
- Ningún texto visible en JSX directamente
- Todos los textos en `src/constants/texts.ts`

### 2. **Colores Centralizados**
- No se permiten colores HEX/RGB arbitrarios
- Usar `src/styles/colors.css` y `src/styles/theme.ts`

### 3. **Tipografías Centralizadas**
- Familias permitidas: `Gochi Hand` (artesanal) y `Lexend` (UI)
- Definidas en `src/styles/typography.css`

### 4. **Imágenes Centralizadas**
- Exportadas desde `src/assets/images/index.ts`

### 5. **Iconos Centralizados**
- Exportados desde `src/assets/icons/index.ts`

### 6. **Props Tipadas**
- Todos los componentes con interfaz `ComponentName.types.ts`

### 7. **Cero `any`**
- Prohibido usar el tipo `any`

## Proceso de Contribución

1. **Fork** el repositorio
2. **Crea una rama**: `git checkout -b feature/tu-feature`
3. **Commits significativos**: sigue el estándar Conventional Commits
4. **Push** a tu rama: `git push origin feature/tu-feature`
5. **Pull Request**: describe claramente los cambios

## Estándares de Código

- ESLint y Prettier configurados
- Ejecuta `npm run lint` antes de hacer push
- TypeScript sin errores (`npm run lint`)

## Comunicación

- Abre una Issue para discutir cambios mayores
- Sé respetuoso y constructivo

¡Gracias por contribuir! 🎉
