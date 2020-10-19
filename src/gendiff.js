import _ from 'lodash';
import getDataFromFile from './parser.js';
import formatter from './formatter/index.js';

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

const checkDifferences = (data1, data2) => {
  const keys1 = _.keys(data1);
  const keys2 = _.keys(data2);
  const keys = _.union(keys1, keys2).sort();

  const tree = keys.map((key) => {
    const value1 = _.cloneDeep(data1[key]);
    const value2 = _.cloneDeep(data2[key]);
    if (!keys1.includes(key)) {
      return makeLeafNode(key, value2, 'added');
    } if (!keys2.includes(key)) {
      return makeLeafNode(key, value1, 'deleted');
    } if (value1 === value2) {
      return makeLeafNode(key, value1, 'unchanged');
    } if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return makeInternalNode(key, checkDifferences(value1, value2), 'internal');
    }
    return makeLeafNode(key, [value1, value2], 'changed');
  });
  return tree;
};

export default (filepath1, filepath2, format = 'stylish') => {
  const data1 = getDataFromFile(filepath1);
  const data2 = getDataFromFile(filepath2);

  return formatter(checkDifferences(data1, data2), format);
};
