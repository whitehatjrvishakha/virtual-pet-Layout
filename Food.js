class Food {
  constructor() {
    this.foodStock = 20;

    this.lastFed;
    this.image = loadImage("Milk.png");
  }

  getFoodStock() {
    var foodStockref = database.ref("Food");
    foodStockref.on("value", function (data) {
      foodS = data.val();
    });
  }

  updateFoodStock(count) {
    database.ref("/").update({
      Food: count,
    });
  }
  display() {
    var x = 50;
    var y = 100;

    imageMode(CENTER);
    image(this.image, 720, 220, 70, 70);
    if (this.foodS != 0) {
      for (var i = 0; i < foodS; i++) {
        if (i % 10 === 0) {
          x = 80;
          y = y + 50;
        } //images not used by me as i have nt uploaded the images
        image(this.image, x, y, 50, 50);
        x = x + 30;
      }
    }
  }
}
