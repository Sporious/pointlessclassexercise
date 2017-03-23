var socket = io();

$('#rock').click( function() {
    socket.emit('result', "rock");
    waitScreen( 1 );

    return false;

});
$('#paper').click( function() {
    socket.emit('result', "paper");
    waitScreen( 2 );

    return false;

});
$('#scissors').click( function() {
    socket.emit('result', "scissors");
    waitScreen( 3 );
    return false;

});
socket.on('output', function( message ) {
    $('#waiting').remove();
    $('#outputDiv').html("");
    if (message == "win") {
        makeImg( "result", "win", "display: block;margin: auto; width: 20%;", "outputDiv" );
    }
    else if ( message == "lose" ) {
        makeImg( "result", "lose", "display: block;margin: auto; width: 20%;", "outputDiv" );
    }
    else {
        makeImg( "result", "draw", "display: block;margin: auto; width: 20%;", "outputDiv" );
    }
    makeDiv('okdiv');
    makeImg('ok', 'ok', 'position: absolute; top: 80%; left: 45%; width: 10%; border-style: solid;', 'okdiv');
    function dynamicEvent() {
        location.reload();
    }
    var img = document.getElementById('ok');
    img.onclick = dynamicEvent;
});

function waitScreen ( input )
{
    var a = document.getElementById("pageContents");
    a.innerHTML = "";
    if (input == 1) {
        makeImg("mychoice", "rock", "position: absolute; left: 45%; height: 20%;", "pageContents");
    }
    else if (input == 2) {
        makeImg("mychoice", "paper", "position: absolute; left: 45%; height: 20%;", "pageContents");
    }
    else if (input == 3) {
        makeImg("mychoice", "scissors", "position: absolute; left: 45%; height: 20%;", "pageContents");
    }
    makeImg("waiting", "waiting", "position: absolute;top: 50%;left: 45%; width: 10%;");

}
