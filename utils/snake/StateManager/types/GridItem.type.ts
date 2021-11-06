type GridItem = {
  readonly row: number;
  readonly col: number;
  readonly index: number;
  readonly top: GridItem | null;
  readonly right: GridItem | null;
  readonly bottom: GridItem | null;
  readonly left: GridItem | null;
};

export default GridItem;
