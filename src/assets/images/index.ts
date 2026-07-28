/**
 * Centralized Application Images Index
 * All image paths and imports must be exported from here.
 *
 * Organized by module namespaces for Clean Architecture compliance.
 */

import logoImg from './logo.png';
import splashChurchImg from './splash-church.png';
import onboardingBackgroundImg from './onboarding-background.png';
import onboardingDiscoverImg from './onboarding-discover.png';
import onboardingAugmentedRealityImg from './onboarding-augmented-reality.png';
import onboardingTraditionsImg from './onboarding-traditions.png';
import villaDeLeyvaNightImg from './villa_de_leyva_night_1784856633330.jpg';
import donPedroMascotImg from './regenerated_image_1785123123021.png';
import homeBackgroundImg from './home-background.png';
import homeInteractiveImg from './home-interactive.png';
import homeServicesImg from './home-services.png';
import homeLodgingImg from './home-lodging.png';
import homeEventsImg from './home-events.png';
import homeFiguresImg from './home-figures.png';
import settingsBackgroundImg from './settings-background.png';
import readingPaperTextureImg from './reading-paper-texture.svg';
import interactiveSunImg from './interactive-sun.png';
import interactiveBannerImg from './interactive-banner.png';
import interactiveMapImg from './interactive-map.png';
import interactiveCloud1Img from './interactive-cloud-1.png';
import interactiveCloud2Img from './interactive-cloud-2.png';
import interactiveCloud3Img from './interactive-cloud-3.png';
import interactiveCloud4Img from './interactive-cloud-4.png';
import interactiveCloud5Img from './interactive-cloud-5.png';
import interactiveCloud6Img from './interactive-cloud-6.png';
import interactivePinYellowImg from './interactive-pin-yellow.png';
import interactivePinBlueImg from './interactive-pin-blue.png';
import interactivePinOrangeImg from './interactive-pin-orange.png';
import interactivePinBlackImg from './interactive-pin-black.png';
import interactivePinRedImg from './interactive-pin-red.png';
import interactivePinGreenImg from './interactive-pin-green.png';
import characterGuide1Img from './character-guide-1.png';
import characterGuide2Img from './character-guide-2.png';
import characterGuide3Img from './character-guide-3.png';
import characterGuide4Img from './character-guide-4.png';
import characterGuide5Img from './character-guide-5.png';
import characterGuide6Img from './character-guide-6.png';
import characterGuide7Img from './character-guide-7.png';
import characterGuide8Img from './character-guide-8.png';
import placeIconCabinsImg from './place-icon-cabins.png';
import placeIconCafeImg from './place-icon-cafe.png';
import placeIconAtmImg from './place-icon-atm.png';
import placeIconCampingImg from './place-icon-camping.png';
import placeIconDiscoverImg from './place-icon-discover.png';
import placeIconTraditionsImg from './place-icon-traditions.png';
import placeIconDroneImg from './place-icon-drone.png';
import placeIconEventsImg from './place-icon-events.png';
import placeIconPhotosImg from './place-icon-photos.png';
import placeIconGalleryImg from './place-icon-gallery.png';
import placeIconGasStationImg from './place-icon-gas-station.png';
import placeIconLodgingImg from './place-icon-lodging.png';
import placeIconHealthImg from './place-icon-health.png';
import placeIconHotelsImg from './place-icon-hotels.png';
import placeIconChurchesImg from './place-icon-churches.png';
import placeIconInteractiveImg from './place-icon-interactive.png';
import placeIconGameRouteImg from './place-icon-game-route.png';
import placeIconReadingImg from './place-icon-reading.png';
import placeIconPanoramaImg from './place-icon-panorama.png';
import placeIconPlazaPrincipalImg from './place-icon-plaza-principal.png';
import placeIconPuzzleImg from './place-icon-puzzle.png';
import placeIconWhatToDoImg from './place-icon-what-to-do.png';
import placeIconAugmentedRealityImg from './place-icon-augmented-reality.png';
import placeIconRestaurantImg from './place-icon-restaurant.png';
import placeIconServicesImg from './place-icon-services.png';
import placeIconPublicTransportImg from './place-icon-public-transport.png';
import placeIconLiveArImg from './place-icon-live-ar.png';
import secretRouteActiveMapImg from './game-secret-route-active.png';
import secretRouteCompletedMapImg from './game-secret-route-completed.png';
import servicesMapBaseImg from './services-map-villa-de-leyva.png';

