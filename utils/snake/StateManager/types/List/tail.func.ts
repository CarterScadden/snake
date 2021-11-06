import type List from "./List.type";

export default function tail<T>(list: List<T>): List<T> {
  let current = list;
  while (current.tail) {
    current = current.tail;
  }

  return current;
}
