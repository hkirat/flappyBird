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

//first lower bar
var lower1Ready=false;
var lower1Image = new Image();
lower1Image.onload = function() {
	lower1Ready=true;
}
lower1Image.src="images/lower.png";


//second lower bar
var lower2Ready=false;
var lower2Image = new Image();
lower2Image.onload = function() {
	lower2Ready=true;
}
lower2Image.src="images/lower.png";

//third lower bar
var lower3Ready=false;
var lower3Image = new Image();
lower3Image.onload = function() {
	lower3Ready=true;
}
lower3Image.src="images/lower.png";

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
	y : -100
}
var upper2 = {
	xspeed : -30,
	x : 75,
	y : -50
}
var upper3 = {
	xspeed : -30,
	x : 130,
	y : -70
}

var lower1 = {
	xspeed : -30,
	x : 20,
	y : 150
}
var lower2 = {
	xspeed : -30,
	x : 75,
	y : 135
}
var lower3 = {
	xspeed : -30,
	x : 130,
	y : 160
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
	bird.x=0;
	bird.y=120;
	bird.score=0;
};
var f=0;
var difficulty=-40;
// function that is called a lot
var update = function (modifier) 
{
	bird.score+=modifier;
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
	lower1.x=lower1.x + lower1.xspeed * modifier;
	lower2.x=lower2.x + lower2.xspeed * modifier;
	lower3.x=lower3.x + lower3.xspeed * modifier;
	if (upper1.x<-25)
	{
		upper1.y=difficulty+10-Math.random()*50;
		upper1.x=144
	}
	if (upper2.x<-25)
	{
		upper2.x=144
		upper2.y=difficulty+10-Math.random()*50;
	}
	if (upper3.x<-25)
	{
		upper3.x=144
		upper3.y=difficulty+10-Math.random()*50;	
	}	
	if (lower1.x<-25)
	{
		lower1.y=-difficulty+160-Math.random()*50;
		lower1.x=144
	}
	if (lower2.x<-25)
	{
		lower2.x=144
		lower2.y=-difficulty+160-Math.random()*50;
	}
	if (lower3.x<-25)
	{
		lower3.x=144
		lower3.y=-difficulty+160-Math.random()*50;	
	}	
	//collision detection
	if (bird.y>256)
		reset();
	if (upper1.x<15 && bird.y<upper1.y+135)
		reset();

	if (upper2.x<15 && bird.y<upper2.y+135)
		reset();

	if (upper3.x<15 && bird.y<upper3.y+135)
		reset();
	if (upper1.x<15 && bird.y<upper1.y+135)
		reset();

	if (upper2.x<15 && bird.y<upper2.y+135)
		reset();

	if (upper3.x<15 && bird.y<upper3.y+135)
		reset();
	if (lower1.x<15 && bird.y>lower1.y-10)
		reset();

	if (lower2.x<15 && bird.y>lower2.y-10)
		reset();

	if (lower3.x<15 && bird.y>lower3.y-10)
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
	if (lower1Ready)
	{
		ctx.drawImage(lower1Image,lower1.x,lower1.y);
	}
	if (lower2Ready)
	{
		ctx.drawImage(lower2Image,lower2.x,lower2.y);
	}
	if (upper3Ready)
	{
		ctx.drawImage(lower3Image,lower3.x,lower3.y);
	}
	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("score: " +bird.score, 12, 32);
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
