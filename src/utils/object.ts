export const reduceObj = (obj: object, props: string[]) => {
  let result = {};
  props.forEach((prop) => { result[prop] = obj[prop]; });
  return result;
};

export const filter = <T>(obj: object, callback: ((property: T) => boolean)): string[] => {
  const props = [];
  for (const prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      if (callback(obj[prop])) {
        props.push(prop);
      }
    }
  }
  return props;
};

export const map = <T, R>(obj: object, callback: ((property: T) => R)): R[] => {
  const result: R[] = [];
  for (const prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      result.push(callback(obj[prop]));
    }
  }
  return result;
}