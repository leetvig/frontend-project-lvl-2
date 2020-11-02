import yaml from 'js-yaml';
import ini from 'ini';

const normalizeIniData = (data) => Object.entries(data).reduce((acc, [key, value]) => {
  if (typeof value === 'object') {
    acc[key] = normalizeIniData(value);
    return acc;
  }
  if (!Number.isNaN(parseFloat(value)) && Number.isFinite(parseFloat(value))) {
    acc[key] = Number(value) === parseFloat(value) ? Number(value) : value;
    return acc;
  }
  acc[key] = value;
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
