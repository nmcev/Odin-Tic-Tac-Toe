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