import _ from 'lodash';

const keysJoin = (key, name) => {
  if (!name) return '';
  if (key === '') return `${name}`;
  return `${key}.${name}`;
};

const formatValue = (value) => {
  if (_.isObject(value)) return '[complex value]';
  if (_.isString(value)) return `'${value}'`;
  return value;
};

export default (tree) => {
  const iter = (node, key) => {
    const {
      name, type, children, oldValue, newValue,
    } = node;
    const newKey = keysJoin(key, name);
    const lines = children && children.flatMap((child) => iter(child, newKey));
    switch (type) {
      case 'root':
        return lines;
      case 'added':
        return `Property '${newKey}' was added with value: ${formatValue(newValue)}`;
      case 'deleted':
        return `Property '${newKey}' was removed`;
      case 'changed':
        return `Property '${newKey}' was updated. From ${formatValue(oldValue)} to ${formatValue(newValue)}`;
      case 'nested':
        return lines;
      case 'unchanged':
        return null;
      default:
        throw new Error(`Unexpected type ${type}`);
    }
  };

  return iter(tree, '').filter((el) => !_.isNull(el)).join('\n');
};
