/* eslint no-restricted-syntax: ["off", "ForOfStatement"] */

import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const getFullPath = (file) => path.resolve(process.cwd(), file);
const readData = (file) => fs.readFileSync(getFullPath(file));

const getDataFromJSON = (file) => {
  const fileData = readData(file);
  return JSON.parse(fileData);
};

export default (filepath1, filepath2) => {
  const data1 = getDataFromJSON(filepath1);
  const data2 = getDataFromJSON(filepath2);

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
