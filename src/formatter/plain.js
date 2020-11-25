import _ from 'lodash';

const keysJoin = (key, name) => {
  if (key === '') return `${name}`;
  return `${key}.${name}`;
};

const formatValue = (value) => {
  if (_.isObject(value)) return '[complex value]';
  if (_.isString(value)) return `'${value}'`;
  return value;
};

export default (tree) => {
  const iter = (nodes, key) => {
    const lines = nodes.flatMap((node) => {
      const {
        name, type, children, oldValue, newValue,
      } = node;
      const newKey = keysJoin(key, name);
      switch (type) {
        case 'added':
          return `Property '${newKey}' was added with value: ${formatValue(newValue)}`;
        case 'deleted':
          return `Property '${newKey}' was removed`;
        case 'changed':
          return `Property '${newKey}' was updated. From ${formatValue(oldValue)} to ${formatValue(newValue)}`;
        case 'nested':
          return iter(children, newKey);
        case 'unchanged':
          return null;
        default:
          throw new Error(`Unexpected type ${type}`);
      }
    });

    return lines.filter((el) => !_.isNull(el)).join('\n');
  };

  return iter(tree.children, '');
};
