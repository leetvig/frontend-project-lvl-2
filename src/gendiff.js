/* eslint no-restricted-syntax: ["off", "ForOfStatement"] */

import _ from 'lodash';
import getDataFromFile from './parser.js';
import formatter from './formatter/stylish.js';

const makeInternal = (name, type) => ({
  name,
  type,
  children: [],
});

const makeLeaf = (name, value, type) => ({
  name,
  type,
  value,
});

const checkDifferences = (fileData1, fileData2) => {
  const iter = (data1, data2, parent) => {
    const keys1 = _.keys(data1);
    const keys2 = _.keys(data2);
    const keys = _.union(keys1, keys2).sort();

    for (const key of keys) {
      const value1 = _.cloneDeep(data1[key]);
      const value2 = _.cloneDeep(data2[key]);

      if (!_.has(data1, key)) {
        parent.children.push(makeLeaf(key, value2, 'added'));
      } else if (!_.has(data2, key)) {
        parent.children.push(makeLeaf(key, value1, 'deleted'));
      } else if (data1[key] === data2[key]) {
        parent.children.push(makeLeaf(key, value1, 'unchanged'));
      } else if (_.isObject(data1[key]) && _.isObject(data2[key])) {
        parent.children.push(iter(value1, value2, makeInternal(key, 'object')));
      } else {
        parent.children.push(makeLeaf(key, value1, 'changed-del'));
        parent.children.push(makeLeaf(key, value2, 'changed-add'));
      }
    }
    return parent;
  };

  return iter(fileData1, fileData2, makeInternal('root', 'root'));
};

export default (filepath1, filepath2, format = 'stylish') => {
  const data1 = getDataFromFile(filepath1);
  const data2 = getDataFromFile(filepath2);

  return formatter(checkDifferences(data1, data2), format);
};
