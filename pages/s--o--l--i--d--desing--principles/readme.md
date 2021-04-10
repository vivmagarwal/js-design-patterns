# S  O  L  I  D  Design  Principles

The following 5 **concepts** make up our **SOLID** principles:

**S**ingle Responsibility

**O**pen/Closed

**L**iskov Substitution

**I**nterface Segregation

**D**ependency Inversion


## Single Responsibility

This principle states that a class should only have one responsibility. Furthermore, it should have only one reason to change.

Benifits of the principle:
- **Testing** - Easy to test
- **Lower coupling** - less functionality in a single class
- **Organization** - easier to understand, figure out, manage and refactor
- **separation** of **concerns**

## Open Closed Principle

This priciple states that a classes should be **open** for **extension**, but **closed** for **modification**. In doing so, we stop ourselves from modifying existing class which might have been tested and deployed somewhere. 