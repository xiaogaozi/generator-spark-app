'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('spark-app:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withOptions({ skipInstall: true })
      .withPrompts({ appName: 'Word Count' })
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      '.gitignore',
      'README.md',
      'bin/run',
      'bin/test',
      'build.sbt',
      'project/plugins.sbt',
      'samples/.gitkeep',
      'spark.json',
      'src/main/scala/WordCountApp.scala',
      'src/test/scala/WordCountAppSuite.scala'
    ]);
  });
});
