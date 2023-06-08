const boxes = document.getElementsByClassName('box')

const gameBoard = (() => {
    const gameResult = ["", "", "", "", "", "", "", "", ""];
    return { gameResult }
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
        boxes[i].addEventListener("click", () => {
            boxes[i].textContent = "X";
            renderContents(gameResult[i])
            console.log(gameResult)
        })
    }
}
addMark()