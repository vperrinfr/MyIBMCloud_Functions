 /**
  *
  * main() will be invoked when you Run This Action
  *
  * @param user => Watson NLU user
  * @param password => Watson NLU Password
  * @param input => User Text input
  *
  * @return The output of this action, which must be a JSON object.
  *
  * 
  * 
  * 
*/
function main(params) {
    var request = require('request');
    var input = params.input || "Hello";
    var username = params.user;
    var password = params.password;
    var url = 'https://gateway.watsonplatform.net/natural-language-understanding/api/v1/analyze' || params.url;
    var model = params.model || null;
    
    var qs = 
    { version: '2017-02-27',
     text: input,
     features: {
      entities: {
        model: model
      }
    }  
    };

    
    var auth={
    user: username,
    pass: password
     } ;

    var options = { method: 'GET',
  url,qs,auth};
console.log("OPTIONS " + JSON.stringify(options,null,2));
    var promise = new Promise(function(resolve, reject) {
        request(options, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                var j = JSON.parse(body);
                resolve(j);
            } else {
                console.log('body:', body);
                reject({
                    error: error,
                    response: response,
                    body: body
                });
            }
        });
    });
  
    return promise;
    //return { 'version': process.version };
  }
