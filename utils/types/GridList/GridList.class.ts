import GridItem from "./GridItem.type";

/**
 * A Grid class, used to create a list of objects with readonly relationships with eachother
 * @template T - The data type that each grid item should have.
 *
 * example:
 * ```typescript
 * const grid = new Grid<string>(16, 4, "");
 *
 * grid[0].right.data === "" // true
 * ```
 */
export default class Grid<T> {
  public readonly items: (GridItem<T> | null)[];
  public readonly size: number;
  public readonly length: number;

  public constructor(size: number, length: number, defaultData: T = null) {
    this.size = size;
    this.length = length;

    const items = this._generateColumnsAndRows()
      .map(([row, col]) => ({
        left: null,
        right: null,
        top: null,
        bottom: null,
        row: row,
        column: col,
        data: defaultData,
      }))
      .flat()
      .map((obj, index) => ({
        ...obj,
        index,
      }));

    for (let i = 0; i < items.length; i++) {
      items[i].left = items[i - 1] || null;
      items[i].right = items[i + 1] || null;
      items[i].top = items[i - length] || null;
      items[i].bottom = items[i + length] || null;
    }

    this.items = items;
  }

  private _generateColumnsAndRows(): [number, number][] {
    const arr: [number, number][] = [];
    let row = -1;
    let col = -1;

    for (let i = 0; i < this.size; i++) {
      if (i % this.length === 0) {
        row++;
        col = -1;
      }
      col++;
      arr[i] = [row, col];
    }

    return arr;
  }
}
