const boxes = document.getElementsByClassName('box')
const turn = document.getElementById('turn');
const p1Name = document.getElementById('player-one-name')
const p2Name = document.getElementById('player-two-name')
const winner = document.getElementById('winner');
const inputs = document.getElementsByClassName("inputs")
const startGameBtn = document.getElementById('start-game')
const resetGameBtn = document.getElementById('reset-game')
const finishGameButton = document.getElementById('finish-game');
let currentPlayer;
let playerOne;
let playerTwo;

resetGameBtn.style.display = 'none';
finishGameButton.style.display = 'none';
const gameBoard = (() => {
    const gameResult = ["", "", "", "", "", "", "", "", ""];
    function checkWinner() {
        if (
            (gameResult[0] !== "" && gameResult[0] == gameResult[3] && gameResult[3] == gameResult[6]) ||
            (gameResult[1] !== "" && gameResult[1] == gameResult[4] && gameResult[4] == gameResult[7]) ||
            (gameResult[2] !== "" && gameResult[2] == gameResult[5] && gameResult[5] == gameResult[8])
        ) {
            if (
                (gameResult[0] == "X" && gameResult[3] == "X" && gameResult[6] == "X") ||
                (gameResult[1] == "X" && gameResult[4] == "X" && gameResult[7] == "X") ||
                (gameResult[2] == "X" && gameResult[5] == "X" && gameResult[8] == "X")
            ) {
                winner.textContent = `${playerOne.getName()}  is the winner`;
            } else {
                winner.textContent = `${playerTwo.getName()}  is the winner`;
            }
            disableClicks();
            resetGameBtn.style.display = 'block';
            finishGameButton.style.display = 'block';
            return;
        } else if (
            (gameResult[0] !== "" && gameResult[0] == gameResult[1] && gameResult[1] == gameResult[2]) ||
            (gameResult[3] !== "" && gameResult[3] == gameResult[4] && gameResult[4] == gameResult[5]) ||
            (gameResult[6] !== "" && gameResult[6] == gameResult[7] && gameResult[7] == gameResult[8])
        ) {
            if (
                (gameResult[0] == "X" && gameResult[1] == "X" && gameResult[2] == "X") ||
                (gameResult[3] == "X" && gameResult[4] == "X" && gameResult[5] == "X") ||
                (gameResult[6] == "X" && gameResult[7] == "X" && gameResult[8] == "X")
            ) {
                winner.textContent = `${playerOne.getName()}  is the winner`;
            } else {
                winner.textContent = `${playerTwo.getName()}  is the winner`;
            }
            resetGameBtn.style.display = 'block';
            finishGameButton.style.display = 'block';
            disableClicks();
            return;
        } else if (
            (gameResult[0] !== "" && gameResult[0] == gameResult[4] && gameResult[4] == gameResult[8]) ||
            (gameResult[6] !== "" && gameResult[6] == gameResult[4] && gameResult[4] == gameResult[2])
        ) {
            if (
                (gameResult[0] == "X" && gameResult[4] == "X" && gameResult[8] == "X") ||
                (gameResult[6] == "X" && gameResult[4] == "X" && gameResult[2] == "X")
            ) {
                winner.textContent = `${playerOne.getName()}  is the winner`;
            } else {
                winner.textContent = `${playerTwo.getName()}  is the winner`;
            }
            resetGameBtn.style.display = 'block';
            finishGameButton.style.display = 'block';
            disableClicks();
            return;
        } else if (gameResult.every((result) => result !== "")) {
            winner.textContent = "It's a tie";
            resetGameBtn.style.display = 'block';
            finishGameButton.style.display = 'block';
            disableClicks();
            return;
        }
    }
    function switchTextTurns() {
        // switchTextTurns() : a function to switch paragraph of X's turn and O's  turn
        if (currentPlayer.getMarker() == "X") {
            turn.textContent = "X's Turn";
        } else if (currentPlayer.getMarker() == "O") {
            turn.textContent = "O's Turn";
        }
    }

    function resetGame() {
        for (let i = 0; i < gameResult.length; i++) {
            gameResult[i] = '';
            boxes[i].textContent = '';
        }
        disableClicks();
        winner.textContent = '';
        currentPlayer = playerOne;
        addMark();
        enableClicks();
        for (let j = 0; j < inputs.length; j++) {
            inputs[j].style.display = 'none';
        }
        startGameBtn.style.display = 'none';
    }
    function enableClicks() {
        // enableClicks() : a  function to restart clicking after disable it by clicking on reset game button
        for (let i = 0; i < boxes.length; i++) {
            boxes[i].style.pointerEvents = 'auto';
        }
    }
    function disableClicks() {
        // disableClicks : a function to disable clicks after finished the game 
        for (let i = 0; i < boxes.length; i++) {
            boxes[i].style.pointerEvents = 'none';
        }
    }

    function renderContents(gameResult) {
        // renderContents(gameResult) : a function to render the X's and O's in the board 
        for (let i = 0; i < gameResult.length; i++) {
            boxes[i].textContent = gameResult[i]
        }
    }
    function finishGame() {
        resetGameBtn.style.display = "none";
        for (let i = 0; i < gameResult.length; i++) {
            gameResult[i] = "";
            boxes[i].textContent = "";
        }
        enableClicks();
        finishGameButton.style.display = "none";
        startGameBtn.style.display = "block";

        for (let i = 0; i < inputs.length; i++) {
            inputs[i].style.display = "flex";
            boxes[i].style.justifyContent = "space-around";
        }
        winner.textContent = "";
        disableClicks();
    }
    return {
        gameResult,
        checkWinner,
        switchTextTurns,
        resetGame,
        enableClicks,
        disableClicks,
        renderContents,
        finishGame,
    };
})();

