import initRenderer from "./initRenderer.func";
import Grid from "./types/GridList/GridList.class";
import State from "./types/State.type";
import Tile from "./types/Tile.enum";
import update from "./update.func";
import use60Fps from "./use60Fps.func";

/**
 * initilaizes and runs the snake game, while returning a cleanup function
 *
 * @param root - the parent container
 * @returns the cleapup callback ie: () => void
 */
export default function createGame(root: HTMLDivElement) {
  const render = initRenderer(root);

  let state: State = {
    root: root,
    map: new Grid<Tile>(256, 16, Tile.EMPTY),
  };

  const controller = use60Fps(() => {
    state = update(state);
    render(state);
  });

  return function cleanup() {
    controller.stop();
  };
}
