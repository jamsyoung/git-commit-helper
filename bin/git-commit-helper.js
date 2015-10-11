#!/usr/bin/env node
'use strict';

const cli = require('../lib/cli');

let exitCode = 0;

exitCode = cli.execute();

process.on('exit', function () {
    process.exit(exitCode);
});
