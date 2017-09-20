let shell = require('shelljs');
let shutdownDb = require('./shutdown-db');

let removeMySqlDataAndLogs = "rm -rf ./db";
let createMySqlDataDirectory = "mkdir -p -m 777 ./db; mkdir -m 777 ./db/data";
let runMongod = "mongod --config ./package-scripts/mongod.conf";

shell.exec(removeMySqlDataAndLogs);
shell.exec(createMySqlDataDirectory);
shell.exec(runMongod);