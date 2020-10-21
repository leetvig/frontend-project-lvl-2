import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

const getFullPath = (file) => path.resolve(process.cwd(), file);

const readData = (file) => fs.readFileSync(getFullPath(file), 'utf-8');

const normalizeIniData = (data) => Object.entries(data).reduce((acc, [key, value]) => {
  if (typeof value === 'object') {
    acc[key] = normalizeIniData(value);
    return acc;
  }
  if (!Number.isNaN(parseFloat(value)) && Number.isFinite(parseFloat(value))) {
    acc[key] = Number(value);
    return acc;
  }
  acc[key] = value;
  return acc;
}, {});

const parser = (data, extension) => {
  switch (extension) {
    case '.json':
      return JSON.parse(data);
    case '.yaml':
      return yaml.safeLoad(data);
    case '.ini':
      return normalizeIniData(ini.parse(data));
    default:
      throw new Error('Unexpected file');
  }
};

const getDataFromFile = (file) => {
  const fileData = readData(file);
  const extension = path.extname(file);

  return parser(fileData, extension);
};

export default getDataFromFile;
