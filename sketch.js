var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloud, cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var dieSound
var jumpSound
var score;
var gameover,gameoverImg,restart,restartImg
var message

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  gameoverImg = loadImage("gameOver.png")
  restartImg = loadImage("restart.png")
  dieSound = loadSound("die.mp3")
  jumpSound = loadSound("jump.mp3")

  
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided" , trex_collided)
  trex.scale = 0.5;
  trex.debug = true
  trex.setCollider("circle",0,0,40)
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  gameover = createSprite(width/2,height/2-110)
  gameover.addImage(gameoverImg)
  restart = createSprite(width/2,height/2-160)
  restart.addImage(restartImg)
  gameover.visible = false
  restart.visible = false
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  // create Obstacles and Cloud groups
  obstaclesGroup = new Group();
  cloudsGroup = new Group();
  
  console.log("Hello" + 5);
  
  score = 0;
   message = "red"
}

function draw() {
  background(180);
  text("Score: "+ score, 500,50);
  console.log(message)

  
  if(gameState === PLAY){
    //move the ground
    ground.velocityX = -4;
    score = score + Math.round(getFrameRate()/60);
     if(keyDown("space")&& trex.y >= 100) {
      jumpSound.play()
    trex.velocityY = -13;
  }
  
  trex.velocityY = trex.velocityY + 0.8
    if (ground.x < 0){
    ground.x = ground.width/2;
  }
   //spawn the clouds
  spawnClouds();
  
  //spawn obstacles on the ground
  spawnObstacles();
  if (obstaclesGroup.isTouching(trex)) {
    dieSound.play()
    gameState = END
  }
 
  }
  else if(gameState === END){
    //stop the ground
    ground.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0)
    cloudsGroup.setVelocityXEach(0)
    obstaclesGroup.setLifetimeEach(-1)
    cloudsGroup.setLifetimeEach(-1)
    trex.changeAnimation("collided")
    trex.velocityY = 0
    gameover.visible = true
    restart.visible = true
    if(mousePressedOver(restart)){
     reset()
    }
  }
  function reset(){
    gameState = PLAY
    gameover.visible = false
    restart.visible = false
    obstaclesGroup.destroyEach()
    cloudsGroup.destroyEach()
    trex.changeAnimation("running")
    score = 0
  }
  
 
  

  
  trex.collide(invisibleGround);
  

  drawSprites();
}

function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(165,165,10,40);
   obstacle.velocityX = -6;

   
    // //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
   
   //adding obstacles to the group
   obstaclesGroup.add(obstacle);
 }
}




function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
     cloud = createSprite(600,100,40,10);
    cloud.y = Math.round(random(10,60));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 134;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //adding cloud to the group
   cloudsGroup.add(cloud);
  }
  
}