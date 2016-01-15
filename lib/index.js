'use strict';

const cmd = require('commander');
const colors = require('colors/safe');
const moduleConfig = require('../package.json');
const settings = require('./settings');
const licenseReader = require('./licensereader');
const licenseScanner = require('./licensescanner');

cmd
  .version(moduleConfig.version)
  .description('Displays a list of all licences of npm based dependencies');

// Add support for license listings
cmd
  .command('list-licenses')
  .description('List all available licenses')
  .action(() => {
    licenseReader.getLicenses((err, data) => {

      if(err) {
        console.log(colors.red(`Error! Could not get licences. Error received was: ${err}`));
        process.exit(settings.RETVAL_ERR);
      }
      console.log(data);
      process.exit(settings.RETVAL_OK);
    });
  });

// Add command for scan
cmd
  .command('scan')
  .option('-o, --output <formatters>', 'Define one or more formatters for output')
  .option('-d, --dir <directory>', 'Source folder to scan, defauls to the local node_modules', settings.DEFAULT_MODULE_FOLDER)
  .description('Scan the directory specified by -d for all project licences available in the project')
  .action(() => {
    try {
      //const licenses = licenseScanner.getLicenses(cmd.dir);
      const licenses = licenseScanner.getLicenses();
      console.log(licenses);
      process.exit(settings.RETVAL_OK);
    } catch(e) {
      console.log(colors.red(`Error! The following error occured when reading packages: ${e}`));
      process.exit(settings.RETVAL_ERR);
    }
  });

cmd.parse(process.argv);

// show help per default
if(!cmd.args.length) {
  cmd.help();
}
