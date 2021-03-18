console.log('factory-design-pattern works!!');

// ===================================================== //
// Example - iPhone Factory [extremely generic]
class Phone {
  constructor(serialNum, model = 'Generic', RAM = '2 Gb', camera = '720p') {
    this.serialNum = serialNum;
    this.configuration = {
      model,
      RAM,
      camera
    }
  }

  dial(num) {
    console.log(`Dialing ${num}.. from my ${this.configuration.model}`);
  }

  displayConfig() {
    console.log(this.serialNum, this.configuration);
  }
}

// Usage:
const iPhone_xr = new Phone('IPXR-001', 'iPhone Xr', '3 Gb', '1080p');
// iPhone_xr.displayConfig();
// iPhone_xr.dial(123412341234);

// ===================================================== //
// Example - iPhone XR, XS & S Factory [a bit specific]
class iPhoneXRFactory {
  constructor(serialNum) {
    return new Phone(serialNum, 'iPhone Xr', '3 Gb', '1080p');
  }
}

class iPhoneXSFactory {
  constructor(serialNum) {
    return new Phone(serialNum, 'iPhone Xs', '2 Gb', '720p');
  }
}

class iPhoneSFactory {
  constructor(serialNum) {
    return new Phone(serialNum, 'iPhone S', '1 Gb', '480p');
  }
}

// Usage: 
const iPhoneXr2 = new iPhoneXRFactory('IPXR-002');

// iPhoneXr2.displayConfig();
// iPhoneXr2.dial(12341234);

const iPhoneXr3 = new iPhoneXRFactory('IPXR-003');
// iPhoneXr3.displayConfig();
// iPhoneXr3.dial(12341234);

// ===================================================== //
// Example - Abstract factory

class iPhoneAbstractFactory {
  create(type, serialNum) {
    switch (type) {
      case 's':
        return new iPhoneSFactory(serialNum);
      case 'xs':
        return new iPhoneXSFactory(serialNum);
      case 'xr':
        return new iPhoneXRFactory(serialNum);
      default:
        console.log('Unknown type...');
    }
  }
}

// Usage:
const iPhoneAbstractFactorySingleton = new iPhoneAbstractFactory;

const iPhoneXr4 = iPhoneAbstractFactorySingleton.create('xr', 'IPXR-004');
const iPhoneXs1 = iPhoneAbstractFactorySingleton.create('xs', 'IPXS-001');
const iPhoneS1 = iPhoneAbstractFactorySingleton.create('s', 'IPS-001');

// iPhoneXr4.displayConfig();
// iPhoneXs1.displayConfig();
// iPhoneS1.displayConfig();
// iPhoneS1.dial(98769876);

// ===================================================== //

// Actor Interface/Superclass


class Animal {
  constructor(say, numberOfLegs, hasWings, canfly) {
    this.say = say;
    this.numberOfLegs = numberOfLegs;
    this.hasWings = hasWings;
    this.canfly = canfly;
  }

  getDetails() {
    console.log(`${this.constructor.name} :: has ${this.numberOfLegs} legs, it ${this.canfly ? 'can' : 'cant'} fly & says ${this.say}`);
  }
}

// Creator Interface/Superclass
class AnimalFactory {

}

// may be it just has concrete classes for mamals, birds etc...

// Concrete Actors
class Dog extends Animal {
  constructor(color, size) {
    super("Woof Woof", 4, false, false)
    this.color = color;
    this.size = size;
  }
}

class Cat extends Animal {
  constructor(color, size) {
    super("Woof Woof", 4, false, false)
    this.color = color;
    this.size = size;
  }
}

class Duck extends Animal {
  constructor(color, size) {
    super("Woof Woof", 4, false, false)
    this.color = color;
    this.size = size;
  }
}

// Concrete Creators
class RandomAnimalFactory extends AnimalFactory {

}

class BalancedAnimalFactory extends AnimalFactory {

}


var duck1 = new Duck("Yellow", "medium");
duck1.getDetails();

// ===================================================== //

let NotificationObject = {
  operating_system: 'MAC OS',
  control_key: 'cmd',
  alt_key: 'opt',
  enter_key: 'Enter',
  environment: 'LOCAL',
  notify: function () {
    console.log(`
    ${this.operating_system} NOTICE ::: Your environment is ${this.environment}
    please press ${this.control_key} + ${this.alt_key} + ${this.enter_key} to proceed
    `);
  }
}

console.log('=======================================');

// ===================================================== //

// function orderPizza(type) {
//   let pizza;

//   // Based on type of pizza (runtime), we instantiate the correnct concrete class.
//   // this code is not closed for modification. If the pizza store changes it's pizza offerings, we will have to modify it.
//   // clearly, which concrete class is instatiated, is preventing our `orderPizza()` method from being closed for modificaiton.
//   if (type == "cheese") {
//     pizza = new CheesePizza();
//   } else if (type == "greek") {
//     pizza = new GreekPizza();
//   } else if (type == "pepperoni") {
//     pizza = new PepperoniPizza();
//   } else if (type == "calm") {
//     pizza = new CalmPizza();
//   } else if (type == "veggie") {
//     pizza = new VeggiePizza();
//   }

