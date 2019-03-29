
/* import translate from 'translate';
const translate = require('translate'); // Old school

const text = await translate('Hello world', 'es');
console.log(text); */

/*
async function quickstart(
  projectId = 'YOUR_PROJECT_ID' // Your GCP Project Id
) {
  // Imports the Google Cloud client library
  const {Translate} = require('@google-cloud/translate');

  // Instantiates a client
  const translate = new Translate({projectId});

  // The text to translate
  const text = 'Hello, world!';

  // The target language
  const target = 'ru';

  // Translates some text into Russian
  const [translation] = await translate.translate(text, target);
  console.log(`Text: ${text}`);
  console.log(`Translation: ${translation}`);
}
 */


var LanguageTranslatorV3 = require('watson-developer-cloud/language-translator/v3');

var languageTranslator = new LanguageTranslatorV3({
  version: '2018-05-01',
  iam_apikey: 'Boaiplq8pKoFYwb5T-cOtFkGrcKtqCPAEHKtYuu6iSmp',
  url: 'https://gateway-lon.watsonplatform.net/language-translator/api'
});



/* var parameters = {
  text: 'good-bye',
  model_id: 'en-es'
};

languageTranslator.translate(
  parameters,
  function(error, response) {
    if (error)
      console.log(error)
    else
      console.log(JSON.stringify(response, null, 2));
  }
);
 */

languageTranslator.translate(
  {
    text: 'A sentence must have a verb',
    source: 'en',
    target: 'es'
  },
  function(err, translation) {
    if (err)  {
      console.log('error:', err);
    } else  {
      console.log(JSON.stringify(translation, null, 2));
  }
  }
);

/* var parameters = {
  text: 'Language translator translates text from one language to another'
}

languageTranslator.identify(
  parameters,
  function(error, response) {
    if (error)
      console.log(error)
    else
      console.log(JSON.stringify(response, null, 2));
  }
); */
