exports = module.exports = load(require('commander'),
                                require('lodash'),
                                require('path'),
                                require('child_process'),
                                require('./lib/generator'));


function load(program, _, path, Generator) {
  function loadApp() {
    return require(path.join(process.cwd(), 'config', 'application.js'));
  }

  program
    .usage('cmd [options]');

  program
    .command('new [NAME]')
    .description('Create a propel application')
    .action(function(name) {
      if (!_.isEmpty(name)) {
        new Generator(name);
      }
    });

  program
    .command('start')
    .description('Start your propel application')
    .option("-p, --prod, Run application in production mode. Starts static file server serving out of `build` directory")
    .action(function(args) {
//      loadApp().run({ production: args.prod || false });
    });

  program
    .command('build')
    .description('Build your project')
    .action(function() {
//      loadApp().build();
    });

  program
    .command('clean')
    .description('Clean your .tmp and build directories')
    .action(function() {
//      loadApp().clean();
    });

  program
    .command('pkg')
    .description('Package the build up for distribution')
    .option("-c, --config-file <config-file>")
    .option("-p, --properties [properties...]")
    .on('--help', function() {
      console.log('HELP');
      console.log('----');
      console.log('    pkg -c <config-file>   Read from config file. Defaults to application.js configuration');
      console.log('    pkg -p [properties...] Indicate properties to read from in config file (used to create final tar ball). Defaults to application.js configuration');
      console.log('');
    })
    .action(function(args) {
//      loadApp().pkg({ configFile: args.configFile, fileProps: args.properties });
    });

  program
    .command('bump')
    .description('Bump or reset version numbers for specified')
    .option("-f, --files [version-files...]")
    .option("-t, --type <bump-type>")
    .option("-c, --custom <custom>")
    .on('--help', function() {
      console.log('HELP');
      console.log('----');
      console.log('    pkg -f [version-files...] Supply list of files (comma separated string with no spaces) to apply version bump. Defaults to application.json configuration');
      console.log('    pkg -t <bump-type>        Bump files to specified bump type. Options: major, minor, patch');
      console.log('    pkg -c <custom>           Use custom version number to apply to all given files');
      console.log('');
    })
    .action(function(args) {
//      loadApp().bump({ files: args.versionFiles, type: args.bumpType, custom: args.custom });
    });


  return program.parse(process.argv);
}
