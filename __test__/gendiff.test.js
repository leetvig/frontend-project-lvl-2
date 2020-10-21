/* eslint no-underscore-dangle: [2, { "allow": ["__filename", "__dirname"] }] */

import { test, expect, beforeAll } from '@jest/globals';
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import gendiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

let expectedStyle;
let expectedPlain;
let expectedJSON;

beforeAll(() => {
  expectedStyle = readFile('exepted_stylish.txt');
  expectedPlain = readFile('exepted_plain.txt');
  expectedJSON = readFile('exepted_json.txt');
});

const cases = ['json', 'yaml', 'ini'];

test.each(cases)('stylish format, %s diff', (extension) => {
  const filepath1 = getFixturePath(`file1.${extension}`);
  const filepath2 = getFixturePath(`file2.${extension}`);
  expect(gendiff(filepath1, filepath2)).toEqual(expectedStyle);
});

test.each(cases)('plain format, %s diff', (extension) => {
  const filepath1 = getFixturePath(`file1.${extension}`);
  const filepath2 = getFixturePath(`file2.${extension}`);
  expect(gendiff(filepath1, filepath2, 'plain')).toEqual(expectedPlain);
});

test.each(cases)('json format, %s diff', (extension) => {
  const filepath1 = getFixturePath(`file1.${extension}`);
  const filepath2 = getFixturePath(`file2.${extension}`);
  expect(gendiff(filepath1, filepath2, 'json')).toEqual(expectedJSON);
});
