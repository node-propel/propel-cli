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
  shell.exec('echo "{ type: \'express\' }" > ' + path.join(current_path, name, '.propelrc'));
}

function spa(name) {
  /**
   * download the app
   */
  console.log('Downloading propel-spa application');
  var cmd = 'git clone --depth=1 --branch=master ' + spaURL + ' ' + name + '; rm -rf ' + name + '/.git';

  shell.exec(cmd);
  shell.exec('echo "{ type: \'spa\' }" > ' + path.join(current_path, name, '.propelrc'));
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

program
  .version(version);

program
  .usage('express [name]')
  .command('express [name]')
  .description('Initialize a propel-express application')
  .action(function(name) {
    if (name) {
      express(name);
      modifyPKG(name);
    }
  });

program
  .usage('spa [name]')
  .command('spa [name]')
  .description('Initialize a propel-spa application')
  .action(function(name) {
    if (name) {
      spa(name);
      modifyPKG(name);
    }
  });

module.exports = program;
