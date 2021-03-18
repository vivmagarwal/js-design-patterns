console.log('factory-design-pattern works!!');

// ===================================================== //
// Product class
// ===================================================== //
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


// ===================================================== //
// Product Subclasses - concrete product's
// ===================================================== //

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

class NYStyleGreekPizza extends Pizza {
  constructor(pizzaName = "Newyork Greek Pizza", dough = "Greek dough", sauce = "Greek sauce", toppings = ["Greek spices", "Some Cheeze"]) {
    super(pizzaName, dough, sauce, toppings);
  }
}

class ChichagoStyleGreekPizza extends Pizza {
  constructor(pizzaName = "Chicago Greek Pizza", dough = "Greek dough", sauce = "Greek sauce", toppings = ["Greek spices", "Lot's of Cheeze"]) {
    super(pizzaName, dough, sauce, toppings);
  }
}

class PepperoniPizza extends Pizza {
  constructor(pizzaName = "Plain Pepperoni Pizza", dough, sauce = "Peeper sauce", toppings = ["Peeper"]) {
    super(pizzaName, dough, sauce, toppings);
  }
}

class NYStylePepperoniPizza extends Pizza {
  constructor(pizzaName = "NY Style Pepperoni Pizza", dough, sauce = "Peeper sauce", toppings = ["Peeper"]) {
    super(pizzaName, dough, sauce, toppings);
  }
}

class ChichagoStylePepperoniPizza extends Pizza {
  constructor(pizzaName = "Chichago style Pepperoni Pizza", dough, sauce = "Peeper sauce", toppings = ["Peeper"]) {
    super(pizzaName, dough, sauce, toppings);
  }
}

// ===================================================== //
// Simple factory (abstract) class
// ===================================================== //
class SimplePizzaFactory {
  createPizza = function (pizzaType = "cheese") {
    let pizza;
    if (pizzaType == "cheese") {
      pizza = new CheesePizza();
    } else if (pizzaType == "greek") {
      pizza = new GreekPizza();
    } else if (pizzaType == "pepperoni") {
      pizza = new PepperoniPizza();
    }
    return pizza;
  }
}

// ===================================================== //
// Concrete Simple factory subclasses
// ===================================================== //

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
      pizza = new NYStylePepperoniPizza();
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
      pizza = new ChichagoStylePepperoniPizza();
    }
    return pizza;
  }
}

// ===================================================== //
// Creator class (kind of abstract) :: the client code
// ===================================================== //
class PizzaStore {
  // Client: This method is not required to be overridden; It just uses the pizza that the createPizza - factory method - returns
  // here it doesnot know what will it get back, it depends on the implementation of createPizza by it's subclasses
  // that's its important that all the pizza (product) implement a common interface
  orderPizza = function (type) {
    let pizza = this.createPizza(type);
    pizza.prepare();
    pizza.bake();
    pizza.cut();
    pizza.box();
    return pizza;
  }

  // instead of injecting a factory object we have this abstract method here which could be overridden by the subclasses of the PizzaStore.
  createPizza = function (pizzaType = "cheese") {
    let pizza;
    if (pizzaType == "cheese") {
      pizza = new CheesePizza();
    } else if (pizzaType == "greek") {
      pizza = new GreekPizza();
    } else if (pizzaType == "pepperoni") {
      pizza = new PepperoniPizza();
    }
    return pizza;
  }
}

// ===================================================== //
// Concrete crator classes :: subclasses that extends creator and overrided the createPizza() method
// ===================================================== //

// This subclass is fully responsible for which concrete pizza it instantiates.
// NYPizzaStore extends PizzaStore, so it inherits the orderPizza() method.
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
    }
    return pizza;
  }
}

// ===================================================== //
// Usage
// ===================================================== //

let ny_pizza_store_one = new NyStypePizzaStore();
ny_pizza_store_one.orderPizza("greek");