# Specification Pattern (an enterprise pattern)

In computer programming, the **specification pattern** is a particular software design pattern, whereby business rules can be **recombined** by **chaining** the business rules together using **boolean logic**. The pattern is frequently used in the context of domain-driven design.

> A specification is a **business rule** that is **combinable** with other **business rules**. It determines whether another object does or does not satisfy some criteria. It could be combined with other specifications using “AND”, “OR” and “NOT” operations.

In this pattern, a unit of business logic inherits its functionality from the **abstract aggregate Composite Specification class**. The Composite Specification class has one function called **IsSatisfiedBy** that returns a boolean value. 

After instantiation, the specification is "chained" with other specifications, making new specifications easily maintainable, yet highly customizable business logic. Furthermore, upon instantiation the business logic may, through method invocation or inversion of control, have its state altered in order to become a delegate of other classes such as a persistence repository.

As a consequence of performing runtime composition of high-level business/domain logic, the Specification pattern is a convenient tool for converting ad-hoc user search criteria into low level logic to be processed by repositories.

## Example
### Data
```
let booksList = [
  { title: 'The Compound Effect', author: 'Darren Hardy', price: 80, ebook: true, hardcover: true },
  { title: 'The Best Year Ever', author: 'Darren Hardy', price: 100, ebook: false, hardcover: true  },
  { title: 'The Enterpreneur', author: 'Darren Hardy', price: 110, ebook: true, hardcover: false  },
  { title: 'Exeptional Living', author: 'Jim Rohn', price: 80, ebook: true, hardcover: true  },
  { title: 'Seven Strategies', author: 'Jim Rohn', price: 100, ebook: false, hardcover: true  },
  { title: 'Seasons of life', author: 'Jim Rohn', price: 110, ebook: true, hardcover: false },
  { title: 'Power of Intention', author: 'Wayne Dyer', price: 80, ebook: true, hardcover: true  },
  { title: 'Erroneous Zones', author: 'Wayne Dyer', price: 100, ebook: false, hardcover: true  },
  { title: 'Everyday Wisdom', author: 'Wayne Dyer', price: 110, ebook: true, hardcover: false },
];
```

### Product
```
class Product {
  constructor(name, price, ebook) {
    this.name = name;
    this.price = price;
    this.ebook = ebook;
  }
}
```

### Specifications
```
class PriceSpecification {
  constructor(price) {
    this.price = price;
  }

  isSatisfied(item) {
    return item.price == this.price;
  }
}

class EbookSpecification {
  constructor(ebook) {
    this.ebook = ebook;
  }

  isSatisfied(item) {
    return item.ebook === this.ebook;
  }
}
```

### Specification aware filter
```
class BookFilter {
  filter(items, spec) {
    return items.filter(x => spec.isSatisfied(x));
  }
}
```

### Specification combinator
```
class AndSpecification {
  constructor(...specs) {
    this.specs = specs;
  }

  isSatisfied(item) {
    return this.specs.every(x => x.isSatisfied(item));
  }
}
```

### Usage
```
let books = [];
for (const book of booksList) {
  books.push(new Product(book.title, book.price, book.ebook))
}

let bf = new BookFilter();
let eightyRupeeBooks = bf.filter(books, new PriceSpecification(80));

for (let book of eightyRupeeBooks) {
  console.log(`* ${book.name} is priced Rs.80`);
}

console.log('=======================================');

let eBooks = bf.filter(books, new EbookSpecification(true));

for (let book of eBooks) {
  console.log(`* ${book.name} can be purchased as eBooks`);
}

console.log('=======================================');

let eightyRupeeEbooks = bf.filter(books, new AndSpecification(
  new PriceSpecification(80),
  new EbookSpecification(true),
));

for (let book of eightyRupeeEbooks) {
  console.log(`* ${book.name} is a 80Rs eBook`);
}
```

### Result
```bash
* The Compound Effect is priced Rs.80
* Exeptional Living is priced Rs.80
* Power of Intention is priced Rs.80
=======================================
* The Compound Effect can be purchased as eBooks
* The Enterpreneur can be purchased as eBooks
* Exeptional Living can be purchased as eBooks
* Seasons of life can be purchased as eBooks
* Power of Intention can be purchased as eBooks
* Everyday Wisdom can be purchased as eBooks
=======================================
* The Compound Effect is a 80Rs eBook
* Exeptional Living is a 80Rs eBook
* Power of Intention is a 80Rs eBook
```