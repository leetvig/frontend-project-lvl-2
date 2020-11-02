import fs from 'fs';
import path from 'path';
import parser from './parsers.js';

const getFullPath = (file) => path.resolve(process.cwd(), file);

const readData = (file) => fs.readFileSync(getFullPath(file), 'utf-8');

const getExtension = (file) => path.extname(file).slice(1);

const getDataFromFile = (file) => {
  const fileData = readData(file);
  const extension = getExtension(file);

  return parser(fileData, extension);
};

export default getDataFromFile;