//   // We expect the following to remain the same
//   pizza.prepare();
//   pizza.bake();
//   pizza.cut();
//   pizza.box();

//   return pizza;
// }

// Our first step towards making our `orderPizza()` method closed for modifation, could be to take the 
// creation code and move it out to another object that is only going to be concerned with creating pizzas.
// We've got a name for this new object: we call it a Factory

/**
 * Factories handle the details of object creation. Once we have a SimplePizzaFactory, our orderPizza()
 * method becomes a client of that object. Anytime, it needs a pizza, it asks the pizza factory to make one.
 */

// the simple pizza factory has one job in life: creating pizzas for its client code. it may have many client like 
// orderPizza() , pizzaSample() , onlineOrder(), homeDelivery(), pizzaShopMenu() & so on...



class SimplePizzaFactory {
  createPizza = function (pizzaType = "cheese") {
    let pizza;
    if (pizzaType == "cheese") {
      pizza = new CheesePizza();
    } else if (pizzaType == "greek") {
      pizza = new GreekPizza();
    } else if (pizzaType == "pepperoni") {
      pizza = new PepperoniPizza();
    } else if (pizzaType == "calm") {
      pizza = new CalmPizza();
    } else if (pizzaType == "veggie") {
      pizza = new VeggiePizza();
    }
    return pizza;
  }
}

// The intention of creating a factory for making NY-Style
class NYStylePizzaFactory extends SimplePizzaFactory {
  constructor() {
    super();
  }

  createPizza = function (pizzaType = "cheese") {
    let pizza;
    if (pizzaType == "cheese") {
      pizza = new NYStyleCheesePizza();
    } else if (pizzaType == "greek") {
      pizza = new NYStyleGreekPizza();
    } else if (pizzaType == "pepperoni") {
      pizza = new PepperoniPizza();
    } else if (pizzaType == "calm") {
      pizza = new CalmPizza();
    } else if (pizzaType == "veggie") {
      pizza = new VeggiePizza();
    }
    return pizza;
  }
}

class ChicagoStylePizzaFactory extends SimplePizzaFactory {
  constructor() {
    super();
  }

  createPizza = function (pizzaType = "cheese") {
    let pizza;
    if (pizzaType == "cheese") {
      pizza = new ChichagoStyleCheesePizza();
    } else if (pizzaType == "greek") {
      pizza = new ChichagoStyleGreekPizza();
    } else if (pizzaType == "pepperoni") {
      pizza = new PepperoniPizza();
    } else if (pizzaType == "calm") {
      pizza = new CalmPizza();
    } else if (pizzaType == "veggie") {
      pizza = new VeggiePizza();
    }
    return pizza;
  }
}




// orderPizza() is defined in this abstract PizzaStore, not the subclasses. So the method has no idea which subclass is acutally running the code and making the pizzas.
class PizzaStore {
  // constructor(factory) {
  //   this.factory = factory;
  // }


  // orderPizza() calls createPizza() to actually get a pizza object. But which kind of pizza will it get?
  // The orderPizza() method can't decide ; it deosn't know how. So who doed decide?
  // Well, that is decided by the choice of pizza store you ordered from: NYStylePizzaStore or ChichagoStylePizzaStore
  
  // from the prespective of orderPizza(), if you choose NYStylePizzaStore, that subclass gets to determine which pizza is made.
  orderPizza = function (type) {
    let pizza = this.createPizza(type);
    pizza.prepare();
    pizza.bake();
    pizza.cut();
    pizza.box();
    return pizza;
  }

  // some default implementation here.
  // All the responsibility for instantiating Pizzas has been moved to a method that acts as a factory.
  createPizza = function (pizzaType = "cheese") {
    let pizza;
    if (pizzaType == "cheese") {
      pizza = new CheesePizza();
    } else if (pizzaType == "greek") {
      pizza = new GreekPizza();
    } else if (pizzaType == "pepperoni") {
      pizza = new PepperoniPizza();
    } else if (pizzaType == "calm") {
      pizza = new CalmPizza();
    } else if (pizzaType == "veggie") {
      pizza = new VeggiePizza();
    }
    return pizza;
  }

}

// This subclass is fully responsible for which concrete pizz it instantiates.
// NYPizzaStore extends PizzaStore, so it inherits the orderPizza() method.

// With just a couple of transformations to the pizzaStore class, 
// we've gone from having an object handle the instantiation of our concrete classes to a set of subclasses that are 
// now taking the responsibility.
class NyStypePizzaStore extends PizzaStore {
  constructor() {
    super();
  }

