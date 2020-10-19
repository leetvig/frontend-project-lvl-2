import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

const getFullPath = (file) => path.resolve(process.cwd(), file);

const readData = (file) => fs.readFileSync(getFullPath(file), 'utf-8');

const parser = (data, extension) => {
  const parse = {
    '.json': JSON.parse,
    '.yaml': yaml.safeLoad,
    '.ini': ini.parse,
  };

  if (extension !== '.json' && extension !== '.yaml' && extension !== '.ini') {
    throw new Error('Unexpected file');
  }

  return parse[extension](data);
};

const getDataFromFile = (file) => {
  const fileData = readData(file);
  const extension = path.extname(file);

  return parser(fileData, extension);
};

export default getDataFromFile;
