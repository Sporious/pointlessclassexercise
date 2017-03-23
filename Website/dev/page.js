makeImg("left", "left", "position: absolute; left: 0; top: 0; height: 100%");
makeImg("right", "right", "position:absolute; right: 0; top: 0; height: 100%");

makeDiv("pageContents");
makeImg("rock", "rock", "position: absolute; left: 35%; height: 20%;", "pageContents");
makeImg("paper", "paper", "position: absolute; left: 45%; height: 20%;", "pageContents");
makeImg("scissors", "scissors", "position: absolute; left: 55%; height: 20%;", "pageContents");

makeDiv("outputDiv");
document.getElementById("outputDiv").setAttribute("style", "position: absolute;top: 30%; width: 100%;");
