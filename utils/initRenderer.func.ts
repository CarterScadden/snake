import getAspectRatio from "./getAspectRatio.func";
import resizeCanvasByParent from "./resizeCanvasByParent.func";
import State from "./types/State.type";
import Tile from "./types/Tile.enum";

/**
 * initializes the renderer function, stores the canvas and context into variables, and
 * causes a sideeffect of appending the canvas element to the argument root element
 * also removes all previous children from the root
 *
 * @param root - the root html element, ie the parent element
 * @returns [a function called "render" which should be called every frame, to render snake to the screen]
 */
export default function initRenderer(
  root: HTMLDivElement
): (state: State) => void {
  while (root.firstChild) {
    root.removeChild(root.firstChild);
  }

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  root.appendChild(canvas);
  canvas.style.position = "relative";
  canvas.style.background = "green";

  resizeCanvasByParent(root, canvas);
  let aspect = getAspectRatio(canvas);

  root.addEventListener("resize", (): void => {
    resizeCanvasByParent(root, canvas);
    aspect = getAspectRatio(canvas);
  });

  const colors = ["#ABD857", "#A5D352"];

  return function render(state: State) {
    if (root) {
      ctx.fillStyle = "#588A38";
      ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      const tileSize = Math.ceil((90 / state.map.length) * aspect);
      const xOffset = 5 * aspect;
      const yOffset = Math.ceil(2.5 * aspect);

      state.map.items.forEach((item, index): void => {
        if (item.data === Tile.EMPTY) {
          if ((index + item.row) % 2 === 0) {
            ctx.fillStyle = colors[0];
          } else {
            ctx.fillStyle = colors[1];
          }

          ctx.fillRect(
            xOffset + tileSize * item.column,
            yOffset + tileSize * item.row,
            tileSize,
            tileSize
          );

          return;
        }

        if (item.data === Tile.APPLE) {
          ctx.fillStyle = "red";
        } else if (item.data === Tile.SNAKE_HEAD) {
          ctx.fillStyle = "#1088c9";
        } else if (item.data === Tile.DEATH_TILE) {
          ctx.fillStyle = "gray";
        }

        ctx.fillRect(
          xOffset + tileSize * item.column,
          yOffset + tileSize * item.row,
          tileSize,
          tileSize
        );
      });
    }
  };
}
