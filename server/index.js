const express = require('express'),
      app = express(),
      PORT = process.env.PORT || 3000,
      path = require('path');

app.use(express.static(path.join(__dirname, '..', 'client', 'static')));
app.listen(PORT, function(){
  console.log(`Serving website at port ${PORT}`);
});
