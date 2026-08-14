/**
 * ==========================================================================
 * VILLA DE LEYVA TOURIST APP - TYPOGRAPHY & ICONOGRAPHY SHOWCASE
 * ==========================================================================
 *
 * GUÍA DE USO DE TIPOGRAFÍA:
 * 1. GOCHI HAND:
 *    - Usar EXCLUSIVAMENTE para la marca "Villa de Leyva" en el Home y Splash Screen.
 *    - PROHIBIDO en párrafos, formularios, listas, botones pequeños, datos o modales.
 * 2. LEXEND:
 *    - Usar para TODOS los demás elementos funcionales (cuerpo de texto, botones,
 *      labels, tarjetas, formularios, distancias, direcciones, modal, etc.).
 *
 * GUÍA DE USO DE ICONOGRAFÍA:
 * 1. ICONOS ILUSTRADOS / FEATURE ICONS:
 *    - Accesos principales del Home (Mapa Interactivo, Servicios, Hospedaje, Eventos, Juegos, AR).
 *    - Fondo circular tridimensional con gradiente cálido (#F2930D -> #BA5900) y sombra suave.
 * 2. ICONOS FUNCIONALES:
 *    - Acciones secundarias (Volver, Configuración, Zoom, Cerrar, Audio, Ubicación).
 *    - Iconos lineales de Flaticon UIcons con áreas de toque de al menos 44x44px.
 *
 * REGLAS DE ACCESIBILIDAD:
 * - Todo icono interactivo debe incluir `aria-label`.
 * - Los iconos meramente decorativos deben incluir `aria-hidden="true"`.
 * - Todo botón interactivo garantiza un target táctil mínimo de 44 × 44 px.
 */

import React from 'react';
import { Button, type ButtonSize } from './Button';
import { Heading, BodyText, Label } from './Typography';
import {
  Icon,
  IconButton,
  FeatureIcon,
  NavigationIcon,
  StatusIcon,
  IllustratedIcon,
} from './Icon';

const BUTTON_SIZES: ButtonSize[] = ['large', 'medium', 'small'];

