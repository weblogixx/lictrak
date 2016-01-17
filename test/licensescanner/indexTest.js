'use strict';
const expect = require('chai').expect;
const path = require('path');
const settings = require('../../lib/settings');
const licenseScanner = require('../../lib/licensescanner');
const mockPath = path.join(process.cwd(), 'test/mocks');

describe('when using the license scanner to get the license list', () => {

  describe('when using getLicenses to get all available licenses in a project', () => {

    it('should throw an error if the path is not given', () => {
      expect(licenseScanner.getLicenses).to.throw('no directory given');
    });

    it('should throw an error if the wanted directory cannot be found', () => {
      let fn = () => { licenseScanner.getLicenses('unavailable'); };
      expect(fn).to.throw('directory not accessible');
    });
  });

  describe('when using getLicenseByPackage to get the contents of package.json', () => {

    it('should return the not found state if the file cannot be found', () => {
      expect(licenseScanner.getLicenseByPackage('unavailable')).to.equal(settings.LICENSE_STATUS_NOT_FOUND);
    });

    it('should return the license found in package.json', () => {
      const resultString = licenseScanner.getLicenseByPackage(`${mockPath}/package-json/license-string.json`);
      expect(resultString).to.equal('MIT');

      const resultObj = licenseScanner.getLicenseByPackage(`${mockPath}/package-json/license-obj.json`);
      expect(resultObj).to.equal('MIT');
    });

    it('should return the license found in package.json', () => {
      const result = licenseScanner.getLicenseByPackage(`${mockPath}/package-json/licenses.json`);
      expect(result).to.deep.equal(['MIT', 'GPL']);
    });
  });

  describe('when using getLicenseByFile to get the license from a list of files', () => {

    it('should return the not found state if no file can be found', () => {
      expect(licenseScanner.getLicenseByFile('unavailable')).to.equal(settings.LICENSE_STATUS_NOT_FOUND);
    });

    it('return the license found in the license in filesytem', () => {
      const result = licenseScanner.getLicenseByFile(`${mockPath}/licenses/LICENCE`);
      console.log(result);
    });
  });
});
