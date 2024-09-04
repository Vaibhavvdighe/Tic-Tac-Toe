const board = document.querySelector(".board");

document.querySelector(".button").addEventListener("click", () => {
  board.innerHTML = " ";
  createBoard();
});

function createBoard() {
  board.style.backgroundColor = 'rgb(218, 235, 250)';
  board.style.color = '#212121';
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const element = document.createElement("div");
      element.className ="gridCell"
      element.id = `r${i}c${j}`;
      board.appendChild(element);
    }
  }
}

let O=false;
board.addEventListener('click', function(event) {
if(event.target.classList.contains("gridCell")) {
    const clickedCell = event.target;

    if(O && clickedCell.innerHTML=="") {
      clickedCell.innerText = 'X';
      O = false;
    } else if(!O && clickedCell.innerHTML==""){
      clickedCell.innerText = 'O';
      O = true;
    }
    
    check();
}
})  


function check() {
  const cells = [];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {  
      cells.push(document.getElementById(`r${i}c${j}`));
    }
  }

let winner;

  /***cells = [0,1,2,
   *           3,4,5,
   *           6,7,8] ***/
  // Check winning conditions
  const winningConditions = [
    [cells[0], cells[1], cells[2]], // top horizontal
    [cells[3], cells[4], cells[5]], // middle horizontal
    [cells[6], cells[7], cells[8]], // bottom horizontal
    [cells[0], cells[3], cells[6]], // left vertical
    [cells[1], cells[4], cells[7]], // middle vertical
    [cells[2], cells[5], cells[8]], // right vertical
    [cells[0], cells[4], cells[8]], // top-left to bottom-right diagonal
    [cells[2], cells[4], cells[6]], // top-right to bottom-left diagonal
  ];

  for (const condition of winningConditions) {
    if (condition[0].innerText === condition[1].innerText && condition[1].innerText === condition[2].innerText && condition[0].innerText !== '') {
      result(`The Winner is ${condition[0].innerText}`);
      return true;
    }
  }

  const gridcells = document.querySelectorAll('.gridCell');
  let allFilled = true;
  gridcells.forEach((cell) => {
  if (cell.innerText === "") {
    allFilled = false;
  }
  });

  if(allFilled) {
    console.log("filled")
    result(`It's a DRAW`);
    document.querySelector('.winnerText').style.backgroundColor = "red";
  }

  return null; // game not won yet
}

function result(message) {
  winner = document.createElement('div');
      winner.className = 'winner';

      const winnerText = document.createElement('h1');
      winnerText.className ="winnerText";
      winnerText.innerText = message;
      winner.appendChild(winnerText);
      
      // Blur the board
      board.style.filter = 'blur(5px)';
      board.style.pointerEvents = 'none';

      // Add the popup to the body
      document.body.appendChild(winner);

      const Options = document.createElement('div')
      Options.className = "Options";
      winner.appendChild(Options);

      const StartOver = document.createElement('h3');
      StartOver.className = "StartOver";
      StartOver.innerText = "Start Over";
      Options.appendChild(StartOver);

      const ViewGame = document.createElement('h3');
      ViewGame.className = "ViewGame"
      ViewGame.innerText = "View Game";
      Options.appendChild(ViewGame);

      Options.addEventListener('click', (event)=> {
        
        if(event.target.className=="StartOver") {
          document.body.removeChild(winner);
          board.innerHTML=" ";
          board.style.filter='';
          board.style.pointerEvents = 'all';
          
          createBoard();
        }
        
        if(event.target.className=="ViewGame") {
          winner.removeChild(winnerText);
          Options.removeChild(ViewGame)
          board.style.filter='';
        }
      })
}

