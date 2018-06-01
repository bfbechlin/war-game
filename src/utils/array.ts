import { groupBy, values, sortBy as _sortBy } from 'underscore';

export const intersection = <T>(array1: T[], array2: T[]) => (
  array1.filter((element: T) => array2.indexOf(element) > -1)
);

export const difference = <T>(array1: T[], array2: T[]) => (
  array1.filter((element: T) => array2.indexOf(element) < 0)
);

export const cyclicIncrement = <T>(array: T[], element: T) => (
  array[(array.indexOf(element) + 1) % array.length]
);

export const shuffle = <T>(array: T[]): T[] => {
  if (array.length === 0) {
    return [];
  }
  const index = Math.trunc(Math.random() * array.length);
  const element = array.splice(index, 1);
  return [element[0], ...shuffle(array)];
};

export const partition = <T>(array: T[], n: number): T[][] => {
  const result = groupBy(array, (item: T, index: number) => (
    index % n
  ));
  return values(result);
};

export const sortBy = _sortBy;