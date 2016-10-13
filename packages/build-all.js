'use strict';

const components = require('../components.json');
const execSync = require('child_process').execSync;
const existsSync = require('fs').existsSync;
const path = require('path');

let componentPaths = [];

delete components.index;
delete components.font;

Object.keys(components).forEach(key => {
  const filePath = path.join(__dirname, `${key}/cooking.conf.js`);

  if (existsSync(filePath)) {
    componentPaths.push(`packages/${key}/cooking.conf.js`);
  } else { console.log(filePath); }
});

const paths = componentPaths.join(',');
const cli = `cooking build -c ${paths} -p`;

execSync(cli, {
  stdio: 'inherit'
});
