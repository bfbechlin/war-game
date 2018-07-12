export const avatarName = (name: string): string => {
  if (name === '') {
    return '';
  }
  let strings = name.split(' ');
  let result = '';
  if (strings.length === 1) {
    result = (name[0] || '') + (name[name.length - 1] || '');
  } else {
    result = (strings[0][0] || '') + (strings[strings.length - 1][0] || '');
  }
  return result.toUpperCase();
};