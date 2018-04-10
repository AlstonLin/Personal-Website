const express = require('express'),
      bodyParser = require('body-parser'),
      app = express(),
      PORT = process.env.PORT || 3000,
      EMAIL_ADDRESS_FROM = "contact@alstonlin.io",
      EMAIL_ADDRESS_TO = "alstonlin812@gmail.com",
      path = require('path'),
      aws = require('aws-sdk'),
      request = require('request'),
      atos = require('arraybuffer-to-string'),
      axios = require('axios'),
      ses = new aws.SES({ region: "us-east-1" });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(function(req, res, next){
  let host = req.get('host');
  if (host.includes('siddharthvaknalli')){
    if (req.path.includes('google_analytics')){
      console.log(req.path);
      return res.send("console.log('');");
    }
    axios.get('http://miky.ca' + req.path, {
      responseType: 'arraybuffer',
    }).then((r) => {
      let data = r.data;
      if (r.headers['content-type'].includes('text/html')){
        data = atos(data);
        data = data.replace(/Michael/g, 'Siddharth');
        data = data.replace(/Yaworski/g, 'Vaknalli');
      }
      res.setHeader('content-type', r.headers['content-type']);
      res.end(data, 'binary');
    });
  } else {
    next();
  }
});
app.use(express.static(path.join(__dirname, '..', 'client', 'static')));

app.post('/sendEmail', function(req, res){
  // Verifies ReCaptcha
  new Promise(function(resolve, reject){
    let url = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET}&response=${req.body['g-recaptcha-response']}&remoteip=${req.connection.remoteAddress}`;
    request(url, function(error, response, body){ 
      body = JSON.parse(body);
      if (error) return reject(error);
      if (body.success === true) resolve();
      else reject("Please check the reCAPTCHA box");
    });
  }).then(function(){
    // Sends Email
    return new Promise(function(resolve, reject){
      ses.sendEmail({
        Source: `${req.body.name} <${EMAIL_ADDRESS_FROM}>`,
        Destination: {
          ToAddresses: [EMAIL_ADDRESS_TO]
        },
        Message: {
          Subject: {
            Charset: "UTF-8",
            Data: `alstonlin.io Contact`
          },
          Body: {
            Text: {
              Charset: "UTF-8",
              Data: req.body.message
            }
          },
        },
        ReplyToAddresses: [req.body.email],
      }, function(err, data){
        if (err) {
          console.error(err);
          return reject("An error has ocurred when sending the message");
        }
        resolve();
      });
    });
  }).then(function(){
    res.status(200).send("Your message has been sent");
  }).catch(function(err){
    res.status(200).send(err);
  });
});

app.listen(PORT, function(){
  console.log(`Serving website at port ${PORT}`);
});
