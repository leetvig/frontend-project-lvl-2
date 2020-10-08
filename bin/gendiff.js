#!/usr/bin/env node
import program from 'commander';
import gendiff from '../index.js';
import print from '../src/print.js';

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    print(gendiff(filepath1, filepath2));
  })
  .parse(process.argv);