export const TypographyAndIconShowcase: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-[#1A212B] text-white rounded-2xl border border-white/10 space-y-8 select-none">
      {/* Header */}
      <div>
        <Heading level={1} size="large" className="text-[#F2930D]">
          Sistema Tipográfico e Iconográfico
        </Heading>
        <BodyText size="medium" className="text-[#9AA8BC] mt-1">
          Demostración centralizada de tokens, jerarquías y componentes para la App Turística de Villa de Leyva.
        </BodyText>
      </div>

      {/* Seccion 1: Tipografía */}
      <section className="space-y-4">
        <Heading level={2} size="medium" className="border-b border-white/10 pb-2">
          1. Jerarquía Tipográfica (Lexend & Gochi Hand)
        </Heading>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white/5 p-4 rounded-xl">
          {/* Gochi Hand Example */}
          <div className="p-3 border border-[#F2930D]/30 rounded-lg bg-[#0B1017]">
            <Label size="small" className="text-[#F2930D] uppercase tracking-wider block mb-1">
              Gochi Hand (Solo Título Marca)
            </Label>
            <Heading level={1} size="display" className="text-amber-200">
              Villa de Leyva
            </Heading>
            <BodyText size="small" className="text-gray-400 mt-2">
              ⚠️ Usar solo en Home y Splash Screen para la marca.
            </BodyText>
          </div>

          {/* Lexend Functional Examples */}
          <div className="p-3 border border-white/10 rounded-lg bg-[#0B1017] space-y-2">
            <Label size="small" className="text-[#F2930D] uppercase tracking-wider block">
              Lexend (Elementos Funcionales)
            </Label>
            <Heading level={2} size="medium" className="text-white">
              Headline Medium
            </Heading>
            <Heading level={3} size="small" className="text-gray-200">
              Title Small / Subtítulo
            </Heading>
            <BodyText size="medium" className="text-gray-300">
              Cuerpo de texto regular con excelente legibilidad y contraste.
            </BodyText>
            <Label size="medium" className="text-[#F2930D] font-semibold block">
              Label Medium / Botones y Chips
            </Label>
          </div>
        </div>
      </section>

      {/* Seccion 2: Sistema de botones */}
      <section className="space-y-4">
        <Heading level={2} size="medium" className="border-b border-white/10 pb-2">
          2. Botones (Variantes, tamaños y estados)
        </Heading>

        <div className="space-y-5 rounded-xl bg-white p-5 text-[#1A212B]">
          {[
            { kind: 'solid' as const, disabled: false, label: 'Solid / Enabled' },
            { kind: 'solid' as const, disabled: true, label: 'Solid / Disabled' },
            {
              kind: 'transparent' as const,
              disabled: false,
              label: 'Transparent / Enabled',
            },
            {
              kind: 'transparent' as const,
              disabled: true,
              label: 'Transparent / Disabled',
            },
          ].map((row) => (
            <div key={row.label} className="space-y-2">
              <Label size="small" className="block text-[#64748B]">
                {row.label}
              </Label>
              <div className="flex flex-wrap items-center gap-4">
                {BUTTON_SIZES.map((size) => (
                  <Button
                    key={size}
                    kind={row.kind}
                    size={size}
                    disabled={row.disabled}
                    leftIcon={<Icon name="fi-rr-angle-small-left" size={24} />}
                    rightIcon={<Icon name="fi-rr-arrow-right" size={24} />}
                  >
                    Button
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Seccion 3: Iconos Principales / Ilustrados */}
      <section className="space-y-4">
        <Heading level={2} size="medium" className="border-b border-white/10 pb-2">
          3. Iconos Principales (Featured 3D Options)
        </Heading>
        <div className="flex flex-wrap gap-6 justify-around p-4 bg-white/5 rounded-xl">
          <FeatureIcon iconName="fi-rr-touch" label="Interactivo" />
          <FeatureIcon iconName="fi-rr-services" label="Servicios" />
          <FeatureIcon iconName="fi-rr-lodging" label="Hospedaje" />
          <FeatureIcon iconName="fi-rr-events" label="Eventos" />
          <FeatureIcon iconName="fi-rr-games" label="Juegos" />
          <FeatureIcon iconName="fi-rr-ar" label="Realidad AR" />
        </div>
      </section>

      {/* Seccion 4: Iconos Funcionales */}
      <section className="space-y-4">
        <Heading level={2} size="medium" className="border-b border-white/10 pb-2">
          4. Iconos Funcionales y Controles Accesibles (≥ 44×44px)
        </Heading>
        <div className="flex flex-wrap items-center gap-4 p-4 bg-white/5 rounded-xl">
          <NavigationIcon type="back" />
          <IconButton iconName="fi-rr-settings-sliders" ariaLabel="Configuraciones" variant="secondary" />
          <IconButton iconName="fi-rr-target" ariaLabel="Centrar mapa" variant="floating" />
          <IconButton iconName="fi-rr-audio" ariaLabel="Escuchar narración" variant="glass" />
          <IllustratedIcon iconName="fi-rr-ar" size={32} />
        </div>
      </section>

      {/* Seccion 5: Estados y Alertas */}
      <section className="space-y-4">
        <Heading level={2} size="medium" className="border-b border-white/10 pb-2">
          5. Estados y Mensajes Accesibles (Icono + Explicación Textual)
        </Heading>
        <div className="flex flex-wrap gap-3 p-4 bg-white/5 rounded-xl">
          <StatusIcon status="success" message="Ubicación encontrada" />
          <StatusIcon status="location" message="Plaza Mayor (350m)" />
          <StatusIcon status="warning" message="Permiso de cámara requerido" />
          <StatusIcon status="error" message="Sin conexión a internet" />
        </div>
      </section>

      {/* Seccion 6: Reglas de Accesibilidad */}
      <section className="p-4 bg-[#F2930D]/10 border border-[#F2930D]/30 rounded-xl space-y-2">
        <Heading level={3} size="small" className="text-[#F2930D]">
          6. Checklist de Accesibilidad Cumplido
        </Heading>
        <ul className="list-disc list-inside text-xs text-gray-200 space-y-1">
          <li>Áreas de interacción táctil garantizadas de mínimo 44 × 44 px.</li>
          <li>Atributos aria-label en todos los controles interactivos de icono.</li>
          <li>Atributos aria-hidden=&quot;true&quot; en iconos decorativos.</li>
          <li>Textos nunca inferiores a 12 px (cumple WCAG AA).</li>
          <li>Estados de hover, focus-visible y active con anillos de enfoque naranjas.</li>
        </ul>
      </section>
    </div>
  );
};

export default TypographyAndIconShowcase;
