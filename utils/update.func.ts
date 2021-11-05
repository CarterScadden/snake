import Direction from "./types/Direction.enum";
import type State from "./types/State.type";
import Tile from "./types/Tile.enum";
import tail from "./types/List/tail.func";

export default function update(state: State): State {
  const directionKey = ((state: State) => {
    if (state.direction === Direction.UP) return "top";
    if (state.direction === Direction.DOWN) return "bottom";
    if (state.direction === Direction.RIGHT) return "right";
    if (state.direction === Direction.LEFT) return "left";
  })(state);

  const playerMapTile = state.map.items[state.player.value];
  const targetTile = playerMapTile[directionKey];

  if (!targetTile) {
    state.stop = true;
  } else {
    let previousIndex = state.player.value;
    state.player.value = targetTile.index;
    targetTile.data = Tile.SNAKE;

    // eslint-disable-next-line no-debugger
    debugger;

    if (state.player.tail) {
      const snakeTail = tail(state.player);
      state.map.items[snakeTail.value].data = Tile.EMPTY;
      // eslint-disable-next-line no-debugger
      debugger;
      snakeTail.head.tail = null;

      let current = state.player.tail;

      while (current) {
        const currentIndex = current.value;
        current.value = previousIndex;
        previousIndex = currentIndex;

        current = current.tail;
      }
    }
  }

  return state;
}
