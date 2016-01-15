'use strict';
const expect = require('chai').expect;
const licenseReader = require('../../lib/licensereader');

describe('when using the licensing functions', () => {

  describe('when using getLicenses to retrieve all available licenses', () => {

    it('should get the license data from the csv file for the first time', (done) => {

      licenseReader.getLicenses((err, result) => {

        expect(err).to.be.null;
        expect(result[0]).to.deep.equal({
          name: '3dfx Glide License',
          identifier: 'Glide',
          shortIdentifier: 'Glide',
          osiApproved: false,
          regex: '/Glide|3dfx(.)Glide(.)License|Glide/i'
        });
        done();
      });
    });

  });
});
