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

const plainDiff = (property, value, type) => {
  switch (type) {
    case 'added':
      return `Property '${property}' was added with value: ${formatValue(value)}`;
    case 'deleted':
      return `Property '${property}' was removed`;
    case 'changed':
      return `Property '${property}' was updated. From ${formatValue(value[0])} to ${formatValue(value[1])}`;
    case 'unchanged':
    default:
  }
  return [];
};

export default (tree) => {
  const iter = (children, key) => {
    const lines = children.flatMap((child) => {
      const { name, type } = child;
      const newKey = keysJoin(key, name);

      if (type === 'nested') return iter(child.children, newKey);

      return plainDiff(newKey, child.value, type);
    });

    return lines.join('\n');
  };

  return iter(tree, '');
};
