var canvas = document.getElementById("arena");
var gameArena = canvas.getContext("2d");
var rect = canvas.getBoundingClientRect();

var menu_click = document.getElementById("menu_click");

var mainShip = new Image();
mainShip.src = "sprites/turret1.png";

var restartIcon = new Image();
restartIcon.src = "sprites/restart.png";

var enemyShip = new Image();
enemyShip.src = "sprites/spacestation2.png";

var asteroid = new Image();
asteroid.src = "sprites/asteroid.png";

var asteroidPoly = {
	x1: 20,
	y1: 0,
	x2: 72,
	y2: 25,
	x3: 72,
	y3: 45,
	x4: 36,
	y4: 85,
	x5: 0,
	y5: 60,
};

var enemyTriangle = {
	x1: 0,
	y1: 0,
	x2: 120,
	y2: 25,
	x3: 45,
	y3: 114.43
};

var width = 1220;
var height = 620;
var cornerRadius = 20;
var midx = width/2;
var midy = height/2;

var mousex,mousey;

//Most important Variables
var sceneNumber = 1;
var levelNumber = 1;
var lastClickCounter = 0;
//End

canvas.addEventListener('mousemove', function(evt) {
	mousex = evt.clientX - rect.left;
	mousey = evt.clientY - rect.top;
}, false)

canvas.addEventListener('click', function(evt) {
	if(sceneNumber == 1)
	{
		mainMenu_click();
	}
	if(sceneNumber == 2)
	{
		levelSelector_click();
	}
	if(sceneNumber == 3)
	{
		settings_click();
	}
	if(sceneNumber == 4)
	{
		instructions_click();
	}
	if(sceneNumber == 5)
	{
		aboutUs_click();
	}
	if(sceneNumber == 6)
	{
		if(levelNumber == 1)
		{
			level1_click();
		}
		if(levelNumber == 2)
		{
			level2_click();
		}
		if(levelNumber == 3)
		{
			level3_click();
		}
		if(levelNumber == 4)
		{
			level4_click();
		}
	}
})

canvas.addEventListener('mousedown', function(evt) {
	if(sceneNumber == 6)
	{
		if(levelNumber == 1)
		{
			level1_mousedown();
		}
		if(levelNumber == 2)
		{
			level2_mousedown();
		}
		if(levelNumber == 3)
		{
			level3_mousedown();
		}
		if(levelNumber == 4)
		{
			level4_mousedown();
		}
	}
})

canvas.addEventListener('mouseup', function(evt) {
	if(sceneNumber == 6)
	{
		if(levelNumber == 1)
		{
			level1_mouseup();
		}
		if(levelNumber == 2)
		{
			level2_mouseup();
		}
		if(levelNumber == 3)
		{
			level3_mouseup();
		}
		if(levelNumber == 4)
		{
			level4_mouseup();
		}
	}
})

var gameTimer;
var gameSpeed = 25;

//Adding initial offset to drawMovingSpace() functioj
for(var spaceOffset = 0;spaceOffset < 300;spaceOffset++)
{
	drawMovingSpace();
}
//End offset
drawParticleFlag = true;

clickCounter = setInterval(increaseCounter, gameSpeed);
update();

function increaseCounter()
{
	lastClickCounter++;
}

function update()
{
	if(sceneNumber == 1)
	{
		gameTimer = setInterval(mainMenu, gameSpeed);
	}
	if(sceneNumber == 2)
	{
		gameTimer = setInterval(levelSelector, gameSpeed);
	}
	if(sceneNumber == 3)
	{
		gameTimer = setInterval(settings, gameSpeed);
	}
	if(sceneNumber == 4)
	{
		gameTimer = setInterval(instructions, gameSpeed);
	}
	if(sceneNumber == 5)
	{
		gameTimer = setInterval(aboutUs, gameSpeed);
	}
	if(sceneNumber == 6)
	{
		if(levelNumber == 1)
		{
			gameTimer = setInterval(level1, gameSpeed);
		}
		if(levelNumber == 2)
		{
			gameTimer = setInterval(level2, gameSpeed);
		}
		if(levelNumber == 3)
		{
			gameTimer = setInterval(level3, gameSpeed);
		}
		if(levelNumber == 4)
		{
			gameTimer = setInterval(level4, gameSpeed);
		}
	}
}

