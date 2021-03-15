# Facade Pattern

**Facade** is a structural design pattern that provides a simplified interface to a library, a framework, or any other complex set of classes. A facade might provide limited functionality in comparisn to working with the subsystem directly. However, it includes only those features that clients really care about.

Note: `clients` in design patterns refers to the lines of code in our application that is using/calling or consuming other set of code.

- A complex subsustem may consist of vairous objects. To make them all do something meaningful, you have to dive deep into the subsystem's implementation details, such as initializing objects in the correct order and supplying them with data in the proper format.
- The client uses the facade instead of calling the subsystem objects directly. The Subsystem classes are not aware of the facade's existence. They operate within the system and work with each other directly.
- The Facade provides convinient access to a particular part of the subsystem's functionality. It knows where to direct the client's request and how to operate all the moving parts.
- An additional facade class can be created to prevent polluting a single facade with unrelated features that might make it yet another complex structure. Additional facades can be used by both clients and other facades.
- You can create facades to define entry points to each level of subsystems. Use the facade pattern when you need to have a limited but straightforward interface to a complex subsystem.
- Check whether it’s possible to provide a simpler interface than what an existing subsystem already provides. You’re on the right track if this interface makes the client code independent from many of the subsystem’s classes.
- Declare and implement this interface in a new facade class. The facade should redirect the calls from the client code to appropriate objects of the subsystem. The facade should be responsible for initializing the subsystem and managing its further life cycle unless the client code already does this.
- To get the full benefit from the pattern, make all the client code communicate with the subsystem only via the facade. Now the client code is protected from any changes in the subsystem code. For example, when a subsystem gets upgraded to a new version, you will only need to modify the code in the facade.
- If the facade becomes too big, consider extracting part of its behavior to a new, refined facade class.


Instead of making your code work with dozens of the framework classes directly, you create a facade class which encapsulats that functionality and hides it from the rest of the code. This structure also help's you minimize the effort of upgrading to future versions of the framework or replacing it with another one. The only thing you'd need to change in your app would be the implementation of the facade's methods.

## Example

Imagine that you have a script where for each DOM element found on a page with class "foo", we wish to increment a counter. What's the most efficient way to query this collection of elements? Well, there are a few different ways this probelem could be tackeled:

1. Select all the elements in the page and then store references to them. Next, filter this collection and use regular expressions to only store those with the class "foo"
2. Use a modern native browswer feature such as `querySelectorAll()` to select all of the elements with the class "foo".
3. Use a native feature such as `getElementsByClassName()` to similarly get back the desired collection.

So, which of these options is the fastest? It's actually option 3, by a factor of 8 - 10 times the alternatives. But we have a probem, option 3, doesnot work with some legacy browsers and we need to support them.

To simplify query selection, jQuery creates a **Facade**, which, behind the scenes will opt for the most optimal approach to selecting elements depending on what our current browser supports and we can just consume the abstraction layer.

We're probably all also familiar with jQuery's `$("selector")`. This is significantly more easy to use for selecting HTML elements on a page versus having to manually opt for `getElementById()`, `getElementsByClassName()`, `getElementsByTagName()` and so on.

Behind the scenes, the library simply opt for the most optimal approach to selecting elements depending on what the users current browser supports and the client code just consumes the abstraction layer.

## Example

Using Facade to simplify an interface for listening to events corss-browser. We do this breating a common method that can be used in one's code which does the task of checking for the existence of features so that it can provide a save and cross-browser compatible solution.

```
// Facade
var addMyEvent = function (el, ev, fn) {
  if (el.addEventListener) {
    el.addEventListener(ev, fn, false);
  } else if (el.attachEvent) {
    el.attachEvent("on" + ev, fn);
  } else {
    el["on" + ev] = fn;
  }
};
```

Client or the Consumer of the Facade dont need to worry about the cross browser checkings.
```
// Client
addMyEvent(document.getElementById("facade-pattern"), "click", () => { console.log("Heading clicked.") });
```