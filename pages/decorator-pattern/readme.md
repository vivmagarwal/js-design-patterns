# Decorator Pattern

Decorators are a structural design pattern that aim to promote code re-use. Similar to mixins, they can be considered another viable alternative to object sub-classing.

The decorator pattern isn't heavily tied to how objects are created by instead focuses on the problem of extending their functionality. Rather than just relying on prototypal inheritance, we work with a single base object and progressibely add decorator objects which provide the additional capabilites.

Attach Additional Responsibilites to an Object Dynamically. Decorators Provide a Flexible alternative to Sub Classing for extending functionality. - GoF


## Mixins vs Decorators

IMO, mixins are primarily used to add new functionalities & decorators are used to modify existing functionalities.

The intent of a decorator is simple : Decorators are meant to add behavior to the object they wrap.

## Real world example
java.io package is largely based on Decorator. A typical code using it could look someting like this:

```
inputStrem = new ZipInputStream(
               new BufferedInputStrem (
                 new FileInputStream("test.txt")
               )
             )

```

## Downsides
- The usage of decorator pattern can sometimes add a lot of small classes to a design which may be less than straightforward for others to understand
- People sometimes take a piece of client code and introduce decorators without thinking through everything. This may cause probelms.
- It increases the complexity in instantiating the component. Once you've got decorators, you've got to not only instantiate the component, but also wrap it with who knows how many decorators.

## Notes 
- Decorator pattern involves a set of decorator classes that are used to wrap concrete compoennts
- Decorator classes mirror the type of the components they decorate. Infact, they are the same type as the components they decorate, either through inheritance or interface implementation.
- You can wrap a component with any number of decorators.


## Example from Oreilly's Head First Design Patterns

### The class that we want to decorate (abstract)
```
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
```

### The classes that we want to decorate (concrete)
```
class Espresso extends Bevarage {
  constructor() {
    super();
    this.description = "Espresso shot";
  }

  cost() {
    return 1.99;
  }
}

class HouseBlend extends Bevarage {
  constructor() {
    super();
    this.description = "House blend coffee"
  }

  cost() {
    return .89;
  }
}

class Decaf extends Bevarage {
  constructor() {
    super();
    this.description = "Decaf"
  }

  cost() {
    return 1.05;
  }
}

class DarkRoast extends Bevarage {
  constructor() {
    super();
    this.description = "Dark Roast"
  }

  cost() {
    return 1;
  }
}
```

### Decorator class (abstract)
```
class CondimentDecorator extends Bevarage {
  constructor() {
    super();
    this.decorator = null;
  }

  getDescription() {}
}
```

### Concrete decorators
```
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
```

### Caller/client/usage
```
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
```
alternate way to call - nested decorators
```
let esp2 =  new Mocha( new Mocha ( new Mocha( new Espresso())))
console.log(esp2.getDescription(), esp2.cost())
```
