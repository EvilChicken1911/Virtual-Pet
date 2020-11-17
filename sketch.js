var dog, happydog, database, foodS, foodStock;
var Dog;

function preload()
{
  dog = loadImage("images/dogImg.png");
  happydog = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500,500);
  database = firebase.database();
  Dog = createSprite(250,300,150,150);
  Dog.addImage(dog);
  Dog.scale = 0.15;
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  textSize(20);
  
}


function draw() {  
  background(46,139,87);
  if(keyWentDown(UP_ARROW))
  {
    writeStock(foodS);
    Dog.addImage(happydog);
  }
  drawSprites();
  fill("white");
  text("Food remaining" + foodS, 170, 200);
  textSize(13);
  text("Press up arrow to feed the dog.", 130, 10, 300, 20);
}

function readStock(data)
{
  foodS = data.val();
}

function writeStock(x){
  if(x <= 0)
  {
    x = 0  
  }
  else
  {
    x = x-1;
  }
  database.ref('/').update({Food:x});
}


