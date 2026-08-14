/**
 * Centralized Icon Repository
 * Maps Flaticon / UIcons names and Lucide icons to standardized SVG icons.
 */

import {
  ChevronLeft,
  Sliders,
  MousePointerClick,
  Building2,
  Bed,
  Calendar,
  Gamepad2,
  Camera,
  Search,
  X,
  Check,
  MapPin,
  Volume2,
  VolumeX,
  BookOpen,
  Filter,
  ZoomIn,
  ZoomOut,
  User,
  ArrowRight,
  Info,
  Target,
  Plus,
  Minus,
  Clock,
  Footprints,
  Gauge,
  LocateFixed,
  Trophy,
  TriangleAlert,
  RotateCcw,
  Play,
  Download,
} from 'lucide-react';

export const ICONS = {
  // Navigation & Actions
  'fi-rr-angle-small-left': ChevronLeft,
  'fi-rr-settings-sliders': Sliders,
  'fi-rr-search': Search,
  'fi-rr-close': X,
  'fi-rr-check': Check,
  'fi-rr-arrow-right': ArrowRight,
  'fi-rr-arrow-small-right': ArrowRight,
  'fi-rr-target': Target,
  'fi-rr-plus-small': Plus,
  'fi-rr-minus-small': Minus,
  'fi-rr-clock': Clock,
  'fi-rr-walking': Footprints,
  'fi-rr-gauge': Gauge,
  'fi-rr-location-crosshairs': LocateFixed,
  'fi-rr-trophy': Trophy,
  'fi-rr-triangle-warning': TriangleAlert,
  'fi-rr-rotate-left': RotateCcw,
  'fi-rr-play': Play,
  'fi-rr-download': Download,

  // Home Main Options
  'fi-rr-touch': MousePointerClick,
  'fi-rr-services': Building2,
  'fi-rr-lodging': Bed,
  'fi-rr-events': Calendar,

  // Features & Modules
  'fi-rr-games': Gamepad2,
  'fi-rr-ar': Camera,
  'fi-rr-map-pin': MapPin,
  'fi-rr-audio': Volume2,
  'fi-rr-volume-mute': VolumeX,
  'fi-rr-book': BookOpen,
  'fi-rr-filter': Filter,
  'fi-rr-zoom-in': ZoomIn,
  'fi-rr-zoom-out': ZoomOut,
  'fi-rr-user': User,
  'fi-rr-info': Info,
} as const;

export type IconName = keyof typeof ICONS;

export default ICONS;
