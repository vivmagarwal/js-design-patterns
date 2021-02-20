# Builder Design Pattern

### Example

**Build Pizza step by step**:
From customers point of view, four steps are needed to build a pizza
- choose a base
- choose the sauce
- choose the type of cheeze
- choose the topping

### Example

For signing up a new user, the essential details can be taken in the first step & then rest of the information can be taken in a step by step manner.

> Separate the construction if a complex object from its representation so that the same construction process can create different representations. *-- GoF*

the Builder design pattern enables the creation of an easy to use interface to a complex process. By introducing a step-by-step workflow, if the class is made for public, it is easier to understand and consume. 