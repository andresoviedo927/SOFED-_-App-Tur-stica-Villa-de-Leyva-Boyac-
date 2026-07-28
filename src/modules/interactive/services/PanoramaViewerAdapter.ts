import type { PlazaPrincipalPanorama } from '../types/panorama.types';

export interface PanoramaViewerAdapter {
  load(panorama: PlazaPrincipalPanorama): Promise<void>;
  reset(): void;
  zoomIn(): void;
  zoomOut(): void;
  panBy(deltaX: number, deltaY: number): void;
  zoomBy(delta: number): void;
  destroy(): void;
}

const MIN_ZOOM = 1;
const MAX_ZOOM = 2.5;

export class LocalPanoramaViewerAdapter
  implements PanoramaViewerAdapter
{
  private panorama: PlazaPrincipalPanorama | null = null;
  private zoom = 1;
  private offsetX = 0;
  private offsetY = 0;
  private resizeObserver: ResizeObserver | null = null;
  private destroyed = false;

  constructor(
    private readonly viewport: HTMLDivElement,
    private readonly image: HTMLImageElement
  ) {
    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => {
        this.clampOffsets();
        this.render();
      });
      this.resizeObserver.observe(viewport);
    }
  }

  async load(panorama: PlazaPrincipalPanorama): Promise<void> {
    const source = panorama.src;
    const preloader = new Image();

    await new Promise<void>((resolve, reject) => {
      preloader.onload = () => resolve();
      preloader.onerror = () =>
        reject(new Error(`Unable to load panorama: ${source}`));
      preloader.src = source;
    });

    if (this.destroyed) return;

    this.panorama = panorama;
    this.image.src = source;
    this.image.alt = panorama.alt;
    this.reset();
  }

  reset(): void {
    const panorama = this.panorama;
    this.zoom = Math.min(
      MAX_ZOOM,
      Math.max(MIN_ZOOM, panorama?.initialZoom ?? 1)
    );
    this.offsetX = panorama?.initialYaw ?? 0;
    this.offsetY = panorama?.initialPitch ?? 0;
    this.clampOffsets();
    this.render();
  }

  zoomIn(): void {
    this.setZoom(this.zoom + 0.2);
  }

  zoomOut(): void {
    this.setZoom(this.zoom - 0.2);
  }

  zoomBy(delta: number): void {
    this.setZoom(this.zoom + delta);
  }

  panBy(deltaX: number, deltaY: number): void {
    this.offsetX += deltaX;

    if (this.panorama?.type === 'equirectangular360') {
      this.offsetY += deltaY;
    }

    this.clampOffsets();
    this.render();
  }

  destroy(): void {
    this.destroyed = true;
    this.resizeObserver?.disconnect();
    this.resizeObserver = null;
    this.image.removeAttribute('src');
    this.image.style.removeProperty('transform');
  }

  private setZoom(nextZoom: number): void {
    this.zoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, nextZoom));
    this.clampOffsets();
    this.render();
  }

  private clampOffsets(): void {
    const viewportWidth = this.viewport.clientWidth;
    const viewportHeight = this.viewport.clientHeight;
    const imageWidth = this.image.clientWidth || viewportWidth;
    const imageHeight = this.image.clientHeight || viewportHeight;
    const maxX = Math.max(
      0,
      (imageWidth * this.zoom - viewportWidth) / 2
    );
    const maxY =
      this.panorama?.type === 'equirectangular360'
        ? Math.max(
            0,
            (imageHeight * this.zoom - viewportHeight) / 2
          )
        : 0;

    this.offsetX = Math.min(maxX, Math.max(-maxX, this.offsetX));
    this.offsetY = Math.min(maxY, Math.max(-maxY, this.offsetY));
  }

  private render(): void {
    this.image.style.transform = `translate3d(${this.offsetX}px, ${this.offsetY}px, 0) scale(${this.zoom})`;
  }
}

export const createPanoramaViewerAdapter = (
  viewport: HTMLDivElement,
  image: HTMLImageElement
): PanoramaViewerAdapter =>
  new LocalPanoramaViewerAdapter(viewport, image);
