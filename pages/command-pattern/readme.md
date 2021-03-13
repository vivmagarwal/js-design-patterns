# Command Pattern

**Command** is a behavorial design pattern that turns a **request** into a **stand-alone object** that contains all information about the request. This transformation let's you parameterize methods whith different requests, delay or queue a request's execution, and support undoable operations.

In many ways, you see examples of the command pattern all around you in software. For instance, a menu in an image manipulation software allows you to color correct or add filter effects to a photo. In this case, the intricacies of the individual commands are unknown to the menu, which we'll call as the **invoker**. 

The **invoker** is used by the **client** to invoke a command. *It doesn't need to know how the command works on the inside*. 

So, the command design pattern essentially contains an **invoker** object which is designed to **execute** a given **command**. Every command must encapsulate its internals, and should expose an **execute** function which the **invoker** will execute. This interface should remain consistent across all commands. Additionally, the invoker should keep a stack of commands that have been executed, and allow undoability. 

Most applications such as text, code, and image-editing apps allow you to undo the last command or a series of commands in the last-in, first-out order. 

The commands themselves affect or modify a **receiver** which receives the end result of the command being executed. Commands can inherit from a base Command class that should minimally offer an execute method and an undo method. 




- The command pattern makes it easy to craft a uniform interface known as an invoker that issues commands which encapsulate the inner workings of the operation. 
- The invoker exposes a simple interface consisting of an execute command, which takes in an instance of a Command class and executes the command's own execute function. 
- The end result of every command is the receiver, which receives the final outcome of the action. 
- This pattern allows you to write a diverse set of operations without affecting or refactoring the invoker interface which is used by the client. 
- Command objects with the same interface can easily be swapped as needed and this is considered one of the larger benefits of the pattern.
