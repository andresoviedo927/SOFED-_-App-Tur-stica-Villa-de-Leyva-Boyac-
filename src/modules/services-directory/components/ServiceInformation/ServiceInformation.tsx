import TEXTS from '@/constants/texts';
import ServiceAttributeList from '../ServiceAttributeList';
import ServiceContactLinks from '../ServiceContactLinks';
import type { ServiceInformationProps } from './ServiceInformation.types';
import styles from './ServiceInformation.module.css';

export const ServiceInformation = ({
  service,
  onShowOnMap,
  className = '',
  contactDisplay = 'label',
}: ServiceInformationProps) => (
  <article className={`${styles.information} ${className}`}>
    <div className={styles.sticky}>
      <h2>{service.name}</h2>
      <ServiceContactLinks
        contacts={service.contacts}
        serviceName={service.name}
        display={contactDisplay}
      />
    </div>
    <div className={styles.scroll}>
      <p className={styles.description}>{service.description}</p>
      {service.isMock && (
        <p className={styles.demo}>
          {TEXTS.services.detail.demoInformation}
        </p>
      )}
      <ServiceAttributeList
        attributes={service.attributes}
        serviceName={service.name}
        onShowOnMap={onShowOnMap}
      />
    </div>
  </article>
);

export default ServiceInformation;
