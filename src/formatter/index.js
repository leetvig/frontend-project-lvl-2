import stylish from './stylish.js';
import plain from './plain.js';

const getFormatter = (format) => {
  switch (format) {
    case 'stylish':
      return stylish;
    case 'plain':
      return plain;
    case 'json':
      return JSON.stringify;
    default:
      throw new Error(`Unexpected format ${format}`);
  }
};

export default (tree, format) => {
  const formatter = getFormatter(format);
  return formatter(tree);
};
