import type List from "./List.type";

export default function length<T>(list: List<T>): number {
  let total = 0;
  let current = list;
  while (current) {
    total++;
    current = current.tail;
  }

  return total;
}
