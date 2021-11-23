var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
 // spookySound.loop();
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 9
 ghost=createSprite(300,300)
ghost.addImage(ghostImg)
ghost.scale=0.5
invisibleBlockGroup=new Group()
climbersGroup=new Group()
doorsGroup=new Group();
}

function draw(){
  background(0);
  if(gameState==="play")
  {
    if(tower.y>600){
      tower.y=300
      }
      if(keyDown("left")){
      ghost.x-=4
      }
      if(keyDown("right")){
        ghost.x+=4
      }
      if(keyDown("space")){
        ghost.velocityY=-10;
      }
      ghost.velocityY+=0.5;
      if(ghost.isTouching(invisibleBlockGroup)||ghost.y>600)
      {
        tower.velocityY=0;
        gameState="end"
      }
      if(ghost.isTouching(climbersGroup))
      {
        ghost.velocityY=0;
        
      }
spawnDoors()
drawSprites()
  }
if(gameState=="end")
{
  fill("blue")
  textSize(25)
  text("GAME OVER",150,280)
}

}

function spawnDoors() {
  //write code here to spawn the doors in the tower
  if (frameCount % 240 === 0) {
 door=createSprite(Math.round(random(100,500)),-50)
door.addImage(doorImg)
door.velocityY=9 
door.lifetime=600
ghost.depth=door.depth+1

climber=createSprite(door.x,door.y+50)
climber.addImage(climberImg)
climber.velocityY=9 
climber.lifetime=600
ghost.depth=climber.depth+1

invisibleBlock=createSprite(climber.x,climber.y+20,climber.width,3)
invisibleBlock.visible=false
invisibleBlock.velocityY=9 
invisibleBlock.lifetime=600

invisibleBlockGroup.add(invisibleBlock);
climbersGroup.add(climber);
doorsGroup.add(door);
}
}

