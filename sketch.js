var starImg, bgImg, fairyImg;
var star, starBody;
var fairy, fairyBody;
var joySound;
//create variable for fairy sprite and fairyImg

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload()
{
	starImg = loadImage("images/star.png");
	bgImg = loadImage("images/starNight.png");
	fairyImg = loadAnimation("images/fairyImage1.png","images/fairyImage1.png");

	joySound = loadSound("sound/JoyMusic.mp3");
	//load animation for fairy here
}

function setup() {
	createCanvas(800, 750);

	//write code to play fairyVoice sound
	joySound.play();
	

	//create fairy sprite and add animation for fairy
	fairy = createSprite(130,520);
	fairy.addAnimation("fairy",fairyImg);
	fairy.scale = 0.2;

	star = createSprite(650,30);
	star.addImage(starImg);
	star.scale = 0.2;

	var star_options = {
		restitution: 0.5,
		isStatic: true
	}
	var fairy_options = {
		isStatic: true
	}

	engine = Engine.create();
	world = engine.world;

	starBody = Bodies.circle(650 , 30 , 5 , star_options);
	World.add(world, starBody);
	
	fairyBody = Bodies.rectangle(130,500,50,100,fairy_options);
	World.add(world, fairyBody);

}


function draw() {
  background(bgImg);
  Engine.update(engine);

  keyPressed();

  star.x= starBody.position.x;
  star.y= starBody.position.y;

  fairy.x = fairyBody.position.x;
  fairy.y = fairyBody.position.y;

  console.log(star.y);

  //write code to stop star in the hand of fairy
  if(starBody.position.y > 470){
	  Matter.Body.setStatic(starBody, true);
	  starBody.position.x = fairy.x + 100;
  }

  drawSprites();

}

function keyPressed() {

	if (keyCode === DOWN_ARROW) {
		Matter.Body.setStatic(starBody,false); 
	}

	//write code to move fairy left and right
	if(keyDown("right")){
		fairyBody.position.x = fairyBody.position.x + 10;
	}
	else if(keyDown("left")){
		fairyBody.position.x = fairyBody.position.x - 10;
	}
}
