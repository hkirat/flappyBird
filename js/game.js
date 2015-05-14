var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 144;
canvas.height = 256;
document.body.appendChild(canvas);
//bg image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/background.png";
//bird image
var birdReady = false;
var birdImage = new Image();
birdImage.onload = function()
{
	birdReady=true;
}
birdImage.src="images/bird.png"

var bird = {
xspeed : 0,
yspeed : 0,
xacc : 0,
yacc : 200,
x : 2,
y : 2,
score : 0
};

var keysDown = {};
//adding key listeners
addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
	f=0;
}, false);

//function to reset game
var reset = function () {
	bird.xspeed=0;
	bird.yspeed=0;
	bird.x=2;
	bird.y=2;
	bird.score=0;
};
var f=0;
// function that is called a lot
var update = function (modifier) 
{
	if (38 in keysDown && f==0) 
	{ // Player holding up
		bird.yspeed = -100;
		f=1;
	}
	bird.x+=bird.xspeed * modifier;
	bird.y+=bird.yspeed * modifier;
	bird.xspeed+=bird.xacc * modifier;
	bird.yspeed+=bird.yacc * modifier;
	if (bird.y>256)
		reset();
};

//function to render on the screen
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}
	if (birdReady)
	{
		ctx.drawImage(birdImage,bird.x,bird.y);
	}
	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("score: " + bird.score, 32, 32);
};

// the main loop of the game
var main = function () {
	var now = Date.now();
	var delta = now - then;
	update(delta / 1000);
	render();
	then = now;
	requestAnimationFrame(main);
};
var then = Date.now();
reset();
main();
