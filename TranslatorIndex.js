//jshint esversion:6

var express=require("express");
var app=express();
var bodyParser=require("body-parser");
var casting = require('casting');
var google_translate = require('@k3rn31p4nic/google-translate-api');
const translate = require('@k3rn31p4nic/google-translate-api');
var LanguageTranslatorV3 = require('watson-developer-cloud/language-translator/v3');
var DetectLanguage = require('detectlanguage');
       var detectLanguage = new DetectLanguage({
       key: '22b56b4ba6229729ffceee7c93c6206f ',
       ssl: true|false
	   });
     var val;

app.use('/static',express.static(__dirname+'/static'));
//app.use( express.static('static'));
//This is the get function
 app.get("/",function(req,res){
    res.sendFile(__dirname + "/TranslatorIndex.html");
  }) ;


/*function DetectLanguag(src){
    var res = "";
  	detectLanguage.languages(src,function(error, result){
             for(i=0;i<result.length;i++){
                  if (result[i].code==src){
		                 res = result[i].name;
                     break;
                    }
             }

    });
    return res;
}*/

app.use(bodyParser.urlencoded({ extended: true }));

//this is the post function for detect method
app.post('/users' ,function(req,res){

    console.log("Text is :  "+req.body.name1);

    detectLanguage.detect(req.body.name1, function(err,result){
      //var lang = DetectLanguag(src);
      console.log("performing language detection");
      var src ;
      try {
          src = result[0].language;
         console.log("language is :" + src);
      }
         catch(error)
         {
           console.log("error in detect language");
           console.error(error);
         }


         console.log("language name is  "+res);
       //console.log("src language is "+src);
         //console.log(test(src));
		//DetectLanguag(src, function showResponse(lang){
console.log("start translation");
console.log(src + " " + req.body.name1 );
try{
        translate1(req.body.name1,src, function showTransValue(val)
        {
          console.log("Translated text is  "+val);
   //res.writeHead(200,{'Content-type':'html/txt'});
         //res.jsonp({data:val});
//          var data = {
//              original: req.body.name1,
//               translated: val,
// };


         res.render('hello.ejs',{src:src ,data:req.body.name1,data2:val});

         // var Data = JSON.stringify({
         //     "translateText": val
         //   });
         //   res.send(Data);
          // res.write('<html>');
          // res.write('<body>');
          // res.write('<form>');
          // res.write('<h3 style="color:#00a8b5;">Original text :  " ' + req.body.name1+'"</h3>');
          // res.write('<br><h3 style="color:#00a8b5;">Language Identified :  '+src+'</h3>');
          // res.write('<br><h3 style="color:#00a8b5;">Translated text is: " ' + val+'"</h3>');
          // res.write('</form>');
          // res.write('</body>');
          // res.write('</html>');
          // res.end();
     });
}
catch(error)
    {
      console.error ("the error is "+ error);
    }
    });

});



function translate1(lang,src, callback){
               var languageTranslator = new LanguageTranslatorV3({
                version: '2018-05-01',
                iam_apikey: 'Boaiplq8pKoFYwb5T-cOtFkGrcKtqCPAEHKtYuu6iSmp',
                url: 'https://gateway-lon.watsonplatform.net/language-translator/api'
        });
                console.log("In the core translate method Define reqobj");
                var reqObj = {text:lang, source:src, target: 'en'} ;
                console.log("reqobj is "+ reqObj);

               languageTranslator.translate(reqObj,function(error, response) {
              if(response!=null){
                 console.log("in watson translator  "+response);
	               callback(response.translations[0].translation);
              }
            else
            {
                  translate(lang, { to: 'en' }).then(res =>{
                  console.log("Google translated text is  "+res.text);
                  callback(res.text);
                });
            }
          });
        }



app.listen(8080,function()
{
	console.log("Server is listening at http://localhost:8080 ");
});
