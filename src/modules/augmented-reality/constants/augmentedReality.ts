export const CAMERA_CONSTRAINTS: MediaStreamConstraints = {
  audio: false,
  video: {
    facingMode: { ideal: 'environment' },
    width: { ideal: 1280 },
    height: { ideal: 720 },
  },
};

export const SURFACE_SCAN_DURATION_MS = 4000;
export const CHARACTER_PLACEMENT_DURATION_MS = 550;
export const MAX_CAPTURE_WIDTH = 1920;
export const MAX_CAPTURE_HEIGHT = 1080;
export const CAPTURE_FILE_NAME =
  'villa-de-leyva-personaje.jpg';

export const AR_CHARACTER_PLACEMENT = {
  centerX: 0.5,
  bottomY: 0.09,
  widthRatio: 0.2,
} as const;

export const GREEN_PARTICLES = Array.from(
  { length: 16 },
  (_, index) => ({
    id: `green-particle-${index + 1}`,
    left: 8 + ((index * 29) % 84),
    top: 15 + ((index * 37) % 66),
    scale: 0.72 + (index % 5) * 0.1,
    duration: 900 + (index % 6) * 110,
    delay: (index % 7) * 120,
  })
);
