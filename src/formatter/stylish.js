const indent = (indentSize) => '  '.repeat(indentSize);

const stringify = (value, indentSize) => {
  if (typeof value !== 'object') {
    return value.toString();
  }

  const deepIndentSize = indentSize + 2;
  const currentIndent = indent(indentSize + 1);
  const bracketIndent = indent(indentSize);

  const lines = Object
    .entries(value)
    .map(([key, val]) => `${currentIndent}  ${key}: ${stringify(val, deepIndentSize)}`);

  return [
    '{',
    ...lines,
    `${bracketIndent}}`,
  ].join('\n');
};

const stringifyLine = (node, indentSize) => {
  const currentIndent = indent(indentSize);
  const deepIndentSize = indentSize + 1;
  const { name, type, value } = node;
  switch (type) {
    case 'added':
      return `${currentIndent}+ ${name}: ${stringify(value, deepIndentSize)}`;
    case 'deleted':
      return `${currentIndent}- ${name}: ${stringify(value, deepIndentSize)}`;
    case 'changed':
      return `${currentIndent}- ${name}: ${stringify(value[0], deepIndentSize)}\n${currentIndent}+ ${name}: ${stringify(value[1], deepIndentSize)}`;
    case 'unchanged':
    default:
      return `${currentIndent}  ${name}: ${stringify(value, deepIndentSize)}`;
  }
};

export default (tree) => {
  const iter = (children, indentSize) => {
    const deepIndentSize = indentSize + 2;
    const currentIndentSize = indentSize + 1;
    const currentIndent = indent(currentIndentSize);
    const bracketIndent = indent(indentSize);

    const lines = children.flatMap((child) => {
      if (child.type === 'internal') {
        return `${currentIndent}  ${child.name}: ${iter(child.children, deepIndentSize)}`;
      }
      return stringifyLine(child, currentIndentSize);
    });

    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(tree, 0);
};