  // orderPizza() : the orderPizza() method in the superclass has no clue which Pizza we are creating; it just knows it can prepare, bake, cut and box it.
  // overridding/implementing just the createPizza() method
  createPizza = function (pizzaType = "cheese") {
    let pizza;
    if (pizzaType == "cheese") {
      pizza = new NYStyleCheesePizza(); // instantiating the region specific pizza.
    } else if (pizzaType == "greek") {
      pizza = new NYStyleGreekPizza();  // instantiating the region specific pizza.
    } else if (pizzaType == "pepperoni") {
      pizza = new PepperoniPizza();
    } else if (pizzaType == "calm") {
      pizza = new CalmPizza();
    } else if (pizzaType == "veggie") {
      pizza = new VeggiePizza();
    }
    return pizza;
  }
}

class ChichagoStypePizzaStore extends PizzaStore {
  constructor() {
    super();
  }

  // overridding just the createPizza() method
  createPizza = function (pizzaType = "cheese") {
    let pizza;
    if (pizzaType == "cheese") {
      pizza = new ChichagoStyleCheesePizza(); // instantiating the region specific pizza.
    } else if (pizzaType == "greek") {
      pizza = new ChichagoStyleGreekPizza();  // instantiating the region specific pizza.
    } else if (pizzaType == "pepperoni") {
      pizza = new PepperoniPizza();
    } else if (pizzaType == "calm") {
      pizza = new CalmPizza();
    } else if (pizzaType == "veggie") {
      pizza = new VeggiePizza();
    }
    return pizza;
  }
}

/*****************
 * Simple Factory
 * ***************
 * PizzaStore() is the client of the factory. the orderPizza() mehtod of the PizzaStore() invokes SimplePizzaFactory() to get instance of a pizza
 * SimplePizzaFactory() is the only part of our application that refers to cconcrete pizza classes
 * Pizza is the procut of the factory
 */

// Kind of an interface or an abstract class.
class Pizza {
  constructor(pizzaName = 'default pizza', dough = 'default dough', sauce = 'default sauce', toppings = []) {
    let default_topping = ['default topping1', 'default topping2'];
    this.pizzaName = pizzaName;
    this.dough = dough;
    this.sauce = sauce;
    this.toppings = [...default_topping, ...toppings];
  }

  prepare() {
    console.log(`Preparing ::: ${this.pizzaName} with ${this.toppings.join(' ,')}`);
  }

  bake() {
    console.log(`Baking for 25 minutes at 350`);
  }

  cut() {
    console.log(`Cutting the pizza into diagonal slices`);
  }

  box() {
    console.log(`Placing pizza in official Pizzastore box`);
  }

  getName() {
    return this.pizzaName;
  }
}

class CheesePizza extends Pizza {
  constructor(pizzaName = 'Plain Cheeze Pizza', dough, sauce, toppings = ['Extra Cheeze']) {
    super(pizzaName, dough, sauce, toppings);
  }
}

class NYStyleCheesePizza extends Pizza {
  constructor(pizzaName = 'NY Style Plain Cheeze Pizza', dough = "thin chrust", sauce, toppings = ['some Cheeze']) {
    super(pizzaName, dough, sauce, toppings);
  }

  cut() {
    console.log(`Cut the cheezy pizza in NY Style.`); 
  }
}
class ChichagoStyleCheesePizza extends Pizza {
  constructor(pizzaName = 'Chichago Style Plain Cheeze Pizza', dough = "thick chrust", sauce, toppings = ['lots of Cheeze']) {
    super(pizzaName, dough, sauce, toppings);
  }
}

class GreekPizza extends Pizza {
  constructor(pizzaName = "Plain Greek Pizza", dough = "Greek dough", sauce = "Greek sauce", toppings = ["Greek spices"]) {
    super(pizzaName, dough, sauce, toppings);
  }
}

class NYStyleGreekPizza extends GreekPizza {
  constructor(pizzaName = "Newyork Greek Pizza", dough = "Greek dough", sauce = "Greek sauce", toppings = ["Greek spices", "Some Cheeze"]) {
    super(pizzaName, dough, sauce, toppings);
  }
}

class ChichagoStyleGreekPizza extends GreekPizza {
  constructor(pizzaName = "Chicago Greek Pizza", dough = "Greek dough", sauce = "Greek sauce", toppings = ["Greek spices", "Lot's of Cheeze"]) {
    super(pizzaName, dough, sauce, toppings);
  }
}

class PepperoniPizza extends Pizza {
  constructor(pizzaName = "Plain Pepperoni Pizza", dough, sauce = "Peeper sauce", toppings = ["Peeper"]) {
    super(pizzaName, dough, sauce, toppings);
  }
}

class CalmPizza extends Pizza {
  constructor(pizzaName, dough, sauce, toppings) {
    super(pizzaName, dough, sauce, toppings);
  }
}

class VeggiePizza extends Pizza {
  constructor(pizzaName, dough, sauce, toppings) {
    super(pizzaName, dough, sauce, toppings);
  }
}


// implement this simpleFactory example first and make its notes in the readme before moving ahead.

let pizza_store_one = new NyStypePizzaStore();
console.log(pizza_store_one);

pizza_store_one.orderPizza("cheese");