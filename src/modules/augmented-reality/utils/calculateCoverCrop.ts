import type { CoverCrop } from '../types';

export const calculateCoverCrop = (
  sourceWidth: number,
  sourceHeight: number,
  destinationWidth: number,
  destinationHeight: number
): CoverCrop => {
  const sourceRatio = sourceWidth / sourceHeight;
  const destinationRatio = destinationWidth / destinationHeight;

  if (sourceRatio > destinationRatio) {
    const sourceHeightResult = sourceHeight;
    const sourceWidthResult =
      sourceHeightResult * destinationRatio;

    return {
      sourceX: (sourceWidth - sourceWidthResult) / 2,
      sourceY: 0,
      sourceWidth: sourceWidthResult,
      sourceHeight: sourceHeightResult,
    };
  }

  const sourceWidthResult = sourceWidth;
  const sourceHeightResult =
    sourceWidthResult / destinationRatio;

  return {
    sourceX: 0,
    sourceY: (sourceHeight - sourceHeightResult) / 2,
    sourceWidth: sourceWidthResult,
    sourceHeight: sourceHeightResult,
  };
};

export default calculateCoverCrop;
