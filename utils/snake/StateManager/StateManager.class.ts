import randomNumber from "../randomNumber.func";
import Direction from "./types/Direction.enum";
import GameState from "./types/GameState.enum";
import Grid from "./types/Grid.type";
import includes from "./types/List/includes.func";
import List from "./types/List/List.type";
import shift from "./types/List/shift.func";
import PlayerHitSelfError from "./types/PlayerHitSelfError.class";
import PlayerOutOfBoundsError from "./types/PlayerOutOfBoundsError.class";

export default class StateManager {
  public readonly width: number;
  public grid: Grid = [];
  public player: List<number> = { head: null, tail: null, value: 0 };
  public playersDirection: Direction;
  public applePosition: number;
  public points = 0;
  public gameState: GameState = GameState.MENU;
  public readonly previousBest: number;

  public constructor(width: number, previousBest = 0) {
    this.width = width;
    this._initializeGrid();
    this._initializePlayer();
    this.generateNewApplePosition();
    this.previousBest = previousBest;
  }

  private _initializeGrid(): void {
    const grid = [];

    let row = -1;
    let col = -1;
    for (let i = 0; i < this.width * this.width; i++) {
      if (i % this.width === 0) {
        row++;
        col = -1;
      }

      col++;

      grid[i] = {
        row,
        col,
        index: i,
        left: null,
        right: null,
        top: null,
        bottom: null,
      };
    }

    for (let i = 0; i < grid.length; i++) {
      grid[i].left = grid[i - 1] || null;
      grid[i].right = grid[i + 1] || null;
      grid[i].top = grid[i - this.width] || null;
      grid[i].bottom = grid[i + this.width] || null;
    }

    this.grid = grid;
  }

  private _initializePlayer(): void {
    this.player.value = randomNumber(this.grid.length);

    this.playersDirection = Direction.UP;
  }

  public generateNewApplePosition(): void {
    let index = randomNumber(this.grid.length);

    while (includes(this.player, index)) {
      index = randomNumber(this.grid.length);
    }

    this.applePosition = index;
  }

  public movePlayer(): number {
    const key = this._directionToGridKey(this.playersDirection);

    const currentPlayerPosition = this.grid[this.player.value];
    const nextPlayerPosition = currentPlayerPosition[key];

    if (
      !nextPlayerPosition ||
      (nextPlayerPosition.row !== currentPlayerPosition.row &&
        nextPlayerPosition.col !== currentPlayerPosition.col)
    ) {
      throw new PlayerOutOfBoundsError();
    }

    if (includes(this.player, nextPlayerPosition.index)) {
      throw new PlayerHitSelfError();
    }

    return shift(this.player, nextPlayerPosition.index);
  }

  private _directionToGridKey(
    direction: Direction
  ): "top" | "bottom" | "left" | "right" {
    switch (direction) {
      case Direction.UP:
        return "top";
      case Direction.DOWN:
        return "bottom";
      case Direction.LEFT:
        return "left";
      case Direction.RIGHT:
        return "right";
    }
  }
}
