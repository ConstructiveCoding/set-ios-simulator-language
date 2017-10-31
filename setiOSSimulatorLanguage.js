#!/usr/bin/env node

var path = require('path');

var pkg = require(path.join(__dirname, 'package.json'));

var program = require('commander');
var SetiOSSimulatorLanguage = require("./index");

function list(val) {
  return val.split(',');
}

process.stdin.resume();
process.on('SIGINT', function () {
  console.log('Got a SIGINT. exiting');
  process.exit(0);
});

program
  .version(pkg.version)
  .option('-s, --simulator <simulatorId>', 'Simulator UUID to set the language on')
  .option('-a --languages [language]', 'A comma separated list of languages to set', list)
  .option('-l --locale [locale]', 'Locale to set')
  .parse(process.argv);

if (program.simulator == undefined) {
  console.log('Missing required params --simulator');
  process.exit(1);
} else {
  var setLanguage = new SetiOSSimulatorLanguage();
  setLanguage.setLanguageAndLocale(
    program.simulator,
    program.locale,
    program.languages,
    function (err) {
      if (err) {
        console.log(err);
        process.exit(1);
      }
  
      process.exit(0);
  });
}
