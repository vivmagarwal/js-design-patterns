/**
 * concrete factory
 *  - createBase()
 *  - createTopping()
 * 
 * concrete product
 *   factory
 *   name
 *   base
 *   topping
 * 
 *   setBaseAndTopping()
 *   setName()
 *   serve()
 * 
 * concrete store
 *   orderPizza(type)
 *     pizza = createPizza(type)
 *     pizza.setName
 *     pizza.setBaseAndTopping
 *     pizza.serve
 * 
 *   createPizza(type)
 *      create pizza based on time
 * 
 * usage:
 * instantiate concrete store
 * call orderPizza and pass in the type
 */









// Concrete Factory
class NYIngredientFactory {
  createBase() {
    return `thin chrust`;
  }

  createTopping() {
    return `some cheese`;
  }
}

// Concrete Product
class CheesePizza {
  constructor(factory) {
    this.factory = factory;
    this.name = null;
    this.base = null;
    this.topping = null;
  }

  setBaseAndToppings() {
    this.base = this.factory.createBase();
    this.topping = this.factory.createTopping();
  }
  
  setName(name) {
    this.name = name;
  }

  serve() {
    console.log(`Here's your ${this.name} on ${this.base} with ${this.topping}`);
  }
}

// Concrete Store

class NYPizzaStore {
  orderPizza(type) {
    let pizza = this.createPizza(type);
    pizza.setName("NY Cheese Pizza");
    pizza.setBaseAndToppings();
    pizza.serve();
  
  };

  createPizza(type) {
    if (type == "cheese") {
      return new CheesePizza(new NYIngredientFactory);
    }
  }
}

// usage

let nyStore = new NYPizzaStore();
nyStore.orderPizza("cheese");