import Aspect from "./Aspect.type";

/**
 * size - the size, where size = n, and the number of tiles is n * n
 * apples - a list number pairs, where apples[0] = [x: number, y: number]
 */
type State = {
  apples: [number, number][];
  size: number;
  aspect: Aspect;
  root: HTMLDivElement;
}

export default State;
