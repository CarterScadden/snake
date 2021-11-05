import type Grid from "./GridList/GridList.class";
import type List from "./List/List.type";
import type Direction from "./Direction.enum";
import type Tile from "./Tile.enum";

/**
 * size - the size, where size = n, and the number of tiles is n * n
 * apples - a list number pairs, where apples[0] = [x: number, y: number]
 */
type State = {
  points: number;
  root: HTMLDivElement;
  map: Grid<Tile>;
  direction: Direction;
  player: List<number>;
  stop: boolean;
};

export default State;
