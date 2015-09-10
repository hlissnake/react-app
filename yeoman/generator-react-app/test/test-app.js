'use strict';

var path = require('path');
var fs = require('fs-extra');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

function restoreDirectoryBeforeEach(callback){
    helpers.testDirectory( path.join(__dirname, './tmpl'), function(){
      fs.copySync(path.join(__dirname, '../app'), path.join(__dirname, './tmpl/app'));
      fs.copySync(path.join(__dirname, '../.yo-rc.json'), path.join(__dirname, './tmpl/.yo-rc.json'));
      callback();
    });
}

describe('hilo:app', function () {

  var runContext;

  // beforeEach(function(done){

  //   helpers.testDirectory( path.join(__dirname, './tmpl'), function(){
  //     fs.copySync(path.join(__dirname, '../app'), path.join(__dirname, './tmpl/app'));
  //     fs.copySync(path.join(__dirname, '../.yo-rc.json'), path.join(__dirname, './tmpl/.yo-rc.json'));
  //     done();
  //   });

  // });

  afterEach(function(done){
    runContext && runContext.inDir(path.join(__dirname, './tmpl'), function(){
      done();
    }); //aync method
  });

  describe('create general template', function () {

    before(function (done) {
      restoreDirectoryBeforeEach(function(){

        runContext = helpers.run( path.join(__dirname, './tmpl/app') )
          .withOptions({ skipInstall: true })
          .withPrompts({ 
            "name" : "hilotestgame" 
          })
          .on('end', done);
          
      })
    });

    it('creates files', function () {
      assert.file([
        'bower.json',
        'gulpfile.js',
        'package.json',
        '.editorconfig',
        '.jshintrc'
      ]);

      assert.file([
        'index.html',
        'src/index.js',
        'src/mediator.js',
        'src/resource.js',
        'css/index.css'
      ]);

      assert.fileContent('package.json', /hilotestgame/);
    });

  });

  describe('generate umd module', function () {

    before(function (done) {
      restoreDirectoryBeforeEach(function(){
        runContext = helpers.run( path.join(__dirname, './tmpl/app') )
          .withOptions({ skipInstall: true })
          .withPrompts({ 
            "module" : "umd" 
          })
          .on('end', done);
      });
    });

    it('creates umd style', function () {
      assert.fileContent(
        "src/index.js",
        /\.\/resource/
      );
      assert.fileContent(
        "src/resource.js",
        /module.exports = resource;/
      );
    });

  });

  describe('generate kmd module', function () {

    before(function (done) {
      restoreDirectoryBeforeEach(function(){
        runContext = helpers.run( path.join(__dirname, './tmpl/app') )
          .withOptions({ skipInstall: true })
          .withPrompts({ 
            "module" : "kmd" 
          })
          .on('end', done);
      });
    });

    it('creates kmd style', function () {
      assert.fileContent(
        "index.html",
        /KISSY\.config/
      );
      assert.fileContent(
        "src/index.js",
        /KISSY/
      );
      assert.fileContent(
        "src/resource.js",
        /KISSY/
      );
    });

  });

  after(function(){
    // runContext.inDir(path.join(__dirname, './app'));
    // fs.rmdirSync(path.join(__dirname, './tmpl'));
  });

});
