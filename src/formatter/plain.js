import _ from 'lodash';

const kyesJoin = (ancestry, name) => {
  if (ancestry === '') return `${name}`;
  return `${ancestry}.${name}`;
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
  const iter = (children, ancestry) => {
    const lines = children.flatMap((child) => {
      const { name, type } = child;
      const newAncestry = kyesJoin(ancestry, name);

      if (type === 'nested') return iter(child.children, newAncestry);

      return plainDiff(newAncestry, child.value, type);
    });

    return lines.join('\n');
  };

  return iter(tree, '');
};
