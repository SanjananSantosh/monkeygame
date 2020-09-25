
var monkey , monkey_running, ground
var banana ,bananaImage, obstacle, obstacleImage,sprite1, sprite1Image, stone, food
var survivalTime,obstacleGroup  , bananaGroup

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
 
}



function setup() {
  createCanvas(600,400)
  
  ground = createSprite(400,350,1200,20);
  ground.velocityX=-4;
  ground.x=ground.width/2
 
  
  monkey = createSprite(80,315,20,10);
  monkey.addAnimation("moving",monkey_running)
  monkey.scale=0.1
  
  survivalTime=20
  
  bananaGroup=createGroup();
  obstacleGroup=createGroup();
}


function draw() {
background(200)
  
  
  textSize(25)
  fill("black")
  survivalTime=Math.ceil(frameCount/frameRate())
  text("Survival Time: "+survivalTime,100,50);
  
 
  
  monkey.collide(ground)
  
   if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
  if(keyDown("space")&& monkey.y >= 100) {
      monkey.velocityY = -12;
        
    }
  
  spawnObstacles();
  spawnBanana();
    
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8
  
  
if(monkey.isTouching(bananaGroup)){
  bananaGroup.destroyEach()
}

if(monkey.isTouching(obstacleGroup)){
  ground.velocityX = 0;
  monkey.velocityY = 0;
  obstacleGroup.setVelocityXEach(0);                bananaGroup.setVelocityXEach(0);      obstacleGroup.setLifetimeEach(-1); 
  bananaGroup.setLifetimeEach(-1); 
  survivalTime=0;
}

drawSprites();
}

function spawnObstacles(){
 if (frameCount % 200 === 0){
   obstacle = createSprite(500,315,20,10)
   obstacle.velocityX = -10;
   obstacle.addImage(obstacleImage)
   
    //generate random obstacles
   
    
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.2;
    obstacle.lifetime = 50;
   obstacleGroup.add(obstacle)
    }
}

function spawnBanana(){
  
  if (frameCount % 80 === 0){
   banana = createSprite(500,200,20,10)
   banana.velocityX = -9;
   banana.addImage(bananaImage)
   
    
     banana.y=Math.round(random(50,340));
    
   
    //assign scale and lifetime to the obstacle           
    banana.scale = 0.1;
    banana.lifetime = 80;
    bananaGroup.add(banana)
    }
}





