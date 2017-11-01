var fs = require('fs');
var plist = require('simple-plist');
var SetiOSSimulatorLanguage = require('../index');

describe('SetiOSSimulatorLanguage', function () {
  describe('globalPreferencesPath', function () {
    it('should return the correct plist path', function () {
      var SUT = new SetiOSSimulatorLanguage();
      var returnedPath = SUT.globalPreferencesPath('52A770EA-C9A5-407C-A168-5052E2D189B9');
      expect(returnedPath).toEqual(process.env['HOME'] + '/Library/Developer/CoreSimulator/Devices/52A770EA-C9A5-407C-A168-5052E2D189B9/data/Library/Preferences/.GlobalPreferences.plist');
    });
  });
  
  var confirmPlistSettings = function (expectedLocale, expectedLanguage) {
    plist.readFile(__dirname + '/test.plist', function(err, data) {
      if (err) { throw err; }
      
      expect(data.AppleLanguages).toEqual(expectedLanguage);
      expect(data.AppleLocale).toEqual(expectedLocale);
    });
  }

  describe('read methods', function () {
    var SUT;
    var simulatorId = '52A770EA-C9A5-407C-A168-5052E2D189B9';

    beforeAll(function (done) {
      SUT = new SetiOSSimulatorLanguage();
      SUT.globalPreferencesPath = function () {
        return __dirname + '/test.plist';
      };

      fs.copyFile(__dirname + '/sample.plist', __dirname + '/test.plist', done);
    });
    
    afterAll(function (done) {
      fs.unlink(__dirname + '/test.plist', done);
    });

    it('should return the list of languages in the preferences file', function () {
      SUT.currentLanguage();
    });

    it('should return the locale from the preferences file', function () {
      SUT.currentLocale();
    });
  });

  describe('setLocaleAndLanguage callback', function () {
    var SUT;
    var simulatorId = '52A770EA-C9A5-407C-A168-5052E2D189B9';

    beforeAll(function (done) {
      SUT = new SetiOSSimulatorLanguage();
      SUT.globalPreferencesPath = function () {
        return __dirname + '/test.plist';
      };

      fs.copyFile(__dirname + '/sample.plist', __dirname + '/test.plist', done);
    });

    afterAll(function (done) {
      fs.unlink(__dirname + '/test.plist', done);
    });

    it('should set the default locale and derived language', function () {
      SUT.setLocaleAndLanguage(simulatorId, function (err) {
        expect(err).toBeNull();
        confirmPlistSettings('en_US', ['en']);
      });
    });
    
    it('should set the correct locale and language', function () {
      SUT.setLocaleAndLanguage(simulatorId, 'de_CH', ['de'], function err() {
        expect(err).toBeNull();
        confirmPlistSettings('de_CH', ['de']);
      });
    });
    
    it('should set the correct locale and derived language', function () {
      SUT.setLocaleAndLanguage(simulatorId, 'de_DE', function (err) {
        console.log(err);
        expect(err).toBeNull();
        confirmPlistSettings('de_DE', ['de']);
      });
    });
  });
});
