## What is a design pattern?

Designing software presents challenges that need reliable and reusable solutions. Design patterns are battle-tested and reusable solutions to common software design problems.

> Each pattern describes a problem which occurs over and over again in our environment, and then describes the core of solution to that problem, in such a way that you can use this solution a million times over, without ever doing it the same way twice.
> -- *Christopher Wolfgang Alexander*

- Design patterns in software development were popularized by the gang of four authors in their book "Design patterns"
- A design pattern helps us identify a problem and presents a tested solution
- A design pattern must be reusable and must produce a reliable outcome

Design patterns can be broken down into a number of different categories:


<div class="container">
  <h2>Demo-it Example</h2>
  <iframe src="vendor/demoit/index.html?state=../../vendor/demoit/samples/js.json" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
</div>


## Creational Design Patterns

Creational design patterns focus on handling **object creation** mechanisms where objects are created in a manner suitalbe for the situation we're working in. 

As the name suggests, these patterns addresses problems related to the creation of objects. For example, the factory pattern allows us to encapulate the creation of an object within a function. The Revelaing Constructor pattern allows us to expose private objet properties and methods only durint the objects creation, while builder pattern simplifies the creation of complex objects. Finally, the singleton pattern and the dependency Injection pattern help us wiring the modules within our application.

Some of the patterns that fall under this category are: 
- Constructor
- Factory
- Abstract
- Prototype
- Singleton
- Builder

## Structural Design Patterns

Structural patterns are concerned with **object composition** and typically identify simple ways to realize **relationships between objects**. They help ensure that when one part of the system changes, the entire structure of the system doesnot need to change.

Patterns that fall under this category include: Decorator, Facade, Flyweight, Adapter and Proxy

## Behavorial Deising Patterns

Behavorial patterns focus on improving or streamlining the **communication between objects** in a system.

Some behavorial patterns include: Iterator, Mediator, Observer & Visitor.

## ES6 Classes 

ES6 Classes are syntatical sugar over Javascript's prototype based inheritance model. Here's how we can use Javascript's constructor function as classes.

```js

function Account(type) {
  this.type = type;
  this.balance = 0;
  this.openingYear = 2000;

  this.getInfo = function () {
    return (
      `
      Account Type : ${this.type},
      Balance : ${this.balance},
      Opening Year : ${this.openingYear}
      `
    );
  }
}

// Usage

var myAccount = new Account("Savings");
myAccount.balance = 500;
myAccount.openingYear = new Date().getFullYear();
console.log(myAccount.getInfo());
```

## Table of Design pattern

**Creational** | Based on the concept of creating an object 
- | - 
Factory method | This makes an instance of several derived classes based on interfaced data or events. Factory method provides an interface for creating objects in a superclass, but allows subclass to alter the type of objects that will be created.   
Abstract Factory | Creates an instance of several families of classes without detailing concrete classes
Builder | Separates object construction from its representation, always creates the same type of object
Prototype | A fully initialized instance used for copying or cloning
Singleton | A class with only a single instance with global access points


**Structural** | Based on the idea of building blocks of objects
- | -
Adapter | Match interfaces of different classes there for classes can work together despite incompatible interfaces
Bridge | Separates an object's interface from it's implementation so the two can vary independently
Composite | A structure of simple and composite objects which makes the total object more than just the sum of its parts
Decorator | Dynamically add alternate processing to objects
Facade | A single class that hides the complexity of an entire subsustem.
Flyweight | A fine grained instance used for efficient sharing of information that is contained elsewhere.
Proxy | A placeholder object representing the true object

**Behavorial** | Based on the way objects play and work together
- | -
Interpreter | A way to include language elements in an application to match the grammar of the intended language
Template method | Creates the shell of a method of an algorithm in a method, then defer the exact steps to a subclass
Chain of responsibility |  A way of passing a request between a chain of objects to find the object that can handle the request
Command | Encapsulate a command request as an object to enable, logging and/or queuing of requests, and provides error-handling for unhandled requests.
Iterator | Sequentially access the elements of a collection without knowing the inner workings of the collection
Mediator | Defines simplified communication between classes to prevent a group of classes from referring explicitly to each other
Momento | Capture an object's internal state to be able to restore it later
Observer | A way of notifying change to a number of classes to ensure consistency between the classes
State | Alter an objects behaviour when the state changes
Strategy | Encapsulate an algorithm inside a class separating the selection from the implementation
Visitor | Adds a new operation to a class without changing the class
