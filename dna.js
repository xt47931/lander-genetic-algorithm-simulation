class DNA {
  constructor(newgenes) {
    this.elements = 10000;
    if (newgenes) {
      this.genes = newgenes;
    } else {
      this.genes = [];
      for (let i = 0; i < this.elements; i++) {
        let xThrust = createVector(random(-0.1, 0.1), 0);
        let yThrust = createVector(0, random(0, -0.0005));
        this.genes.push(p5.Vector.add(xThrust, yThrust));
      }
    }
  }
  crossover(partner) {
    let child = [];
    for (let i = 0; i < this.elements; i++) {
      child.push(p5.Vector.add(this.genes[i], partner.genes[i]).mult(0.5))
    }
    return new DNA(child);
  }
  mutate(m) {
    for (let i = 0; i < this.genes.length; i++) {
      if (random() < m) {
        this.genes[floor(random(0, this.elements))] = createVector(random(-1, 1), random(0, 2));
      }
    }
  }
}