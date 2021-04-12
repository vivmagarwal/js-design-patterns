console.log('specification-enterprise-pattern works!!');

// Data
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


class Product {
  constructor(name, price, ebook) {
    this.name = name;
    this.price = price;
    this.ebook = ebook;
  }
}

// specifications
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

// spefification aware filter
class BookFilter {
  filter(items, spec) {
    return items.filter(x => spec.isSatisfied(x));
  }
}

// specification combinator

class AndSpecification {
  constructor(...specs) {
    this.specs = specs;
  }

  isSatisfied(item) {
    return this.specs.every(x => x.isSatisfied(item));
  }
}

// usage

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

