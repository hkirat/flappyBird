var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 602;
canvas.height = 604;
document.body.appendChild(canvas);
//bg image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/bg.jpg";
//bird image
var bird1Ready = false;
var bird1Image = new Image();
bird1Image.onload = function()
{
	bird1Ready=true;
}
bird1Image.src="images/gif/a-0.png";
var bird2Ready = false;
var bird2Image = new Image();
bird2Image.onload = function()
{
	bird2Ready=true;
}
bird2Image.src="images/gif/a-1.png";
var bird3Ready = false;
var bird3Image = new Image();
bird3Image.onload = function()
{
	bird3Ready=true;
}
bird3Image.src="images/gif/a-0.png";


//first upper bar
var upper1Ready=false;
var upper1Image = new Image();
upper1Image.onload = function() {
	upper1Ready=true;
}
upper1Image.src="images/upper2.png";

//second upper bar
var upper2Ready=false;
var upper2Image = new Image();
upper2Image.onload = function() {
	upper2Ready=true;
}
upper2Image.src="images/upper2.png";

//third upper bar
var upper3Ready=false;
var upper3Image = new Image();
upper3Image.onload = function() {
	upper3Ready=true;
}
upper3Image.src="images/upper2.png";

//first lower bar
var lower1Ready=false;
var lower1Image = new Image();
lower1Image.onload = function() {
	lower1Ready=true;
}
lower1Image.src="images/lower2.png";


//second lower bar
var lower2Ready=false;
var lower2Image = new Image();
lower2Image.onload = function() {
	lower2Ready=true;
}
lower2Image.src="images/lower2.png";

//third lower bar
var lower3Ready=false;
var lower3Image = new Image();
lower3Image.onload = function() {
	lower3Ready=true;
}
lower3Image.src="images/lower2.png";

var bird = {
xspeed : 0,
yspeed : 0,
xacc : 0,
yacc : 550,
x : 2,
y : 2,
score : 0
};
var spd=-140;
var acc=-5;
var upper1 = {
	xspeed : spd,
	x : 480+240,
	y : -490
}
var upper2 = {
	xspeed : spd,
	x : 240,
	y : -550
}
var upper3 = {
	xspeed : spd,
	x : 480,
	y : -400
}

var lower1 = {
	xspeed : spd,
	x : 489+240,
	y : 400
}
var lower2 = {
	xspeed : spd,
	x : 240,
	y : 435
}
var lower3 = {
	xspeed : spd,
	x : 480,
	y : 460
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
	difficulty=-40;
	bird.xspeed=0;
	bird.yspeed=0;
	bird.x=0;
	bird.y=120;
	bird.score=0;
	upper1.xspeed=spd;
	upper2.xspeed=spd;
	upper3.xspeed=spd;
	lower1.xspeed=spd;
	lower2.xspeed=spd;
	lower3.xspeed=spd;
	upper1.x=480+240;
	upper2.x=240;
	upper3.x=480;
	lower1.x=480+240;
	lower2.x=240;
	lower3.x=480;
};
var f=0;
var difficulty=-40;
// function that is called a lot
var update = function (modifier) 
{
	upper1.xspeed+=acc * modifier;
	upper2.xspeed+=acc * modifier;
	upper3.xspeed+=acc * modifier;
	lower1.xspeed+=acc * modifier;
	lower2.xspeed+=acc * modifier;
	lower3.xspeed+=acc * modifier;

	bird.score+=modifier;
	difficulty=-40+bird.score/2;
	if (38 in keysDown && f==0) 
	{ // Player holding upper1
		bird.yspeed = -270;
		f=1;
	}
	if (32 in keysDown && f==0) 
	{ // Player holding upper1
		reset;
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
	if (upper1.x<-90)
	{
		upper1.y=difficulty-400-Math.random()*50;
		upper1.x=600
	}
	if (upper2.x<-90)
	{
		upper2.x=600
		upper2.y=difficulty-400-Math.random()*50;
	}
	if (upper3.x<-90)
	{
		upper3.x=600
		upper3.y=difficulty-400-Math.random()*50;	
	}	
	if (lower1.x<-90)
	{
		lower1.y=-difficulty+400-Math.random()*50;
		lower1.x=600
	}
	if (lower2.x<-90)
	{
		lower2.x=600;
		lower2.y=-difficulty+400-Math.random()*50;
	}
	if (lower3.x<-90)
	{
		lower3.x=600
		lower3.y=-difficulty+400-Math.random()*50;	
	}	
	//collision detection
//	if (bird.y>256)
//		reset();
	if (upper1.x<46 && bird.y<upper1.y+670)
		reset();

	if (upper2.x<46 && bird.y<upper2.y+670)
		reset();

	if (upper3.x<46 && bird.y<upper3.y+670)
		reset();
	if (lower1.x<46 && bird.y>lower1.y-55)
		reset();

	if (lower2.x<46 && bird.y>lower2.y-55)
		reset();

	if (lower3.x<46 && bird.y>lower3.y-55)
		reset();
	
};

//function to render on the screen
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}
	if (bird.score%1.5>0)
	{
		if (bird3Ready)
		{
			ctx.drawImage(bird3Image,bird.x,bird.y);
		}
	}
	if (bird.score%1.5>.5)
	{
		if (bird2Ready)
		{
			ctx.drawImage(bird2Image,bird.x,bird.y);
		}
	}
	
	if (bird.score%1.5>1)
	{
		if (bird1Ready)
		{
			ctx.drawImage(bird1Image,bird.x,bird.y);
		}
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
	ctx.fillText("Points: " +parseInt(bird.score), 12, 32);
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
