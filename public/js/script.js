const socket = io();
let nodeNum;
let dxmId;

function stopSS(){
    let node = document.querySelector("#node");
    let id = document.querySelector(".id").id;
    var socket = io();
    socket.emit('chat message', {'dxmId': id, 'nodeNum': node.options[node.selectedIndex].value, 'siteSurvey': 0});
    return false;
}
function startSS(){
    let node = document.querySelector("#node");
    let id = document.querySelector(".id").id;
    var socket = io();
    socket.emit('chat message', {'dxmId': id, 'nodeNum': node.options[node.selectedIndex].value, 'siteSurvey': 1});
    return false;
}
socket.on('chat message', function(msg){
    console.log(msg);
    obj = JSON.parse(JSON.stringify(msg));
    let elem = document.querySelector("#led");
    if (elem != null) {
        if(obj["reg1"] == 1)
            elem.classList.add("red");
        else
            elem.classList.remove("red");
    }

    if(obj != null){
        dxmId = obj["id"];
        nodeNum = obj["reg6"];
        console.log("dxmID = " + dxmId)
        elem = document.querySelector("#"+dxmId);
        console.log("elem = " + elem)
        if (elem != null) {

            var c = document.getElementById("myCanvas");
            var ctx = c.getContext("2d");

            c.style.position = 'fixed';
            c.style.top= 0;
            c.style.left= 0;
            c.style.zIndex= -1;

            ctx.canvas.width  = window.innerWidth-10;
            ctx.canvas.height = window.innerHeight-10;

            
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
            ctx.fillText("Node " + nodeNum, 15, window.innerHeight/12); 
            ctx.fillText("Excelent " + obj["reg1"] + "%", 15, 1*(window.innerHeight/8) + window.innerHeight/12); 
            ctx.fillText("Good " + obj["reg2"] + "%", 15, 2*(window.innerHeight/8) + window.innerHeight/12); 
            ctx.fillText("Marginal " + obj["reg3"] + "%", 15, 3*(window.innerHeight/8) + window.innerHeight/12); 
            ctx.fillText("Missed " + obj["reg4"] + "%", 15, 4*(window.innerHeight/8) + window.innerHeight/12); 
        }
    }
});