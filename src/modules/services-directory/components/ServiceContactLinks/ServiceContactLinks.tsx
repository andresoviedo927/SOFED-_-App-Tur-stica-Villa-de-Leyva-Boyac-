import TEXTS from '@/constants/texts';
import type { ServiceContact } from '../../types/serviceDetail.types';
import type { ServiceContactLinksProps } from './ServiceContactLinks.types';
import styles from './ServiceContactLinks.module.css';

const contactIcon: Record<ServiceContact['type'], string> = {
  whatsapp: '◉',
  phone: '☎',
  instagram: '◎',
  website: '↗',
  email: '✉',
};

const getContactHref = (contact: ServiceContact) => {
  if (contact.url) return contact.url;
  if (contact.type === 'whatsapp') {
    const normalizedPhone = contact.value.replace(/\D/g, '');
    return normalizedPhone
      ? `https://wa.me/${normalizedPhone}`
      : null;
  }
  if (contact.type === 'instagram') {
    const profile = contact.value.replace(/^@/, '').trim();
    return profile ? `https://instagram.com/${profile}` : null;
  }
  if (contact.type === 'email') {
    return contact.value ? `mailto:${contact.value}` : null;
  }
  return null;
};

const getContactLabel = (
  contact: ServiceContact,
  serviceName: string
) => {
  const labels = {
    whatsapp: TEXTS.services.detail.contactWhatsapp,
    instagram: TEXTS.services.detail.contactInstagram,
    website: TEXTS.services.detail.contactWebsite,
    email: TEXTS.services.detail.contactEmail,
    phone: TEXTS.services.detail.contactPhone,
  };
  return labels[contact.type].replace('{service}', serviceName);
};

export const ServiceContactLinks = ({
  contacts,
  serviceName,
}: ServiceContactLinksProps) => {
  const availableContacts = contacts
    .map((contact) => ({ contact, href: getContactHref(contact) }))
    .filter(
      (item): item is { contact: ServiceContact; href: string } =>
        Boolean(item.contact.label && item.contact.value && item.href)
    );

  if (!availableContacts.length) {
    return null;
  }

  return (
    <div className={styles.links}>
      {availableContacts.map(({ contact, href }) => (
        <a
          key={`${contact.type}-${contact.value}`}
          href={href}
          target={
            contact.type === 'whatsapp' ||
            contact.type === 'instagram' ||
            contact.type === 'website'
              ? '_blank'
              : undefined
          }
          rel="noopener noreferrer"
          aria-label={getContactLabel(contact, serviceName)}
        >
          <span aria-hidden="true">{contactIcon[contact.type]}</span>
          {contact.label}
        </a>
      ))}
    </div>
  );
};

export default ServiceContactLinks;
