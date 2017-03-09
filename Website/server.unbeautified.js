var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var bodyParser = require("body-parser");
var winner;
var loser;
var currentUsers = 0;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.post("/", function(req, res) {
   
});
app.get("/", function(req, res) {
    if (currentUsers < 2) {
        res.sendFile(__dirname + "/index.html")
    } else {
        res.send("Game is currently full :(, try later")
    }

});
storage = [];
io.on("connection", function(socket) {
    var gotResultYet = false;
    if (currentUsers < 2) {
        var effectiveId = currentUsers;
        currentUsers = Object.keys(io.sockets.sockets).length;

        var id = io.engine.id;
       
        socket.on("disconnect", function() {

            currentUsers--
        });
        socket.on("result", function(result) {

            if (!gotResultYet) {
                gotResultYet = true;

                storage.push([socket.id, result]);
                if (checkResults()) {
                    winner = "";
                    loser = "";
                    gotResultYet = false;
                    storage = [];

                }
            }
        })
    }
});

function checkResults() {
    if (storage.length > 1) {
      
        if (storage[0][1] == "rock") {
            if (storage[1][1] == "scissors") winner = storage[0][0], loser = storage[1][0];
            if (storage[1][1] == "paper") winner = storage[1][0], loser = storage[0][0];
            if (storage[1][1] == "rock") winner = null, loser = null;

        } else if (storage[0][1] == "scissors") {
            if (storage[1][1] == "paper") winner = storage[0][0], loser = storage[1][0];
            if (storage[1][1] == "rock") winner = storage[1][0], loser = storage[0][0];
            if (storage[1][1] == "scissors") winner = null, loser = null
        } else if (storage[0][1] == "paper") {
            if (storage[1][1] == "rock") winner = storage[0][0], loser = storage[1][0];
            if (storage[1][1] == "scissors") winner = storage[1][0], loser = storage[0][0];
            if (storage[1][1] == "paper") winner = null, loser = null
        }

        if (winner == null) {
            io.to(storage[0][0]).emit("output", "Draw");
            io.to(storage[1][0]).emit("output", "Draw")
        } else {
            io.to(winner).emit("output", "You Won");
            io.to(loser).emit("output", "You Lose (noob)")
        }
        return true
    }
}

http.listen(3e3, function(req, res) {

});
