# Specification Enterprise Pattern

In computer programming, the **specification pattern** is a particular software design pattern, whereby business rules can be **recombined** by **chaining** the business rules together using **boolean logic**. The pattern is frequently used in the context of domain-driven design.

A `specification` is a predicate that determines whether another object does or does not satisfy some criteria. Specifications could be combined with other specifications using “AND”, “OR” and “NOT” operations.

A specification pattern outlines a **business rule** that is **combinable** with other **business rules**. 

In this pattern, a unit of business logic inherits its functionality from the **abstract aggregate Composite Specification class**. The Composite Specification class has one function called **IsSatisfiedBy** that returns a boolean value. 

After instantiation, the specification is "chained" with other specifications, making new specifications easily maintainable, yet highly customizable business logic. Furthermore, upon instantiation the business logic may, through method invocation or inversion of control, have its state altered in order to become a delegate of other classes such as a persistence repository.

As a consequence of performing runtime composition of high-level business/domain logic, the Specification pattern is a convenient tool for converting ad-hoc user search criteria into low level logic to be processed by repositories.