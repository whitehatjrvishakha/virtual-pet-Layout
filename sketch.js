var dog;
var database;
var foodS, foodStock;
var happydogimage, dogimage;
var foodObj;
var feedTime, lastFed;

function readstock(data) {
  foodS = data.val();
}

function preload() {
  //dogimage = loadImage("Dog.png")
  //happydogimage = loadImage("happydog.png")
  //images I have not loaded
}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);

  foodObj = new Food();

  dog = createSprite(450, 350, 20, 50);
  dog.addImage(dogimage);
  dog.scale = 0.15;

  foodStock = database.ref("Food");
  foodStock.on("value", readstock);

  feedTime = database.ref("FeedTime");
  feedTime.on("value", function (data) {
    lastFed = data.val();
  });

  feed = createButton("Feed The Dog");
  feed.position(400, 65);
  feed.mousePressed(feedDog);

  addfood = createButton("Add Food");
  addfood.position(510, 65);
  addfood.mousePressed(addFoods);
}

function draw() {
  background(46, 139, 87);

  foodObj.display();
  foodObj.getFoodStock();

  drawSprites();

  fill(255);
  textSize(15);
  text("Milk Left:" + foodS, 250, 30);

  fill(200, 255, 100);
  textSize(15);
  if (lastFed > 12 && lastFed < 24) {
    text("Last Fed :" + (lastFed % 12) + "PM", 350, 30);
  } else if (lastFed === 24) {
    text("Last Fed : 12 PM", 350, 30);
  } else {
    text("Last Fed :" + lastFed + "AM", 350, 30);
  }
}
function feedDog() {
  dog.addImage(happydogimage);
  var h;
  h = hour();

  foodObj.updateFoodStock(foodS - 1);
  database.ref("/").update({
    Food: foodObj.getFoodStock(),
    FeedTime: h,
  });
}
function addFoods() {
  foodS++;
  database.ref("/").update({
    Food: foodS,
  });
}
