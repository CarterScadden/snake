import StateManager from "./StateManager/StateManager.class";
import GameState from "./StateManager/types/GameState.enum";

const SNAKE_COLOR = "#1088c9";
const BACKGROUND_COLOR = "#588A38";
const APPLE_COLOR = "red";

export default function render(
  manager: StateManager,
  ctx: CanvasRenderingContext2D,
  aspect: number
): void {
  if (ctx.canvas) {
    ctx.fillStyle = BACKGROUND_COLOR;
    ctx.fillRect(0, 0, ctx.canvas.offsetWidth, ctx.canvas.offsetHeight);

    const tileSize = (100 / manager.width) * aspect;

    ctx.fillStyle = APPLE_COLOR;
    const { col, row } = manager.grid[manager.applePosition];
    ctx.fillRect(tileSize * col, tileSize * row, tileSize, tileSize);

    ctx.fillStyle = SNAKE_COLOR;

    let current = manager.player;
    while (current) {
      const { col, row } = manager.grid[current.value];

      ctx.fillRect(tileSize * col, tileSize * row, tileSize, tileSize);

      current = current.tail;
    }

    if (manager.gameState === GameState.RUNNING) {
      ctx.fillStyle = "black";
      ctx.font = "20px helvatica";
      ctx.fillText(
        `points: ${manager.points}, previous best: ${manager.previousBest}`,
        1 * aspect,
        3 * aspect
      );
    } else if (manager.gameState === GameState.MENU) {
      ctx.fillStyle = "black";
      ctx.font = "50px helvatica";
      ctx.fillText("press asdw to move", 1 * aspect, 5 * aspect);
    } else if (manager.gameState === GameState.PAUSED) {
      ctx.fillStyle = "black";
      ctx.font = "50px helvatica";
      ctx.fillText("PAUSED", 1 * aspect, 5 * aspect);
    } else if (manager.gameState === GameState.DEAD) {
      ctx.fillStyle = "black";
      ctx.font = "50px helvatica";
      ctx.fillText(
        "You died! Try not to do that next time.",
        1 * aspect,
        5 * aspect
      );
    }
  }
}
