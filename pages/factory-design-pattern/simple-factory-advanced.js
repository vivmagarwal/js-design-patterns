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
// Concrete factory classes
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

class ChicagoPizzaFactory extends SimplePizzaFactory {
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
// Creator class :: the client code
// ===================================================== //
class PizzaStore {
  constructor(factory) {
    this.factory = factory;
  }

  orderPizza = function (type) {
    let pizza = this.factory.createPizza(type);
    pizza.prepare();
    pizza.bake();
    pizza.cut();
    pizza.box();
    return pizza;
  }
}

let pizza_store_one = new PizzaStore(new NYStylePizzaFactory);
pizza_store_one.orderPizza("cheese");