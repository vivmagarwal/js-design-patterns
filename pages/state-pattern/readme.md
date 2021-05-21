# State Design Pattern

State is a behavorial design patten that lets an object alter it's behaviour when it's internal state changes. 

The State patten suggests that you create new classes for all possible states of an object and extract all state-specifc behaviours into these classes.

Instead of implementing all behaviours in it's own, the context object is composed with one the states object, and the context object delegates all the state related work to that state object.

For example, a `Canvas` object can store it's currentTool in a variable called `this.currentTool` and the `Canvas` can delegate it's `mouseDown` event to `this.currentTool.mouseDown()`



