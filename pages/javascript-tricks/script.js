console.log('javascript-tricks works!!');

// ===================================================== //
// string as function body 
// ===================================================== //

const func = new Function(`
  let name = 'John Doe';
  console.log(name);
`);

func();

// ===================================================== //
// Nullish coalescing operator
// ===================================================== //

const a = 0;
const b = a || 1;
const c = a ?? 1;

console.log(b);
console.log(c);

// ===================================================== //
// __extednd TS Style
// ===================================================== //

let __extends = this?.__extends || function (d, b) {
  for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
  function __fn() { this.constructor = d; }
  __fn.prototype = b.prototype;
  d.prototype = new __fn();
};

// ===================================================== //

class SpecialError extends Error {
  constructor(name) {
    let msg = `${name} some special error message here.`
    super(msg);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, SpecialError);
    }
  }
}

//usage:
// throw new SpecialError('test');

// ===================================================== //

let enumSize = Object.freeze({
  large: "large",
  medium: "medium",
  small: "small"
});

//usage
// console.log(enumSize.large);

// ===================================================== //

class IMachine {
  constructor() {
    if(this.constructor.name === 'IMachine') {
      throw new Error('IMachine is designed to be abstract!');
    }
  }

  reqFnName() {
    throw new Error('reqFnName needs to be implemented');
  }
}

class User {
  constructor() {
    this.name = "John";
    this.surname = "Doe";
  }

  set firstName(value) {
    this.name = value;
  }

  get fullName() {
    return `${this.name} ${this.surname}`;
  }

  set fullName(value) {
    [this.name, this.surname] = value.split(" ");
  }
};

let u1 = new User();
u1.fullName = "James Bond";
u1.firstName = "Jonny";
console.log(u1.fullName);

class SuperUser extends User {
  constructor() {
    super();
  }
}

let su1 = new SuperUser();
su1.firstName = "Tom";
console.log(su1.fullName);




