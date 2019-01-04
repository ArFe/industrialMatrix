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
    ctx.rect(10, 60, window.innerWidth*(obj["reg1"]/100), 50);
    ctx.fillStyle = "green";
    ctx.fill();

    ctx.beginPath();
    ctx.rect(10, 120, window.innerWidth*(obj["reg2"]/100), 50);
    ctx.fillStyle = "yellow";
    ctx.fill();

    ctx.beginPath();
    ctx.rect(10, 180, window.innerWidth*(obj["reg3"]/100), 50);
    ctx.fillStyle = "red";
    ctx.fill();
    
    ctx.beginPath();
    ctx.rect(10, 240, window.innerWidth*(obj["reg4"]/100), 50);
    ctx.fillStyle = "gray";
    ctx.fill();

    ctx.font = "24px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "left";
    ctx.fillText("Node " + obj["reg6"], 15, 45); 
    ctx.fillText("Excelent " + obj["reg1"] + "%", 15, 95); 
    ctx.fillText("Good " + obj["reg2"] + "%", 15, 155); 
    ctx.fillText("Marginal " + obj["reg3"] + "%", 15, 215); 
    ctx.fillText("Missed " + obj["reg4"] + "%", 15, 275); 


});