'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

var HiloGenerator = yeoman.generators.Base.extend({

  init: function () {

    // Detect the project root of current yo context
    // console.log( 'path : ' + this.destinationRoot() );

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  prompting: function () {

    var done = this.async();

    // have Yeoman greet the user
    this.log(this.yeoman);
    // replace it with a short and sweet description of your generator
    this.log(chalk.magenta('Welcome to the Game world created by Hilo Enginee. You\'re using the fantastic Hilo generator.'));
    this.log(chalk.magenta('Please check your preferene of your game project'));

    var prompts = [{
      name: 'name',
      message: 'What do you want to call your game?',
      default: 'game'
    },{
      name: 'repos',
      message: 'What is your project git reposity?'
    },{
      name: 'module',
      type: 'list',
      choices: ['umd', 'cmd', 'kmd'],
      store: true,
      message: 'Which kind of module defined do you want to use in your project?',
      default: 'umd'
    }];

    this.prompt(prompts, function (props) {
      this.name = props.name;
      this.repos = props.repos;
      this.module = props.module;

      done();
    }.bind(this));
  },

  app: function () {
    this.mkdir('./build');
    this.mkdir('./css');
    this.mkdir('./src');

    this.template('_package.json', './package.json');
    this.template('_bower.json', './bower.json');

    this.template('_index.html', './index.html');
    this.template('_index.css', './css/index.css');

    this.template('_index.js', './src/index.js');
    this.template('_resource.js', './src/resource.js');
    this.template('_mediator.js', './src/mediator.js');
  },

  projectfiles: function () {
    this.template('_gulpfile.js', './gulpfile.js');
    this.copy('editorconfig', './.editorconfig');
    this.copy('jshintrc', './.jshintrc');
  }
});

module.exports = HiloGenerator;
