class Terrain {
  constructor(gravity) {
    this.gravity = gravity;

    let atmosphericPressure = randomGaussian(this.gravity * 10 ** 3 / 8, this.gravity * 10 ** 3 / 12);
    this.atmosphericPressure = atmosphericPressure > 0 ? atmosphericPressure : 0;

    let wind = randomGaussian(this.atmosphericPressure * 3, this.atmosphericPressure) / Math.sqrt(10 ** 3);
    this.wind = round(random()) ? wind : - wind;

    this.terrainColor = color(random(0, 255), random(0, 255), random(0,255));

    this.atmosphereColor = color(random(0, 255), random(0, 255), random(0,255));

    let terrainSmoothness = randomGaussian(150, 50);
    this.terrainSmoothness = terrainSmoothness > 50 ? terrainSmoothness : 50;
  }
  
  //perhaps add stars to background with full brightness for terrains with no atmosphere?
  draw() {
    noStroke();
    fill(red(this.atmosphereColor), green(this.atmosphereColor), blue(this.atmosphereColor), this.atmosphericPressure * 255 / 3);
    rect(0, 0, width, height);
    stroke(this.terrainColor);
    strokeWeight(1);
    for (var i = 0; i < width + 1; i++) {
        line(i, height, i, height - noise(i / this.terrainSmoothness) * (height / 6));    
    }
    noStroke();
    fill(255);
    text("Gravity: " + Math.round(this.gravity * 10 ** 5) / 10 ** 2, width * 8 / 9, height / 8);
    text("Atmospheric \nPressure: " + Math.round(this.atmosphericPressure * 10 ** 3) / 10 ** 3, width * 8 / 9, height * 5 / 32);
    text("Wind: " + Math.round(this.wind * Math.sqrt(10 ** 3) * 10 ** 2) / 10 ** 2, width * 8 / 9, height * 7 / 32);
  }
}