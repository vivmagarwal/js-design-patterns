# Adapter Pattern

An Adapter works as a bridge between two incompatible interfaces.

![](img/adapter.png)

### Example

```
// Assume that a table objct is a big list of items.
class Table {}

// Asbtract class or an interface to perform sorting operations on a Table Object.
class Sort {
  apply(table) {}
}
```

```
// this concrete sorting class ships with our app
class SimpleSort extends Sort {
  apply(image) {
    console.log('Applying default simple sort.');
  }
}
```

```
// Table can have several views like fullView, compact view, summary view etc.
// Client need to use of the view.
class FullTableView {
  constructor(table) {
    this.table = table;
  }

  // apply expects the instance of a class that implements the Sort interface.
  apply(sort) {
    // Sort interface expects a method called apply() which expects an instance of Table
    sort.apply(this.table);
  }
}
```

```
// third party sorts with a differnt interface.
// doesnot implement the sort interface.
// Adaptee
class BetterSort {
  // the creators of BetterSort decided to call init() everytime we need to use it.
  init() {

  }

  // they decided to use render method to sort and render table as that made more sense to them.
  render(table) {
    console.log('Applying 3rd partys better sort.');
  }
}
```

```
// client code or usage
let tableView = new FullTableView(new Table());
tableView.apply(new SimpleSort()); // works.

// tableView.apply(new BetterSort()); // TypeError.
```

```
/**
 * We have an existing class, we wanna use it somewhere, BUT
 * the interface of this class doenot match the form that we expect.
 * 
 * So we use the apadter pattern to convert the interface of this class 
 * to a different form
 */
```

```
// Adaptor - using compostion [favour composition over inheritance]
// it is composed with adaptee: we pass betterSort in the consturctor.
// it implements the target interface of `Sort`. So, we have apply() method that our client understnds.
class BetterSortAdapter extends Sort {
  constructor(betterSort) {
    super(betterSort);
    // we need an adptee inside the adapter to forward the client's request
    this.betterSort = betterSort;
  }

  // Our adapter has this method called apply() that is compatible with our client.
  // our adapter's apply takes in table and seamlessly forwards it ot the betterSort.
  apply(table) {
    this.betterSort.init();
    this.betterSort.render(table);
  }
}
```

```
// Adapter 2 - using inheritance rather than composition
class BetterSortAdapter2 extends BetterSort {
  constructor() {
    super();
  }

  apply(table) {
    this.init();
    this.render(table);
  }
}
```

```
// Client or Usage
// instead of plugging in an incomatible plug to our client; we plug in an adapter first and then plug in our incompatible plug to the adapter
// adapter forwards the clients request to our adaptee and return backs the adaptees response to the client.

tableView.apply(new BetterSortAdapter(new BetterSort()));  // now it works: Applying 3rd partys better sort.
tableView.apply(new BetterSortAdapter2());  // it works: Applying 3rd partys better sort.
```

```bash 
Applying default simple sort.
Applying 3rd partys better sort.
Applying 3rd partys better sort.
```