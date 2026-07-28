/**
 * Centralized Typed Theme Token References for Villa de Leyva App
 *
 * TYPOGRAPHY RULES:
 * - Figma Hand: STRICTLY reserved for "Villa de Leyva" title in Home and Splash screen.
 * - Lexend: Used for all functional UI text (body, labels, buttons, forms, maps, settings, modal).
 *
 * ICON RULES:
 * - Feature / Illustrated Icons: 3D glossy circular background for main home options.
 * - Functional Icons: Linear clean icons for secondary actions (back, zoom, audio, settings).
 */

export const colors = {
  primaryOrangeStart: 'var(--color-primary-orange-start)',
  primaryOrangeEnd: 'var(--color-primary-orange-end)',
  orangeGlow: 'var(--color-orange-glow)',

  // Semantic mappings
  backgroundPrimary: 'var(--color-background-primary)',
  backgroundSecondary: 'var(--color-background-secondary)',
  backgroundPanel: 'var(--color-background-panel)',
  backgroundOverlay: 'var(--color-background-overlay)',
  backgroundCard: 'var(--color-background-card)',
  
  textPrimary: 'var(--color-text-primary)',
  textSecondary: 'var(--color-text-secondary)',
  textInverse: 'var(--color-text-inverse)',
  textMuted: 'var(--color-text-muted)',

  actionPrimary: 'var(--color-action-primary)',
  actionPrimaryPressed: 'var(--color-action-primary-pressed)',
  actionSecondary: 'var(--color-action-secondary)',

  statusSuccess: 'var(--color-status-success)',
  statusWarning: 'var(--color-status-warning)',
  statusError: 'var(--color-status-error)',
  statusInfo: 'var(--color-status-info)',

  mapRoute: 'var(--color-map-route)',
  mapMarkerActive: 'var(--color-map-marker-active)',

  // Neutrals
  bgDarkNight: 'var(--color-bg-dark-night)',
  bgPanel: 'var(--color-bg-panel)',
  white: 'var(--color-white)',
  textDark: 'var(--color-text-dark)',
  borderLight: 'var(--color-border-light)',
  borderCard: 'var(--color-border-card)',
  highlightCream: 'var(--color-highlight-cream)',
  overlayDark: 'var(--color-overlay-dark)',
} as const;

export const typography = {
  // Font Families
  familyDisplay: 'var(--font-family-display)', // "Figma Hand", "Caveat", "Comic Sans MS", cursive
  familyPrimary: 'var(--font-family-primary)', // "Lexend", Arial, sans-serif

  // Hierarchy Token Class Names
  display: 'typography-display',
  headlineLarge: 'typography-headline-large',
  headlineMedium: 'typography-headline-medium',
  headlineSmall: 'typography-headline-small',
  titleLarge: 'typography-title-large',
  titleMedium: 'typography-title-medium',
  titleSmall: 'typography-title-small',
  bodyLarge: 'typography-body-large',
  bodyMedium: 'typography-body-medium',
  bodySmall: 'typography-body-small',
  labelLarge: 'typography-label-large',
  labelMedium: 'typography-label-medium',
  labelSmall: 'typography-label-small',

  // Raw CSS Var References for font sizes
  sizes: {
    display: 'var(--font-size-display)',
    headlineLarge: 'var(--font-size-headline-large)',
    headlineMedium: 'var(--font-size-headline-medium)',
    headlineSmall: 'var(--font-size-headline-small)',
    titleLarge: 'var(--font-size-title-large)',
    titleMedium: 'var(--font-size-title-medium)',
    titleSmall: 'var(--font-size-title-small)',
    bodyLarge: 'var(--font-size-body-large)',
    bodyMedium: 'var(--font-size-body-medium)',
    bodySmall: 'var(--font-size-body-small)',
    labelLarge: 'var(--font-size-label-large)',
    labelMedium: 'var(--font-size-label-medium)',
    labelSmall: 'var(--font-size-label-small)',
  },
} as const;

export const iconSizes = {
  xs: 16, // iconXs (16px)
  sm: 20, // iconSm (20px)
  md: 24, // iconMd (24px)
  lg: 32, // iconLg (32px)
  xl: 48, // iconXl (48px)
  feature: 64, // iconFeature (56px - 72px)
} as const;

export const theme = {
  colors,
  typography,
  iconSizes,
} as const;

export default theme;
