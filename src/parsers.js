/* eslint-disable no-useless-escape, fp/no-mutation */

import yaml from 'js-yaml';
import ini from 'ini';

const filterInt = (value) => {
  if (/^(\-|\+)?([0-9]+|Infinity)$/.test(value)) return Number(value);
  return value;
};

const normalizeIniData = (data) => Object.entries(data).reduce((acc, [key, value]) => {
  if (typeof value === 'object') {
    acc[key] = normalizeIniData(value);
    return acc;
  }
  acc[key] = filterInt(value);
  return acc;
}, {});

const parser = (data, extension) => {
  switch (extension) {
    case 'json':
      return JSON.parse(data);
    case 'yml':
    case 'yaml':
      return yaml.safeLoad(data);
    case 'ini':
      return normalizeIniData(ini.parse(data));
    default:
      throw new Error(`Unexpected extension ${extension}`);
  }
};

export default parser;
