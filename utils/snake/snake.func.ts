import resizeCanvasByParent from "./resizeCanvasByParent.func";
import useFPS from "./useFPS.func";
import getAspectRatio from "./getAspectRatio.func";
import movementKeys from "./movementKeys";
import render from "./render.func";
import StateManager from "./StateManager/StateManager.class";
import Direction from "./StateManager/types/Direction.enum";
import GameState from "./StateManager/types/GameState.enum";
import PlayerHitSelfError from "./StateManager/types/PlayerHitSelfError.class";
import PlayerOutOfBoundsError from "./StateManager/types/PlayerOutOfBoundsError.class";
import update from "./update.func";

export default function snake(
  root: HTMLDivElement,
  WIDTH: number,
  FPS: number
): () => void {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  root.appendChild(canvas);

  canvas.style.position = "relative";
  canvas.style.background = "green";

  resizeCanvasByParent(root, canvas);
  let aspect = getAspectRatio(canvas);

  root.addEventListener("resize", (): void => {
    resizeCanvasByParent(root, canvas);
    aspect = getAspectRatio(canvas);
  });

  let stateManager = new StateManager(WIDTH);

  window.addEventListener("keydown", ({ key }): void => {
    if (stateManager.gameState === GameState.DEAD) {
      stateManager = new StateManager(
        WIDTH,
        stateManager.previousBest > stateManager.points
          ? stateManager.previousBest
          : stateManager.points
      );
    }

    let usedMovementKey = false;

    if (movementKeys.up(key)) {
      stateManager.playersDirection = Direction.UP;
      usedMovementKey = true;
    } else if (movementKeys.down(key)) {
      stateManager.playersDirection = Direction.DOWN;
      usedMovementKey = true;
    } else if (movementKeys.left(key)) {
      stateManager.playersDirection = Direction.LEFT;
      usedMovementKey = true;
    } else if (movementKeys.right(key)) {
      stateManager.playersDirection = Direction.RIGHT;
      usedMovementKey = true;
    }

    if (usedMovementKey) {
      if (
        stateManager.gameState === GameState.MENU ||
        stateManager.gameState === GameState.PAUSED
      ) {
        stateManager.gameState = GameState.RUNNING;
      }
    } else if (key === " ") {
      if (stateManager.gameState === GameState.PAUSED) {
        stateManager.gameState = GameState.RUNNING;
      } else if (stateManager.gameState === GameState.RUNNING) {
        stateManager.gameState = GameState.PAUSED;
      }
    } else {
      console.log("key: %s", key);
    }
  });

  useFPS(FPS, (): void => {
    try {
      update(stateManager);
      render(stateManager, ctx, aspect);
    } catch (e) {
      if (e instanceof PlayerOutOfBoundsError) {
        stateManager.gameState = GameState.DEAD;
      } else if (e instanceof PlayerHitSelfError) {
        stateManager.gameState = GameState.DEAD;
      } else {
        console.error(e);
        stateManager.gameState = GameState.MENU;
      }
    }
  });

  return function cleanup(): void {
    while (root?.firstChild) {
      try {
        root.removeChild(root.firstChild);
      } catch (e) {
        console.error(e);
      }
    }
  };
}
