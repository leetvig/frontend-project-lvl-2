/* eslint no-restricted-syntax: ["off", "ForOfStatement"] */

import _ from 'lodash';
import getDataFromFile from './parser.js';

export default (filepath1, filepath2) => {
  const data1 = getDataFromFile(filepath1);
  const data2 = getDataFromFile(filepath2);

  const keys1 = _.keys(data1);
  const keys2 = _.keys(data2);
  const keys = _.union(keys1, keys2);

  const result = [];
  for (const key of keys) {
    if (!_.has(data1, key)) {
      result.push(`+ ${key}: ${data2[key]}`);
    } else if (!_.has(data2, key)) {
      result.push(`- ${key}: ${data1[key]}`);
    } else if (data1[key] !== data2[key]) {
      result.push(`- ${key}: ${data1[key]}`);
      result.push(`+ ${key}: ${data2[key]}`);
    } else {
      result.push(`  ${key}: ${data1[key]}`);
    }
  }
  return `{\n  ${result.join('\n  ')}\n}`;
};
