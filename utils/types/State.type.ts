import type Grid from "./GridList/GridList.class";
import type Tile from "./Tile.enum";

/**
 * size - the size, where size = n, and the number of tiles is n * n
 * apples - a list number pairs, where apples[0] = [x: number, y: number]
 */
type State = {
  root: HTMLDivElement;
  map: Grid<Tile>;
};

export default State;
