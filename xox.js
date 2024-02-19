let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let container = document.querySelector(".container");
let msgContainer = document.querySelector(".msgContainer");
let win = document.querySelector("#msg");
let newGameBtn = document.querySelector("#newgame");
let computerBtn = document.querySelector("#online");
let offlineBtn = document.querySelector("#offline");
const userScoreid = document.querySelector("#user-score");
const compScoreid = document.querySelector("#comp-score");
let gameMode = document.querySelector(".gameMode");
let scoreBoard = document.querySelector(".score-board");
let playerX = document.querySelector("#playerx");
let playerO = document.querySelector("#playerO");
let backBtn = document.querySelector("#back");
let gobackBtn = document.querySelector("#goback");

let turnX = true;
let count = 0;

let userScore = 0;
let compScore = 0;
const compGame = () => {
	computerBtn.addEventListener("click", () => {
		similar();
		playerX.innerText = "You";
		playerO.innerText = "Computer";
		onlineGame();
	});
};

const similar = () => {
	container.classList.remove("hide");
	gameMode.classList.add("hide");
	resetBtn.classList.remove("hide");
	scoreBoard.classList.remove("hide");
	backBtn.classList.remove("hide");
	gobackBtn.classList.remove("hide");
};
const mulGame = () => {
	offlineBtn.addEventListener("click", () => {
		similar();
		multiplayer();
	});
};
const winPatterns = [
	[0, 1, 2],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[2, 4, 6],
	[0, 4, 8],
	[3, 4, 5],
	[6, 7, 8],
];

let boxlist = [0, 1, 2, 3, 4, 5, 6, 7, 8];

const filledBoxes = [];

const markAsFilled = (filledBoxIndex) => {
	boxlist = boxlist.filter((box) => box !== filledBoxIndex);
};

const isMarkingAllowed = (clickedBox) => {
	console.log({ clickedBox });
	const allowedBox = boxlist.find((box) => clickedBox === box);
	return !isNaN(allowedBox);
};

// onlineGame --> against comp

compGame();
mulGame();
const hasGameEnded = (count) => {
	let isWinner = checkWinner();
	if (isWinner) {
		return true;
	}
	if (count == 9 && !isWinner) {
		showDraw();
		return true;
	}
};
const multiplayer = () =>
	boxes.forEach((box) => {
		box.addEventListener("click", () => {
			console.log("box was clicked");
			if (turnX) {
				box.innerText = "X";
				box.style.color = "#FF6978";
				turnX = false;
			} else {
				box.innerText = "O";
				box.style.color = "#4B88A2";
				turnX = true;
			}
			box.disabled = true;
			count++;

			// let isWinner = checkWinner();
			// if (isWinner) {
			// 	return;
			// } else if (count == 9 && !isWinner) {
			// 	showDraw();
			// 	return;
			// }
			hasGameEnded(count);
		});
	});

const onlineGame = () =>
	boxes.forEach((box, index) => {
		box.addEventListener("click", () => {
			if (turnX && isMarkingAllowed(index)) {
				box.innerText = "X";
				markAsFilled(index);
				console.log(boxlist, "from turnX");
				turnX = false;
				count++;

				let gameOver = hasGameEnded(count);
				if (gameOver) {
					return;
				} else {
					playGame();
					turnX = true;
				}
			}
		});
	});

// const disableBox = (box) => {
// 	for (let box of boxes) {
// 		box.disabled = true;
// 	}
// };
const enableBox = (box) => {
	for (let box of boxes) {
		box.disabled = false;
		box.innerText = "";
	}
};

const resetGame = () => {
	turnX = true;
	count = 0;
	boxlist = [0, 1, 2, 3, 4, 5, 6, 7, 8];
	enableBox();
	msgContainer.classList.add("hide");
};
const backFunction = () => {
	msgContainer.classList.add("hide");
	container.classList.add("hide");
	window.history.go();
};
backBtn.addEventListener("click", backFunction);

const gobackFunction = () => {
	msgContainer.classList.add("hide");
	window.history.go();
};
gobackBtn.addEventListener("click", gobackFunction);

const genCompChoice = () => {
	const randIdx = Math.floor(Math.random() * (boxlist.length - 1));
	return randIdx;
};

const playGame = () => {
	const compChoise = genCompChoice();
	boxes[boxlist[compChoise]].innerText = "O";
	markAsFilled(boxlist[compChoise]);
	count++;
	hasGameEnded(count);
};

const showDraw = () => {
	win.innerText = "Draw";
	msgContainer.classList.remove("hide");
};
const showWinner = (winner) => {
	if (winner == "X") {
		userScore++;
		userScoreid.innerText = userScore;
	} else {
		compScore++;
		compScoreid.innerText = compScore;
	}
	win.innerText = `Congratulations! Winner is ${winner}`;
	msgContainer.classList.remove("hide");
};

const checkWinner = () => {
	for (let pattern of winPatterns) {
		let position1 = boxes[pattern[0]].innerText;
		let position2 = boxes[pattern[1]].innerText;
		let position3 = boxes[pattern[2]].innerText;

		if (position1 != "" && position2 != "" && position3 != "") {
			if (position1 === position2 && position2 === position3) {
				setTimeout(() => {
					showWinner(position1);
				}, 1000);
				return true;

				// disableBox();
			}
		}
	}
};

resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);
