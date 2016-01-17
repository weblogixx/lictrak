'use strict';
const settings = {
  RETVAL_OK: 0,
  RETVAL_WARN: 1,
  RETVAL_ERR: 2,
  DEFAULT_MODULE_FOLDER: process.cwd() + '/node_modules',
  LICENSE_STATUS_NOT_FOUND: '?none',
  LICENSE_STATUS_VERIFY: '?verify',
  LICENSE_STATUS_MULTIPLE: '?multiple',
  LICENSEFILENAMES: [
    'LICENSE', 'LICENSE.md',
    'License', 'License.md',
    'license', 'license.md',
    'LICENSE.BSD'
  ]
};

module.exports = settings;
