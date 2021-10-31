import initRenderer from "./initRenderer.func";
import State from "./types/State.type";
import update from "./update.func";
import use60Fps from "./use60Fps.func";

/**
 * initilaizes and runs the snake game, while returning a cleanup function
 *
 * @param root - the parent container
 * @returns the cleapup callback ie: () => void
 */
export default function createGame(root: HTMLDivElement) {
  const render = initRenderer(root)

  let state: State = {
    apples: [[0, 0]],
    size: 9,
    root: root,
    aspect: {
      offsetLeft: 0,
      offsetTop: 0,
      ratio: 0,
    },
  };

  const controller = use60Fps(() => {
    state = update(state)
    render(state)
  });

  return function cleanup() {
    controller.stop();
  }
}
