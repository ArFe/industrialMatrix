var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
    console.log(msg);
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
