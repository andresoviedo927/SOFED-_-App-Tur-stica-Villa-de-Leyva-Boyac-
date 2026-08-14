import {
  AR_CHARACTER_PLACEMENT,
  MAX_CAPTURE_HEIGHT,
  MAX_CAPTURE_WIDTH,
} from '../constants/augmentedReality';
import calculateCoverCrop from './calculateCoverCrop';

interface DrawCompositePhotoOptions {
  video: HTMLVideoElement | null;
  fallbackImage: HTMLImageElement | null;
  characterMedia: HTMLImageElement | HTMLVideoElement | null;
  viewportWidth: number;
  viewportHeight: number;
}

const getOutputSize = (
  viewportWidth: number,
  viewportHeight: number
) => {
  const scale = Math.min(
    MAX_CAPTURE_WIDTH / viewportWidth,
    MAX_CAPTURE_HEIGHT / viewportHeight,
    2
  );

  return {
    width: Math.max(1, Math.round(viewportWidth * scale)),
    height: Math.max(1, Math.round(viewportHeight * scale)),
  };
};

export const drawCompositePhoto = ({
  video,
  fallbackImage,
  characterMedia,
  viewportWidth,
  viewportHeight,
}: DrawCompositePhotoOptions): HTMLCanvasElement => {
  const output = getOutputSize(viewportWidth, viewportHeight);
  const canvas = document.createElement('canvas');
  canvas.width = output.width;
  canvas.height = output.height;
  const context = canvas.getContext('2d');

  if (!context) {
    throw new Error('Canvas context unavailable');
  }

  const source = video?.videoWidth ? video : fallbackImage;
  const sourceWidth =
    source instanceof HTMLVideoElement
      ? source.videoWidth
      : source?.naturalWidth;
  const sourceHeight =
    source instanceof HTMLVideoElement
      ? source.videoHeight
      : source?.naturalHeight;

  if (!source || !sourceWidth || !sourceHeight) {
    throw new Error('Capture source unavailable');
  }

  const crop = calculateCoverCrop(
    sourceWidth,
    sourceHeight,
    canvas.width,
    canvas.height
  );
  context.drawImage(
    source,
    crop.sourceX,
    crop.sourceY,
    crop.sourceWidth,
    crop.sourceHeight,
    0,
    0,
    canvas.width,
    canvas.height
  );

  if (!characterMedia) {
    return canvas;
  }

  const characterWidth =
    canvas.width * AR_CHARACTER_PLACEMENT.widthRatio;
  const characterSourceWidth =
    characterMedia instanceof HTMLVideoElement
      ? characterMedia.videoWidth
      : characterMedia.naturalWidth;
  const characterSourceHeight =
    characterMedia instanceof HTMLVideoElement
      ? characterMedia.videoHeight
      : characterMedia.naturalHeight;
  if (!characterSourceWidth || !characterSourceHeight) {
    throw new Error('Character media unavailable');
  }
  const characterHeight =
    characterWidth *
    (characterSourceHeight / characterSourceWidth);
  const characterX =
    canvas.width * AR_CHARACTER_PLACEMENT.centerX -
    characterWidth / 2;
  const characterY =
    canvas.height -
    canvas.height * AR_CHARACTER_PLACEMENT.bottomY -
    characterHeight;

  context.save();
  context.globalAlpha = 0.32;
  context.filter = 'blur(10px)';
  context.beginPath();
  context.ellipse(
    canvas.width * AR_CHARACTER_PLACEMENT.centerX,
    characterY + characterHeight * 0.96,
    characterWidth * 0.34,
    characterHeight * 0.035,
    0,
    0,
    Math.PI * 2
  );
  context.fillStyle = '#1A212B';
  context.fill();
  context.restore();

  context.drawImage(
    characterMedia,
    characterX,
    characterY,
    characterWidth,
    characterHeight
  );

  return canvas;
};

export default drawCompositePhoto;
