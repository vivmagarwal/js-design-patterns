

// abstract class
class Bevarage {
  constructor() {
    this.description = 'unknown beverage'
  }

  getDescription() {
    return (this.description);
  }

  // abstract method
  cost() {}
}

// concrete bevarage
class Espresso extends Bevarage {
  constructor() {
    super();
    this.description = "Espresso shot";
  }

  cost() {
    return 1.99;
  }
}

// concreate bevarage
class HouseBlend extends Bevarage {
  constructor() {
    super();
    this.description = "House blend coffee"
  }

  cost() {
    return .89;
  }
}

// concreate bevarage
class Decaf extends Bevarage {
  constructor() {
    super();
    this.description = "Decaf"
  }

  cost() {
    return 1.05;
  }
}

// concreate bevarage
class DarkRoast extends Bevarage {
  constructor() {
    super();
    this.description = "Dark Roast"
  }

  cost() {
    return 1;
  }
}

// abstract decorator class
class CondimentDecorator extends Bevarage {
  constructor() {
    super();
    this.decorator = null;
  }

  getDescription() {}
}

class Mocha extends CondimentDecorator {
  constructor(beverage) {
    super();
    this.beverage = beverage;
  }

  getDescription() {
    return `${this.beverage.getDescription()} + Mocha`;
  }

  cost() {
    return this.beverage.cost() + .20;
  }
}

class Whip extends CondimentDecorator {
  constructor(beverage) {
    super();
    this.beverage = beverage;
  }

  getDescription() {
    return `${this.beverage.getDescription()} + Whip`;
  }

  cost() {
    return this.beverage.cost() + .25;
  }
}

// Caller / client / usage
let esp = new Espresso();
console.log(esp.getDescription(), esp.cost()); // Espresso shot 1.99

let drost = new DarkRoast();
console.log(drost.getDescription(), drost.cost()); // Dark Roast 1

drost = new Mocha(drost);
console.log(drost.getDescription(), drost.cost()); // Dark Roast + Mocha 1.2

drost = new Mocha(drost);
console.log(drost.getDescription(), drost.cost()); // Dark Roast + Mocha + Mocha 1.4

drost = new Whip(drost);
console.log(drost.getDescription(), drost.cost()); // Dark Roast + Mocha + Mocha + Whip 1.65