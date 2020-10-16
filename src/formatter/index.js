import stylish from './stylish.js';
import plain from './plain.js';

export default (tree, format = 'stylish') => {
  let formatter;
  switch (format) {
    case 'plain':
      formatter = plain;
      break;
    case 'json':
      formatter = JSON.stringify;
      break;
    case 'stylish':
    default:
      formatter = stylish;
  }
  return formatter(tree);
};
