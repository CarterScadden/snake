import initRenderer from "./initRenderer.func";
import Direction from "./types/Direction.enum";
import Grid from "./types/GridList/GridList.class";
import State from "./types/State.type";
import Tile from "./types/Tile.enum";
import update from "./update.func";
import use60Fps from "./use60Fps.func";

/**
 * initilaizes and runs the snake game, while returning a cleanup function
 ki
 * @param root - the parent container
 :c* @returns the cleapup callback ie: () => void
 */
export default function createGame(root: HTMLDivElement) {
  const render = initRenderer(root);

  let state: State = {
    root: root,
    map: new Grid<Tile>(256, 16, Tile.EMPTY),
    player: { head: null, tail: null, value: 0 },
    direction: Direction.UP,
    points: 0,
    stop: false,
  };

  const getRandomIndex = getRandomIndexGetterFromLength(state.map.items.length);

  state.map.items[getRandomIndex()].data = Tile.APPLE;

  let index = getRandomIndex();
  while (state.map.items[index].data === Tile.APPLE) {
    index = getRandomIndex();
  }

  state.map.items[index].data = Tile.SNAKE;
  state.player.value = index;

  state.player.tail = {
    head: state.player,
    tail: null,
    value: state.player.value,
  };

  state.player.tail.tail = {
    head: state.player.tail,
    tail: null,
    value: state.player.value,
  }

  window.addEventListener("keydown", ({ key }): void => {
    if (key === "w" || key === "UP") {
      state.direction = Direction.UP;
    } else if (key === "s" || key === "DOWN") {
      state.direction = Direction.DOWN;
    } else if (key === "a" || key === "LEFT") {
      state.direction = Direction.LEFT;
    } else if (key === "d" || key === "RIGHT") {
      state.direction = Direction.RIGHT;
    }
  });

  const controller = use60Fps(() => {
    if (!state.stop) {
      state = update(state);
      render(state);
    }
  });

  return function cleanup() {
    controller.stop();
  };
}

function getRandomIndexGetterFromLength(length: number) {
  return () => Math.floor(Math.random() * length);
}
