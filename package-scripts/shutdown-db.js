let shell = require('shelljs');

shell.exec("mongo --eval 'db.getSiblingDB(\"admin\").shutdownServer()'");