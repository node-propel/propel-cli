/**
 * Create your new static application
 * @type {Function}
 */
exports = module.exports = load(require('propel'));

function load(Propel) {
  var myApp = new Propel();
  /**
   *  establish the root directory of your application (where 'index.html' resides)
   *  Default: 'views'
   */

  myApp.sourcePath = 'views';

  /**
   * The directories to find the assets
   * Default: 'assets/{scripts, styles, images}'
   */

  myApp.assetPaths = myApp.genPath('assets', ['scripts', 'styles', 'images']);

  /**
   *  Set the view engine and extension used (if not 'html' files)
   *  Default: 'html'
   */

  myApp.viewExt = 'html';
  myApp.viewEngine = undefined;

  /**
   * Set port number for development server
   * Default: 9000
   */

  myApp.serverPort = 9000;

  /**
   * Set array of files to use for version bumping (run `propel bump`)
   * Default: ['./package.json']
   */

  myApp.versionerFiles = myApp.genPath(['package.json']);

  /**
   * Set path/to/file.json that you want to use for final package building
   * Default: './package.json'
   */

  myApp.packageConfig = myApp.genPath('.', 'package.json');

  /**
   * Provide keys you would like to use for final packaged project name
   * Reads from the above 'packageConfig' file
   *  Default: ['name', 'version']
   */

  myApp.packageProperties = ['name', 'version'];

  return myApp;
}
