const tiles = document.querySelectorAll('.tile')
const winningMsg = document.querySelector('#winningMessage')
const message = document.querySelector('.message')
const restart = document.getElementById('restart')

const winningCombos = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
]

let playerOne = true
let playerTwo = false

function startGame() {
	clickTile()
}

function overTiles(e) {
	console.log('opentiles ran')
	const thisTile = e.target
	const mouseoverSymbol = playerOne ? 'X' : 'O'
	thisTile.style.color = 'var(--x-o)'
	thisTile.innerText = mouseoverSymbol
}

// function openTiles(e) {
// 	tiles.forEach((tile) => {
// 		tile.addEventListener('mouseover', () => {
// 			console.log('opentiles ran')
// 			const mouseoverSymbol = playerOne ? 'X' : 'O'
// 			tile.style.color = 'var(--x-o)'
// 			tile.innerText = mouseoverSymbol
// 		})
// 	})
// }

function mouseExit(e) {
	console.log('mouseexit ran')
	const thisTile = e.target
	thisTile.innerText = ''
}
function mouseClick(e) {
	const thisTile = e.target
	const clickedSymbol = playerOne ? 'X' : 'O'
	const clickedColor = playerOne ? 'var(--medium-orange)' : 'var(--dark-slate)'
	thisTile.innerText = clickedSymbol
	thisTile.style.color = clickedColor
	thisTile.classList.add(clickedSymbol)
	thisTile.removeEventListener('mouseleave', mouseExit)
	if (checkWin(clickedSymbol)) {
		endGame(false)
	} else if (isDraw()) {
		endGame(true)
	} else {
		changeSides()
	}
}

function clickTile(e) {
	tiles.forEach((tile) => {
		tile.addEventListener('mouseover', overTiles)
	})
	tiles.forEach((tile) => {
		tile.addEventListener('click', mouseClick)
	})

	tiles.forEach((tile) => {
		tile.addEventListener('mouseleave', mouseExit)
	})
}

function changeSides() {
	console.log('im in here')
	playerOne = !playerOne
	playerTwo = !playerTwo
	tiles.forEach((tile) => {
		if (tile.innerText === '') {
			tile.style.pointerEvents = 'all'
		} else {
			tile.style.pointerEvents = 'none'
		}
	})
}

function checkWin(symbol) {
	return winningCombos.some((combo) => {
		return combo.every((index) => {
			return tiles[index].classList.contains(symbol)
		})
	})
}

function isDraw() {
	return [...tiles].every((tile) => {
		return tile.classList.contains('X') || tile.classList.contains('O')
	})
}

function endGame(draw) {
	if (draw) {
		winningMsg.innerText = "It's a draw, try again"
	} else {
		winningMsg.innerText = `${playerOne ? 'X' : 'O'} wins!`
	}
	message.classList.add('show')
}

function gameWrap() {
	message.classList.remove('show')
	tiles.forEach((tile) => {
		tile.classList.remove('X')
		tile.classList.remove('O')
		tile.innerText = ''
		tile.style.color = 'var(--x-o)'
		tile.style.pointerEvents = 'all'
		tile.removeEventListener('mouseleave', mouseExit)
		tile.removeEventListener('mouseover', overTiles)
	})
	startGame()
}

window.addEventListener('DOMContentLoaded', startGame())
restart.addEventListener('click', gameWrap)
