board = [
    "", "", "",
    "", "", "",
    "", "", ""
]

current = "X"
gameOver = false

cells = document.querySelectorAll(".cell")
statusText = document.querySelector("#status")
restart = document.querySelector("#restart")

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]
]

cells.forEach((cell, index) => {
    cell.addEventListener("click", () => {
        if (board[index] !== "" || gameOver) {
            return
        }

        board[index] = current
        cell.textContent = current
        // Win Detection later
        if (current === "X") {
            current = "O"
        } else {
            current = "X"
        }
        statusText.textContent = "Player " + current + "'s turn"
    })
})

function checkWin(player) {

    for (const combination of winningCombinations) {
        [a, b, c] = combination;

        if (board[a] === player && board[b] === player && board[c] === player) {
            return true;
        }
    }
    return false;
}