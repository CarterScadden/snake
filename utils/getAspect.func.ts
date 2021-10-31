import Aspect from "./types/Aspect.type";
import State from "./types/State.type";

export default function getAspect(state: State): Aspect {
  const ratio = 0;
  const offsetLeft = 0;
  const offsetTop = 0;

  return {
    ratio,
    offsetLeft,
    offsetTop,
  }
  /*
    private static getDimensionSettings(
        {
            offsetWidth: canvasWidth,
            offsetHeight: canvasHeight,
        }: HTMLCanvasElement,
        { width: imageWidth, height: imageHeight }: HTMLImageElement
    ): DimensionSettings {
        const imageWidthToHeightRatio = imageWidth / imageHeight;
        const canvasWidthToHeightRatio = canvasWidth / canvasHeight;

        // the width will always hit limit before height does
        if (imageWidthToHeightRatio > canvasWidthToHeightRatio) {
            const ratio = canvasWidth / imageWidth;
            const imageRenderHeight = imageHeight * ratio;
            const yOffset = (canvasHeight - imageRenderHeight) / 2;

            return {
                imageRenderWidth: canvasWidth,
                imageRenderHeight,
                yOffset,
                xOffset: 0,
                aspect: ratio,
            };
        }
        // the heighth will always hit its limit before the width does
        else if (imageWidthToHeightRatio < canvasWidthToHeightRatio) {
            const ratio = canvasHeight / imageHeight;
            const imageRenderWidth = imageWidth * ratio;
            const xOffset = (canvasWidth - imageRenderWidth) / 2;

            return {
                imageRenderHeight: canvasHeight,
                imageRenderWidth,
                yOffset: 0,
                xOffset,
                aspect: ratio,
            };
        }
        // they are equal, ie, both scale equally, and no offsets or changes need to be made
        else {
            return {
                imageRenderHeight: canvasHeight,
                imageRenderWidth: canvasWidth,
                aspect: 1,
                xOffset: 0,
                yOffset: 0,
            };
        }
    }

  */
}
