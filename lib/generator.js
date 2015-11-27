var path = require('path');
var fs = require('fs');
var shell = require('shelljs');

function Generator(current_path, template, name) {
  var self = this;
  self.current_path = current_path;
  self.template = template;
  self.name = name;
  self.toWrite = self.name + self.template[0].toUpperCase() + self.template.slice(1);
  self.metaData = getRcFile(current_path).templates;
}

function getRcFile(current) {
  return JSON.parse(fs.readFileSync(path.join(current, '.propelrc')));
}

Generator.prototype.make = function make() {
  var self = this;
  var templateString = self.getTemplate();
  if (templateString) {
    self.write(self.convert(templateString.toString()));
    console.log('\nCreated %s\n', self.toWrite);
  }
  else {
    console.error("Couldn't find the template " + self.template);
  }
};

Generator.prototype.destroy = function destroy() {
  var self = this;
  shell.exec('rm -rf ' + path.join(self.current_path, self.metaData[self.template].destination, self.toWrite));
  console.log('\nDestroyed %s\n', self.toWrite);
};

Generator.prototype.convert = function convert(fileString) {
  var self = this;
  var re = new RegExp(self.metaData[self.template].replace, 'g');
  return fileString.replace(re,  self.toWrite);
};

Generator.prototype.write = function write(data) {
  var self = this;
  var dest = path.join(self.metaData[self.template].destination, self.toWrite);
  shell.exec('mkdir -p ' + dest);
  fs.writeFileSync(path.join(dest, 'index.js'), data);
};

Generator.prototype.getTemplate = function getTemplate() {
  var self = this;
  if (self.metaData[self.template]) {
    return fs.readFileSync(path.join(self.current_path, self.metaData.directory, self.template + '.js'));
  }
  else {
    return false;
  }
};

module.exports = Generator;
