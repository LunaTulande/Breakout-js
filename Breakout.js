/*
Brakout game with javascript and JQuery. No leves and gamepad by buttons on the HTML document.
*/

//Canvas properties
var canvas = $("#myCanvas")[0];
var pen = canvas.getContext("2d");

var cWidth = canvas.width;
var cHeight = canvas.height;
var x = cWidth/2;
var y = cHeight-20;

//Bricks properties
var brickRow = 7;
var brickColumn = 8;
var brickWidth = 75;
var brickHeight = 20;
var brickSpace = 10;
var bricks = [];
//dimentional array for bricks
for(c = 0; c < brickColumn; c++) {
    bricks[c] = [];
    for(r = 0; r < brickRow; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}
//draw bricks on the canvas
function drawBricks() {
    for(c = 0; c < brickColumn; c++) {
        for(r = 0; r < brickRow; r++) {
            if(bricks[c][r].status == 1) {
                var brickX = (r*(brickWidth+brickSpace))+30;
                var brickY = (c*(brickHeight+brickSpace))+30;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                pen.beginPath();
                pen.rect(brickX, brickY, brickWidth, brickHeight);
                pen.fillStyle = "#8A2BE2";
                pen.fill();
                pen.closePath();
            }
        }
    }
}

//Paddle properties
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (cWidth-paddleWidth)/2; //middle of the canvas
//draw paddle on the canvas
function drawPaddle() {
    pen.beginPath();
    pen.rect(paddleX, cHeight-paddleHeight, paddleWidth, paddleHeight);
    pen.fillStyle = "#800000";
    pen.fill();
    pen.closePath();
}
//Paddle's moves
var rightButton = false; 
var leftButton = false; 
var paddleVelo = 35;
function moveRight(){
	rightButton = true;
}
function moveLeft(){
	leftButton = true;
}

//Ball properties and drawing on the canvas
var ballSize = 10;
function drawBall() {
    pen.beginPath();
    pen.arc(x, y, ballSize, 0, Math.PI*2);
    pen.fillStyle = "#FF1493";
    pen.fill();
    pen.closePath();
}
//Ball's move
var dx = 0;
var dy = 0;
var ballVelo = 2;
//respond to the clicked button Play: game starting (the ball moves)
var onPlay = false;
var disable = false;
function play(){
	timeOn(); //game time on
	onPlay = true;
	if(!disable){
		dx = ballVelo;
		dy = -ballVelo;
		requestAnimationFrame(draw);
		//disable the button play during the game
		$("#play").css({"opacity": "0.6", "cursor": "not-allowed", "box-shadow": "0 5px #666", "transform": "translateY(4px)"});
	}
}

//main function
function draw() {
    pen.clearRect(0, 0, cWidth, cHeight);
    drawBricks();
    drawBall();
    drawPaddle();
    collisionDetection();
    
    if(x + dx > cWidth-ballSize || x + dx < ballSize) {
        dx = -dx;
    }
    if(y + dy < ballSize) {
        dy = -dy;
    }
    else if(y + dy > cHeight-ballSize) {
        if(x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        }
        else {
			disable = false;
            location.reload();
        }
    }
    
    if(rightButton && paddleX < cWidth-paddleWidth) {
        paddleX += paddleVelo;
		rightButton = false;
    }
    else if(leftButton && paddleX > 0) {
        paddleX -= paddleVelo;
		leftButton = false;
    }
    
	if(onPlay){
		x += dx;
		y += dy;
		requestAnimationFrame(draw);
		disable = true;
	}
}

//Collision control
var brickDeletedCounter = 0;
function collisionDetection() {
	for(c = 0; c < brickColumn; c++) {
		for(r = 0; r < brickRow; r++) {
			var b = bricks[c][r];
			if(b.status == 1) {
				if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
					dy = -dy;
					b.status = 0;
					brickDeletedCounter++;
					if(brickDeletedCounter == brickRow*brickColumn) {
						//stop and save game time
						timeStop();
						location.reload();
					}
				}
			}
		}
	}
}

draw(); //calling function

//regulation of game speed (respond to the clicked button velocity+)
function velocity(){
	var offset = $("#velo").offset();
	$("#veloPlus").css({ top: offset.top - 15, left: offset.left + 95, display: "block" }).animate({ opacity: 1.0 }, "slow");
	$("#veloPlus").animate({ opacity: 0.0 }, "slow");
	ballVelo++;
	x += dx;
	y += dy;
	paddleVelo += 25;
	requestAnimationFrame(draw);
}

var gameTime;
var t = 0;
//put the game time on
function timeOn(){
	gameTime = setInterval(function(){
		t++;
		$("#time").html(t);
	},1000);
}
//stop the game time only if the gamer wins, otherwise clearInterval() executes when the page refreshes
function timeStop(){
	gameTime = clearInterval();
	//save score
	var response = confirm("YOU WIN, CONGRATS!\nYour game time was " + t + " seconds\nDo you want to save your score?");
	if(response == true)
		saveScore();
}
//open a new window to save the current score
function saveScore(){
	window.open("http://localhost/Test/prov/saveScore.php?time="+t, "", "width=400, height=500, top=130, left=470");
}
//open the scores window
function scores(){
	window.open("http://localhost/Test/prov/scores.php", "", "width=400, height=500, top=130, left=470");
}
//open a mail window for suggestions
function suggestion(){
	window.open("Suggestions.html", "", "width=400, height=400, top=150, left=200");
}