import State from "./types/State.type";

/**
 * initializes the renderer function, stores the canvas and context into variables, and
 * causes a sideeffect of appending the canvas element to the argument root element
 *
 * @param root - the root html element, ie the parent element
 * @returns [a function called "render" which should be called every frame, to render snake to the screen]
 */
export default function initRenderer(root: HTMLDivElement): (state: State) => void {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  root.appendChild(canvas);

  return function render(state: State) {
    if (root) {
      console.log(state);
      ctx.fillStyle = 'red'
      ctx.fillRect(0, 0, 100, 100);
    }
  }
}
