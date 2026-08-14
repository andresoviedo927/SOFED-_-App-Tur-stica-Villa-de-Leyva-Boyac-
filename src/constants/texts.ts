/**
 * Centralized Application Texts
 * ALL visible UI texts must be imported from this file.
 */

export const TEXTS = {
  splash: {
    title: 'Villa de Leyva',
    loading: 'Cargando contenido',
    logoAlt: 'Logo de la aplicación Villa de Leyva',
  },
  onboarding: {
    steps: [
      {
        title: 'Descubre Villa de Leyva',
        description:
          'Explora sitios turísticos, hoteles, restaurantes y mucho más.',
        imageAlt:
          'Ilustración para descubrir lugares de Villa de Leyva',
      },
      {
        title: 'Vive la realidad aumentada',
        description:
          'Participa en juegos y descubre historias en cada lugar.',
        imageAlt:
          'Ilustración de una experiencia de realidad aumentada en Villa de Leyva',
      },
      {
        title: 'Disfruta sus tradiciones',
        description:
          'Conoce los eventos, festividades y celebraciones de Villa de Leyva.',
        imageAlt:
          'Ilustración de las tradiciones de Villa de Leyva',
      },
    ],
    skip: 'Saltar',
    continue: 'Continuar',
    finish: 'Finalizar',
    nextStep: 'Ir al siguiente paso',
    indicatorsLabel: 'Progreso del onboarding',
    finalLoading: 'Cargando...',
  },
  common: {
    appName: 'Villa de Leyva',
    appSubtitle: 'Guía Turística Oficial',
    backLabel: 'Volver',
    back: 'Volver',
    goHomeLongPress: 'Ir al HOME',
    continueLabel: 'Continuar',
    settingsLabel: 'Ajustes',
    closeLabel: 'Cerrar',
    confirmLabel: 'Confirmar',
    cancelLabel: 'Cancelar',
    searchPlaceholder: 'Buscar en Villa de Leyva...',
    loadingText: 'Cargando...',
    seeMore: 'Ver más',
    seeLess: 'Ver menos',
    noResults: 'No se encontraron resultados',
    errorTitle: 'Ha ocurrido un error',
    retry: 'Reintentar',
  },
  app: {
    title: 'Villa de Leyva',
    appName: 'Villa de Leyva',
    appSubtitle: 'Guía Turística Oficial',
    backLabel: 'Volver',
    continueLabel: 'Continuar',
    settingsLabel: 'Ajustes',
    closeLabel: 'Cerrar',
    confirmLabel: 'Confirmar',
    cancelLabel: 'Cancelar',
    searchPlaceholder: 'Buscar en Villa de Leyva...',
    loadingText: 'Cargando...',
    seeMore: 'Ver más',
    seeLess: 'Ver menos',
    noResults: 'No se encontraron resultados',
    errorTitle: 'Ha ocurrido un error',
    retry: 'Reintentar',
  },
  home: {
    title: 'Villa de Leyva',
    welcomeSubtitle: 'Descubre la joya colonial de Boyacá',
    nearbyTitle: 'Lugares Cercanos Destacados',
    eventsTitle: 'Próximos Eventos Culturales',
    featuredTitle: 'Experiencia Destacada',
    navLinks: {
      interactive: 'Interactivo',
      services: 'Servicios',
      lodging: 'Hospedaje',
      events: 'Eventos',
      games: 'Juegos',
      ar: 'Realidad AR',
    },
  },
  interactive: {
    title: 'Módulo Interactivo',
    subtitle: 'Descubre Villa de Leyva de forma inmersiva e interactiva',
    map3d: 'Mapa 3D de la Plaza',
    virtualTour: 'Recorrido Virtual',
    audioGuide: 'Audioguía Turística',
    augmentedReality: 'Realidad Aumentada AR',
    games: 'Juegos y Trivia Cultural',
    explorePrompt: 'Toca un punto de interés en el mapa para iniciar la narración.',
    mapAriaLabel: 'Mapa interactivo ilustrado de Villa de Leyva',
    zoomIn: 'Aumentar zoom',
    zoomOut: 'Disminuir zoom',
    locateMap: 'Centrar mapa en Villa de Leyva',
    resettingMap: 'Restableciendo vista',
    mapCentered: 'Mapa centrado en Villa de Leyva',
    plazaPrincipal: {
      title: 'Plaza Principal',
      audioOn: 'Desactivar audio',
      audioOff: 'Activar audio',
      audioMuted: 'Audio silenciado',
      comingSoon: 'Experiencia en preparación',
      reading: {
        screenTitle: 'Lectura',
        articleTitle: 'Plaza Mayor',
        startNarration: 'Iniciar narración',
        preparingNarration: 'Preparando narración',
        stopNarration: 'Detener narración',
        narrationStarted: 'Narración iniciada',
        narrationStopped: 'Narración detenida',
        narrationError: 'No fue posible reproducir la narración.',
        narrationUnavailable:
          'No fue posible iniciar la narración en este dispositivo.',
        incompatibleVoice:
          'No encontramos una voz compatible para esta narración. Puedes continuar leyendo el contenido.',
        returnToNarration: 'Volver a la narración',
        narrationPaused: 'Narración pausada',
        narrationResumed: 'Narración reanudada',
        currentReadingPosition: 'Parte narrada actualmente',
        scrollAreaLabel: 'Reseña histórica de la Plaza principal',
        characterAlt:
          'Guía turístico de Villa de Leyva sosteniendo una taza',
      },
      experiences: {
        game: 'Juego',
        reading: 'Lectura',
        gallery: 'Galería',
        augmentedReality: 'Realidad aumentada',
      },
      gallery: {
        submenuLabel: 'Opciones de Galería',
        photos: {
          label: 'Fotos',
          accessibilityLabel:
            'Ver fotos de la Plaza Principal',
          screenTitle: 'Galería fotográfica',
          carouselLabel: 'Fotografías de la Plaza Principal',
          previousPhoto: 'Fotografía anterior',
          nextPhoto: 'Fotografía siguiente',
          goToPhoto: 'Ir a la fotografía',
          photoOf: 'Fotografía {current} de {total}',
          loadingPhoto: 'Cargando fotografía',
          loadError: 'No pudimos cargar esta fotografía.',
          retry: 'Reintentar',
        },
        panorama: {
          label: 'Panorámica',
          accessibilityLabel:
            'Ver panorámica de la Plaza Principal',
          screenTitle: 'Fotografía 360º',
          viewerLabel:
            'Vista panorámica de la Plaza Principal',
          interactionHint:
            'Arrastra la imagen para explorar la vista de 360 grados.',
          wideInteractionHint:
            'Arrastra para recorrer la fotografía panorámica.',
          resetView: 'Restablecer vista panorámica',
          loading: 'Cargando vista panorámica…',
          errorTitle:
            'No pudimos cargar la vista panorámica',
          errorMessage:
            'Comprueba el archivo e inténtalo nuevamente.',
          retry: 'Reintentar',
        },
        drone: {
          label: 'Drone',
          accessibilityLabel:
            'Ver recorrido aéreo de la Plaza Principal',
          screenTitle: 'Video Drone',
          videoLabel:
            'Video aéreo de la Plaza Principal de Villa de Leyva',
          play: 'Reproducir vuelo de drone',
          pause: 'Pausar vuelo de drone',
          replay: 'Reproducir nuevamente',
          loading: 'Cargando vuelo de drone',
          errorTitle:
            'No pudimos reproducir este vuelo',
          errorMessage:
            'Comprueba el archivo de video e inténtalo nuevamente.',
          retry: 'Reintentar',
        },
      },
    },
  },
  servicesDirectory: {
    title: 'Directorio de Servicios',
    subtitle: 'Encuentra restaurantes, transporte, guías, artesanías y salud',
    categories: {
      restaurants: 'Gastronomía y Restaurantes',
      transport: 'Transporte y Taxis',
      tours: 'Guías Turísticos',
      crafts: 'Artesanías y Souvenirs',
      emergency: 'Puntos de Auxilio y Salud',
    },
  },
  services: {
    screenTitle: 'Servicios',
    categories: {
      cafes: 'Cafetería',
      atms: 'Cajeros automáticos',
      gasStations: 'Gasolinería',
      health: 'Hospitales y farmacias',
      churches: 'Iglesias',
      thingsToDo: 'Qué hacer',
      restaurants: 'Restaurantes',
      publicTransport: 'Transporte público',
    },
    map: {
      label: 'Mapa de servicios de Villa de Leyva',
      resetView: 'Centrar mapa en Villa de Leyva',
      zoomIn: 'Acercar mapa',
      zoomOut: 'Alejar mapa',
      removeFilter: 'Quitar filtro',
      deactivateFilter: 'Desactivar filtro de {category}',
      filterChip: '{category} · Quitar filtro',
      noResultsTitle:
        'No encontramos lugares en esta categoría',
      noResultsMessage:
        'Todavía no hay puntos configurados para esta opción.',
      demoInformation:
        'Información de demostración.',
      viewDetails: 'Ver detalles',
      closeDetails: 'Cerrar información',
      filterActivated:
        'Filtro {category} activado. Se muestran los puntos disponibles en el mapa.',
      filterRemoved:
        'Filtro eliminado. Se muestra el mapa general de servicios.',
    },
    detail: {
      screenTitle: 'Detalle',
      showOnMap: 'Ver en el mapa',
      previousPhoto: 'Fotografía anterior',
      nextPhoto: 'Fotografía siguiente',
      goToPhoto: 'Ir a la fotografía',
      photoOf: 'Fotografía {current} de {total}',
      loading: 'Cargando información…',
      notFoundTitle: 'Servicio no encontrado',
      notFoundMessage:
        'No pudimos encontrar la información solicitada.',
      galleryLabel: 'Galería fotográfica de {service}',
      galleryPhotoAlt:
        'Vista turística asociada a {service}',
      galleryUnavailable: 'Fotografías no disponibles',
      galleryError: 'No pudimos cargar esta fotografía.',
      demoInformation: 'Información de demostración.',
      noContacts: 'Contactos no disponibles',
      contactWhatsapp: 'Contactar por WhatsApp a {service}',
      contactInstagram: 'Ver Instagram de {service}',
      contactWebsite: 'Visitar sitio web de {service}',
      contactEmail: 'Enviar correo a {service}',
      contactPhone: 'Ver teléfono de {service}',
      showServiceOnMap:
        'Ver {service} en el mapa de Villa de Leyva',
      attributes: {
        location: 'Ubicación',
        fixedMapPoint: 'Punto fijo en el mapa',
        status: 'Estado de los datos',
        demo: 'Demostración',
      },
    },
  },
  lodging: {
    screenTitle: 'Hospedaje',
    categories: {
      hotels: 'Hoteles',
      cabins: 'Cabañas',
      camping: 'Camping',
    },
    accessibility: {
      showHotels: 'Mostrar hoteles en Villa de Leyva',
      showCabins: 'Mostrar cabañas en Villa de Leyva',
      showCamping: 'Mostrar zonas de camping en Villa de Leyva',
    },
    map: {
      label: 'Mapa de hospedajes de Villa de Leyva',
      resetView: 'Centrar mapa en Villa de Leyva',
      zoomIn: 'Acercar mapa',
      zoomOut: 'Alejar mapa',
      removeFilter: 'Quitar filtro',
      deactivateFilter: 'Desactivar filtro de {category}',
      filterChip: '{category} · Quitar filtro',
      viewDetails: 'Ver detalles',
      closeDetails: 'Cerrar información',
      demoInformation: 'Información de demostración.',
      noResultsTitle:
        'No encontramos alojamientos en esta categoría',
      noResultsMessage:
        'Todavía no hay lugares configurados para esta opción.',
      filterActivated:
        'Filtro {category} activado. Se muestran los alojamientos disponibles en el mapa.',
      filterRemoved:
        'Filtro eliminado. Se muestra el mapa general de hospedajes.',
      address: 'Ubicación de referencia',
      priceRange: 'Rango de precio',
      highlight: 'Característica',
    },
    detail: {
      notFoundTitle: 'Alojamiento no encontrado',
      notFoundMessage:
        'No pudimos encontrar la información solicitada.',
      hotelDescription:
        'Hotel de demostración configurado para explorar opciones de hospedaje en Villa de Leyva.',
      cabinDescription:
        'Cabaña de demostración en un entorno campestre representado dentro del directorio.',
      campingDescription:
        'Zona de camping de demostración para consultar opciones de alojamiento al aire libre.',
      galleryPhotoAlt:
        'Vista turística asociada a {lodging}',
      attributes: {
        location: 'Ubicación',
        fixedMapPoint: 'Punto fijo en el mapa',
        type: 'Tipo',
        dataStatus: 'Estado de los datos',
        demo: 'Demostración',
        environment: 'Entorno',
      },
    },
  },
  events: {
    screenTitle: 'Eventos y festividades',
    carouselLabel:
      'Eventos y festividades de Villa de Leyva',
    swipeHint: 'Desliza para ver más eventos',
    previousEvent: 'Evento anterior',
    nextEvent: 'Evento siguiente',
    eventOf: 'Evento {current} de {total}',
    openEvent: 'Ver detalle del evento',
    loading: 'Cargando eventos…',
    emptyTitle: 'No hay eventos disponibles',
    emptyMessage:
      'Todavía no se han configurado eventos y festividades.',
    detail: {
      screenTitle: 'Lectura',
      descriptionLabel: 'Información del evento',
      startNarration: 'Iniciar narración del evento',
      stopNarration: 'Detener narración del evento',
      muteCharacterVideo: 'Silenciar audio del personaje',
      unmuteCharacterVideo: 'Activar audio del personaje',
      preparingNarration: 'Preparando narración',
      narrationError: 'No fue posible reproducir la narración.',
      narrationStarted: 'Narración iniciada',
      narrationPaused: 'Narración pausada',
      narrationCompleted: 'Narración finalizada',
      narrationStopped: 'Narración detenida',
      returnToNarration: 'Volver a la narración',
      viewPhotos: 'Ver fotografías del {event}',
      viewDrone: 'Ver vuelo de drone del {event}',
      photosUnavailable:
        'Fotografías no disponibles para este evento',
      photosUnavailableTooltip:
        'Este evento todavía no tiene fotografías disponibles.',
      droneUnavailable:
        'Video de drone no disponible para este evento',
      characterAlt:
        'Guía turístico narrando la información de {event}',
      photosScreenTitle: 'Galería fotográfica',
      photosCarouselLabel: 'Fotografías de {event}',
      photoOf: 'Fotografía {current} de {total}',
      loadingPhoto: 'Cargando fotografía',
      photoLoadError: 'No fue posible cargar esta fotografía',
      retry: 'Reintentar',
      previousPhoto: 'Fotografía anterior',
      nextPhoto: 'Fotografía siguiente',
      goToPhoto: 'Ir a la fotografía',
      droneScreenTitle: 'Vuelo de drone',
      playDrone: 'Reproducir vuelo de drone',
      pauseDrone: 'Pausar vuelo de drone',
      replayDrone: 'Volver a reproducir el vuelo de drone',
      loadingDrone: 'Cargando video',
      droneErrorTitle: 'Video no disponible',
      droneErrorMessage:
        'No fue posible cargar el vuelo de drone de este evento.',
      backToEvents: 'Volver a eventos',
      date: 'Fecha',
      schedule: 'Horario',
      location: 'Ubicación',
      price: 'Entrada',
      organizer: 'Organiza',
      demoInformation:
        'Información de demostración.',
      locationMapLabel:
        'Punto fijo de referencia para {location} en el mapa de Villa de Leyva',
      notFoundTitle: 'Evento no encontrado',
      notFoundMessage:
        'No pudimos encontrar la información del evento seleccionado.',
    },
    media: {
      photosScreenTitle: 'Galería fotográfica',
      droneScreenTitle: 'Vuelos de drone',
      eventNotFoundTitle: 'Evento no encontrado',
      eventNotFoundMessage:
        'No pudimos encontrar el contenido multimedia solicitado.',
      photosUnavailableTitle: 'Fotografías no disponibles',
      photosUnavailableMessage:
        'Este evento todavía no tiene una galería fotográfica.',
      droneUnavailableTitle: 'Video no disponible',
      droneUnavailableMessage:
        'Este evento todavía no tiene un vuelo de drone disponible.',
      backToDetail: 'Volver al detalle',
      backToEvents: 'Volver a eventos',
      photosCarouselLabel: 'Fotografías de {event}',
      photoOf: 'Fotografía {current} de {total}',
      loadingPhoto: 'Cargando fotografía',
      photoLoadError: 'No fue posible cargar esta fotografía',
      retry: 'Reintentar',
      previousPhoto: 'Fotografía anterior',
      nextPhoto: 'Fotografía siguiente',
      goToPhoto: 'Ir a la fotografía',
      playDrone: 'Reproducir vuelo de drone',
      pauseDrone: 'Pausar vuelo de drone',
      replayDrone: 'Volver a reproducir el vuelo de drone',
      loadingDrone: 'Cargando video',
      droneErrorTitle: 'Video no disponible',
      droneErrorMessage:
        'No fue posible cargar el vuelo de drone de este evento.',
    },
  },
  games: {
    title: 'Juegos y Trivia Histórica',
    subtitle: 'Aprende sobre la historia de Villa de Leyva jugando',
    startTrivia: 'Iniciar Trivia Cultural',
    scoreLabel: 'Puntaje',
    levelLabel: 'Nivel',
    secretPlazaRoute: {
      screenTitle: 'Juego',
      settingsLabel: 'Configuraciones del juego',
      contentAreaLabel:
        'Información de La Ruta Secreta de la Plaza Mayor',
      title: 'La Ruta Secreta de la Plaza Mayor',
      subtitle:
        'Camina, encuentra 5 lugares y desbloquea una recompensa.',
      stepperLabel: 'Los cinco puntos del recorrido',
      stepperPrompt: 'Busca los 5 alrededor de la Plaza Mayor.',
      stepperPoints: [
        'Iglesia Nuestra Sra. del Rosario',
        'Pila de piedra de la Plaza Mayor',
        'Casa Museo Luis Alberto Acuña',
        'Alcaldia Municipal',
        'Portal de la plaza',
      ],
      rewardMessage:
        '¡Completa los 5 puntos y desbloquea un bono digital con 15 % de descuento en una cafetería cercana a la Plaza Mayor!',
      introduction: [
        'Busca cinco lugares alrededor de la Plaza Mayor: la iglesia, la pila de piedra, la Casa Museo Luis Alberto Acuña, la Alcaldía y el Portal de la Plaza.',
        'Sigue el mapa y visita los puntos en orden. Camina hasta cada marcador para confirmar la parada y desbloquear la siguiente.',
        'Cuando completes los cinco puntos, desbloquearás un bono digital con 15 % de descuento en una cafetería de Villa de Leyva.',
      ],
      summaryAriaLabel: 'Resumen del recorrido',
      summary: {
        points: '5 puntos',
        duration: '8–15 minutos',
        mode: 'Recorrido interactivo',
        difficulty: 'Dificultad fácil',
        requirement: 'Modo demostrativo',
      },
      howItWorksTitle: '¿Cómo funciona?',
      steps: {
        location: {
          title: 'Explora el mapa',
          description:
            'La ruta y sus cinco puntos están configurados para comenzar desde la Plaza Mayor.',
        },
        visit: {
          title: 'Completa los cinco puntos',
          description:
            'Abre cada parada activa y confirma la visita para desbloquear la siguiente.',
        },
        reward: {
          title: 'Desbloquea tu recompensa',
          description:
            'Al finalizar el recorrido recibirás un bono digital disponible desde la aplicación.',
        },
      },
      pointsTitle: 'Los cinco puntos',
      points: [
        {
          name: 'Iglesia de Nuestra Señora del Rosario',
          description: 'Punto de inicio.',
        },
        {
          name: 'Pila de piedra de la Plaza Mayor',
          description: 'Primera parada histórica.',
        },
        {
          name: 'Casa Museo Luis Alberto Acuña',
          description: 'Parada cultural.',
        },
        {
          name: 'Alcaldía Municipal',
          description: 'Penúltimo punto del recorrido.',
        },
        {
          name: 'Portal de la Plaza',
          description: 'Punto final.',
        },
      ],
      pointsValidationNote:
        'Los puntos y el recorrido son una guía visual configurada para esta demostración.',
      rewardTitle: 'Recompensa',
      rewardDescription:
        'Al completar la ruta desbloquearás un bono digital con un 15 % de descuento en un establecimiento aliado de Villa de Leyva.',
      rewardDisclaimer:
        'Recompensa sujeta a confirmación del convenio con el establecimiento.',
      routeExperience: {
        screenTitle: 'La Ruta Secreta',
        settingsLabel: 'Configuraciones del juego',
        activeMapAlt:
          'Mapa de La Ruta Secreta con cinco puntos numerados y un recorrido pendiente alrededor de la Plaza Mayor.',
        completedMapAlt:
          'Mapa de La Ruta Secreta con los cinco puntos completados, el recorrido resaltado en naranja y el personaje celebrando en la meta.',
        mapLoading: 'Cargando mapa del recorrido...',
        mapLoadError: 'No pudimos cargar el mapa del recorrido.',
        retryMap: 'Reintentar',
        locate: 'Volver a la ruta',
        zoomIn: 'Acercar',
        zoomOut: 'Alejar',
        currentPoint: 'Punto actual',
        completedPoints: 'Puntos completados',
        nextDestination: 'Siguiente destino',
        experienceMode: 'Experiencia',
        simulatedMode: 'Recorrido demostrativo',
        progress: 'Progreso',
        visitPoint: 'Visitar punto',
        completePoint: 'Completar parada',
        pointCardTitle: 'Parada',
        resumeRoute: 'Reanudar recorrido',
        pointCompleted: 'Punto completado',
        continueNext: 'Continúa con la siguiente parada.',
        lastStopUnlocked: 'Última parada disponible.',
        routeReset: 'Vista centrada en el punto activo.',
        routeCompletedAnnouncement:
          'Ruta finalizada. Completaste los cinco puntos.',
        completionTitle: '¡Felicitaciones, completaste la ruta!',
        completionMessage:
          'Recorriste los cinco puntos de la Plaza Mayor y terminaste exitosamente La Ruta Secreta de la Plaza Mayor.',
        completionReward:
          'Como recompensa, desbloqueaste un bono especial.',
        viewReward: 'Ver recompensa',
        rewardTitle: '15 % en Amora Café y Canela',
        rewardPartnerPending:
          'Amora Café y Canela es una cafetería ubicada en el centro histórico de Villa de Leyva, a pocos pasos de la Plaza Mayor.',
        rewardInstructions:
          'Presenta este código QR en Amora Café y Canela antes de realizar tu pedido. El personal escaneará el código para verificar el bono y aplicar el descuento.',
        digitalVoucher: 'Bono digital',
        directions: 'Cómo llegar',
        visualGuide: 'Ruta de referencia',
        referenceMapTitle: 'Referencia desde la Plaza Mayor',
        referenceMapAlt:
          'Mapa de referencia centrado en la Plaza Mayor de Villa de Leyva.',
        referenceMapDescription:
          'Esta vista es una guía visual fija. No utiliza navegación en tiempo real.',
        downloadQr: 'Descargar bono',
        downloadShort: 'Descargar',
        goHome: 'Ir al Inicio',
        qrUnavailable:
          'El código QR estará disponible cuando se confirme el convenio.',
      },
      safetyMessage:
        'Explora el recorrido a tu ritmo. La experiencia funciona completamente en modo demostrativo.',
      startButton: 'Comenzar recorrido',
    },
  },
  settings: {
    title: 'Configuraciones',
    subtitle: 'Personaliza tu experiencia de navegación',
    backLabel: 'Volver',
    automaticNarration: 'Narraciones automáticas',
    augmentedReality: 'Realidad aumentada',
    narrationVolume: 'Volumen de narración',
    soundEffectsVolume: 'Efectos de sonido',
    saveChanges: 'Guardar cambios',
    savingChanges: 'Guardando cambios...',
    changesSavedTitle: 'Cambios guardados',
    changesSavedMessage: 'Tus configuraciones se actualizaron correctamente.',
    saveSuccess: '¡Cambios guardados con éxito!',
    aboutApp: 'Acerca de Villa de Leyva App',
    versionLabel: 'Versión 1.0.0',
  },
  augmentedReality: {
    title: 'Realidad Aumentada (AR)',
    subtitle:
      'Visualiza personajes de Villa de Leyva en tu entorno',
    startCamera: 'Abrir Cámara AR',
    scanSurface: 'Apunta tu cámara a una superficie plana',
    modelLoaded: 'Personaje cargado correctamente',
    activatingCamera: 'Activando cámara…',
    scanning: {
      title: 'Apunta la cámara hacia una superficie plana',
      description:
        'Mantén el dispositivo estable durante unos segundos.',
      preparing: 'Preparando superficie…',
      characterReady:
        'El personaje está listo para la fotografía.',
    },
    camera: {
      back: 'Volver',
      capture: 'Tomar fotografía',
      retry: 'Intentar nuevamente',
    },
    preview: {
      retake: 'Repetir',
      save: 'Guardar foto',
      capturedAlt: 'Fotografía tomada con la cámara',
    },
    errors: {
      title: 'No pudimos acceder a la cámara',
      permissionDenied:
        'Autoriza el uso de la cámara para tomarte una fotografía con el personaje.',
      cameraNotFound:
        'No encontramos una cámara disponible en este dispositivo.',
      cameraBusy:
        'La cámara está siendo utilizada por otra aplicación.',
      constraintsNotSupported:
        'La cámara disponible no admite la configuración solicitada.',
      insecureContext:
        'La cámara necesita una conexión segura para funcionar.',
      unsupported:
        'Este navegador no permite utilizar la cámara.',
      unknown: 'Ocurrió un problema al iniciar la cámara.',
      capture: 'No fue posible crear la fotografía. Intenta nuevamente.',
    },
    demo: {
      title: 'Modo demostración',
      description:
        'La cámara no está disponible. Puedes probar la experiencia con una imagen de fondo.',
      start: 'Probar modo demostración',
    },
    accessibility: {
      cameraPreview: 'Vista previa de la cámara',
      cameraActivated: 'Cámara activada.',
      preparing: 'Preparando espacio para el personaje.',
      characterPlaced:
        'Personaje colocado. Ya puedes tomar la fotografía.',
      photoCaptured: 'Fotografía capturada.',
      characterAlt: 'Personaje guía de Villa de Leyva',
      demoBackgroundAlt:
        'Imagen de Villa de Leyva para el modo demostración',
    },
  },
  errors: {
    generic: 'Algo salió mal. Por favor intenta de nuevo.',
    network: 'Sin conexión a Internet. Verifica tu red.',
    notFound: 'El recurso solicitado no fue encontrado.',
    cameraDenied: 'Permiso de cámara denegado.',
  },
  permissions: {
    cameraTitle: 'Permiso de Cámara',
    cameraMessage: 'Requerimos tu cámara para la experiencia de Realidad Aumentada.',
    grant: 'Conceder Permiso',
    deny: 'Ahora no',
  },
} as const;

export default TEXTS;
