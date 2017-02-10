function checkResults() {
    return storage.length > 1 ? ("rock" == storage[0][1] ? ("scissors" == storage[1][1] && (winner = storage[0][0], loser = storage[1][0]), "paper" == storage[1][1] && (winner = storage[1][0], loser = storage[0][0]), "rock" == storage[1][1] && (winner = null, loser = null)) : "scissors" == storage[0][1] ? ("paper" == storage[1][1] && (winner = storage[0][0], loser = storage[1][0]), "rock" == storage[1][1] && (winner = storage[1][0], loser = storage[0][0]), "scissors" == storage[1][1] && (winner = null, loser = null)) : "paper" == storage[0][1] && ("rock" == storage[1][1] && (winner = storage[0][0], loser = storage[1][0]), "scissors" == storage[1][1] && (winner = storage[1][0], loser = storage[0][0]), "paper" == storage[1][1] && (winner = null, loser = null)), null == winner ? (io.to(storage[0][0]).emit("output", "Draw"), io.to(storage[1][0]).emit("output", "Draw")) : (io.to(winner).emit("output", "You Won"), io.to(loser).emit("output", "You Lose (noob)")), !0) : void 0
}
var app = require("express")(),
    http = require("http").Server(app),
    io = require("socket.io")(http),
    bodyParser = require("body-parser"),
    winner, loser, currentUsers = 0;
app.use(bodyParser.json()), app.use(bodyParser.urlencoded({
    extended: !0
})), app.post("/", function() {}), app.get("/", function(req, res) {
    2 > currentUsers ? res.sendFile(__dirname + "/index.html") : res.send("Game is currently full :(, try later")
}), storage = [], io.on("connection", function(socket) {
    var gotResultYet = !1;
    if (2 > currentUsers) {
        currentUsers = Object.keys(io.sockets.sockets).length; {
            io.engine.id
        }
        socket.on("disconnect", function() {
            currentUsers--
        }), socket.on("result", function(result) {
            gotResultYet || (gotResultYet = !0, storage.push([socket.id, result]), checkResults() && (winner = "", loser = "", gotResultYet = !1, storage = []))
        })
    }
}), http.listen(3e3, function() {});