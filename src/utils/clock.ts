// Unique clock
let clock: any;

export const startClock = (f: () => void) => {
  clock = setInterval(f, 1000);
};

export const stopClock = () => {
  clearInterval(clock);
};