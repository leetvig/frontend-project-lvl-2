import stylish from './stylish.js';
import plain from './plain.js';

export default (tree, format) => {
  const formatter = {
    stylish,
    plain,
    json: JSON.stringify,
  };
  if (format !== 'stylish' && format !== 'plain' && format !== 'json') {
    throw new Error(`Unexpected format ${format}`);
  }
  return formatter[format](tree);
};
