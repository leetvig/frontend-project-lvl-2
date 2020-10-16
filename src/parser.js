import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

const getFullPath = (file) => path.resolve(process.cwd(), file);

const readData = (file) => fs.readFileSync(getFullPath(file), 'utf-8');

const parser = (data, extension) => {
  let parse;
  if (extension === '.json') {
    parse = JSON.parse;
  } else if (extension === '.yaml') {
    parse = yaml.safeLoad;
  } else if (extension === '.ini') {
    parse = ini.parse;
  }
  return parse(data);
};

const getDataFromFile = (file) => {
  const fileData = readData(file);
  const extension = path.extname(file);

  return parser(fileData, extension);
};

export default getDataFromFile;
