var program = require('commander');
var shell = require('shelljs');
var version = require('./package').version;
var path = require('path');
var fs = require('fs');
var expressURL = "git@github.com:node-propel/propel-express.git";
var spaURL = "git@github.com:node-propel/propel-spa.git";
var current_path = path.resolve(process.cwd());

function express(name) {
  /**
   * download the app
   */
  console.log('Downloading propel-express application');
  var cmd = 'git clone --depth=1 --branch=master ' + expressURL + ' ' + name + '; rm -rf ' + name + '/.git';

  shell.exec(cmd);
}

function spa(name) {
  /**
   * download the app
   */
  console.log('Downloading propel-spa application');
  var cmd = 'git clone --depth=1 --branch=master ' + spaURL + ' ' + name + '; rm -rf ' + name + '/.git';

  shell.exec(cmd);
}

function modifyPKG(name) {
  /**
   * modify the package.json with name of the app
   */
  var pkg = require(path.join(current_path, name, 'package.json'));
  if (name === '.') {
    pkg.name = path.basename(path.resolve(process.cwd()));
  }
  else {
    pkg.name = name;
  }
  var data = JSON.stringify(pkg, null, 2) + '\n';
  fs.writeFileSync(path.join(current_path, name, 'package.json'), data, 'utf-8');
}

function noop() {}

program
  .version(version)
  .usage('[options]')
  .option('-e, --express [app_name]', 'Initialize a propel-express application with [app_name]')
  .option('-s, --spa [app_name]', 'Initialize a propel-spa application [app_name]');


exports.parse = function(args) {
  program.parse(args);
  var func = noop;
  var name;
  if (program.express) {
    func = express;
    name = program.express;
  }
  if (program.spa) {
    func = spa;
    name = program.spa;
  }
  if (name) {
    func(name);
    modifyPKG(name);
  }
};
