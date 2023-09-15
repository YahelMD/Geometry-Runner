var PLAY = 1;
var END = 0;
var gameState = PLAY;
var block, blockImage, blocksGroup;

var trex;
var ground, invisibleGround, groundImage;
var background, backgroundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score=0;

var gameOver, restart;


function preload(){
 trexImage = loadImage("hex.png")
 backgroundImage = loadImage("backg.jpg")
 blockImage = loadImage("block.png")
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,20);
  trex.addImage("trex",trexImage)
 
  trex.scale = 0.30;
  
  ground = createSprite(400,190,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -(6 + 3*score/100);
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  blocksGroup = new Group();
  
  score = 0;
}

function draw() {
  //trex.debug = true;
  background(backgroundImage);
  text("Puntuación: "+ score, 500,50);
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(5.8 + 3*score/100);
    //cambiar la animación del Trex
  
    
    if(keyDown("space") && trex.y >= 159) {
      trex.velocityY = -12;
    }
  
    trex.velocityY = trex.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    trex.collide(invisibleGround);
    spawnClouds();
    spawnObstacles();
    spawnBlocks();
  
    if(obstaclesGroup.isTouching(trex)){
        gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;

    if(blocksGroup.isTouching(trex)){
        trex.collide(blocksGroup, block);
    }
    
    //establecer la velocidad de cada objeto del juego como 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    blocksGroup.setVelocityXEach(0);
    
    //cambiar la animación del Trex
 
    
    //establecer lifetime (ciclo de vida) de los objetos del juego para que no sean destruidos nunca
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    blocksGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  
  drawSprites();
}

function spawnClouds() {
  //escribir aquí el código para aparecer las nubes
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //asignar ciclo de vida a la variable
    cloud.lifetime = 200;
    
    //ajustar la profundidad
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
   
    
    
    
    //agregar cada nuble al grupo
    cloudsGroup.add(cloud);
  }
  
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  blocksGroup.destroyEach();
  score = 0;
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,180,10,40);
   // obstacle.debug = true;
    obstacle.velocityX = -(6.7 + 3*score/100);
    
    //generar obstáculos al azar
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
    
    //asignar escala y ciclo de vida al obstáculo           
    obstacle.scale = 0.15;
    obstacle.lifetime = 300;
    //agregar cada obstáculo al grupo
    obstaclesGroup.add(obstacle);
    
   
  }
}
function spawnBlocks() {
  if(frameCount % 60 === 0) {
    var block = createSprite(2032,180,60,60);
    
   block.debug = true;
    block.velocityX = -(8.5 + 3*score/100);
    
    
    //generar obstáculos al azar
    var rand = Math.round(random(1,6));
    switch(rand) {
    default:  block.addImage(blockImage);
              break;
      
    }
    
    //asignar escala y ciclo de vida al obstáculo           
    block.scale = 0.9;
    block.lifetime = 300;
    //agregar cada obstáculo al grupo
    blocksGroup.add(block);
  }
}

