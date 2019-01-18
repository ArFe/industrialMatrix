const express = require("express");
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require("path");
const exphbs = require('express-handlebars');

var port = process.env.PORT || 3000;

let SSrunning = false;
let SScmd = false;
let SSinfo = [];
let cmd = "";

app.use(express.static("./public/"));
//app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', '.hbs');

app.engine('.hbs', exphbs({ 
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/',
    helpers: { 
        navLink: function(url, options){
            str = url.substring(0, url.length - 1);
            let www = new RegExp('^' + str + '.*$');
            if(url == '/') {
                www = new RegExp('^' + url + '$');
            }
            //console.log("Route " + app.locals.activeRoute);
            //console.log("URL " + www);
            //console.log("Test = " + www.test(app.locals.activeRoute))
            return '<li' +
            ((www.test(app.locals.activeRoute)) ? ' class="active" ' : '') +
            '><a href="' + url + '">' + options.fn(this) + '</a></li>';
           },
        equal: function (lvalue, rvalue, options) {
            if (arguments.length < 3)
                throw new Error("Handlebars Helper equal needs 2 parameters");
            if (lvalue != rvalue) {
                return options.inverse(this);
            } else {
               return options.fn(this);
            }
        }
    }
 }));

app.use(express.static("./public/"));

app.get('/', function(req, res){
  res.render("index");
  //res.sendFile(__dirname + '/index.html');
});

app.get('/status', function(req, res){
  res.sendFile(__dirname + '/status.html'); 
});

app.get('/sitesurvey/:value', function(req, res){
  res.render("sitesurvey", {id: req.params.value});
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
    console.log(msg);
    if('dxmId' in msg){
      SSinfo.push(msg);
      console.log("yes, I have dxmId property");
    }
  });
});

// setup a GET 'route' to listen on /banner
app.get("/push", function(req,res){
  console.log(req.query);
  let filter = JSON.stringify(req.query);
  //let filter = {"departmentName": req.params.value };
  if(SSinfo.length > 0){
    for(let i = 0; i < SSinfo.length; i++){
      if(SSinfo[i].dxmId == req.query.id){
        cmd = "&reg5=" + SSinfo[i].siteSurvey + "&reg6=" + SSinfo[i].nodeNum
        SSinfo.splice(i,1);
      }
    }
  }
  let response = "<html><head><title>HTTP Push Ack</title></head><body>id=" + req.query.id + cmd + "</body></html>";
  cmd = "";
  res.send(response);
  io.emit('chat message', filter);

});

// setup a POST 'route' to listen on /banner
app.post("/push", function(req,res){
  console.log(req.body);
  io.emit('chat message', req.body);
  res.send("<html><head><title>HTTP Push Ack</title></head><body>id=Ariel</body></html>");
});


http.listen(port, function(){
  console.log('listening on *:' + port);
});
