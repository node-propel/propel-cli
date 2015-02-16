exports = module.exports = load(require('fs-extra'),
                                require('path'),
                                require('propel-utilities'),
                                require('lodash'),
                                require('child_process'));

function load(fs, path, putils, _, child_process) {
  var exec = child_process.exec;
  putils.extend(Generator);

  function Generator(dirName) {
    var self = this;
    var changeDir = undefined;
    if (dirName === '.') {
      dirName = self.chain('.', [path.resolve, path.dirname, path.basename]);
      changeDir = false;
    }
    else {
      changeDir = true;
    }

    var appName = _.camelCase(dirName);

    if (changeDir) {
      fs.mkdirsSync('./' + dirName);
      process.chdir('./' + dirName);
    }

    fs.mkdirsSync('./versions');
    fs.mkdirsSync('./config/static');

    fs.copySync(path.join(process.env.NODE_PATH, 'propel', 'seed', 'assets'), './assets');
    fs.copySync(path.join(process.env.NODE_PATH, 'propel', 'seed', 'views'), './views');

    var applicationjs = fs.readFileSync(require.resolve('../templates/application.js')).toString();

    fs.writeFileSync('./config/application.js', applicationjs.replace(/my/g, appName));
    fs.writeFileSync('./.gitignore', 'node_modules\n.tmp\n');
    fs.writeFileSync('./.versions', JSON.stringify({}, null, 2));
    fs.writeFileSync('./package.json', JSON.stringify({
      name: dirName,
      version: '0.0.0',
      private: true,
      dependencies: {
        propel: '~0.0.0'
      }
    }, null, 2));

    // either copy all of the files from the global install or run npm install instead.
    exec('npm link propel');
  }

  return Generator;
}
