export const intersection = <T>(array1: T[], array2: T[]) => (
  array1.filter((element: T) => array2.indexOf(element) > -1)
);

export const difference = <T>(array1: T[], array2: T[]) => (
  array1.filter((element: T) => array2.indexOf(element) < 0)
);

export const cyclicIncrement = <T>(array: T[], element: T) => (
  array[(array.indexOf(element) + 1) % array.length]
);