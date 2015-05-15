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
birdImage.src="images/bird.png";
//first upper bar
var upper1Ready=false;
var upper1Image = new Image();
upper1Image.onload = function() {
	upper1Ready=true;
}
upper1Image.src="images/upper.png";

//second upper bar
var upper2Ready=false;
var upper2Image = new Image();
upper2Image.onload = function() {
	upper2Ready=true;
}
upper2Image.src="images/upper.png";

//third upper bar
var upper3Ready=false;
var upper3Image = new Image();
upper3Image.onload = function() {
	upper3Ready=true;
}
upper3Image.src="images/upper.png";

var bird = {
xspeed : 0,
yspeed : 0,
xacc : 0,
yacc : 200,
x : 2,
y : 2,
score : 0
};
var upper1 = {
	xspeed : -30,
	x : 20,
	y : 0
}
var upper2 = {
	xspeed : -30,
	x : 75,
	y : 0
}
var upper3 = {
	xspeed : -30,
	x : 130,
	y : 0
}

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
var difficulty=-40;
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
	upper1.x=upper1.x + upper1.xspeed * modifier;
	upper2.x=upper2.x + upper2.xspeed * modifier;
	upper3.x=upper3.x + upper3.xspeed * modifier;
	if (upper1.x<-25)
	{
		upper1.y=difficulty-Math.random()*50;
		upper1.x=144
	}
	if (upper2.x<-25)
	{
		upper2.x=144
		upper2.y=difficulty-Math.random()*50;
	}
	if (upper3.x<-25)
	{
		upper3.x=144
		upper3.y=difficulty-Math.random()*50;	
	}	
	//collision detection
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
	if (upper1Ready)
	{
		ctx.drawImage(upper1Image,upper1.x,upper1.y);
	}
	if (upper2Ready)
	{
		ctx.drawImage(upper2Image,upper2.x,upper2.y);
	}
	if (upper3Ready)
	{
		ctx.drawImage(upper3Image,upper3.x,upper3.y);
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
