const express = require('express'),
      bodyParser = require('body-parser'),
      app = express(),
      PORT = process.env.PORT || 3000,
      EMAIL_ADDRESS_FROM = "contact@alstonlin.io",
      EMAIL_ADDRESS_TO = "alstonlin812@gmail.com",
      path = require('path'),
      aws = require('aws-sdk'),
      ses = new aws.SES({ region: "us-east-1" });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '..', 'client', 'static')));

app.post('/sendEmail', function(req, res){
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
    if (err){
      console.error(err);
      return res.status(500).send("An error has occurred when sending the message");
    }
    res.status(200).send("Your message has been sent");
  });
});

app.listen(PORT, function(){
  console.log(`Serving website at port ${PORT}`);
});
