# Singleton Design Pattern

Singletons are objects that can only have a single instance, with a single point of access. Singletons are useful for maintaining a central state, where all clients need to access and operate on a common resource.

Classically, the Singleton pattern can be implemented by creating a class with a method that creates a new instance if the class if one doesn't exist. In the event of an instance already existing, it simply returns a refernce to that object.

In Singletons, we basically delay initialization, generally because they require some information that may not be available during initialization time.

Node's module system caches the module the moment it is accessed using a require statement for the very first time. Thereafter the same instance is reffered to everywhere. No matter how many times you impoert this module accross your application, it will access the same cached and common instance. So the Node's module system offers a rudimentary implementation if a singleton.

However, this behaviour is dependent on the filename consistency. Difference in capitalization in filenames will result in multiple cached instances.

When working with classes, instantiating a class before exporting it out of a module will result in a singleton.

## Problem
- Ensure that a class has just a single instance
- Provide a global access point to that instance

## Implementation Logic

The Singleton class declares the static method `getInstance` that returns the same instance of it's own class. The Singleton's constructor should be hidden from the client code. Calling the `getInstance` method should be the only way of getting the Singleton object.

## Step by step 
1. Add a private static field to the class for storing the singleton instance.
2. Declare a public static creation method for getting the singleton instance.
3. Implement lazy initialization inside the static method. It should create a new object on it's first call and put it into the static field. The method should always return that instance on all subsequent calls.
4. Make the constructor of the class private. The static method of the class will still be able to call the constructor, but not the other objects.
5. Go over the client code and replace all direct calls to singleton's constructor with calls to its static creation method.

## Pseudocode
```
class Database {
  private static field instance: Database
  private constructor(){...}
  public static method getInstance() {
    if (Database.instance === null) {
      Database.instance = new Database()
    }
    retrun Database.instance  
  }
}
```

```
class Application
  method main() {
    Database db = Database.getInstance();
  }
```

## Pros
- We can be sure that a class has only one instance
- We can gain a global access point to that instance
- The singleton object is initialized only when it's requested for the first time

## Cons
- Violates the single responsibility principle
- May be difficult to unit test the client code of the Singleton because may test frameworks rely on inheritance when producing mock objects.
- Whilst the Singleton has valid uses, often when we find ourselves needing it in JavaScript, its a sign that we may need to re-evaluate our design
- Singletons are often an indication that modules in a subsystem are either tightly couples or that logic is overly spread across multiple parts of a codebase.
- Singletons can increase tight coupling.

## Classical JS implementation of a singleton
```
var myDatabase = (function () {
  var instance;

  function init (){
    var privateConnectionNumber = Math.random();

    return {
      connection_number: privateConnectionNumber,
    }
  }

  return {
    getInstance: function (){
      if (!instance) {
        instance = init();
      }

      return instance;
    }
  }
})();
```

**Usage:**
```
var db1 = console.log(myDatabase.getInstance());
var db2 = console.log(myDatabase.getInstance());
```
Both the db's will print the same connection_number as they have just one instance. Another way to check if they are both pointing to the same obect:

```
console.log(db1 === db2);
```

## Example using a constructor function

```
var myScoreBoard = (function () {
  var instance;

  function Singleton() {
    this.gameNumber = Math.random();
  }

  return {
    getInstance: function () {
      if (!instance) {
        instance = new Singleton();
      }
      return instance;
    }
  }
})();
```
**Usage:**
```
var sb1 = console.log(myScoreBoard.getInstance());
var sb2 = console.log(myScoreBoard.getInstance());

console.log(sb1 === sb2);
```
