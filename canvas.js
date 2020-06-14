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

addRandomBlock(board);
addRandomBlock(board);
drawBoard(starting_x, starting_y, board);

// 0 : Left
// 1 : Up
// 2 : Right
// 3 : Down
function updateBoard(e) {
	//console.log(e);
	c.clearRect(0, 0, canvas.width, canvas.height);
	let moved = false;
	switch (e) {
		case 0:
			moved = moveLeft(board);
			break;
		case 1:
			moved = moveUp(board);
			break;
		case 2:
			moved = moveRight(board);
			break;
		case 3:
			moved = moveDown(board);
			break;
		default:
			console.log("Error: unexpected move number");
	}
	if (moved) addRandomBlock(board);
	else {
		if (!findEmptySpace(board)) {
			let tempBoard = board.map(function (arr) {
				return arr.slice();
			});
			if (
				!moveLeft(tempBoard) &&
				!moveLeft(tempBoard) &&
				!moveUp(tempBoard) &&
				!moveDown(tempBoard)
			)
				gameOver();
		}
	}
	drawBoard(starting_x, starting_y, board);
}

function gameOver() {
	c.fillStyle = "rgba(255,255,255)";
	c.font = "bold 80px verdana, sans-serif ";
	c.fillText("GAME OVER", starting_x + 5, starting_y + 500, 400);
}

function findEmptySpace(board) {
	return board.reduce(function (accm, curr) {
		return accm
			? true
			: curr.reduce(function (accm2, curr2) {
					return curr2 === 0 ? true : accm2;
			  }, false);
	}, false);
}

function addRandomBlock(board) {
	// search for empty spaces to put new block
	let emptySpace = findEmptySpace(board);

	// if there are no empty spaces left then return false;
	if (!emptySpace) return emptySpace;

	let setBlock = false;
	while (!setBlock) {
		let r_x = getRandomArbitrary(0, 3);
		let r_y = getRandomArbitrary(0, 3);
		if (board[r_y][r_x] === 0) {
			setBlock = true;
			let ranNum = Math.random() < 0.9 ? 2 : 4;
			board[r_y][r_x] = ranNum;
			return true;
		}
	}
	return false;
}

function getRandomArbitrary(min, max) {
	return Math.round(Math.random() * (max - min) + min);
}

function drawBoard(x, y, board) {
	let dx = x;
	board.map(function (arr) {
		arr.map(function (block) {
			drawBlock(x, y, block);
			x += dWidth;
		});
		x = dx;
		y += dHeight;
	});
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

function moveRight(board) {
	let moved = false;
	for (let i = 0; i < board.length; ++i) {
		if (
			move(
				board.length - 1,
				board.length - 1,
				function (k) {
					return k >= 0;
				},
				function (k) {
					return --k;
				},
				function (k) {
					return board[i][k];
				},
				function (k, value) {
					board[i][k] = value;
				}
			)
		) {
			moved = true;
		}
	}
	return moved;
}

function moveLeft(board) {
	let moved = false;
	for (let i = 0; i < board.length; ++i) {
		if (
			move(
				0,
				0,
				function (k) {
					return k < board.length;
				},
				function (k) {
					return ++k;
				},
				function (k) {
					return board[i][k];
				},
				function (k, value) {
					board[i][k] = value;
				}
			)
		) {
			moved = true;
		}
	}
	return moved;
}

function moveDown(board) {
	let moved = false;
	for (let i = 0; i < board.length; ++i) {
		if (
			move(
				board.length - 1,
				board.length - 1,
				function (k) {
					return k >= 0;
				},
				function (k) {
					return --k;
				},
				function (k) {
					return board[k][i];
				},
				function (k, value) {
					board[k][i] = value;
				}
			)
		) {
			moved = true;
		}
	}
	return moved;
}

function moveUp(board) {
	let moved = false;
	for (let i = 0; i < board.length; ++i) {
		if (
			move(
				0,
				0,
				function (k) {
					return k < board.length;
				},
				function (k) {
					return ++k;
				},
				function (k) {
					return board[k][i];
				},
				function (k, value) {
					board[k][i] = value;
				}
			)
		) {
			moved = true;
		}
	}
	return moved;
}

function move(start, newEnd, end, move, get, set) {
	let moved = false;
	for (let i = start; end(i); i = move(i)) {
		if (get(i) !== 0) {
			swap(newEnd, i, get, set);
			if (i !== newEnd) moved = true;
			let found = false;
			for (let j = move(i); end(j); j = move(j)) {
				if (get(j) !== 0) {
					if (get(j) === get(newEnd)) {
						let temp = get(j);
						set(j, 0);
						set(newEnd, get(newEnd) + temp);
						moved = true;
					}
					found = true;
					break;
				}
			}
			if (!found) break;
			newEnd = move(newEnd);
		}
	}
	return moved;
}

function swap(i1, i2, get, set) {
	let temp = get(i1);
	set(i1, get(i2));
	set(i2, temp);
}

//   c.font = "bold 25px verdana, sans-serif ";
//   c.fillStyle = "rgba(255,255,255)";
//   c.fillText("testing", x, y);
