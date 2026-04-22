#!/usr/bin/env node
'use strict';

const { spawn } = require('child_process');
const path = require('path');

function main() {
  const mode = process.argv[2];
  if (mode !== 'dev' && mode !== 'build') {
    console.error('Usage: node scripts/vuepress.js <dev|build>');
    process.exit(2);
  }

  const nodeMajor = parseInt((process.versions.node || '0').split('.')[0], 10) || 0;

  // VuePress 1 uses Webpack 4, which can fail under OpenSSL 3+ (Node 17+).
  // Only enable the legacy provider where it exists.
  const env = { ...process.env };
  if (nodeMajor >= 17) {
    const flag = '--openssl-legacy-provider';
    env.NODE_OPTIONS = env.NODE_OPTIONS ? `${env.NODE_OPTIONS} ${flag}` : flag;
  }

  const bin = process.platform === 'win32' ? 'vuepress.cmd' : 'vuepress';
  const vuepressBin = path.resolve(__dirname, '..', 'node_modules', '.bin', bin);

  const child = spawn(vuepressBin, [mode, 'docs'], {
    stdio: 'inherit',
    env,
  });

  child.on('exit', (code, signal) => {
    if (typeof code === 'number') process.exit(code);
    process.exit(signal ? 1 : 0);
  });
}

main();

