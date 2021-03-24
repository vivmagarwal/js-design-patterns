# Mixin Pattern

Mixin is a way, properties are added to objects, without using inheritance. It provides a way of composing your application.

In traditional programming languages lie C++ & Lisp, Mixins are classes which offer functionality that can easily be inherited by sub-class or group of sub-classes for the purpose of function re-use.

In Javascript we can look at inheriting from mixins as a means of collecting functionality through extension. Each new object we define has a prototype from which it can inherit further properties. Prototypes can inherit from other object prototypes, but, even more importantly, can define properties for any number of object instances. We can leverage this fact to promote function reuse.

Mixins allow objects to borrow functionality from them with minimal amount of complexity. They can be viewed as objects whith attributes and methods that can be easily shared across a number of other object prototypes.

Mixins defines a set of functions. These functions can be used in concrete classes , same as inheritance, but without actual extend.We can add as many mixins as we wish to a class.

Todo: copy example from the [script](script.js) file here with explainations.

