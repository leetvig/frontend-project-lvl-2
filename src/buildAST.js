import _ from 'lodash';

const makeInternalNode = (name, type, children = []) => ({
  name,
  type,
  children,
});

const makeLeafNode = (name, type, oldValue, newValue) => ({
  name,
  type,
  oldValue,
  newValue,
});

const buildAST = (data1, data2) => {
  const keys1 = _.keys(data1);
  const keys2 = _.keys(data2);
  const keys = _.sortBy(_.union(keys1, keys2));

  const tree = keys.map((key) => {
    const oldValue = data1[key];
    const newValue = data2[key];
    if (!keys1.includes(key)) {
      return makeLeafNode(key, 'added', undefined, newValue);
    }
    if (!keys2.includes(key)) {
      return makeLeafNode(key, 'deleted', oldValue, undefined);
    }
    if (oldValue === newValue) {
      return makeLeafNode(key, 'unchanged', oldValue, undefined);
    }
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return makeInternalNode(key, 'nested', buildAST(oldValue, newValue));
    }
    return makeLeafNode(key, 'changed', oldValue, newValue);
  });
  return tree;
};

export default buildAST;
