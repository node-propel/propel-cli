/**
 * Create your new static application
 */

exports = module.exports = load(require('propel'));

function load(Propel) {
  var myApp = new Propel();

  /**
   *  If you have any external asset dependencies, just append it to the current set asset paths
   *  Default: [];
   */

  myApp.addAssets([]);

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
   * Set a default version bump when not using interactive session
   * Default: 'patch';
   */

  myApp.defaultVersionBump = 'patch';

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
