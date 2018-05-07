import { 
  each as _each, 
  toArray as _toArray,
  object as _object,
  keys as _keys,
} from 'underscore';

export const reduceObj = (obj: object, props: string[]) => {
  let result = {};
  props.forEach((prop) => { result[prop] = obj[prop]; });
  return result;
};

export const filter = <T>(obj: object, callback: ((value: T, key?: string) => boolean)): string[] => {
  const props = [];
  for (const prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      if (callback(obj[prop], prop)) {
        props.push(prop);
      }
    }
  }
  return props;
};

export const map = <T, R>(obj: object, callback: ((property: T, key?: string) => R)): R[] => {
  const result: R[] = [];
  for (const prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      result.push(callback(obj[prop], prop));
    }
  }
  return result;
};

export const lenght = (obj: object): number => {
  let n: number = 0;
  for (const prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      n += 1;
    }
  }
  return n;
};

export const each = _each;

export const toArray = _toArray;

export const object = _object;

export const keys = _keys;