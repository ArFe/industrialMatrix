const express = require("express");
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require("path");
var port = process.env.PORT || 3000;
var net = require('net');

app.use(express.static("./public/"));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/status', function(req, res){
  res.sendFile(__dirname + '/status.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log(msg);
    var client = new net.Socket();
      client.connect(8844, '10.4.5.65', function() {
        console.log('Connected');
        client.write(msg);
      });

      client.on('data', function(data) {
        console.log('Received: ' + data);
        io.emit('chat message', data.toString());
        client.destroy(); // kill client after server's response
      });

      client.on('close', function() {
        console.log('Connection closed');
      });

  });
});

// setup a GET 'route' to listen on /banner
app.get("/banner", function(req,res){
  console.log(req.query);
  let filter = JSON.stringify(req.query);
  //let filter = {"departmentName": req.params.value };
  res.send("<html><head><title>HTTP Push Ack</title></head><body>id=" + req.query.id + "</body></html>");
  io.emit('chat message', filter);

});

// setup a POST 'route' to listen on /banner
app.post("/banner", function(req,res){
  console.log(req.body);
  io.emit('chat message', req.body);
  res.send("<html><head><title>HTTP Push Ack</title></head><body>id=244b9fb1-7085-4877-8352-994f7b632b4f</body></html>");
});


http.listen(port, function(){
  console.log('listening on *:' + port);
});
