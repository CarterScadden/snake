import type List from "./List.type";
import tail from "./tail.func";

export default function shift<T>(list: List<T>, value: T): T | null {
  let current = tail(list);
  const lastValue = current.value;

  while (current) {
    if (current.head) {
      current.value = current.head.value;
      current = current.head;
    } else {
      current.value = value;
      return lastValue;
    }
  }
}
