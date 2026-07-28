/**
 * Centralized Iconography Configuration & Tokens
 *
 * ICON DESIGN SYSTEM RULES:
 * 1. ICONOS PRINCIPALES (Illustrated / Feature Icons):
 *    - Usados para accesos del Home y experiencias destacadas (Interactivo, Servicios, Hospedaje, Eventos, Juegos, Realidad Aumentada).
 *    - Fondo circular tridimensional con gradiente cálido (#F2930D -> #BA5900), borde sutil y sombra.
 *
 * 2. ICONOS FUNCIONALES (Functional Icons):
 *    - Usados para acciones secundarias (Volver, Configuración, Ubicación, Zoom, Cerrar, Compartir, Pausa, Audio, etc.).
 *    - Iconos lineales limpios de Flaticon UIcons.
 *    - Un solo color consistente, áreas táctiles de mínimo 44x44px.
 */

import { IconName } from '@/assets/icons';

export const ICON_SIZES = {
  xs: 16, // 16px - Badges, chips, inline meta
  sm: 20, // 20px - Secondary inline actions
  md: 24, // 24px - Standard controls, header icons
  lg: 32, // 32px - Prominent action buttons
  xl: 48, // 48px - Modal visual indicators, empty states
  feature: 64, // 56px - 72px - Main home feature icons
} as const;

export type IconSizeKey = keyof typeof ICON_SIZES;

/**
 * Feature / Illustrated Icon Names (Main Home Navigation)
 */
export const FEATURE_ICONS: Record<string, { icon: IconName; label: string; description: string }> = {
  interactive: {
    icon: 'fi-rr-touch',
    label: 'Mapa Interactivo',
    description: 'Explora Villa de Leyva en 3D',
  },
  services: {
    icon: 'fi-rr-services',
    label: 'Directorio de Servicios',
    description: 'Bancos, guías, restaurantes y utilidades',
  },
  lodging: {
    icon: 'fi-rr-lodging',
    label: 'Hospedaje',
    description: 'Hoteles, posadas y glamping',
  },
  events: {
    icon: 'fi-rr-events',
    label: 'Eventos Culturales',
    description: 'Festivales, conciertos y ferias',
  },
  games: {
    icon: 'fi-rr-games',
    label: 'Juegos y Trivia',
    description: 'Trivia histórica de Villa de Leyva',
  },
  ar: {
    icon: 'fi-rr-ar',
    label: 'Realidad Aumentada',
    description: 'Visualiza dinosaurios y fósiles en 3D',
  },
};

/**
 * Functional Icon Mapping by Category
 */
export const FUNCTIONAL_ICONS = {
  navigation: {
    back: 'fi-rr-angle-small-left' as IconName,
    arrowRight: 'fi-rr-arrow-right' as IconName,
    close: 'fi-rr-close' as IconName,
  },
  controls: {
    settings: 'fi-rr-settings-sliders' as IconName,
    target: 'fi-rr-target' as IconName,
    zoomIn: 'fi-rr-plus-small' as IconName,
    zoomOut: 'fi-rr-minus-small' as IconName,
    search: 'fi-rr-search' as IconName,
    filter: 'fi-rr-filter' as IconName,
  },
  features: {
    audio: 'fi-rr-audio' as IconName,
    mapPin: 'fi-rr-map-pin' as IconName,
    camera: 'fi-rr-ar' as IconName,
    book: 'fi-rr-book' as IconName,
    info: 'fi-rr-info' as IconName,
  },
} as const;
