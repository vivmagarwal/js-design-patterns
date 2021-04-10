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

let __extends = this.__extends || function (d, b) {
  for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
  function __fn() { this.constructor = d; }
  __fn.prototype = b.prototype;
  d.prototype = new __fn();
};

// ===================================================== //
