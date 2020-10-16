import _ from 'lodash';

const kyesJoin = (ancestry, name) => {
  if (name === 'root') return '';
  if (ancestry === '') return `${name}`;
  return `${ancestry}.${name}`;
};

const formatValue = (value) => {
  if (typeof value === 'object') return '[complex value]';
  if (typeof value === 'string') return `'${value}'`;
  return value;
};

const plainDiff = (property, value, type) => {
  const newValue = formatValue(value);
  switch (type) {
    case 'added':
      return `Property '${property}' was added with value: ${newValue}\n`;
    case 'deleted':
      return `Property '${property}' was removed\n`;
    case 'changed-del':
      return `Property '${property}' was updated. From ${newValue} to `;
    case 'changed-add':
      return `${newValue}\n`;
    default:
  }
  return '';
};

export default (tree) => {
  const iter = (node, ancestry) => {
    const { name } = node;
    const newAncestry = kyesJoin(ancestry, name);
    if (node.type !== 'object' && node.type !== 'root') {
      if (node.type === 'unchanged') return [];
      if (_.has(node, 'value')) {
        return plainDiff(newAncestry, node.value, node.type);
      }
      return newAncestry;
    }
    const { children } = node;
    return children.flatMap((child) => iter(child, newAncestry)).join('');
  };

  return iter(tree, '').slice(0, -1);
};
