console.log('factory-design-pattern works!!');

// ===================================================== //
// Product class
// ===================================================== //
// Kind of an interface or an abstract class.
class Pizza {
  constructor() {
    this.pizzaName = null;
    this.dough = null;
    this.sauce = null;
    this.toppings = [];
    this.pepperoni = null;
    this.calm = null;
  }

  prepare() { }; // We've now made the prepare abstract;

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

  setName(pizza_name) {
    this.pizzaName = pizza_name;
  }

  toString() {
    return `${this.pizzaName} with ${this.dough}, ${this.sauce}, ${this.pepperoni}, ${this.calm }, ${this.toppings.join(' ,')}`;
  }
}

// ===================================================== //
// Product Subclasses - concrete product's
// ===================================================== //

class CheesePizza extends Pizza {
  constructor(ingredientFactory) {
    super();
    this.ingredientFactory = ingredientFactory;
  }

  prepare() { // factories are asked to prepare ingredients
    this.dough = this.ingredientFactory.createDough();
    this.sauce = this.ingredientFactory.createSauce();
    this.cheeze = this.ingredientFactory.createCheese();
  };

  box() {
    console.log(`Placing pizza in official Cheezepizza box`);
  }
}

class CalmPizza extends Pizza {
  constructor(ingredientFactory) {
    this.ingredientFactory = ingredientFactory;
  }

  prepare() {
    this.dough = this.ingredientFactory.createDough();
    this.sauce = this.ingredientFactory.createSauce();
    this.cheeze = this.ingredientFactory.createPepperoni();
    this.calm = this.ingredientFactory.createCalm(); // IN the NY Factory the calm's will be fresh and in Chichago they will be frozen.
  };
}

// ===================================================== //
// Creator class (kind of abstract) :: the client code
// ===================================================== //
class PizzaStore {

  orderPizza = function (type) {
    let pizza = this.createPizza(type);
    console.log('pizza before prepare :::',  pizza.toString());
    pizza.prepare();
    console.log('pizza after prepare :::',  pizza.toString());
    pizza.bake();
    pizza.cut();
    pizza.box();
    return pizza;
  }

  createPizza = function () {}
}

// ===================================================== //
// Concrete crator classes :: subclasses that extends creator 
// ===================================================== //

class NyStypePizzaStore extends PizzaStore {

  constructor() {
    super();
  }
  
  createPizza = function (pizzaType = "cheese") {
    let pizza = null;
    let ingredientFactory = new NyPizzaIngredientFactory();

    if (pizzaType == "cheese") {
      pizza = new CheesePizza(ingredientFactory);
      pizza.setName("NY Style cheeze pizza");
    } else if (pizzaType == "calm") {
      pizza = new CalmPizza(ingredientFactory);
      pizza.setName("NY Style calm pizza");
    }
    return pizza;
  }
}

class ChichagoStypePizzaStore extends PizzaStore {

  constructor() {
    super();
  }

  createPizza = function (pizzaType = "cheese") {
    let pizza = null;
    let ingredientFactory = new ChichagoIngredientFactory()

    if (pizzaType == "cheese") {
      pizza = new CheesePizza(ingredientFactory);
      pizza.setName("NY Style cheeze pizza");
    } else if (pizzaType == "calm") {
      pizza = new CalmPizza(ingredientFactory);
      pizza.setName("NY Style calm pizza");
    }
    return pizza;
  }
}


// ===================================================== //
// Ingredient factory - Abstract factory
// ===================================================== //

class PizzaIngredientFactory {
  createDough() { }; // factory methods to create ingredients.
  createSauce() { };
  createCheese() { };
  createVeggies() { };
  createPepperoni() { };
  createCalms() { };
}

// ===================================================== //
// Concrete ingredient factories :: implements factory mehtods of the abstract factory
// ===================================================== //

class NyPizzaIngredientFactory extends PizzaIngredientFactory {

  constructor() {
    super();
  }

  createDough() {
    return 'ThinChrustDough';
  }

  createSauce() {
    return 'MarinaraSauce';
  }

  createCheese() {
    return 'ReggianoCheeze';
  }

  createVeggies() {
    return ['Garlic', 'Onion', 'Mushroom', 'RedPepper'];
  }

  createPepperoni() {
    return 'SlicedPepperoni';
  }

  createCalm() {
    return 'FreshCalms';
  }
}

class ChichagoIngredientFactory extends PizzaIngredientFactory {

  constructor() {
    super();
  }

  createDough() {
    return 'ThickChrustDough';
  }

  createSauce() {
    return 'PlumTomatoSauce';
  }

  createCheese() {
    return 'MozzarellaCheeze';
  }

  createVeggies() {
    return ['Spinach', 'Blackolives', 'EggPlant'];
  }

  createPepperoni() {
    return 'SlicedPepperoni';
  }

  createCalm() {
    return 'FrozenCalms';
  }
}

// ===================================================== //
// Usage
// ===================================================== //

let ny_pizza_store_one = new NyStypePizzaStore();
ny_pizza_store_one.orderPizza("cheese");
