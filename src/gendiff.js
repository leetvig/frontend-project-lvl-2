/* eslint no-restricted-syntax: ["off", "ForOfStatement"] */

import _ from 'lodash';
import getDataFromFile from './parser.js';

const getNodes = (value) => {
  if (!_.isObject(value)) {
    return value;
  }
  const result = [];
  const keys = _.keys(value);
  for (const key of keys) {
    result.push([`   ${key}: `, getNodes(value[key])]);
  }
  return result;
};

const makeDifferences = (data1, data2) => {
  const keys1 = _.keys(data1);
  const keys2 = _.keys(data2);
  const keys = _.union(keys1, keys2).sort();
  const result = [];
  for (const key of keys) {
    if (!_.has(data1, key)) {
      result.push([`+ ${key}: `, getNodes(data2[key])]);
    } else if (!_.has(data2, key)) {
      result.push([`- ${key}: `, getNodes(data1[key])]);
    } else if (data1[key] === data2[key]) {
      result.push([`  ${key}: `, `${data1[key]}`]);
    } else if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      result.push([` ${key}: `, makeDifferences(data1[key], data2[key])]);
    } else {
      result.push([`- ${key}: `, getNodes(data1[key])]);
      result.push([`+ ${key}: `, getNodes(data2[key])]);
    }
  }
  return result;
};

const format = (arr, rep = 1) => {
  if (!_.isArray(arr)) return arr;
  let a = '{\n';
  for (const child of arr) {
    const [key, value] = child;
    a += `${'   '.repeat(rep)}${key}`;
    a += `${format(value, rep + 1)}`;
    a += '\n';
  }
  a += `${'    '.repeat(rep - 1)}}`;
  return a;
};

export default (filepath1, filepath2) => {
  const data1 = getDataFromFile(filepath1);
  const data2 = getDataFromFile(filepath2);

  return format(makeDifferences(data1, data2));
};
