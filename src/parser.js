import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

const getFullPath = (file) => path.resolve(process.cwd(), file);

const readData = (file) => fs.readFileSync(getFullPath(file), 'utf-8');

const parser = (data, format) => {
  let parse;
  if (format === '' || format === '.json') {
    parse = JSON.parse;
  } else if (format === '.yaml') {
    parse = yaml.safeLoad;
  } else if (format === '.ini') {
    parse = ini.parse;
  }
  return parse(data);
};

const getDataFromFile = (file) => {
  const fileData = readData(file);
  const format = path.extname(file);

  return parser(fileData, format);
};

export default getDataFromFile;
