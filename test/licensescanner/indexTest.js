'use strict';
const expect = require('chai').expect;
const licenseScanner = require('../../lib/licensescanner');

describe('when using the license scanner to get the license list', () => {

  describe('when using getLicenses to get all available licenses in a project', () => {

    it('should throw an error if the wanted directory cannot be found', () => {
      expect(licenseScanner.getLicenses).to.throw('no directory given');
    });

  });
});
