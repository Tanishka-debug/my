var PLAY=1;
var END=0;
var gameState=PLAY;

var score;
var canvas;
var human;
var  object1,object2;
var ground,obj1,obj2,objectGroup,object2Group;
var backgroundImg,humanImg,footbalImg,music,restartImg;
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;



function preload()
{ 
	object1=loadImage("images/1.jpg");
	object2=loadImage("images/2.jpg");
	humanImg=loadImage("images/human.png")
	
	backgroundImg=loadImage("images/background.png");
	footballImg=loadImage("images/football.png");
music=loadSound("sound/music.mp3")
restartImg=loadImage("images/restart.png");

}

function setup() {
	createCanvas(800, 800);
	background(255);
	human=createSprite(400,600,20,20);
	//human.addImage(humanImg);
	
	human.scale=1;
	obj=createSprite(200,400,20,20);
	//obj.addImage(footballImg);
	obj.velocityX=2;
	obj.scale=0.1;
	obj2=createSprite(700,350,20,20);
	obj2.visible=false;
	restart=createSprite(400,200,20,20);
restart.addImage(restartImg);
restart.scale=0.1;
edge1=createSprite(780,300,10,800);
edge1.visible=false;
edge2=createSprite(10,380,10,800);
edge2.visible=false;
	//obj2.addImage(object2);
	//obj2.scale=0.2
	//obj2.velocityY=0.5;
	
	/*ground=createSprite(400,400,10,20);
	ground.velocityY=-2;
	ground.addImage(backgroundImg);
	ground.scale=12*/

	

objectGroup=createGroup();
object2Group= createGroup();

	score=0;
}




function draw(){
	background(180);
	text("SCORE:"+score,700,100);
	
	if(gameState===PLAY){
		
scoring();
		restart.visible=false;
		randomObjects();
		random2();
		obj.bounceOff(edge1);
		obj.bounceOff(edge2);

		if(keyDown(UP_ARROW)){
			human.y=human.y-3
		}
		if(keyDown(RIGHT_ARROW)){
			human.x=human.x+3;
		}
		if(keyDown(LEFT_ARROW)){
			human.x=human.x-3;
		}
		if(keyDown(DOWN_ARROW)){
			human.y=human.y+3;
		}
if(obj.isTouching(human)){
	gameState=END;
	music.play();
	restart.visible=true;
}
	}
	else if(gameState===END){
		objectGroup.setVelocityYEach(0);
		object2Group.setVelocityEach(0);
		objectGroup.setLifetimeEach(-1);
		object2Group.setLifetimeEach(-1);
		obj.visible=false;
		human.visible=false;
		objectGroup.visible=false;
		object2Group.visible=false;
		text("GAME END", 400 ,400);
		textSize(300);
		if(mousePressedOver(restart)){
			reset();
		music.stop();}
		score=0;

		}
		
		

	
	


/*if(ground.y< 0){
	ground.y=ground.height/2
}*/

if(human.isTouching(objectGroup)){
	objectGroup.visible=false;
}
if(human.collide(obj2)){
	obj2.visible=false;
}


//obj1.debug=false;
human.debug=false;
human.setCollider("circle",0,0,40);
//human.depth=ground.depth+1;
//obj1.depth=ground.depth+1;
//obj2.depth=ground.depth+1;
//text.depth=ground.depth+1;




drawSprites();
}
function reset(){
	gameState=PLAY;
	objectGroup.destroyEach();
	object2Group.destroyEach();
	score=0;
	human.visible=true;
	obj.visible=true;
	human.x=400;
	human.y=600;
}
	function scoring(){
		if(human.isTouching(objectGroup)){
			score=score+Math.round(getFrameRate()/60);
		}	
		if(human.isTouching(object2Group)){
			score=score+Math.round(getFrameRate()/80);
		}
	}	
	
	

function randomObjects(){
	if(frameCount%80===2){
		obj1=createSprite(200,400,20,20);
	//	obj1.addImage(object1);
		obj1.y=Math.round(random(10,1000))
		obj1.scale=0.3
		//obj1.velocityY=1;
		//obj1.depth=ground.depth;
		//ground.depth=ground.depth+1;
obj1.lifetime=250;


		objectGroup.add(obj1);

	}
}

function random2(){
	if(frameCount%90===0){
		obj2=createSprite(700,600,20,20);
		//obj2.addImage(object2);
		obj2.y=Math.round(random(10,1000))
		obj2.scale=0.3;
		obj2.lifetime=250;
object2Group.add(obj2);
	}
}



