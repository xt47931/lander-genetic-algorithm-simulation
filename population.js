class Population {
  constructor(m, num, terrain) {
    this.mutationRate = m;
    this.population = new Array(num);
    this.generations = 0;
    this.terrain = terrain;
    for (let i = 0; i < this.population.length; i++) {
      this.population[i] = new Lander(this.terrain, new DNA());
    }
  }
  live() {
    for (let i = 0; i < this.population.length; i++) {
      this.population[i].draw();
      if (!this.population[i].collide()) {
        this.population[i].update();
      }
    }
  }
  selection() {
    let totalFitness = 0;
    for (let i = 0; i < this.population.length; i++) {
      totalFitness += this.population[i].fitnessScore;
    }
    this.fitnessNormal = [0];
    for (let i = 0; i < this.population.length; i++) {
      this.fitnessNormal.push(this.population[i].fitnessScore / totalFitness + this.fitnessNormal[this.fitnessNormal.length - 1]);
    }
  }
  reproduction() {
    let newPopulation = [];
    for (let i = 0; i < this.population.length; i++) {
      let r1 = random();
      let r2 = random();
      let p1;
      let p2;
      for (let i = 0; i < this.fitnessNormal.length; i++) {
        if (r1 < this.fitnessNormal[i]) {
          p1 = this.population[i - 1];
        }
        if (r2 < this.fitnessNormal[i]) {
          p2 = this.population[i - 1];
        }
      }
      let cGenes = p1.dna.crossover(p2.dna);
      cGenes.mutate(this.mutationRate);
      newPopulation.push(new Lander(this.terrain, cGenes));
    }
    this.population = newPopulation;
    this.generations++;
  }
  generate() {
    let allCollided = true;
    for (let i = 0; i < this.population.length; i++) {
      if (!this.population[i].collide()) {
        allCollided = false;
      }
    }
    if (allCollided) {
      this.selection();
      this.reproduction();
    }
  }
  draw() {
    noStroke();
    fill(255);
    text("Generation: " + this.generations, width * 1 / 36, height / 8);
  }
}