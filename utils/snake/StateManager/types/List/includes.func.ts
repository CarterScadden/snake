import type List from "./List.type";

export default function includes<T>(list: List<T>, value: T): boolean {
  let current = list;

  while (current) {
    if (current.value === value) {
      return true;
    }

    current = current.tail;
  }

  return false;
}
