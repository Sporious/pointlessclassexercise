function checkResults() {
    return storage.length > 1 ? ("rock" == storage[0][1] ? ("scissors" == storage[1][1] && (winner = storage[0][0], 
    loser = storage[1][0]), "paper" == storage[1][1] && (winner = storage[1][0], loser = storage[0][0]), 
    "rock" == storage[1][1] && (winner = null, loser = null)) : "scissors" == storage[0][1] ? ("paper" == storage[1][1] && (winner = storage[0][0], 
    loser = storage[1][0]), "rock" == storage[1][1] && (winner = storage[1][0], loser = storage[0][0]), 
    "scissors" == storage[1][1] && (winner = null, loser = null)) : "paper" == storage[0][1] && ("rock" == storage[1][1] && (winner = storage[0][0], 
    loser = storage[1][0]), "scissors" == storage[1][1] && (winner = storage[1][0], 
    loser = storage[0][0]), "paper" == storage[1][1] && (winner = null, loser = null)), 
    null == winner ? (io.to(storage[0][0]).emit("output", "Draw"), io.to(storage[1][0]).emit("output", "Draw")) : (io.to(winner).emit("output", "win"), 
    io.to(loser).emit("output", "lose")), !0) : void 0;
}

var app = require("express")(), http = require("http").Server(app), io = require("socket.io")(http), winner, loser, currentUsers = 0;

app.get("/", function(req, res) {
    2 > currentUsers ? res.sendFile(__dirname + "/index.html") : res.send("Game is currently full :(, try later");
}), app.get("/rock", function(req, res) {
    res.sendFile(__dirname + "/img/rock.gif");
}), app.get("/ok", function(req, res) {
    res.sendFile(__dirname + "/img/ok.jpg");
}), app.get("/waiting", function(req, res) {
    res.sendFile(__dirname + "/img/waiting.svg");
}), app.get("/left", function(req, res) {
    res.sendFile(__dirname + "/img/left.gif");
}), app.get("/win", function(req, res) {
    res.sendFile(__dirname + "/img/win.jpg");
}), app.get("/lose", function(req, res) {
    res.sendFile(__dirname + "/img/lose.png");
}), app.get("/right", function(req, res) {
    res.sendFile(__dirname + "/img/right.gif");
}), app.get("/paper", function(req, res) {
    res.sendFile(__dirname + "/img/paper.gif");
}), app.get("/scissors", function(req, res) {
    res.sendFile(__dirname + "/img/scissors.gif");
}), app.get("/Draw", function(req, res) {
    res.sendFile(__dirname + "/img/draw.png");
}), app.get("/css", function(req, res) {
    res.sendFile(__dirname + "/css/css.css");
}), app.get("/jquery", function(req, res) {
    res.sendFile(__dirname + "/jquery-1.11.1.js");
}), app.get("/client", function(req, res) {
    res.sendFile(__dirname + "/client.js");
}), storage = [], io.on("connection", function(socket) {
    var gotResultYet = !1;
    if (2 > currentUsers) {
        currentUsers = Object.keys(io.sockets.sockets).length;
        {
            io.engine.id;
        }
        socket.on("disconnect", function() {
            currentUsers--;
        }), socket.on("result", function(result) {
            gotResultYet || (gotResultYet = !0, storage.push([ socket.id, result ]), checkResults() && (winner = "", 
            loser = "", gotResultYet = !1, storage = []));
        });
    }
}), http.listen(3e3, function() {
    console.log("listening on *:3000");
});