const GameBoard = gameBoard;
const gameResult = GameBoard.gameResult;

const Player = (name, marker) => {
    const playerName = name.toLowerCase();
    const playerMarker = marker;

    const getName = () => playerName;
    const getMarker = () => playerMarker;
    return {
        getName,
        getMarker,
    }
}

function addMark() {
    for (let i = 0; i < gameResult.length; i++) {
        if (boxes[i].textContent === "" && gameResult[i].length === 0) {
            boxes[i].addEventListener("click", function renderMark() {
                boxes[i].textContent = currentPlayer.getMarker();
                if (currentPlayer == playerOne) {
                    currentPlayer = playerTwo;
                }
                else if (currentPlayer == playerTwo) {
                    currentPlayer = playerOne
                }
                GameBoard.renderContents(gameResult[i]);
                boxes[i].removeEventListener("click", renderMark);//to not click over filled box 
                gameResult[i] = boxes[i].textContent; // assign X's and O's from board to the array inside gameBoard
                GameBoard.switchTextTurns();
                GameBoard.checkWinner();
            });
        }
        boxes[i].addEventListener("mouseenter", function () { // mouseenter as hover
            if (boxes[i].textContent === "") {
                boxes[i].classList.add("square");
            }
        });
        boxes[i].addEventListener("mouseleave", function () {
            boxes[i].classList.remove("square");
        });
    }
}

startGameBtn.addEventListener("click", function () {
    turn.textContent = "X's Turn";
    playerOne = Player(p1Name.value || "Player One", "X");
    playerTwo = Player(p2Name.value || "Player Two", "O");
    currentPlayer = playerOne;
    addMark();
    GameBoard.enableClicks();
    startGameBtn.style.display = "none";
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].style.display = "none"
    }
});

resetGameBtn.addEventListener("click", () => {
    GameBoard.resetGame();
    turn.textContent = "";
    finishGameButton.style.display = "none"
    resetGameBtn.style.display = "none";
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].style.display = "none";
        boxes[i].style.justifyContent = "space-around";
    }
});

finishGameButton.addEventListener("click", () => {
    GameBoard.finishGame();
})