# Factory & the Abstract Factory Design Pattern

**Variations:** Simple Factory | Factory Method | Abstract Factory

> A Factory define an Interface for creating an Object, but let Subclasses (concrete factories) decide which Class to instantiate.
> *-- GOF*

[Christopher Okhravi](https://www.youtube.com/watch?v=channel/UCbF-4yQQAWw-UnuCd2Azfzg) has beautifully explained the concept of Factory method in the following video: 

[![this video](https://img.youtube.com/vi/EcFVTgRHJLM/0.jpg)](https://www.youtube.com/watch?v=EcFVTgRHJLM). 

I encourage you to go through the video and we have implemented the same example as explained by Christopher in Javascript.

In our code we use a lot of different **objects**. We have **classes** and we instantiate these **objects** from the classes and use them in a bunch of different ways. We have to **instantiate objects** from our classes at some point or the other in the program. **Factory** method says, when you are tryin to instantiate, let's e**ncapsulate that instantiation**, so that we can make in **uniform** across all places, So that you can use the **factory**, whenever you want to **instantiate** and the **factory** is responsible for **instantiating appropriately**. 

It makes sense when the instantiation is very complex & needs computation & some kind of business logic to determine what parameters you want to pass through this particular object. Maybe there are variations of object and you need some business logic to determine which variation of the object do you need to construct. 

It's also about polymorphism. If we have a factory that wraps our construction & if that factory is an instance, then you can swap that instance at runtime for an instance of an another factory. If while entering a function, we knew, which varitaion of object do we need, then it's not a factory problem. We could has just passed it in via dependency injection / as a prameter. But if we identify the variation somewhere inside the function body. Basically we randomly want to create a variation of the object & we need to do that at several different functions.

Just an example, Say we have a `virtual_animal_park`. We have a class called Animal and it can construct either a `dog` , `cat` or a `duck` object.

a dog barks, has 4 legs, has no wings & it cant fly
a cat meows, has 4 legs, has no wings & it cant fly
a duck quacks, has 2 legs, has 2 wings & it can fly

In some scenarios we need a way to just constuct any random animal out of three. In some scenarios we need a bit balanced approach for example, 5 seconds after the program starts, random one of the 3 animals is to be constructed. Then after 5 seconds one of the rest of the two needs to be constructed. Again, after 5 seconds, one of the remaining one needs to be constructed & so on. The **factory** pattern says that this creational logic can be encapsulated inside a `RandomAnimalFactory` or/and a `BalancedAnimalFactory`. 

The **business logic of creation** can go inside a factory. The factory can decide on **which sub type** it needs to construct and/or the factory can decide **in which way** it needs to construct.

`RandomAnimalFactory` could have a method called `createAnimal()`, which simply returns any random Animal object. 

We could have another factory called `RandomAnimalFactoryBalanced` which too has a method with the same name `createAnimal()`. It may have some sort of state. It makes sure that the number of animals are balanced. It may contain a logic that upon every 3rd creation, we'll have equal number of each animals.


**Actors in our example:**

**Product** : `Animal` [ interface/superclass ]

**Creator** : `AnimalFactory` [ interface/superclass ]
 - difines a factoryMethod() that returns an object of type Product

**ConcreteProducts** :  `cat`, `dog`, `duck` [ implements `Animal` ]

**ConcreteCreators** : `RandomAnimalFactory`, `BalancedAnimalFactory` [ implements `AnimalFactory` ]
 - implements a factoryMethod() that returns an object of type Product


## Simple Factory
Simple factory simply means that we have a `ConcreteCreator` that creates a `ConcreteProduct`. There are no shared interfaces for Procucts or Creators.

## Factory Method
We have all four actors involved in the Factory Method pattern: `Product`, `ConcreteProducts`, `Creator` & `ConcreteCreators`.


## Example Implementation:















