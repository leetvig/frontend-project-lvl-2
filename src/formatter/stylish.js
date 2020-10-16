const indent = (indentSize) => '  '.repeat(indentSize);

const stringify = (value, spacesCount) => {
  const iter = (currentValue, depth) => {
    if (typeof currentValue !== 'object') {
      return currentValue.toString();
    }

    const deepIndentSize = depth + 1;
    const deepIndent = indent(deepIndentSize);
    const currentIndent = indent(depth);
    const lines = Object
      .entries(currentValue)
      .map(([key, val]) => `${deepIndent}  ${key}: ${iter(val, deepIndentSize + 1)}`);

    return [
      '{',
      ...lines,
      `${currentIndent}}`,
    ].join('\n');
  };

  return iter(value, spacesCount);
};

const stringifyLine = (node, depth) => {
  const currentIndent = indent(depth);

  const value = stringify(node.value, depth + 1);
  let diff = '';
  switch (node.type) {
    case 'added':
    case 'changed-add':
      diff = '+';
      break;
    case 'deleted':
    case 'changed-del':
      diff = '-';
      break;
    default:
      diff = ' ';
  }
  return `${currentIndent}${diff} ${node.name}: ${value}`;
};

const stylish = (tree) => {
  const iter = (node, depth) => {
    if (node.type !== 'object' && node.type !== 'root') {
      return stringifyLine(node, depth);
    }
    const deepIndentSize = node.type === 'root' ? depth + 1 : depth + 2;
    const bracketIndentSize = node.type === 'root' ? depth : depth + 1;

    const name = node.type === 'root' ? '' : `${indent(depth)}  ${node.name}: `;

    const { children } = node;
    const lines = children.map((child) => iter(child, deepIndentSize));

    return [
      `${name}{`,
      ...lines,
      `${indent(bracketIndentSize)}}`,
    ].join('\n');
  };

  return iter(tree, 0);
};

export default stylish;
