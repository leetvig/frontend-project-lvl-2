import fs from 'fs';
import path from 'path';
import parser from './parsers.js';

const getFullPath = (filePath) => path.resolve(process.cwd(), filePath);

const readData = (filePath) => fs.readFileSync(getFullPath(filePath), 'utf-8');

const getExtension = (filePath) => path.extname(filePath).slice(1);

const getDataFromFile = (filePath) => {
  const fileData = readData(filePath);
  const extension = getExtension(filePath);

  return parser(fileData, extension);
};

export default getDataFromFile;
