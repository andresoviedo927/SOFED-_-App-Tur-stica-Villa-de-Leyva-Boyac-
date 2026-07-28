import { DirectoryMapPin } from '@/components/shared/map-directory';
import type { ServiceMapPinProps } from './ServiceMapPin.types';

export const ServiceMapPin = (props: ServiceMapPinProps) => (
  <DirectoryMapPin
    {...props}
    visualWidth={30}
    visualHeight={38}
  />
);

export default ServiceMapPin;
