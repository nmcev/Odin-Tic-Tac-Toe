const boxes = document.getElementsByClassName('box')
const turn = document.getElementById('turn');
const p1Name = document.getElementById('player-one-name')
const p2Name = document.getElementById('player-two-name')
const winner = document.getElementById('winner');
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
        } else if (gameResult.every((result) => result !== "")) {
            winner.textContent = "It's a tie";
        }
    }
    function switchTurns() {
        if (turn.textContent === "X") {
            turn.textContent = "O";
        } else if (turn.textContent === "O") {
            turn.textContent = "X";
        }
    }
    return { gameResult, checkWinner, switchTurns }
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

function renderContents(gameResult) {
    for (let i = 0; i < gameResult.length; i++) {
        boxes[i].textContent = gameResult[i]
    }
}

function addMark() {
    for (let i = 0; i < gameResult.length; i++) {
        if (boxes[i].textContent == "" && gameResult[i] == "") {
            boxes[i].addEventListener("click", function renderMark() {
                boxes[i].textContent = currentPlayer.getMarker();
                if (currentPlayer == playerOne) {
                    currentPlayer = playerTwo
                }
                else if (currentPlayer == playerTwo) {
                    currentPlayer = playerOne
                }
                renderContents(gameResult[i]);
                boxes[i].removeEventListener("click", renderMark);
                gameResult[i] = boxes[i].textContent;
                gameBoard.switchTurns();
                gameBoard.checkWinner();
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
const playerOne = Player(p1Name.value, "X");
const playerTwo = Player(p2Name.value, "O");

let currentPlayer = playerOne;
document.getElementById('start-game').addEventListener("click", function () {
    addMark();
});