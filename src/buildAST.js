import _ from 'lodash';

const makeInternalNode = (name, children = [], type) => ({
  name,
  type,
  children,
});

const makeLeafNode = (name, value, type) => ({
  name,
  type,
  value,
});

const buildAST = (data1, data2) => {
  const keys1 = _.keys(data1);
  const keys2 = _.keys(data2);
  const keys = _.sortBy(_.union(keys1, keys2));

  const tree = keys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];
    if (!keys1.includes(key)) {
      return makeLeafNode(key, value2, 'added');
    }
    if (!keys2.includes(key)) {
      return makeLeafNode(key, value1, 'deleted');
    }
    if (value1 === value2) {
      return makeLeafNode(key, value1, 'unchanged');
    }
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return makeInternalNode(key, buildAST(value1, value2), 'nested');
    }
    return makeLeafNode(key, [value1, value2], 'changed');
  });
  return tree;
};

export default buildAST;
