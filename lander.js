//velocity over some threshold when landing is a crash
class Lander {
  constructor(terrain) {
    this.pos = createVector(width / 3, height / 8);
    this.vel = createVector(terrain.wind, 0);
    this.acc = createVector(0, terrain.gravity);
    this.drag = 0;
    this.temperature = 273;
    this.heading = 0;
    //genetic algorithm stuff
    this.fitnessScore = 0;
  }
  draw() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.heading);
    translate(-this.pos.x, -this.pos.y);
    fill(255);
    noStroke();
    ellipse(this.pos.x, this.pos.y, 6, 6);
    strokeWeight(1);
    stroke(255);
    line(this.pos.x - 4, this.pos.y + 6, this.pos.x - 3, this.pos.y + 6);
    line(this.pos.x - 0.5, this.pos.y + 6, this.pos.x + 0.5, this.pos.y + 6);
    line(this.pos.x + 3, this.pos.y + 6, this.pos.x + 4, this.pos.y + 6);
    line(this.pos.x, this.pos.y, this.pos.x - 3.5, this.pos.y + 6);
    line(this.pos.x, this.pos.y, this.pos.x, this.pos.y + 6);
    line(this.pos.x, this.pos.y, this.pos.x + 3.5, this.pos.y + 6);
    pop();
  }
  update() {
    this.drag = this.vel.mag() ** 2 * 8 * terrain.atmosphericPressure * 0.6 / 450;
    let accDueToDrag = createVector(-this.drag * cos(this.vel.heading()), -this.drag * sin(this.vel.heading()));
    this.temperature += this.drag * 450 * this.vel.mag();
    let torque = accDueToDrag.x * 6;
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.vel.add(accDueToDrag);
    this.heading += torque;
    if (this.collide()) {
      //penalize collision impulse
      this.fitnessScore -= this.vel.mag() * 450;
      this.vel = createVector(0, 0);
      this.acc = createVector(0, 0);
      //penalize lander not sitting properly on terrain when landed
      this.fitnessScore -= (noise((this.pos.x + 1) / terrain.terrainSmoothness) * (height / 6) - noise(this.pos.x / terrain.terrainSmoothness) * (height / 6) - tan(PI - this.heading)) ** 2 * 100;
    }
    noStroke();
    fill(255);
    text("Lander Velocity: [" + Math.round(this.vel.x * 10 ** 2) / 10 ** 2 + ", " + Math.round(this.vel.y * 10 ** 2) / 10 ** 2 + "]", width * 1 / 36, height / 8);
    text("Drag: " + Math.round(this.drag * 10 ** 4) / 10 ** 4, width * 1 / 36, height * 5 / 32);
    text("Temperature: " + Math.round(this.temperature * 10) / 10, width * 1 / 36, height * 3 / 16);
    text("Momentum: " + Math.round(this.vel.mag() * 450 * 10 ** 2) / 10 ** 2, width * 1 / 36, height / 4);
    if (this.temperature > 1400 && !this.collide()) {
      //penalize overheating
      this.fitnessScore = -(this.temperature - 1400);
      fill(255, 0, 0);
      text("Overheating!", width * 1 / 36, height * 7 / 32);
    }
    fill(255);
    text("Fitness Score: " + this.fitnessScore, width * 1 / 36, height * 11 / 32);
  }
  collide() {
    for (var x = Math.floor(this.pos.x - 3); x <= Math.ceil(this.pos.x + 3); x++) {
      // check (x, height-noise(x/terrainSmoothness)*(height/6))) if it collides
      if ((x - this.pos.x) ** 2 + (height - noise(x / terrain.terrainSmoothness) * (height / 6) - this.pos.y) ** 2 < 9) {
        return true;    
      }
    }
    return false;
  }
}