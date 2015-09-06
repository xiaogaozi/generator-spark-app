'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _s = require('underscore.string');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the awe-inspiring ' + chalk.red('spark-app') + ' generator!'
    ));

    var prompts = [{
      name: 'appName',
      message: 'What\'s the name of your Apache Spark application? (e.g. Word Count)',
      validate: function (appName) {
        if (appName.match(/[^a-zA-Z0-9 ]/) !== null) {
          return 'Only use letters, numbers and spaces in your application name';
        } else {
          return true;
        }
      }
    }, {
      name: 'orgName',
      message: 'Organization name (e.g. com.abc)'
    }, {
      name: 'scalaVersion',
      message: 'Scala version',
      default: '2.10.5'
    }, {
      name: 'sparkVersion',
      message: 'Spark version',
      default: '1.4.1'
    }];

    this.prompt(prompts, function (props) {
      this.appName = _s.capitalize(props.appName);
      this.jarName = _s.slugify(props.appName);
      this.className = _s.classify(props.appName);
      this.pkgName = props.orgName + '.' + _s(props.appName).toLowerCase().replaceAll(' ', '').value();
      this.orgName = props.orgName;
      this.scalaVersion = props.scalaVersion;
      this.sparkVersion = props.sparkVersion;
      done();
    }.bind(this));
  },

  writing: {
    projectfiles: function () {
      this.fs.copyTpl(
        this.templatePath('_README.md'),
        this.destinationPath('README.md'),
        this
      );
      this.fs.copyTpl(
        this.templatePath('_build.sbt'),
        this.destinationPath('build.sbt'),
        this,
        { interpolate: /<%=([\s\S]+?)%>/g }
      );
      this.fs.copyTpl(
        this.templatePath('_spark.json'),
        this.destinationPath('spark.json'),
        this
      );
      this.fs.copy(
        this.templatePath('project/plugins.sbt'),
        this.destinationPath('project/plugins.sbt')
      );
    },

    gitfiles: function () {
      this.fs.copy(
        this.templatePath('gitignore'),
        this.destinationPath('.gitignore')
      );
    },

    app: function () {
      this.fs.copy(
        this.templatePath('bin/run'),
        this.destinationPath('bin/run')
      );
      this.fs.copy(
        this.templatePath('bin/test'),
        this.destinationPath('bin/test')
      );
      this.fs.copy(
        this.templatePath('samples/gitkeep'),
        this.destinationPath('samples/.gitkeep')
      );
      this.fs.copyTpl(
        this.templatePath('src/main/scala/_.scala'),
        this.destinationPath('src/main/scala/' + this.className + 'App.scala'),
        this
      );
      this.fs.copyTpl(
        this.templatePath('src/test/scala/_.scala'),
        this.destinationPath('src/test/scala/' + this.className + 'AppSuite.scala'),
        this
      );
    }
  },

  end: function () {
    this.log('Read useful information in README.md, then edit src/main/scala/' + this.className + 'App.scala to start your Spark journey!');
  }
});
