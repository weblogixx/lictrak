'use strict';
const fs = require('fs');
const parse = require('csv-parse');
const data = fs.readFileSync(__dirname + '/list.csv');
let cachedResult = null;

/**
 * Get the licences from csv
 * @param  {Function} callback [description]
 * @return {Object} data
 */
function getLicenses(callback) {
  if(!cachedResult) {
    parse(data, { delimeter: ',' }, (err, data) => {

      let cachedResult = data.map((item) => {
        return {
          name: item[0],
          identifier: item[1],
          shortIdentifier: item[2],
          osiApproved: item[3] === 'Y',
          regex: new RegExp(item[1] + '|' + item[0].replace(/ /g, "(.)") + "|" + item[2], 'i').toString()
        };
      });
      callback(err, cachedResult);
    });
  } else {
    callback(null, cachedResult);
  }
}

module.exports = {
  getLicenses: getLicenses
};
