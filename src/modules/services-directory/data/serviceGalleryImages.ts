const galleryModules = import.meta.glob(
  '../../../assets/images/services-gallery/*.jpg',
  {
    eager: true,
    import: 'default',
    query: '?url',
  }
) as Record<string, string>;

interface GallerySource {
  order: number;
  src: string;
}

const galleriesByLocation = Object.entries(galleryModules).reduce<
  Record<string, GallerySource[]>
>((galleries, [path, src]) => {
  const fileName = path.split('/').at(-1);
  const match = fileName?.match(/^(.+)_(\d+)\.jpg$/i);
  if (!match) return galleries;

  const [, locationId, order] = match;
  galleries[locationId] ??= [];
  galleries[locationId].push({ order: Number(order), src });
  return galleries;
}, {});

export const getServiceGallerySources = (locationId: string) =>
  (galleriesByLocation[locationId] ?? [])
    .sort((left, right) => left.order - right.order)
    .slice(0, 4)
    .map(({ src }) => src);

export default getServiceGallerySources;
