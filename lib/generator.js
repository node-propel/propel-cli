exports = module.exports = load(require('fs-extra'),
                                require('path'),
                                require('propel-utilities'),
                                require('lodash'),
                                require('child_process'));

function load(fs, path, putils, _, child_process) {
  var JS = 'var app = \'This is my new app!\';\n' +
           'console.log(app);\n';
  var CSS = 'body { \n' +
              'font-size: 10pt;\n' +
              'font-family: Verdana, Geneva, Arial, Helvetica, sans-serif;\n' +
              'color: black;\n' +
              'line-height: 14pt;\n' +
              'padding-left: 5pt;\n' +
              'padding-right: 5pt;\n' +
              'padding-top: 5pt;\n' +
            '}\n\n' +

            'h1 {\n' +
              'font: 14pt Verdana, Geneva, Arial, Helvetica, sans-serif;\n' +
              'font-weight: bold;' +
              'line-height: 20pt;' +
            '}\n';
  var HTML = '<!doctype html>' +
                '\n' +
                '<html lang="en">' +
                '\n' +
                '<head>' +
                '\n' +
                '<meta charset="utf-8">' +
                '\n' +
                '<link rel=\'stylesheet\' href="assets/seed.css" >' +
                '\n' +
                '<script src="assets/seed.js"></script>' +
                '\n' +
                '</head>' +
                '\n' +
                '<body>' +
                '\n' +
                '<h1>Welcome to PropelJS!</h1>' +
                '\n' +
                '</body>' +
                '\n' +
                '</html>';
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
      var dirPath = self.genPath('.', dirName);
      fs.mkdirsSync(dirPath);
      process.chdir(dirPath);
    }

    fs.mkdirsSync(self.genPath('.', 'versions'));
    fs.mkdirsSync(self.genPath('.', 'config'));
    self.genPath('app', 'assets', ['scripts', 'styles', 'images']).forEach(function(assetPath) {
      fs.mkdirsSync(assetPath);
    });
    fs.mkdirsSync(self.genPath('app', 'views'));

    fs.writeFileSync(self.genPath('.', 'app', 'assets', 'styles', 'seed.css'), CSS);
    fs.writeFileSync(self.genPath('.', 'app', 'assets', 'scripts', 'seed.js'), JS);
    fs.writeFileSync(self.genPath('.', 'app', 'views', 'index.html'), HTML);

    var applicationjs = fs.readFileSync(require.resolve(self.genPath('..', 'templates', 'application.js'))).toString();

    fs.writeFileSync(self.genPath('.', 'config', 'application.js'), applicationjs.replace(/my/g, appName));
    fs.writeFileSync(self.genPath('.', '.gitignore'), 'node_modules\n.tmp\n');
    fs.writeFileSync(self.genPath('.', '.versions'), JSON.stringify({}, null, 2));
    fs.writeFileSync(self.genPath('.', 'package.json'), JSON.stringify({
      name: dirName,
      version: '0.0.0',
      private: true,
      dependencies: {
        propel: '~0.0.1'
      }
    }, null, 2));

    // either copy all of the files from the global install or run npm install instead.
    exec('npm link propel');
  }

  return Generator;
}
