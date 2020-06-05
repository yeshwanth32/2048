window.onresize = function (event) {
	document.location.reload(true);
};

window.addEventListener("keydown", function (event) {
	updateBoard(event.keyCode - 37);
});

var canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.font = "bold 24px verdana, sans-serif ";

var c = canvas.getContext("2d");

var dWidth = 100;
var dHeight = 100;
var starting_x = canvas.width / 2 - dWidth * 2;
var starting_y = canvas.height / 2 - dHeight * 2;

var board = [
	[0, 0, 0, 0],
	[0, 0, 0, 0],
	[0, 0, 0, 0],
	[0, 0, 0, 0],
];

// var board = [
// 	[0, 0, 0, 0],
// 	[2, 4, 8, 16],
// 	[32, 64, 128, 256],
// 	[512, 1024, 2048, 4096],
// ];

drawBoard(starting_x, starting_y, board);

// 0 : Left
// 1 : Up
// 2 : Right
// 3 : Down
function updateBoard(e) {
	//console.log(e);
	c.clearRect(0, 0, canvas.width, canvas.height);
	addRandomBlock(board);
	drawBoard(starting_x, starting_y, board);
}

function addRandomBlock(board) {
	// search for empty spaces to put new block
	let emptySpace = false;
	for (let j = 0; j < board.length; j++) {
		for (let i = 0; i < board[j].length; i++) {
			if (board[j][i] === 0) {
				emptySpace = true;
				break;
			}
		}
		if (emptySpace) {
			break;
		}
	}
	// return false if no empty space is found
	if (!emptySpace) {
		return emptySpace;
	}

	// let r_x = getRandomArbitrary(0, 4);
	// let r_y = getRandomArbitrary(0, 4);
	// console.log(r_y);

	let setBlock = false;
	while (!setBlock) {
		let r_x = getRandomArbitrary(0, 3);
		let r_y = getRandomArbitrary(0, 3);
		//console.log(r_y);
		// console.log(board);
		// console.log(r_x + " " + r_x + " : " + board[r_x][r_y]);
		if (board[r_y][r_x] === 0) {
			setBlock = true;
			board[r_y][r_x] = 2;
			return true;
		}
	}
}

function getRandomArbitrary(min, max) {
	return Math.round(Math.random() * (max - min) + min);
}

function drawBoard(x, y, board) {
	let dx = x;
	for (let j = 0; j < board.length; j++) {
		for (let i = 0; i < board[j].length; i++) {
			drawBlock(x, y, board[j][i]);
			x += dWidth;
		}
		x = dx;
		y += dHeight;
	}
}

function drawBlock(x, y, value) {
	switch (value) {
		case 0:
			c.fillStyle = "rgba(128,128,128, 0.1)";
			c.fillRect(x, y, dWidth, dHeight);
			return;
		case 2:
			c.fillStyle = "rgba(255,204,204,0.1)";
			break;
		case 4:
			c.fillStyle = "rgba(255,175,175,0.1)";
			break;
		case 8:
			c.fillStyle = "rgba(255,153,153,0.1)";
			break;
		case 16:
			c.fillStyle = "rgba(255,125,125,0.1)";
			break;
		case 32:
			c.fillStyle = "rgba(255,100,100,0.08)";
			break;
		case 64:
			c.fillStyle = "rgba(255,75,75,0.12)";
			break;
		case 128:
			c.fillStyle = "rgba(255,50,50,0.15)";
			break;
		case 256:
			c.fillStyle = "rgba(255,25,25,0.2)";
			break;
		case 512:
			c.fillStyle = "rgba(255,12,12,0.25)";
			break;
		case 1024:
			c.fillStyle = "rgba(255,0,0,0.3)";
			break;
		case 2048:
			c.fillStyle = "rgba(255,0,0,0.4)";
			break;
		default:
			c.fillStyle = "rgba(230,0,0,0.9)";
	}
	c.fillRect(x, y, dWidth, dHeight);
	c.fillStyle = "rgba(255,255,255)";
	c.font = "bold 40px verdana, sans-serif ";
	if (value < 9) {
		c.fillText(value, x + 35, y + 60, dWidth);
	} else if (value > 9 && value < 99) {
		c.font = c.font.replace(
			/\d+px/,
			parseInt(c.font.match(/\d+px/)) - 3 + "px"
		);
		c.fillText(value, x + 25, y + 60, dWidth);
	} else if (value > 99 && value < 999) {
		c.font = c.font.replace(
			/\d+px/,
			parseInt(c.font.match(/\d+px/)) - 5 + "px"
		);
		c.fillText(value, x + 15, y + 60, dWidth);
	} else if (value > 999 && value < 9999) {
		c.font = c.font.replace(
			/\d+px/,
			parseInt(c.font.match(/\d+px/)) - 9 + "px"
		);
		c.fillText(value, x + 7, y + 60, dWidth);
	} else if (value > 9999 && value < 99999) {
		c.font = c.font.replace(
			/\d+px/,
			parseInt(c.font.match(/\d+px/)) - 15 + "px"
		);
		c.fillText(value, x + 7, y + 60, dWidth);
	} else if (value > 99999 && value < 999999) {
		c.font = c.font.replace(
			/\d+px/,
			parseInt(c.font.match(/\d+px/)) - 20 + "px"
		);
		c.fillText(value, x + 7, y + 60, dWidth);
	} else {
		c.font = c.font.replace(
			/\d+px/,
			parseInt(c.font.match(/\d+px/)) - 30 + "px"
		);
		c.fillText(value, x, y, dWidth);
	}
}

//   c.font = "bold 25px verdana, sans-serif ";
//   c.fillStyle = "rgba(255,255,255)";
//   c.fillText("testing", x, y);
