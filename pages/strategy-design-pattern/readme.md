# Strategy Design Pattern

The **strategy pattern** is a *behavorial* software design pattern that enables an algorithm's behavior to be selected at runtime. 

The **strategy pattern**:
- defines a family of alogrithms
- the individiual strategy implementation encapsulates each algorithm 
- individual strategies are interchangeable as they implement a uniform interface that context understands
- the context is a compositor allowing us to compose a flavour of implementation as needed
- a common naming convention for strategies is using the word `behaviour` for strategies


The **strategy pattern** promotes open/closed principle by using compsition over inheritance.

## Example 1

A custom sorter is a classic example of the implementation of the **strategy pattern**:
- we have a sort() **context**
- we have different sorting **strategies** `bubble sort` / `quick sort` / `insertion sort` or `merge sort`
- some sorts are quicker based on the number of records. Depending on the number of records, context can select the sorting strategy. Our class is just calling sort, but the behavour of sort is dynamically changing. 

## Example 2

A dynamic pricing would use the strategy pattern because the algorithm you use to generate the price could vary based on the time of the day, percentage of seats already sold etc. There would be a getPrice method & which strategy it runs is none my concern. Basically, the price calculation behaviour is changing at the runtime. 

## Example 3

Different SuperHero classes can be generated using differnt default SuperPowers like Fly, WeaveWeb, RunSuperFast, Fights, NoPowerRunAway etc. At run time they can changeSuperPowers() based on their levels of energy and health.

## Example 4

In a gaming app, soldier get a default attackingPower. At the runtime they can change their attackingStrategy based on the level they are on, energy and health. Some needs refill, some need repair; the repair and refill strategies can be different too;


### Client
```
.
└── ISoldier { attack(); gather(); refillable rf; repairable rp }
    ├── Archer {} implements ISoldier
    ├── Spearman {} implements ISoldier
    ├── Gunman {} implements ISoldier
    └── Robot {} implements ISoldier
```


### Strategies or Behviours
```
.
└── IRefillableBehaviour { refill(); }
    ├── WeponRefillBehaviour { refill(){...};}
    ├── TimeRefillBehaviour { refill(){...};}
    └── NoRefillBehaviour { refill(){...};}
```
```
.
└── IRepairable {}
    ├── InternalRepairBehaviour { refill(){...};}
    ├── ExternalRepairBehaviour { refill(){...};}
    └── NoRepairBehaviour { refill(){...};}
```

As we are programming to Inteface or Supertype, so behaviours can be changed at runtime. At run time I can choose from the family of algorithms. 
A robot can be created with a combination of an instance of, for example, TimeRefillBehaviour & ExternalRepariBehaviour
A gunman can be created with a combination of  an instance of, for example, WeponRefillBehaviour & NoRepairBehaviour 

Its a very loosely coupled an flexible system. The behaviours can change independently of the client that is consuming them. Behaviours can be seamlessly interchanged as they are encaplulated in a family of algorithms. At one time GunMan can use WeponRefillBehaviour, at onother time it can use TimeRefillBehaviour & later it can use NoRefillBehaviour. Because all three of these behaviour are a family of behaviour that implements the same interface. Our client Gunman, neednot worry about the internal implementation of any of those as long as they adhere to the interface that the client understands.


