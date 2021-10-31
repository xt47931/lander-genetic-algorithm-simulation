let terrain;
let lander;

function setup() {
  createCanvas(800, 600);
  terrain = new Terrain(random(25 * 10 ** (-5), 25 * 10 ** (-3)));
  lander = new Lander(terrain);
}

function draw() {
  background(0, 0, 0);
  terrain.draw();
  lander.draw();
  lander.update();
}