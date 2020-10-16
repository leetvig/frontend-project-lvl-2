import stylish from './stylish.js';

export default (tree, format = 'stylish') => {
  let formatter;
  switch (format) {
    case 'plan':
      break;
    case 'json':
      break;
    case 'stylish':
    default:
      formatter = stylish;
  }
  return formatter(tree);
};
