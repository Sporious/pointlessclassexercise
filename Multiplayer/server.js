function checkResults() {
    return storage.length > 1 ? (console.log("Entry 1: " + storage[0][0] + " " + storage[0][1]), console.log("Entry 2: " + storage[1][0] + " " + storage[1][1]), "rock" == storage[0][1] ? ("scissors" == storage[1][1] && (winner = storage[0][0], loser = storage[1][0]), "paper" == storage[1][1] && (winner = storage[1][0], loser = storage[0][0]), "rock" == storage[1][1] && (winner = null, loser = null), console.log("in rock")) : "scissors" == storage[0][1] ? ("paper" == storage[1][1] && (winner = storage[0][0], loser = storage[1][0]), "rock" == storage[1][1] && (winner = storage[1][0], loser = storage[0][0]), "scissors" == storage[1][1] && (winner = null, loser = null)) : "paper" == storage[0][1] && ("rock" == storage[1][1] && (winner = storage[0][0], loser = storage[1][0]), "scissors" == storage[1][1] && (winner = storage[1][0], loser = storage[0][0]), "paper" == storage[1][1] && (winner = null, loser = null)), console.log(winner), null == winner ? (io.to(storage[0][0]).emit("output", "Draw"), io.to(storage[1][0]).emit("output", "Draw")) : (io.to(winner).emit("output", "You Won"), io.to(loser).emit("output", "You Lose (noob)")), !0) : void 0
}
var app = require("express")(),
    http = require("http").Server(app),
    io = require("socket.io")(http),
    bodyParser = require("body-parser"),
    winner, loser, currentUsers = 0;
app.use(bodyParser.json()), app.use(bodyParser.urlencoded({
    extended: !0
})), app.post("/", function(req) {
    console.log(req.body)
}), app.get("/", function(req, res) {
    2 > currentUsers ? res.sendFile(__dirname + "/index.html") : res.send("Game is currently full :(, try later"), console.log("Current users = " + currentUsers)
}), storage = [], io.on("connection", function(socket) {
    var gotResultYet = !1;
    if (2 > currentUsers) {
        var effectiveId = currentUsers;
        currentUsers = Object.keys(io.sockets.sockets).length, console.log("User connected");
        var id = io.engine.id;
        console.log("effectiveId = " + effectiveId), console.log("id = " + socket.id), console.log(Object.keys(io.sockets.sockets).length), socket.on("disconnect", function() {
            console.log("user disconnected, id: " + id), currentUsers--
        }), socket.on("result", function(result) {
            console.log(result), gotResultYet || (gotResultYet = !0, console.log(gotResultYet), storage.push([socket.id, result]), checkResults() && (winner = "", loser = "", gotResultYet = !1, storage = [], console.log(storage.length)))
        })
    }
}), http.listen(3e3, function() {
    console.log("listening on *:3000")
});