function drawRoundedRectangle(x, y, width, height, color, lineWidth)
{
	gameArena.lineWidth = lineWidth;
	gameArena.beginPath();
	gameArena.strokeStyle = color;
	gameArena.moveTo(x+cornerRadius, y);
	gameArena.lineTo(x+width-cornerRadius, y);
	gameArena.arcTo(x+width, y, x+width, y+cornerRadius, cornerRadius);
	gameArena.lineTo(x+width, y+height-cornerRadius);
	gameArena.arcTo(x+width, y+height, x+width-cornerRadius, y+height, cornerRadius);
	gameArena.lineTo(x+cornerRadius, y+height);
	gameArena.arcTo(x, y+height, x, y+height-cornerRadius, cornerRadius);
	gameArena.lineTo(x, y+cornerRadius);
	gameArena.arcTo(x,y, x+cornerRadius, y, cornerRadius);
	gameArena.stroke();
}

function drawRay(x1, y1, x2, y2)
{
	gameArena.lineWidth = 4;
	gameArena.beginPath();
	gameArena.strokeStyle = "#E6FFFF";
	gameArena.shadowBlur = 20;
	gameArena.shadowColor = "#18CAE6";
	gameArena.moveTo(x1, y1);
	gameArena.lineTo(x2, y2);
	gameArena.stroke();
	gameArena.beginPath();
	gameArena.arc(x1, y1, 7, 0, 2*Math.PI, true);
	gameArena.fillStyle = "#E6FFFF";
	gameArena.fill();
	gameArena.beginPath();
	gameArena.arc(x2, y2, 7, 0, 2*Math.PI, true);
	gameArena.fillStyle = "#E6FFFF";
	gameArena.fill();
}

function drawMirror(x1, y1, x2, y2, flag)
{
	gameArena.lineWidth = 4;
	gameArena.beginPath();
	gameArena.strokeStyle = "#D0D0D0";
	if(flag)
	{
		gameArena.shadowBlur = 10;
		gameArena.shadowColor = "#E0E0E0";
	}
	else
	{
		gameArena.shadowBlur = 0;
	}
	gameArena.moveTo(x1, y1);
	gameArena.lineTo(x2, y2);
	gameArena.stroke();
	gameArena.beginPath();
	gameArena.arc(x1, y1, 7, 0, 2*Math.PI, true);
	gameArena.fillStyle = "#303030";
	gameArena.fill();
	gameArena.beginPath();
	gameArena.arc(x2, y2, 7, 0, 2*Math.PI, true);
	gameArena.fillStyle = "#303030";
	gameArena.fill();
}

function calculateAngle(x1, y1, x2, y2, x3, y3, x4, y4)
{
	return (180.0/Math.PI)*(Math.atan2((((y2-y1)*(x3-x4))-((x2-x1)*(y3-y4))) ,(((x2-x1)*(x3-x4))+((y2-y1)*(y3-y4))) ));
}

function distancePoint(x1, y1, x2, y2)
{
	return Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));
}

function checkLine(x, y, x2, y2)
{
	if(mousex < Math.min(x,x2)-5.0 || mousex > Math.max(x,x2)+5.0 || mousey < Math.min(y,y2)-5.0 || mousey > Math.max(y,y2)+5.0)
		return false;
	var a = y2-y;
	var b = x-x2;
	var c = y*(x2-x)-x*(y2-y);
	var distance = Math.abs((mousex*a+mousey*b+c)/Math.sqrt(a*a+b*b));
	if(distance <= 20.0)
		return true;
	else
		return false;
}

function checkLinePoint(x, y, x1, y1, x2, y2)
{
	if(x <= Math.min(x1,x2)-5.0 || x >= Math.max(x1,x2)+5.0 || y <= Math.min(y1,y2)-5.0 || y >= Math.max(y1,y2)+5.0)
		return false;
	var a = y2-y1;
	var b = x1-x2;
	var c = y1*(x2-x1)-x1*(y2-y1);
	var distance = Math.abs((x*a+y*b+c)/Math.sqrt(a*a+b*b));
	if(distance <= 5.0)
		return true;
	else
		return false;
}