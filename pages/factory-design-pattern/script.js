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

// Abstract factory

class IngredientFactory {
  createBase() { };
  createTopping() { };
}

class NYIngredientFactory extends IngredientFactory {
  createBase() {
    return `thin chrust`;
  }

  createTopping() {
    return `some cheese`;
  }
}

class ChichagoIncredientFactory extends IngredientFactory {
  createBase() {
    return `thick chrust`;
  }

  createTopping() {
    return `lots of cheese`;
  }
}

class Pizza {
  constructor(ingredientFactory, name) {
    this.factory = ingredientFactory;
    this.name = name;
    this.base = '';
    this.topping = '';
  }

  setBaseAndTopping() {
    this.base = this.factory.createBase();
    this.topping = this.factory.createTopping();
  };
  setName(name) { this.name = name };
  serve() {
    console.log(`Here's your ${this.name} on ${this.base} with ${this.topping}`);;
  }
}

class CheesePizza extends Pizza {
  constructor(ingredientFactory, name) {
    super(ingredientFactory, name)
  }
}

class PepperoniPizza extends Pizza {
  constructor(ingredientFactory, name) {
    super(ingredientFactory, name)
  }
}

class PizzaStore {
  orderPizza(type) {
    let pizza = this.createPizza(type);
    pizza.setBaseAndTopping();
    pizza.serve();
  };


  createPizza() { };
}

class ChichagoPizzaStore extends PizzaStore {
  createPizza(type) {
    let chiFactory = new ChichagoIncredientFactory();
    if (type == "cheese") {
      return new CheesePizza(chiFactory, "Chichago Style Cheese Pizza");
    } else if (type == "pepperoni") {
      return new PepperoniPizza(chiFactory, "Chichago Style Pepperni Pizza");
    }
  }
}

class NYPizzaStore extends PizzaStore {
  createPizza(type) {
    let nyFactory = new NYIngredientFactory();
    if (type == "cheese") {
      return new CheesePizza(nyFactory, "NY Style Cheese Pizza");
    } else if (type == "pepperoni") {
      return new PepperoniPizza(nyFactory, "NY Style Pepperni Pizza");
    }
  }
}

let nyStore = new NYPizzaStore();
nyStore.orderPizza("cheese");
nyStore.orderPizza("pepperoni");

let chiStore = new ChichagoPizzaStore();
chiStore.orderPizza("cheese");
chiStore.orderPizza("pepperoni")


// ===================================================== //
// Example from : https://addyosmani.com/resources/essentialjsdesignpatterns/book/#factorypatternjavascript
// ===================================================== //

function Car(options) {
  this.doors = options.doors || 4;
  this.state = options.state || "brand new";
  this.color = options.color || "silver";
}

function Truck(options) {
  this.state = options.state || "used";
  this.wheelSize = options.wheelSize || "large";
  this.color = options.color || "blue";
}

function VehicleFactory() { };

VehicleFactory.prototype.vehicleClass = Car; // default

VehicleFactory.prototype.createVehicle = function (options) {
  switch (options.vehicleType) {
    case "car":
      this.vehicleClass = Car;
      break;
    case "truck":
      this.vehicleClass = Truck;
      break;
  }
  return new this.vehicleClass(options)
};


var carFactory = new VehicleFactory();
var car = carFactory.createVehicle({
  vehicleType: "car",
  color: "yellow",
  doors: 6
});

console.log(car);

var movingTruck = carFactory.createVehicle({
  vehicleType: "truck",
  state: "like new",
  color: "red",
  wheelSize: "small",
});

console.log(movingTruck);

// ===================================================== //
// subclassing

function TruckFactory() { };
TruckFactory.prototype = new VehicleFactory();
TruckFactory.prototype.vehicleClass = Truck;

var truckFactory = new TruckFactory();
var myBigTruck = truckFactory.createVehicle({
  state: "Very bad",
  color: "pink",
  wheelSize: "So big"
});

console.log(myBigTruck);

// ===================================================== //
// Abstract factory
// A vehicle factory that defines ways to get or register vehicly types. 
// ===================================================== //

console.log('=======================================');

var abstractVehicleFactory = (function () {
  var types = {}; // "car": Car

  return {
    getVehicle: function (type, customizations){
      var Vehicle = types[type]; // types["car"] = Car
      console.log(Vehicle);
      return (Vehicle ? new Vehicle(customizations) : null); // new Car({})
    },

    registerVehicle: function (type, Vehicle){
      var proto = Vehicle.prototype;
      console.log(proto);
      // only register classes that fulfill the vehicle contract
      if (proto) {
        types[type] = Vehicle;
        console.log(`type ${type} registered for production in the factorry.`);
      } else {
        console.log(`type ${type} could not be registered.`);
      }

      return abstractVehicleFactory;
    },

    types: types,

  }
})();

// usage:
abstractVehicleFactory.registerVehicle("car", Car);
abstractVehicleFactory.registerVehicle("truck", Truck);

console.log(abstractVehicleFactory.types);

var car = abstractVehicleFactory.getVehicle("car", {
  color: "yellow",
  doors: 5,
});

console.log('=======================================');
