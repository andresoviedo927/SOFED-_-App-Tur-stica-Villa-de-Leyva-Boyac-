import {
  useEffect,
  useMemo,
  useState,
  type SyntheticEvent,
} from 'react';
import {
  divIcon,
  latLngBounds,
  type LatLngExpression,
} from 'leaflet';
import {
  MapContainer,
  Marker,
  TileLayer,
  Tooltip,
  useMap,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { fitMapToVisiblePins } from '@/components/shared/map-directory';
import { playSoundEffect } from '@/services/SoundEffectsService';
import type { LodgingLocation } from '../../types/lodging.types';
import type { LodgingMapProps } from './LodgingMap.types';
import styles from './LodgingMap.module.css';

const VILLA_DE_LEYVA_CENTER: LatLngExpression = [5.6332, -73.5231];
const VILLA_DE_LEYVA_BOUNDS: [LatLngExpression, LatLngExpression] = [
  [5.54, -73.66],
  [5.72, -73.43],
];

const CATEGORY_MARKER_CLASS = {
  hotels: 'markerHotels',
  cabins: 'markerCabins',
  camping: 'markerCamping',
} as const;

const hasCoordinates = (
  location: LodgingLocation
): location is LodgingLocation & { lat: number; lng: number } =>
  Number.isFinite(location.lat) && Number.isFinite(location.lng);

const MapViewport = ({
  locations,
  focusedLocation,
}: {
  locations: Array<LodgingLocation & { lat: number; lng: number }>;
  focusedLocation?: LodgingLocation & { lat: number; lng: number };
}) => {
  const map = useMap();

  useEffect(() => {
    if (focusedLocation) {
      map.flyTo([focusedLocation.lat, focusedLocation.lng], 17, {
        duration: 0.45,
      });
      return;
    }

    if (locations.length === 0) {
      map.setView(VILLA_DE_LEYVA_CENTER, 14);
      return;
    }

    if (
      locations.length === 1 ||
      locations.every(
        (location) =>
          location.lat === locations[0].lat &&
          location.lng === locations[0].lng
      )
    ) {
      map.flyTo([locations[0].lat, locations[0].lng], 16, {
        duration: 0.45,
      });
      return;
    }

    map.fitBounds(
      latLngBounds(
        locations.map((location) => [location.lat, location.lng])
      ),
      {
        padding: [32, 32],
        maxZoom: 16,
        animate: true,
        duration: 0.45,
      }
    );
  }, [focusedLocation, locations, map]);

  return null;
};

const MapControls = ({
  locations,
}: {
  locations: Array<LodgingLocation & { lat: number; lng: number }>;
}) => {
  const map = useMap();
  const stopMapInteraction = (event: SyntheticEvent<HTMLElement>) =>
    event.stopPropagation();

  return (
    <div
      className={styles.mapControls}
      onClick={stopMapInteraction}
      onDoubleClick={stopMapInteraction}
      onPointerDown={stopMapInteraction}
    >
      <button
        type="button"
        className={styles.locateControl}
        onClick={() => fitMapToVisiblePins(map, locations)}
        aria-label="Centrar los pines visibles"
        title="Centrar pines visibles"
      >
        <span aria-hidden="true" />
      </button>
      <div className={styles.zoomControls} aria-label="Controles de zoom">
        <button
          type="button"
          onClick={() => map.zoomIn()}
          aria-label="Acercar mapa"
        >
          +
        </button>
        <button
          type="button"
          onClick={() => map.zoomOut()}
          aria-label="Alejar mapa"
        >
          −
        </button>
      </div>
    </div>
  );
};

export const LodgingMap = ({
  locations,
  loading,
  error,
  markersVisible,
  focusedLodgingId,
  onOpenLodgingDetail,
}: LodgingMapProps) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const mappedLocations = useMemo(
    () => (markersVisible ? locations.filter(hasCoordinates) : []),
    [locations, markersVisible]
  );
  const focusedLocation = useMemo(
    () =>
      mappedLocations.find(
        (location) => location.id === focusedLodgingId
      ),
    [focusedLodgingId, mappedLocations]
  );

  useEffect(() => {
    if (focusedLocation) setSelectedId(focusedLocation.id);
  }, [focusedLocation]);

  useEffect(() => {
    if (
      !markersVisible ||
      (selectedId &&
        !locations.some((location) => location.id === selectedId))
    ) {
      setSelectedId(null);
    }
  }, [locations, markersVisible, selectedId]);

  return (
    <div className={styles.frame}>
      <section
        className={styles.mapPane}
        aria-label="Mapa interactivo de hospedajes"
      >
        <MapContainer
          className={styles.map}
          center={VILLA_DE_LEYVA_CENTER}
          zoom={14}
          minZoom={12}
          maxZoom={18}
          maxBounds={VILLA_DE_LEYVA_BOUNDS}
          maxBoundsViscosity={0.85}
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapViewport
            locations={mappedLocations}
            focusedLocation={focusedLocation}
          />
          {mappedLocations.map((location) => {
            const markerIcon = divIcon({
              className: styles.markerHost,
              html: `<span class="${styles.markerPin} ${styles[CATEGORY_MARKER_CLASS[location.categoryId]]}"><i></i></span>`,
              iconSize: [28, 34],
              iconAnchor: [14, 34],
            });
            const isSelected = selectedId === location.id;

            return (
              <Marker
                key={location.id}
                position={[location.lat, location.lng]}
                icon={markerIcon}
                eventHandlers={{
                  click: () => {
                    playSoundEffect('pin');
                    setSelectedId(location.id);
                  },
                }}
              >
                {isSelected && (
                  <Tooltip
                    permanent
                    interactive
                    direction="top"
                    offset={[0, -28]}
                    opacity={1}
                    className={styles.lodgingTooltip}
                  >
                    <button
                      type="button"
                      data-sound-effect="none"
                      onPointerDown={(event) => event.stopPropagation()}
                      onClick={(event) => {
                        event.stopPropagation();
                        playSoundEffect('open');
                        onOpenLodgingDetail(
                          location.categoryId,
                          location.id
                        );
                      }}
                      aria-label={`Abrir detalle de ${location.name}`}
                    >
                      {location.name}
                    </button>
                  </Tooltip>
                )}
              </Marker>
            );
          })}
          <MapControls locations={mappedLocations} />
        </MapContainer>
        {!loading && error && <p className={styles.mapEmpty}>{error}</p>}
        {!loading && !error && markersVisible && mappedLocations.length === 0 && (
          <p className={styles.mapEmpty}>
            No hay ubicaciones verificadas para mostrar.
          </p>
        )}
      </section>
    </div>
  );
};

export default LodgingMap;
