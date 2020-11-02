import buildAST from './buildAST.js';
import getDataFromFile from './getDataFromFile.js';
import formatter from './formatter/index.js';

export default (filepath1, filepath2, format = 'stylish') => {
  const data1 = getDataFromFile(filepath1);
  const data2 = getDataFromFile(filepath2);

  return formatter(buildAST(data1, data2), format);
};
