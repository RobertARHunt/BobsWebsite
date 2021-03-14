const cells = Array.from(document.getElementById("grid").children);

cells.forEach(cell => {
  cell.addEventListener("click", () => {
    if (cell.innerHTML != "X" && cell.innerHTML != "O") {
      playGo(cell);
    }   
  });
});

function playGo(cell) {
  cell.innerHTML = "X";
  if (checkWin("X")) {
    setTimeout(() => {
      alert("You won!");
      restart();
    }, 10);
  } else if (checkDraw()) {
    setTimeout(() => {
      alert("Draw!");
      restart();
    }, 10);
  } else {
    playComputerGo();
  }
}

function checkWin(oX) {
  const matchingCells = cells.map((cell, ix) => {
    if (cell.innerHTML == oX) return ix;
  }).filter(ix => ix !== undefined);


  const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  // for (let lineIx = 0; lineIx < winningLines.length; lineIx++) {
  //   const line = winningLines[lineIx];
  //   if (line.every(cell => matchingCells.includes(cell))) return true;
  // }
  // return false;

  return winningLines.some(
    line => line.every(
      ix => matchingCells.includes(ix)
    )
  );
}

function checkDraw() {
    return cells.filter(x => x.innerHTML != "").length == 9;
}

function playComputerGo() {
  const ix = Math.floor(Math.random() * 9);
  if (cells[ix].innerHTML == "") {
    cells[ix].innerHTML = "O";
    if (checkWin("O")) {
      setTimeout(() => {
        alert("You lose!");
        restart();
      }, 10);
    }
  } else playComputerGo();
}


function restart() {
  cells.forEach(cell => cell.innerHTML = "");
}
