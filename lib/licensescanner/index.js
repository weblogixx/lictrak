'use strict';
const fs = require('fs');

/**
 * Get a list of all package licenses
 * @param  {String} dir Directory to search modules in
 * @return {Object} List of licenses
 */
function getLicenses(dir) {

  // Skip if the directory is not valid
  if(arguments.length !== 1) {
    throw 'no directory given';
  }

  return {};
}

module.exports = {
  getLicenses
};
