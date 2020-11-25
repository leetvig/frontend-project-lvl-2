import yaml from 'js-yaml';
import ini from 'ini';
import _ from 'lodash';

const normalizeIni = (obj) => _.mapValues(obj, (value) => {
  if (_.isObject(value)) return normalizeIni(value);
  const parsedValue = parseFloat(value);
  return _.isNaN(parsedValue) ? value : parsedValue;
});

const parser = (data, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(data);
    case 'yml':
    case 'yaml':
      return yaml.safeLoad(data);
    case 'ini':
      return normalizeIni(ini.parse(data));
    default:
      throw new Error(`Unexpected extension ${format}`);
  }
};

export default parser;
