const socket = io();
let test = true; 
socket.on('chat message', function(msg){
    console.log(msg);
    console.log("Test = " + test)
    obj = JSON.parse(msg);
    let elem = document.querySelector("#led");
    if (elem != null) {
        if(obj["reg1"] == 1)
            elem.classList.add("red");
        else
            elem.classList.remove("red");
    }
    test = !test;

    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");

    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    
    ctx.beginPath();
    ctx.rect(10, window.innerHeight/8, window.innerWidth*(obj["reg1"]/100), window.innerHeight/9);
    ctx.fillStyle = "green";
    ctx.fill();

    ctx.beginPath();
    ctx.rect(10, 1*(window.innerHeight/8)+ window.innerHeight/8, window.innerWidth*(obj["reg2"]/100), window.innerHeight/9);
    ctx.fillStyle = "yellow";
    ctx.fill();

    ctx.beginPath();
    ctx.rect(10, 2*(window.innerHeight/8)+ window.innerHeight/8, window.innerWidth*(obj["reg3"]/100), window.innerHeight/9);
    ctx.fillStyle = "red";
    ctx.fill();
    
    ctx.beginPath();
    ctx.rect(10, 3*(window.innerHeight/8)+ window.innerHeight/8, window.innerWidth*(obj["reg4"]/100), window.innerHeight/9);
    ctx.fillStyle = "gray";
    ctx.fill();

    ctx.font = "4em Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "left";
    ctx.fillText("Node " + obj["reg6"], 15, window.innerHeight/12); 
    ctx.fillText("Excelent " + obj["reg1"] + "%", 15, 1*(window.innerHeight/8) + window.innerHeight/12); 
    ctx.fillText("Good " + obj["reg2"] + "%", 15, 2*(window.innerHeight/8) + window.innerHeight/12); 
    ctx.fillText("Marginal " + obj["reg3"] + "%", 15, 3*(window.innerHeight/8) + window.innerHeight/12); 
    ctx.fillText("Missed " + obj["reg4"] + "%", 15, 4*(window.innerHeight/8) + window.innerHeight/12); 


});