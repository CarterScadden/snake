export default function resizeCanvasByParent(
  parent: HTMLDivElement,
  child: HTMLCanvasElement
): void {
  const { offsetWidth, offsetHeight } = parent;

  if (offsetWidth > offsetHeight) {
    child.width = offsetHeight;
    child.height = offsetHeight;
    child.style.left = `${(offsetWidth - offsetHeight) / 2}px`;
    child.style.top = "";
  } else {
    child.width = offsetWidth;
    child.height = offsetWidth;
    child.style.top = `${(offsetHeight - offsetWidth) / 2}px`;
    child.style.left = "";
  }
}
