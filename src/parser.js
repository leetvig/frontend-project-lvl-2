import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const getFullPath = (file) => path.resolve(process.cwd(), file);

const readData = (file) => fs.readFileSync(getFullPath(file), 'utf-8');

const parser = (data, extension) => {
  let parse;
  if (extension === '' || extension === '.json') {
    parse = JSON.parse;
  } else if (extension === '.yaml') {
    parse = yaml.safeLoad;
  }
  return parse(data);
};

const getDataFromFile = (file) => {
  const extension = path.extname(file);
  const fileData = readData(file);

  return parser(fileData, extension);
};

export default getDataFromFile;
