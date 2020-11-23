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

const plainDiff = (property, type, oldValue, newValue) => {
  switch (type) {
    case 'added':
      return `Property '${property}' was added with value: ${formatValue(newValue)}`;
    case 'deleted':
      return `Property '${property}' was removed`;
    case 'changed':
      return `Property '${property}' was updated. From ${formatValue(oldValue)} to ${formatValue(newValue)}`;
    case 'unchanged':
      return [];
    default:
      throw new Error(`Unexpected type ${type}`);
  }
};

export default (tree) => {
  const iter = (nodes, key) => {
    const lines = nodes.flatMap((node) => {
      const {
        name, type, children, oldValue, newValue,
      } = node;
      const newKey = keysJoin(key, name);

      if (type === 'nested') return iter(children, newKey);

      return plainDiff(newKey, type, oldValue, newValue);
    });

    return lines.join('\n');
  };

  return iter(tree, '');
};
