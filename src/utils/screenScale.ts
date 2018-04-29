export const scale = (n: number, base: number = 1920) => {
  const x = 
    window.innerWidth || 
    document.documentElement.clientWidth || 
    document.documentElement.getElementsByTagName('body')[0].clientWidth;
  
  return (n * x / base);
};

export const scaleObj = (item: object, base: number = 1920) => {
  for (const prop in item) {
    if (item.hasOwnProperty(prop)) {
      item[prop] = scale(item[prop], base);
    }
  }
  return item;
};
