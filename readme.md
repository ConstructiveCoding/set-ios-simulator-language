# Set Apple Simulator Language
Updates the Language and Locale of the specified iOS simulator.

The settings will be applied on the next boot of the simulator.

## Command Line Installation

```bash
npm install -g set-apple-simulator-language
```

Set the language of any iOS simulator

```bash
setiOSSimluatorLanguage --simulator <simulatorID> --locale de_DE --languages es,en
```

## Module Installation

```bash
npm install --save-dev set-apple-simulator-language
```

## Usage

```javascript
var SetAppleSimulatorLanguage = require('set-apple-simulator-language');

var languageUpdater = new SetAppleSimulatorLanguage();
var simulatorId = '52A770EA-C9A5-407C-A168-5052E2D189B9';
languageUpdater.setLocaleAndLanguage(simulatorId, 'de_DE', 'de', function (err) {
  if (err) console.log(err);

  console.log('Simulator is ready to be re-launched with new language settings'));
});
```

## API

**globalPreferencesPath(simulatorId)**

Returns the location of the global preferences for the specified simulator.

**setLocaleAndLanguage(simulatorId, locale, language, callback)**

**simulatorId** Required The UUID of the simulator to update.

**locale** Optional The locale to set in the simulator en_US

**language** Optional The language to set in the simulator, will be derived from the locale if not specified. en

**callback** Optional A function to be called when the simulator preferences have been updated.

## Examples

Set the language to _en_ and the locale to _en_US_

```javascript
...

var simulatorId = '52A770EA-C9A5-407C-A168-5052E2D189B9';
languageUpdater.setLocaleAndLanguage(simulatorId, function (err) {
  if (err) console.log(err);

  console.log('Simulator is ready to be re-launched with new language settings'));
});

...
```

Set the language to _de_ and the locale to _de_DE_

```javascript
...

var simulatorId = '52A770EA-C9A5-407C-A168-5052E2D189B9';
languageUpdater.setLocaleAndLanguage(simulatorId, 'de_DE', function (err) {
  if (err) console.log(err);

  console.log('Simulator is ready to be re-launched with new language settings'));
});

...
```

Set the language to _es_ and the locale to _es_SP_

```javascript
...

var simulatorId = '52A770EA-C9A5-407C-A168-5052E2D189B9';
languageUpdater.setLocaleAndLanguage(simulatorId, 'es_SP', 'es', function (err) {
  if (err) console.log(err);

  console.log('Simulator is ready to be re-launched with new language settings'));
});

...
```

Set the languages to _es_ and _en_ and the locale to _es_SP_

```javascript
...

var simulatorId = '52A770EA-C9A5-407C-A168-5052E2D189B9';
languageUpdater.setLocaleAndLanguage(simulatorId, 'es_SP', ['es', 'en'], function (err) {
  if (err) console.log(err);

  console.log('Simulator is ready to be re-launched with new language settings'));
});

...
```

