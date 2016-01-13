'use strict';

const cmd = require('commander');
const colors = require('colors/safe');
const moduleConfig = require('../package.json');
const licenseReader = require('./licensereader');

// Define valid return values
const RETURN_VALUE_OK = 0;
const RETURN_VALUE_WARN = 1;
const RETURN_VALUE_ERR = 2;

cmd
  .version(moduleConfig.version)
  .description('Displays a list of all licences of npm based dependencies')
  .option('-d, --dir <directory>', 'Source folder to scan, defauls to node_modules');

cmd
  .command('list-licenses')
  .description('List all available licenses')
  .action(() => {
    licenseReader.getLicenses((err, data) => {

      if(err) {
        console.log(colors.red(`Error! Could not get licences. Error received was: ${err}`));
        process.exit(RETURN_VALUE_ERR);
      }
      console.log(data);
      process.exit(RETURN_VALUE_OK);
    });
  });

cmd.parse(process.argv);
