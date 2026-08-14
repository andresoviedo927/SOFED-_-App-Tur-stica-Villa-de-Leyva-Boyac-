import { MapCategoryButton } from '@/components/shared/map-directory';
import type { ServiceCategoryButtonProps } from './ServiceCategoryButton.types';

export const ServiceCategoryButton = (
  props: ServiceCategoryButtonProps
) => (
  <MapCategoryButton
    {...props}
    allowDisabledSelection
    visualVariant="services"
  />
);

export default ServiceCategoryButton;
