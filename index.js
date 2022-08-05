const mainBoard = document.getElementById('main-board')
const resetButton = document.getElementById('new-game')
const switchTurn = document.getElementById('player-turn')
const gameResult = document.getElementById('game-result')

const EMPTY_SYMBOL = '⠀'
const PLAYER_1 = 'x'
const PLAYER_2 = 'o'
const INITIAL_PLAY_TURN = PLAYER_1
let playerTurn = INITIAL_PLAY_TURN
let isFinished = false

const boardMap = Array.from(Array(9), () => EMPTY_SYMBOL)
// '', '', '',
// '', '', '',
// '', '', '',

function setSquare(id, value, squareEl) {
    squareEl = squareEl == null ? document.getElementById(id) : squareEl

    if (value === EMPTY_SYMBOL) {
        squareEl.classList.add('empty-square')
    } else if (boardMap[id] === EMPTY_SYMBOL) {
        squareEl.classList.remove('empty-square')
    }
    if (value === PLAYER_1) {
        squareEl.classList.add("red")
        squareEl.classList.remove("blue")
    } else if (value === PLAYER_2) {
        squareEl.classList.add("blue")
        squareEl.classList.remove("red")
    }
    boardMap[id] = value
    squareEl.innerText = value
}

function setTurn(next) {
    playerTurn = next
    switchTurn.innerText = next
}

boardMap.forEach((s, index) => {
    const square = document.createElement('div')
    square.innerText = s
    square.classList.add('square-board', 'empty-square')
    square.id = index
    mainBoard.appendChild(square)
})

mainBoard.addEventListener("click", function (event) {
    const square = event.target
    if (square.innerText === EMPTY_SYMBOL && !isFinished) {
        const currentTurn = playerTurn
        if (currentTurn === PLAYER_1) {
            setSquare(square.id, PLAYER_1, square)
            setTurn(PLAYER_2)
        } else {
            setSquare(square.id, PLAYER_2, square)
            setTurn(PLAYER_1)
        }
        let isTie = true
        for (i = 0; i < boardMap.length; i++) {
            if (boardMap[i] === EMPTY_SYMBOL) {
                isTie = false
                break
            }
        }

        if (isTie) {
            gameResult.innerText = 'Tie'
            return
        }

        function whoWins(a, b, c) {
            return (a === currentTurn && b === currentTurn && c === currentTurn)
        }

        for (let i = 0; i <= 7; i++) {
            const b = boardMap

            if (whoWins(b[0], b[1], b[2])) {
                gameResult.innerText = `Player ${b[1]} wins`
                isFinished = true
            }
            else if (whoWins(b[3], b[4], b[5])) {
                gameResult.innerText = `Player ${b[3]} wins`
                isFinished = true
            } else if (whoWins(b[6], b[7], b[8])) {
                gameResult.innerText = `Player ${b[6]} wins`
                isFinished = true
            } else if (whoWins(b[0], b[3], b[6])) {
                gameResult.innerText = `Player ${b[0]} wins`
                isFinished = true
            } else if (whoWins(b[1], b[4], b[7])) {
                gameResult.innerText = `Player ${b[1]} wins`
                isFinished = true
            } else if (whoWins(b[2], b[5], b[8])) {
                gameResult.innerText = `Player ${b[2]} wins`
                isFinished = true
            } else if (whoWins(b[0], b[4], b[8])) {
                gameResult.innerText = `Player ${b[0]} wins`
                isFinished = true
            } else if (whoWins(b[2], b[4], b[6])) {
                gameResult.innerText = `Player ${b[2]} wins`
                isFinished = true
            }
        }
    }

})



resetButton.addEventListener("click", function (event) {
    boardMap.forEach((_, i) => {
        setSquare(i, EMPTY_SYMBOL)
        playerTurn = INITIAL_PLAY_TURN
        document.getElementById('player-turn').innerText = INITIAL_PLAY_TURN
        gameResult.innerText = 'game on'

    })
    isFinished = false
})

