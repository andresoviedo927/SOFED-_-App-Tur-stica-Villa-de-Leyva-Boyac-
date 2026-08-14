import personajeBienvenida from './Personaje-bienvenida.mp4';
import personajeLectura from './Personaje-lectura.mp4';
import personajeCometas from './Personaje-cometas.mp4';

/**
 * Centralized video assets.
 */
export const VIDEOS = {
  plazaPrincipal: {
    welcomeCharacter: personajeBienvenida,
    readingCharacter: personajeLectura,
  },
  events: {
    windKitesCharacter: personajeCometas,
  },
} as const;

export default VIDEOS;
