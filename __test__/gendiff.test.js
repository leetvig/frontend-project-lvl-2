/*
  eslint no-underscore-dangle: [2, { "allow": ["__filename", "__dirname"] }],
  fp/no-let: 'off',
  fp/no-unused-expression: 'off',
  fp/no-mutation: 'off'
*/

import {
  test, expect, beforeAll, describe,
} from '@jest/globals';
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

let expected;

const formats = ['stylish', 'plain', 'json'];
const extensions = ['json', 'yaml', 'ini'];

describe.each(formats)('%s format', (format) => {
  beforeAll(() => {
    expected = readFile(`exepted_${format}.txt`);
  });

  test.each(extensions)('%s diff', (extension) => {
    const filepath1 = getFixturePath(`file1.${extension}`);
    const filepath2 = getFixturePath(`file2.${extension}`);
    expect(gendiff(filepath1, filepath2, format)).toEqual(expected);
  });
});
