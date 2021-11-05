type List<T> = {
  head: List<T> | null;
  tail: List<T> | null;
  value: T;
};

export default List;
