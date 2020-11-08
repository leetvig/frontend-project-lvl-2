import _ from 'lodash';

const indent = (indentSize) => '  '.repeat(indentSize);

const getIndent = (depth, type = '') => {
  const step = type === 'bracket' ? 0 : 1;
  const indentSize = depth * 2 + step;

  return indent(indentSize);
};

const stringify = (value, depth) => {
  if (!_.isObject(value)) {
    return `${value}`;
  }
  const deepDepth = depth + 1;

  const lines = Object
    .entries(value)
    .map(([key, val]) => `${getIndent(depth)}  ${key}: ${stringify(val, deepDepth)}`);

  return [
    '{',
    ...lines,
    `${getIndent(depth, 'bracket')}}`,
  ].join('\n');
};

const stylish = (tree) => {
  const iter = (nodes, depth) => {
    const deepDepth = depth + 1;

    const lines = nodes.flatMap((node) => {
      const {
        name, type, value, children,
      } = node;
      switch (type) {
        case 'added':
          return `${getIndent(depth)}+ ${name}: ${stringify(value, deepDepth)}`;
        case 'deleted':
          return `${getIndent(depth)}- ${name}: ${stringify(value, deepDepth)}`;
        case 'changed':
          return `${getIndent(depth)}- ${name}: ${stringify(value[0], deepDepth)}\n${getIndent(depth)}+ ${name}: ${stringify(value[1], deepDepth)}`;
        case 'unchanged':
          return `${getIndent(depth)}  ${name}: ${stringify(value, deepDepth)}`;
        case 'nested':
          return `${getIndent(depth)}  ${name}: ${iter(children, deepDepth)}`;
        default:
          throw new Error(`Unexpected type ${type}`);
      }
    });
    return [
      '{',
      ...lines,
      `${getIndent(depth, 'bracket')}}`,
    ].join('\n');
  };

  return iter(tree, 0);
};

export default stylish;
