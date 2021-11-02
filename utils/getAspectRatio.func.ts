export default function getAspectRatio(canvas: HTMLCanvasElement): number {
  return canvas.offsetWidth === 0 ? 1 : canvas.offsetWidth / 100;
}
