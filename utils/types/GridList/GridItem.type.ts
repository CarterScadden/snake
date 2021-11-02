interface GridItem<T> {
  readonly left: GridItem<T> | null;
  readonly right: GridItem<T> | null;
  readonly top: GridItem<T> | null;
  readonly bottom: GridItem<T> | null;
  readonly column: number;
  readonly row: number;
  data: T;
}

export default GridItem;
