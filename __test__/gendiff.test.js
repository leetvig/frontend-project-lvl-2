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

beforeAll(() => {
  expectedStyle = readFile('exepted_stylish.txt');
  expectedPlain = readFile('exepted_plain.txt');
});

test.each`
  file1           | file2           | extension
  ${'file1.json'} | ${'file2.json'} | ${'json'}
  ${'file1.yaml'} | ${'file2.yaml'} | ${'yaml'}
  ${'file1.ini'}  | ${'file2.ini'}  | ${'ini'}
`('stylish $extension diff', ({ file1, file2 }) => {
  const filepath1 = getFixturePath(file1);
  const filepath2 = getFixturePath(file2);
  expect(gendiff(filepath1, filepath2)).toEqual(expectedStyle);
});

test.each`
  file1           | file2           | extension
  ${'file1.json'} | ${'file2.json'} | ${'json'}
  ${'file1.yaml'} | ${'file2.yaml'} | ${'yaml'}
  ${'file1.ini'}  | ${'file2.ini'}  | ${'ini'}
`('plain $extension diff', ({ file1, file2 }) => {
  const filepath1 = getFixturePath(file1);
  const filepath2 = getFixturePath(file2);
  expect(gendiff(filepath1, filepath2, 'plain')).toEqual(expectedPlain);
});
