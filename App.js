const boxes = document.getElementsByClassName('box')

const gameBoard = (() => {
    const gameResult = ["", "", "", "", "", "", "", "", ""];
    //rows condition 
    function checkWinner() {
        if ((gameResult[0] !== "" && gameResult[0] == gameResult[3] && gameResult[3] == gameResult[6]) ||
            (gameResult[1] !== "" && gameResult[1] == gameResult[4] && gameResult[4] == gameResult[7]) ||
            (gameResult[2] !== "" && gameResult[2] == gameResult[5] && gameResult[5] == gameResult[8])
        ) {
            alert("Win");
        } // column condition 
        else if (
            (gameResult[0] !== "" && gameResult[0] == gameResult[1] && gameResult[1] == gameResult[2]) ||
            (gameResult[3] !== "" && gameResult[3] == gameResult[4] && gameResult[4] == gameResult[5]) ||
            (gameResult[6] !== "" && gameResult[6] == gameResult[7] && gameResult[7] == gameResult[8])
        ) {
            alert("Win")
        }
        else {
            //Tie condition 
        }
    }
    return { gameResult, checkWinner }
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
                boxes[i].textContent = "o";
                renderContents(gameResult[i]);
                boxes[i].removeEventListener("click", renderMark);
                gameResult[i] = boxes[i].textContent;
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
addMark()