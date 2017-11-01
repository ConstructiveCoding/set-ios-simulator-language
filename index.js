var fs = require('fs');
var plist = require('simple-plist');

/**
 * @class
 */
function SetiOSSimulatorLanguage () {};

/**
 * Sets the locale and language of the specified iOS Simulator
 * @param {string} simulatorId - The UUID of the Simulator to update
 * @param {string} locale - The locale to set on the Simulator, e.g. en_US
 * @param {string} language - The language to set on the Simulator, e.g. de
 * @param {SetiOSSimulatorLanguage~updateCallback} callback - The callback executed on completion
 */
SetiOSSimulatorLanguage.prototype.setLocaleAndLanguage = function setLocaleAndLanguage(simulatorId, locale, language, callback) {
  if (simulatorId == null || simulatorId == undefined) {
    simulatorId = '52A770EA-C9A5-407C-A168-5052E2D189B9';
  }

  if (typeof locale === 'function') {
    callback = locale;
    locale = undefined;
  } else if (typeof language == 'function') {
    callback = language;
    language = undefined;
  }

  if (locale == null || locale == undefined) {
    locale = 'en_US';
  }

  if (language == null || language == undefined) {
    language = locale.match(/([a-z]*)/)[0];
  }

  if (Object.prototype.toString.call(language) !== '[object Array]') {
    language = [language];
  }
  
  var preferencesPath = this.globalPreferencesPath(simulatorId);

  // Read data from a file (xml or binary) (asynchronous)
  plist.readFile(preferencesPath, function(err,data){
    if (err) { return callback(err); }
    
    data.AppleLanguages = language;
    data.AppleLocale = locale;
  
    plist.writeBinaryFile(preferencesPath, data, function(err){
      return callback(err);
    });
  });
}

/**
 * Returns the location of the global preferences plist for the specified simulator.
 */
SetiOSSimulatorLanguage.prototype.globalPreferencesPath = function globalPreferencesPath(simulatorId) {
  return process.env['HOME'] + '/Library/Developer/CoreSimulator/Devices/' + simulatorId + '/data/Library/Preferences/.GlobalPreferences.plist'
}

/**
 * Returns the current list of languages in the simulator preferences
 * @returns {Array} The languages set in the simulator preferences file
 */
SetiOSSimulatorLanguage.prototype.currentLanguage = function currentLanguage(simulatorId) {
  var preferencesPath = this.globalPreferencesPath(simulatorId);

  var data = plist.readFileSync(preferencesPath);
  return data.AppleLanguages;
}

/**
 * Returns the current locale in the simulator preferences
 * @returns {string} The locale set in the simulator preferences file
 */
SetiOSSimulatorLanguage.prototype.currentLocale = function currentLocale(simulatorId) {
  var preferencesPath = this.globalPreferencesPath(simulatorId);

  // Read data from a file (xml or binary) (asynchronous)
  var data = plist.readFileSync(preferencesPath);
  return data.AppleLocale;
}

module.exports = SetiOSSimulatorLanguage;

/**
 * Set language completion callback
 * @callback SetiOSSimulatorLanguage~updateCallback
 * @param {Error} error - Optional error
 */
