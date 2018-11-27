const socket = io();
let test = true; 
socket.on('chat message', function(msg){
    console.log(msg);
    console.log("Test = " + test)
    obj = JSON.parse(msg);
    let elem = document.querySelector("#led");
    if(obj["reg1"] == 1)
        elem.classList.add("red");
    else
        elem.classList.remove("red");

    test = !test;

});