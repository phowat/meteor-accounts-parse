Package.describe({
  name: 'phowat:accounts-parse',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'Login service for Parse.com accounts.',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Npm.depends({
    "parse": "1.6.4"
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.0.2');
  api.use('ecmascript');
  api.addFiles('accounts-parse.js');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('phowat:accounts-parse');
  api.addFiles('accounts-parse-tests.js');
});
