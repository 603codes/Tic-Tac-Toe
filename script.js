board = [
    "", "", "",
    "", "", "",
    "", "", ""
]

current = "X"
gameOver = false
moves = 0

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

function checkWin(player) {

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;

        if (board[a] === player && board[b] === player && board[c] === player) {
            return true;
        }
    }
    return false;
}

cells.forEach((cell, index) => {
    cell.addEventListener("click", () => {
        if (board[index] !== "" || gameOver) {
            return
        }

        board[index] = current
        cell.textContent = current
        moves++;
        if (checkWin(current)) {
            statusText.textContent = "Player " + current + " wins!"
            gameOver = true
            return
        }
        if (moves >= 9) {
            statusText.textContent = "It's a draw!"
            gameOver = true
            return
        }
        if (current === "X") {
            current = "O"
        } else {
            current = "X"
        }
        statusText.textContent = "Player " + current + "'s turn"
        
    })
})

