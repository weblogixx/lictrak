'use strict';
const fs = require('fs');
let cachedResult = null;

/**
 * Get the licences from csv
 * @return {Object} data
 */
function getLicenses() {

  // Skip if we have already read the csv
  if(cachedResult) {
    return cachedResult;
  }

  const data = fs.readFileSync(__dirname + '/list.csv', 'utf8');
  cachedResult = data.split('\n').map((row) => {

    let cols = row.split(',');

    if(!cols[0] || cols[0].length === 0) {
      return {
        name: 'Invalid row',
        regex: false
      }
    }

    return {
      name: cols[0],
      identifier: cols[1],
      shortIdentifier: cols[2],
      osiApproved: cols[3] === 'Y',
      regex: new RegExp(cols[1] + '|' + cols[0].replace(/ /g, '(.)') + '|' + cols[2], 'i').toString()
    };
  });

  return cachedResult;
}

module.exports = {
  getLicenses: getLicenses
};
