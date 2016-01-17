'use strict';
const fs = require('fs');
const expect = require('chai').expect;
const sinon = require('sinon');
const licenseReader = require('../../lib/licensereader');

describe('when using the licensing functions', () => {

  describe('when using getLicenses to retrieve all available licenses', () => {

    let spy;
    beforeEach(() => {
      spy = sinon.spy(fs, 'readFileSync')
    });

    afterEach(() => {
      fs.readFileSync.restore();
    });

    const firstEntry = {
      name: '3dfx Glide License',
      identifier: 'Glide',
      shortIdentifier: 'Glide',
      osiApproved: false,
      regex: '/Glide|3dfx(.)Glide(.)License|Glide/i'
    };

    it('should get the license data from the csv file for the first time', () => {
      const result = licenseReader.getLicenses();
      expect(result[0]).to.deep.equal(firstEntry);
      expect(spy.callCount).to.equal(1);
    });

    it('should return the cached result when called a second time', () => {
      expect(spy.callCount).to.equal(0);
    });
  });
});