export const IMAGES = {
  // Direct flat keys
  LOGO: logoImg,
  VILLA_DE_LEYVA_NIGHT: villaDeLeyvaNightImg,
  DON_PEDRO_MASCOT: donPedroMascotImg,
  HOME_BACKGROUND: homeBackgroundImg,
  HOME_INTERACTIVE: homeInteractiveImg,
  HOME_SERVICES: homeServicesImg,
  HOME_LODGING: homeLodgingImg,
  HOME_EVENTS: homeEventsImg,
  HOME_FIGURES: homeFiguresImg,
  SETTINGS_BACKGROUND: settingsBackgroundImg,
  FIGURAS_BG: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="844" height="180" viewBox="0 0 844 180" fill="none"><g stroke="%2394A3B8" stroke-width="1.2" opacity="0.35"><path d="M 380 180 L 380 90 L 460 90 L 460 180 M 420 90 L 420 50 L 400 70 L 440 70 Z M 410 110 L 430 110 L 430 140 L 410 140 Z M 320 180 L 320 110 L 380 110 M 460 110 L 520 110 L 520 180" stroke-dasharray="3 2"/><path d="M 100 180 C 120 150 140 150 160 180 M 180 180 C 200 150 220 150 240 180 M 260 180 C 280 150 300 150 320 180 M 520 180 C 540 150 560 150 580 180 M 600 180 C 620 150 640 150 660 180 M 680 180 C 700 150 720 150 740 180"/><path d="M 80 140 L 320 140 M 520 140 L 760 140"/></g></svg>`,

  // Module namespaces
  brand: {
    logo: logoImg,
  },
  splash: {
    church: splashChurchImg,
  },
  onboarding: {
    background: onboardingBackgroundImg,
    discover: onboardingDiscoverImg,
    augmentedReality: onboardingAugmentedRealityImg,
    traditions: onboardingTraditionsImg,
  },
  home: {
    heroBg: homeBackgroundImg,
    navIcons: {
      interactive: homeInteractiveImg,
      services: homeServicesImg,
      lodging: homeLodgingImg,
      events: homeEventsImg,
    },
    figuresBg: homeFiguresImg,
  },
  settings: {
    background: settingsBackgroundImg,
  },
  interactive: {
    sun: interactiveSunImg,
    banner: interactiveBannerImg,
    map: interactiveMapImg,
    clouds: [
      interactiveCloud1Img,
      interactiveCloud2Img,
      interactiveCloud3Img,
      interactiveCloud4Img,
      interactiveCloud5Img,
      interactiveCloud6Img,
    ],
    pins: {
      yellow: interactivePinYellowImg,
      blue: interactivePinBlueImg,
      orange: interactivePinOrangeImg,
      black: interactivePinBlackImg,
      red: interactivePinRedImg,
      green: interactivePinGreenImg,
    },
    reading: {
      background: settingsBackgroundImg,
      paperTexture: readingPaperTextureImg,
    },
  },
  characters: {
    guide1: characterGuide1Img,
    guide2: characterGuide2Img,
    guide3: characterGuide3Img,
    guide4: characterGuide4Img,
    guide5: characterGuide5Img,
    guide6: characterGuide6Img,
    guide7: characterGuide7Img,
    guide8: characterGuide8Img,
    eventNarrator: characterGuide7Img,
    augmentedRealityPhoto: characterGuide6Img,
  },
  icons: {
    cabins: placeIconCabinsImg,
    cafe: placeIconCafeImg,
    atm: placeIconAtmImg,
    camping: placeIconCampingImg,
    discover: placeIconDiscoverImg,
    traditions: placeIconTraditionsImg,
    drone: placeIconDroneImg,
    events: placeIconEventsImg,
    photos: placeIconPhotosImg,
    gallery: placeIconGalleryImg,
    gasStation: placeIconGasStationImg,
    lodging: placeIconLodgingImg,
    health: placeIconHealthImg,
    hotels: placeIconHotelsImg,
    churches: placeIconChurchesImg,
    interactive: placeIconInteractiveImg,
    gameRoute: placeIconGameRouteImg,
    reading: placeIconReadingImg,
    panorama: placeIconPanoramaImg,
    plazaPrincipal: placeIconPlazaPrincipalImg,
    puzzle: placeIconPuzzleImg,
    whatToDo: placeIconWhatToDoImg,
    augmentedReality: placeIconAugmentedRealityImg,
    restaurant: placeIconRestaurantImg,
    services: placeIconServicesImg,
    publicTransport: placeIconPublicTransportImg,
    liveAugmentedReality: placeIconLiveArImg,
    lodgingCategories: {
      hotels: placeIconHotelsImg,
      cabins: placeIconCabinsImg,
      camping: placeIconCampingImg,
    },
  },
  mapPins: {
    lodging: interactivePinBlackImg,
  },
  places: {
    plazaMayor: villaDeLeyvaNightImg,
    pozosAzules: villaDeLeyvaNightImg,
    casaTerracota: villaDeLeyvaNightImg,
  },
  services: {
    gastronomy: villaDeLeyvaNightImg,
    information: villaDeLeyvaNightImg,
  },
  servicesMap: {
    base: servicesMapBaseImg,
    paperTexture: readingPaperTextureImg,
    categoryIcons: {
      cafes: placeIconCafeImg,
      atms: placeIconAtmImg,
      gasStations: placeIconGasStationImg,
      health: placeIconHealthImg,
      churches: placeIconChurchesImg,
      thingsToDo: placeIconWhatToDoImg,
      restaurants: placeIconRestaurantImg,
      publicTransport: placeIconPublicTransportImg,
    },
    pins: {
      yellow: interactivePinYellowImg,
      blue: interactivePinBlueImg,
      orange: interactivePinOrangeImg,
      black: interactivePinBlackImg,
      red: interactivePinRedImg,
      green: interactivePinGreenImg,
    },
  },
  lodging: {
    hotelColonial: villaDeLeyvaNightImg,
    glampingEstelar: villaDeLeyvaNightImg,
  },
  events: {
    // Temporary approved project assets until verified festival photography is supplied.
    astronomyFestival: homeBackgroundImg,
    virgenDelCarmen: settingsBackgroundImg,
    windAndKitesFestival: interactiveMapImg,
    lightsFestival: villaDeLeyvaNightImg,
    fallback: homeBackgroundImg,
  },
  games: {
    triviaBg: villaDeLeyvaNightImg,
    introductionBackground: settingsBackgroundImg,
    secretPlazaRouteIcon: placeIconGameRouteImg,
    secretRoute: {
      activeMap: secretRouteActiveMapImg,
      completedMap: secretRouteCompletedMapImg,
    },
  },
  gallery: {
    plazaPrincipal: {
      // Temporary aliases until the definitive Plaza Principal photo set is supplied.
      photo1: villaDeLeyvaNightImg,
      photo2: villaDeLeyvaNightImg,
      photo3: villaDeLeyvaNightImg,
      photo4: villaDeLeyvaNightImg,
      photo5: villaDeLeyvaNightImg,
      // Replace with a verified 2:1 asset before changing its type
      // from widePanorama to equirectangular360.
      panorama: villaDeLeyvaNightImg,
      // Temporary poster until the definitive aerial-video poster is supplied.
      dronePoster: villaDeLeyvaNightImg,
    },
  },
  augmentedReality: {
    fossil3d: villaDeLeyvaNightImg,
    photoBackground: villaDeLeyvaNightImg,
  },
} as const;

export default IMAGES;
