console.log('prototype-pattern works!!');

// ===================================================== //
// Shallow by default via Object.create

var phone = {
  brand: 'no brand',
  model: 'basic',

  ring() {
    console.log("tring tring");
  },

  makeACall() {
    console.log(`${this.brand}::${this.model}::Calling...`);
  },
}

const phone2 = Object.create(phone);
phone2.brand = 'Samsung';
phone2.makeACall(); // Samsung::basic::Calling...

const phone1 = Object.create(phone);
phone.brand = 'Apple'; // note that we changed phone not phone1
phone1.makeACall(); // Apple::basic::Calling...

// define and extra property using Object.create
const phone3 = Object.create(phone, {
  color: { value: "black" }
});

console.log(phone3.brand, phone3.color); // black

const phone4 = Object.create(phone3);
Object.defineProperty(phone4, 'camera', {
  value: '1080px',
  writable: true,
  enumerable: true,
  configurable: true
})

console.log(phone4.brand, phone4.color, phone4.camera); //Apple black 1080px


console.log('=======================================');

// Class or a constructor function
function Phone(brand) {
  this.brand = brand;
}

// please remember that a class, (i.e. Contructor) bears the prototype property not the instance! 
Phone.prototype.makeACall = function() {
  console.log(`${this.brand} ::: Calling...`);
}

Phone.prototype.clone = function() {
  return Object.create(this);
}

Phone.prototype.deepClone = function (onlyOwnProperties = false) {
  let out = {};
  for (var attr in this) { // for..in loop enumerates properties in the prototypal chain as well.
    if (onlyOwnProperties) {
      if (this.hasOwnProperty(attr)) {
        out[attr] = this[attr];
      }
    } else {
      out[attr] = this[attr];
    }
  }
  return out;
}

Phone.prototype.setProperty = function (key, value) {
  Object.defineProperty(this, key, {
    value: value,
    writable: true,
    enumerable: true,
    configurable: true
  })
}

// Creating a new Phone object
const phone5 = new Phone('Blackberry');
phone5.makeACall(); // Blackberry ::: Calling...

const phone6 = phone5.clone();

// Add a new property to the cloned object
phone6.setProperty('color', 'Yellow');
console.log(phone6.color);

// Add a new method to the cloned object
phone6.setProperty('ring', function () {
  console.log(`${this.brand}, ${this.color}, ringing ::: tring tring...`);
});
phone6.ring(); // ringing ::: tring tring...

// Cloning phone6
const phone7 = phone6.clone();
phone7.brand = "Samsung";
phone7.color = "Black";
phone7.makeACall();
phone7.ring();

console.log('=======================================');

// Deep cloning phone6 enumerating properties in the prototypal chain but making a copy of them.
const phone8 = phone6.deepClone();
console.log('phone8');
phone6.color = 'Red'; // it doesnot affect the deepClone
phone8.brand = 'Apple'; // it can surely be overwritten
phone8.makeACall(); // Apple ::: Calling...
phone8.ring(); // Apple, Yellow, ringing ::: tring tring...

console.log('=======================================');

// Deep cloing (making a separate copy) only of own properties without enumerating properties in the prototypal chain.
const phone9 = phone6.deepClone(true);
console.log('phone9');
phone6.color = 'Red'; 
phone9.brand = 'Apple'; 
// phone9.makeACall(); // Uncaught TypeError: phone9.makeACall is not a function
phone9.ring(); // Apple, Red, ringing ::: tring tring...
