import type StateManager from "./StateManager/StateManager.class";
import GameState from "./StateManager/types/GameState.enum";
import tail from "./StateManager/types/List/tail.func";

export default function update(manager: StateManager): void {
  if (manager.gameState === GameState.RUNNING) {
    const previous = manager.movePlayer();

    if (manager.player.value === manager.applePosition) {
      manager.points++;
      manager.generateNewApplePosition();

      // append the removed tail value, back to the tail
      const end = tail(manager.player);
      end.tail = {
        tail: null,
        head: end,
        value: previous,
      };
    }
  } else {
    //
  }
}
