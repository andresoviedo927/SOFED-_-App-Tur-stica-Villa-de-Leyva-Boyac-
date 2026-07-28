import IMAGES from '@/assets/images';
import type { ServiceDetail } from '@/modules/services-directory/types/serviceDetail.types';
import ServiceDetailHeader from '@/modules/services-directory/components/ServiceDetailHeader';
import ServiceGallery from '@/modules/services-directory/components/ServiceGallery';
import ServiceInformation from '@/modules/services-directory/components/ServiceInformation';
import styles from './DirectoryDetailScreen.module.css';

interface DirectoryDetailScreenProps {
  detail: ServiceDetail | null;
  notFoundTitle: string;
  notFoundMessage: string;
  onBack: () => void;
  onOpenSettings: () => void;
  onShowOnMap: () => void;
}

export const DirectoryDetailScreen = ({
  detail,
  notFoundTitle,
  notFoundMessage,
  onBack,
  onOpenSettings,
  onShowOnMap,
}: DirectoryDetailScreenProps) => (
  <main
    className={styles.screen}
    style={{ backgroundImage: `url(${IMAGES.interactive.map})` }}
  >
    <div className={styles.overlay} />
    <div className={styles.layout}>
      <ServiceDetailHeader
        onBack={onBack}
        onOpenSettings={onOpenSettings}
      />
      {detail ? (
        <section className={styles.content} aria-label={detail.name}>
          <ServiceInformation
            service={detail}
            onShowOnMap={onShowOnMap}
          />
          <ServiceGallery
            images={detail.gallery}
            serviceName={detail.name}
          />
        </section>
      ) : (
        <section className={styles.notFound} role="alert">
          <h2>{notFoundTitle}</h2>
          <p>{notFoundMessage}</p>
        </section>
      )}
    </div>
  </main>
);

export default DirectoryDetailScreen;
