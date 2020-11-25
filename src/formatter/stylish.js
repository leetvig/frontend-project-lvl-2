import _ from 'lodash';

const indent = (depth, spaceCount = 4) => ' '.repeat(depth * spaceCount - 2);

const stringify = (value, depth) => {
  if (!_.isObject(value)) {
    return `${value}`;
  }

  const lines = Object
    .entries(value)
    .map(([key, val]) => `${indent(depth + 1)}  ${key}: ${stringify(val, depth + 1)}`);

  return [
    '{',
    ...lines,
    `${indent(depth)}  }`,
  ].join('\n');
};

const stylish = (tree) => {
  const iter = (node, depth) => {
    const {
      name, type, newValue, oldValue, children,
    } = node;
    const lines = children && children.flatMap((child) => iter(child, depth + 1));
    switch (type) {
      case 'root':
        return `{\n${lines.join('\n')}\n}`;
      case 'added':
        return `${indent(depth)}+ ${name}: ${stringify(newValue, depth)}`;
      case 'deleted':
        return `${indent(depth)}- ${name}: ${stringify(oldValue, depth)}`;
      case 'changed':
        return `${indent(depth)}- ${name}: ${stringify(oldValue, depth)}\n${indent(depth)}+ ${name}: ${stringify(newValue, depth)}`;
      case 'unchanged':
        return `${indent(depth)}  ${name}: ${stringify(oldValue, depth)}`;
      case 'nested':
        return `${indent(depth)}  ${name}: {\n${lines.join('\n')}\n${indent(depth)}  }`;
      default:
        throw new Error(`Unexpected type ${type}`);
    }
  };
  return iter(tree, 0);
};

export default stylish;
