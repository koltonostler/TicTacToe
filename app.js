const turn = document.querySelector("#turn");
const winningOverlay = document.querySelector(".win-message");
const winningMessage = document.getElementById("wintext");
const resetButton = document.getElementById("reset");

let xGameBoard = [];
let oGameBoard = [];
let xWins = 0;
let oWins = 0;
let isWinner = false;
const winningConditions = [
	["1", "2", "3"],
	["4", "5", "6"],
	["7", "8", "9"],
	["1", "4", "7"],
	["2", "5", "8"],
	["3", "6", "9"],
	["1", "5", "9"],
	["3", "5", "7"],
];

function winMessage() {
	winningOverlay.classList.add("show");
	winningMessage.innerText = `Player ${turn.innerText} Wins!`;
	if (turn.innerText === "X") {
		xWins++;
	}
	if (turn.innerText === "O") {
		oWins++;
	}
	console.log(xWins);
	console.log(oWins);
}
function drawMessage() {
	winningOverlay.classList.add("show");
	winningMessage.innerText = "Draw!";
}

function resetGame() {
	winningOverlay.classList.remove("show");

	let spaces = document.getElementsByClassName("space");
	let xcount = document.getElementById("x-wincount");
	let ocount = document.getElementById("o-wincount");

	for (space of spaces) {
		space.innerText = "";
		space.style.cursor = "pointer";
	}
	isWinner = false;
	xcount.innerText = xWins;
	ocount.innerText = oWins;
	oGameBoard = [];
	xGameBoard = [];
}

function areEqual(array1, array2) {
	if (array1.length === array2.length) {
		return array1.every((element) => {
			if (array2.includes(element)) {
				return true;
			}
			return false;
		});
	}
	return false;
}

function isWin(playerBoard) {
	for (let i = 0; i < winningConditions.length; i++) {
		const winEval = winningConditions[i].filter((f) => playerBoard.includes(f));
		if (areEqual(winEval, winningConditions[i])) {
			isWinner = true;
			winMessage();

			break;
		}
	}
}

function isDraw(xBoard, oBoard) {
	if (xBoard.length + oBoard.length === 9 && isWinner === false) {
		drawMessage();
	}
}

function switchPlayer() {
	if (turn.innerText === "X") {
		turn.innerText = "O";
	} else {
		turn.innerText = "X";
	}
}

function evalGame() {
	const Board = document.querySelectorAll(".space");

	for (space of Board) {
		if (space.innerText === "X") {
			if (xGameBoard.includes(space.id) === false) {
				xGameBoard.push(space.id);
				isWin(xGameBoard);
				isDraw(xGameBoard, oGameBoard);
			}
		} else if (space.innerText === "O") {
			if (oGameBoard.includes(space.id) === false) {
				oGameBoard.push(space.id);
				isWin(oGameBoard);
				isDraw(xGameBoard, oGameBoard);
			}
		}
	}
}

function applyDarkTheme() {
	const body = document.querySelector("body");
	body.classList.add("dark");
}

function applyLightTheme() {
	const body = document.querySelector("body");
	body.classList.remove("dark");
}
function playTurn() {}

$(".space").click(function () {
	if (this.innerText === "") {
		if (turn.innerText === "X") {
			this.innerText = "X";
			this.classList.remove("O");
			this.classList.add("X");
		} else if (turn.innerText === "O") {
			this.innerText = "O";
			this.classList.remove("X");
			this.classList.add("O");
		}
		evalGame();
		switchPlayer();
	} else {
		this.style.cursor = "not-allowed";
	}
});

resetButton.addEventListener("click", resetGame);

$("#checkbox").change(function () {
	if (this.checked) {
		applyDarkTheme();
	} else {
		applyLightTheme();
	}
});
