// Board Declarations
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
const soundToggle = document.querySelector("#soundtoggle")
let soundEnabled = true
let audioContext
let masterGain

// Sound Functions (Took help with AI to create this)
function playTone(frequency, duration, startDelay = 0) {
    if (!soundEnabled) {
        return
    }

    const AudioContextClass = window.AudioContext || window.webkitAudioContext
    if (!AudioContextClass) {
        return
    }

    if (!audioContext) {
        audioContext = new AudioContextClass()
        masterGain = audioContext.createGain()
        masterGain.connect(audioContext.destination)
    }
    if (audioContext.state === "suspended") {
        audioContext.resume()
    }

    const oscillator = audioContext.createOscillator()
    const gain = audioContext.createGain()
    const startTime = audioContext.currentTime + startDelay
    oscillator.frequency.setValueAtTime(frequency, startTime)
    gain.gain.setValueAtTime(0.0001, startTime)
    gain.gain.exponentialRampToValueAtTime(0.12, startTime + 0.01)
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration)
    oscillator.connect(gain)
    gain.connect(masterGain)
    oscillator.start(startTime)
    oscillator.stop(startTime + duration)
}

function playMoveSound() {
    playTone(520, 0.09)
}

function playEndSound(isWin) {
    if (isWin) {
        playTone(523, 0.16)
        playTone(659, 0.16, 0.15)
        playTone(784, 0.28, 0.3)
    } else {
        playTone(392, 0.2)
        playTone(330, 0.3, 0.18)
    }
}
// These are winning combinations.
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
//This function checks winner and also animations
function checkWin(player) {

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;

        if (board[a] === player && board[b] === player && board[c] === player) {
            cells[a].style.backgroundColor = "green"
            cells[b].style.backgroundColor = "green"
            cells[c].style.backgroundColor = "green"

            cells[a].style.color = "white"
            cells[b].style.color = "white"
            cells[c].style.color = "white"
            return true;
        }
    }
    return false;
}
// This function checks for a draw and also takes care of moves
cells.forEach((cell, index) => {
    cell.addEventListener("click", () => {
        if (board[index] !== "" || gameOver) {
            return
        }

        board[index] = current
        cell.textContent = current
        playMoveSound()
        moves++;
        if (checkWin(current)) {
            statusText.textContent = "Player " + current + " wins!"
            playEndSound(true)
            gameOver = true
            return
        }
        if (moves == 9) {
            statusText.textContent = "It's a draw!"
            gameOver = true

            cells.forEach((cell) => {
                cell.style.backgroundColor = "yellow"
                cell.style.color = "black"
            })
            playEndSound(false)
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

const themeToggle = document.querySelector("#themetoggle");
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    themeToggle.textContent = (themeToggle.textContent == "Light Mode") ? "Dark Mode" : "Light Mode";
});

soundToggle.addEventListener("click", () => {
    soundEnabled = !soundEnabled
    soundToggle.textContent = soundEnabled ? "🔊" : "🔇"
    soundToggle.setAttribute("aria-label", soundEnabled ? "Mute sounds" : "Unmute sounds")
    soundToggle.title = soundEnabled ? "Mute sounds" : "Unmute sounds"
    soundToggle.setAttribute("aria-pressed", String(!soundEnabled))

    if (masterGain) {
        masterGain.gain.setTargetAtTime(soundEnabled ? 1 : 0, audioContext.currentTime, 0.01)
    }
})

restart.addEventListener("click", () => {
    cells.forEach((cell) => {
        cell.textContent = ""
        cell.style.backgroundColor = ""
        cell.style.color = ""
    })

    board = [
        "", "", "",
        "", "", "",
        "", "", ""
    ]
    statusText.textContent = "Player X's turn"


current = "X"
gameOver = false
moves = 0
})

