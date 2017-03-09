var computerGuess
function compResult()
{
  var guess = Math.random();
  if (guess < 1/3) computerGuess = "Rock";
  if (guess < 2/3) computerGuess = "Scissors";
  if (guess <= 1 ) computerGuess = "Paper";
}

function answer( input )
{
  if ( input == "Rock" )
  {
    switch (computerGuess)
    {
      case "Rock":
        alert("Draw");
        break;
      case "Scissors":
        alert("Win");
        break;
      case "Paper":
        alert("Lose");
        break;
      default:
        alert("error");
      }
    }
    if ( input == "Paper" )
    {
      switch (computerGuess)
      {
        case "Rock":
          alert("Win");
          break;
        case "Scissors":
          alert("Lose");
          break;
        case "Paper":
          alert("Draw");
          break;
        default:
          alert("error");
        }
      }
      if ( input == "Scissors" )
      {
        switch (computerGuess)
        {
          case "Rock":
            alert("Lose");
            break;
          case "Scissors":
            alert("Draw");
            break;
          case "Paper":
            alert("Win");
            break;
          default:
            alert("error");
          }
        }
        compResult();
}
compResult();
