import yaml from 'js-yaml';
import ini from 'ini';

const filterInt = (value) => {
  if (/^(\-|\+)?([0-9]+|Infinity)$/.test(value)) return Number(value);
  return value;
};

const normalizeIniData = (data) => Object.entries(data).reduce((acc, [name, value]) => {
  if (typeof value === 'object') {
    const newObject = normalizeIniData(value);
    return { ...acc, [name]: newObject };
  }
  const newValue = filterInt(value);
  return { ...acc, [name]: newValue };
}, {});

const parser = (data, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(data);
    case 'yml':
    case 'yaml':
      return yaml.safeLoad(data);
    case 'ini':
      return normalizeIniData(ini.parse(data));
    default:
      throw new Error(`Unexpected format ${format}`);
  }
};

export default parser;
