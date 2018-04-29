export const reduceObj = (obj: object, props: string[]) => {
  let result = {};
  props.forEach((prop) => { result[prop] = obj[prop]; });
  return result;
};

export const filter = (obj: object, callback: ((property: object) => boolean)) => {
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