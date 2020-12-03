import { test, expect } from '@jest/globals';
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const expectedStylish = readFile('exepted_stylish.txt');
const expectedPlain = readFile('exepted_plain.txt');
const expectedJson = readFile('exepted_json.txt');

const formats = ['json', 'yaml', 'ini'];

test.each(formats)('%s diff', (format) => {
  const filepath1 = getFixturePath(`file1.${format}`);
  const filepath2 = getFixturePath(`file2.${format}`);
  expect(gendiff(filepath1, filepath2)).toEqual(expectedStylish);
  expect(gendiff(filepath1, filepath2, 'plain')).toEqual(expectedPlain);
  expect(gendiff(filepath1, filepath2, 'json')).toEqual(expectedJson);
});
