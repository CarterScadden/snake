const up = ["ArrowUp", "w", "k"];
const down = ["ArrowDown", "s", "j"];
const left = ["ArrowLeft", "a", "h"];
const right = ["ArrowRight", "d", "l"];

export default {
  up(key: string): boolean {
    return up.includes(key);
  },
  down(key: string): boolean {
    return down.includes(key);
  },
  left(key: string): boolean {
    return left.includes(key);
  },
  right(key: string): boolean {
    return right.includes(key);
  },
};
