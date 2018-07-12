export interface Color {
  name: string;
  normal: string;
  light: string;
  dark: string;
}

export const RED: Color = {
  name: 'red',
  normal: '#ef5350',
  light: '#ff867c',
  dark: '#b61827',
};

export const BLUE: Color = {
  name: 'blue',
  normal: '#26c6da',
  light: '#6ff9ff',
  dark: '#0095a8',
};

export const YELLOW: Color = {
  name: 'yellow',
  normal: '#ffa726',
  light: '#ffd95b',
  dark: '#c77800',
};

export const GREEN: Color = {
  name: 'green',
  normal: '#66bb6a',
  light: '#98ee99',
  dark: '#338a3e',
};

export const BROWN: Color = {
  name: 'brown',
  normal: '#8d6e63',
  light: '#be9c91',
  dark: '#5f4339',
};

export const PURPLE: Color = {
  name: 'purple',
  normal: '#ab47bc',
  light: '#df78ef',
  dark: '#790e8b',
};

export const GREY: Color = {
  name: 'grey',
  normal: '#78909c',
  light: '#a7c0cd',
  dark: '#4b636e',
};

export const colors = [RED, BLUE, YELLOW, GREEN, BROWN, PURPLE];