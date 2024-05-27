#!/usr/bin/env node

import { HCSVtoJSON } from './index';
import * as fs from 'fs';
import * as path from 'path';

const args = process.argv.slice(2);

if (args.length < 1) {
  console.error('Please provide a CSV file path.');
  process.exit(1);
}

const csvFilePath = path.resolve(process.cwd(), args[0]);

fs.readFile(csvFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error(`Error reading file: ${err.message}`);
    process.exit(1);
  }
  const result = HCSVtoJSON(data);
  console.log(JSON.stringify(result, null, 2));
});

