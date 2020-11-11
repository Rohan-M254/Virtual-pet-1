//Create variables here
var dog,dogImage,dogImage1;
var database;
var foodS,foodStock;
function preload()
{
  //load images here
  dogImage = loadImage("images/dogImg.png")
  dogImage1 = loadImage("images/dogImg1.png")
}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);
  dog = createSprite(250,300,150,150)
  dog.addImage(dogImage)
  dog.scale=0.15
  foodStock = database.ref('Food')
  foodStock.on("value",readStock)
  textSize(20)
  
}


function draw() {  
  background(46,139,87)
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS)
    dog.addImage(dogImage1)
  }
  drawSprites();
  //add styles here
fill(255,255,254)
stroke("black")
text("Food Remaining: "+foodS,170,200)
textSize(13)
text("note: Press Up Arrow Key to feed Drago milk!",130,10,300,20)
}

function readStock(data){
  foodS = data.val()
}

function writeStock(x){
  if(x<=0){
    x=0
  } else{
    x = x-1
  }
  database.ref('/').update({
    Food:x
  })
}