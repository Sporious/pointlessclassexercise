var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
//var bodyParser = require('body-parser');
var winner;
var loser;
var currentUsers = 0;
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));

app.post('/', function (req, res) {
    console.log(req.body);
    //res.redirect('index.js')
});

app.get('/', function ( req, res ) {
    if ( currentUsers < 2 )
    {
        res.sendFile(__dirname + '/index.html');
    }
    else
    {
        res.send("Game is currently full :(, try later");
    }
        console.log("Current users = " + currentUsers);
});

app.get('/rock', function (req, res) {
    res.sendFile(__dirname + '/img/rock.gif');
});
app.get('/ok', function (req, res) {
    res.sendFile(__dirname + '/img/ok.jpg');
});
app.get('/waiting', function (req, res) {
    res.sendFile(__dirname + '/img/waiting.svg');
});
app.get('/left', function (req, res) {
    res.sendFile(__dirname + '/img/left.gif');
});
app.get('/win', function (req, res) {
    res.sendFile(__dirname + '/img/win.jpg');
});
app.get('/lose', function (req, res) {
    res.sendFile(__dirname + '/img/lose.jpg');
});
app.get('/right', function (req, res) {
    res.sendFile(__dirname + '/img/right.gif');
});
app.get('/paper', function (req, res) {
    res.sendFile(__dirname + '/img/paper.gif');
});
app.get('/scissors', function (req, res) {
    res.sendFile(__dirname + '/img/scissors.gif');
});
app.get('/css', function (req, res) {
    res.sendFile(__dirname + '/css/css.css');
});
app.get('/multiplayer.html', function (req, res) {
    res.sendFile(__dirname + '/');
});
app.get('/history.html', function (req, res) {
    res.sendFile(__dirname + '/history.html');
});
app.get('/page', function (req, res) {
    res.sendFile(__dirname + '/page.js');
});
app.get('/htmlwrite', function (req, res) {
    res.sendFile(__dirname + '/htmlwrite.js');
});
app.get('/jquery', function (req, res) {
    res.sendFile(__dirname + '/jquery-1.11.1.js');
});
app.get('/io', function (req, res) {
    res.sendFile(__dirname + '/io.js');
});


storage = []
io.on( 'connection', function( socket ) {
    var gotResultYet = false;
    if ( currentUsers < 2 ) {
    var effectiveId=currentUsers;
    currentUsers = Object.keys(io.sockets.sockets).length;
    console.log('User connected');
    var id = io.engine.id;
    console.log('effectiveId = ' + effectiveId);
    console.log('id = ' + socket.id );
    //console.log('usercount = ' + socket);
    console.log(Object.keys(io.sockets.sockets).length);
    //console.log(Object.keys(io.sockets.connected));

    socket.on( 'disconnect', function() {
        console.log( 'user disconnected, id: ' + id );
        currentUsers--;

    });
    socket.on( 'result', function( result ) {
        console.log(result)
        if (!gotResultYet)
        {
            gotResultYet = true;
            console.log(gotResultYet);
            storage.push( [socket.id, result] );
            if (checkResults())
            {
                winner = "";
                loser = "";
                gotResultYet = false;
                storage = [];
                console.log(storage.length);
            }


        }
    });
}});

function checkResults()
{
    if (storage.length > 1)
    {
        console.log("Entry 1: " + storage[0][0] + " " + storage[0][1])
        console.log("Entry 2: " + storage[1][0] + " " + storage[1][1])
        if (storage[0][1] == "rock")
        {
            if (storage[1][1] == "scissors") winner = storage[0][0], loser = storage[1][0];
            if (storage[1][1] == "paper") winner = storage[1][0], loser = storage[0][0];
            if (storage[1][1] == "rock") winner = null, loser = null;
            console.log("in rock");
        }
        else if (storage[0][1] == "scissors")
        {
            if (storage[1][1] == "paper") winner = storage[0][0], loser = storage[1][0];
            if (storage[1][1] == "rock") winner = storage[1][0], loser = storage[0][0];
            if (storage[1][1] == "scissors") winner = null, loser = null;
        }
        else if (storage[0][1] == "paper")
        {
            if (storage[1][1] == "rock") winner = storage[0][0], loser = storage[1][0];
            if (storage[1][1] == "scissors") winner = storage[1][0], loser = storage[0][0];
            if (storage[1][1] == "paper") winner = null, loser = null;
        }
        console.log(winner);
        if( winner == null ){
            io.to( storage[0][0] ).emit( 'output', 'Draw' );
            io.to( storage[1][0] ).emit( 'output', 'Draw' );
        }
        else {
        io.to( winner ).emit( 'output', 'win' );
        io.to( loser ).emit( 'output', 'lose' );

    }
    return true;
    }
}



function asd()
{
    console.log("asd");

}

http.listen(3000, function( req, res ) {
    console.log( 'listening on *:3000' );
});
