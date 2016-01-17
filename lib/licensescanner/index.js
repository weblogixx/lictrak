'use strict';
const fs = require('fs');
const licenseReader = require('../licensereader');
const settings = require('../settings');

/**
 * Get package information from package.json
 * @param  {String} path Base path to package.json
 * @return {Array} The package licenses as array
 */
function getLicenseByPackage(path) {

  try {
    fs.statSync(path);
    const packageInfo = require(path);

    // Return the info from the license field first
    // There are two possible ways: License as string field or object
    if(packageInfo.license) {
      if(typeof packageInfo.license === 'string') {
        return packageInfo.license;
      } else {
        return packageInfo.license.type || settings.LICENSE_STATUS_VERIFY;
      }
    }

    // If the licenses field is availble, use it and return the objects type field
    if(packageInfo.licenses) {

      if(packageInfo.licenses.length === 1) {
        return packageInfo.licenses[0].type || settings.LICENSE_STATUS_VERIFY;
      }

      return packageInfo.licenses.map((license) => {
        return license.type || settings.LICENSE_STATUS_VERIFY;
      });
    }

    // There was no license information at all...
    return settings.LICENSE_STATUS_NOT_FOUND;
  } catch (e) {
    return settings.LICENSE_STATUS_NOT_FOUND;
  }
}

/**
 * Check each available license file name for
 * @param  {String} path The root path to check for
 * @return {String} The license that was detected
 */
function getLicenseByFile(path) {

  let license = settings.LICENSE_STATUS_NOT_FOUND;

  // Try to get the first available license from the configured list.
  // If one can be found, return its contents.
  for(let fileName of settings.LICENSEFILENAMES) {

    const fullFileName = `${path}/${fileName}`;

    // Read the file contents. If this fails,
    // continue to the next possible file
    try {
      let content = fs.readFileSync(fullFileName, 'utf8');
      let availableLicenses = licenseReader.getLicenses();

      license = availableLicenses.filter((license) => {

        // Skip invalid entries
        if(!license.regex) {
          return false;
        }

        return new RegExp(license.regex).test(content);
      }).map((license) => {
        return license.identifier || content.match(license.regex)[1];
      }).shift();

      break;
    } catch(e) {
    }
  }

  return license;
}

/**
 * Get a list of all package licenses
 * @param  {String} path Directory to search modules in
 * @return {Object} info Package information
 */
function getLicenses(path) {

  // Skip if the directory is not valid
  if(arguments.length !== 1) {
    throw 'no directory given';
  }

  // Skip if the directory cannot be found
  try {
    fs.statSync(path);
  } catch (e) {
    throw `directory not accessible: ${e}.message`;
  }

  let packages = fs.readdirSync(path).map((folder) => {

    const absolutePath = `${path}/${folder}`;

    // Get informations from package.json
    let packageLicense = getLicenseByPackage(`${absolutePath}/package.json`);
    let fileLicense = getLicenseByFile(absolutePath);

    let outputItem = {
      title: folder,
      package: packageLicense,
      files: fileLicense
    };

    return outputItem;
  });

  return packages;
}

module.exports = {
  getLicenses,
  getLicenseByPackage,
  getLicenseByFile
};
