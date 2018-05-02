export const intersection = <T>(array1: T[], array2: T[]) => (
  array1.filter((element: T) => array2.indexOf(element) > -1)
);

export const difference = <T>(array1: T[], array2: T[]) => (
  array1.filter((element: T) => array2.indexOf(element) < 0)
);