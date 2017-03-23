function makeImg(a, b, c, parent) {
    element = "undefined" == typeof c ? createElement("img", a, "") : createElement("img", a, c);
    var image = document.createAttribute("src");
    element.setAttributeNode(image), image.value = b, createElementP2(element, parent);
}

function createElementP2(element, parent) {
    "undefined" == typeof parent ? document.body.appendChild(element) : document.getElementById(parent).appendChild(element);
}

function createElement(type, id_value, style_value) {
    var element = document.createElement(type), id = document.createAttribute("id"), style = document.createAttribute("style");
    return style.value = style_value, id.value = id_value, element.setAttributeNode(id), 
    element.setAttributeNode(style), element;
}

function makeDiv(a, b, parent) {
    element = createElement("div", a, b), createElementP2(element, parent);
}

function waitScreen(input) {
    var a = document.getElementById("pageContents");
    a.innerHTML = "", 1 == input ? makeImg("mychoice", "rock", "position: absolute; left: 45%; height: 20%;", "pageContents") : 2 == input ? makeImg("mychoice", "paper", "position: absolute; left: 45%; height: 20%;", "pageContents") : 3 == input && makeImg("mychoice", "scissors", "position: absolute; left: 45%; height: 20%;", "pageContents"), 
    makeImg("waiting", "waiting", "position: absolute;top: 50%;left: 45%; width: 10%;");
}

makeImg("left", "left", "position: absolute; left: 0; top: 0; height: 100%"), makeImg("right", "right", "position:absolute; right: 0; top: 0; height: 100%"), 
makeDiv("pageContents"), makeImg("rock", "rock", "position: absolute; left: 35%; height: 20%;", "pageContents"), 
makeImg("paper", "paper", "position: absolute; left: 45%; height: 20%;", "pageContents"), 
makeImg("scissors", "scissors", "position: absolute; left: 55%; height: 20%;", "pageContents"), 
makeDiv("outputDiv"), document.getElementById("outputDiv").setAttribute("style", "position: absolute;top: 30%; width: 100%;");

var socket = io();

$("#rock").click(function() {
    return socket.emit("result", "rock"), waitScreen(1), !1;
}), $("#paper").click(function() {
    return socket.emit("result", "paper"), waitScreen(2), !1;
}), $("#scissors").click(function() {
    return socket.emit("result", "scissors"), waitScreen(3), !1;
}), socket.on("output", function(message) {
    function dynamicEvent() {
        location.reload();
    }
    $("#waiting").remove(), $("#outputDiv").html(""), "win" == message ? makeImg("result", "win", "display: block;margin: auto; width: 20%;", "outputDiv") : "lose" == message ? makeImg("result", "lose", "display: block;margin: auto; width: 20%;", "outputDiv") : makeImg("result", "draw", "display: block;margin: auto; width: 20%;", "outputDiv"), 
    makeDiv("okdiv"), makeImg("ok", "ok", "position: absolute; top: 80%; left: 45%; width: 10%; border-style: solid;", "okdiv");
    var img = document.getElementById("ok");
    img.onclick = dynamicEvent;
});