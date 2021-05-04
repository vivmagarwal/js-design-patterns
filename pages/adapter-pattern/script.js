console.log('adapter-pattern works!!');

// The target class
// The target defines the domain-specific interface used by the client code.
class Person {
  constructor() {}

  logData() {
    console.log(`DefaultLogger::: this comes from Person (target).`);
  }
}

// The Adaptee class
// the adaptee contains some useful behaviour, but its interface is incompatible with the existing client code.
// the adaptee needs some adaptation before the client code can use it.
class Employee {
  logDecent() {
    console.log(`DecentLogger::: this comes from Employee (adaptee).`);
  }
}

// The Adapter class
// The adapter makes the adaptees interface compatible with the target's interface.
// it often extends target class (person)
// basically client expects an inteface similar to a  person object;
// when Employee adapter extends Person; it gets all the methods/properties;
// we can overwrite the logData() method to use Employee's logDecent
class EmployeeAdapter extends Person {
  constructor(employee) {
    super();
    this.employee = employee;
  };

  // this log data is what our client expects.
  logData() {
    return this.employee.logDecent();
  }
}

// client code
function clientCode(target) {
  // the client code just understands the logData() method.
  target.logData();
}

const p1 = new Person();
clientCode(p1); //  works fine > DefaultLogger::: this comes from Employee(target).

// adaptee has an interface that client dont understand. the client code just understands to call a logData() mehtod.
const e1 = new Employee();
// clientCode(e1); // does not work > TypeError: target.logData is not a function


const adapter = new EmployeeAdapter(e1);
clientCode(adapter); // works > DecentLogger::: this comes from Employee (adaptee).






// let simpleLogger = function (data){
//   console.log(`Simple Logger::: ${data.firstName} ${data.lastName} is ${data.age} years old.`);
// }

// let decentLogger = function (fullName, age) {
//   console.log(`${fullName} is ${age} years old.`);
// }

// let betterLogger = function (firstName, lastName, age) {
//   console.log(`${firstName} ${lastName} is ${age} years old.`);
// }

// // let john = new Employee('John', 'Doe', '36');
// // john.logData();

// class simpleLoggerAdapter {

// }



// let cla = new simpleLoggerAdapter(john);
// let john = new Employee(cla);

// john.firstName = 'John';
// john.lastName = 'Doe';
// john.age = 36;




