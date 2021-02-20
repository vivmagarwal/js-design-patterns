console.log('builder-design-pattern works!!');

import { Pizza } from "./Pizza.js";

const pepperoni = new Pizza();
pepperoni.setBase('Whole wheat');
pepperoni.setSauce('Tomato Basil');
pepperoni.setCheeze('Smoked Mozzarella');
pepperoni.setToppings(['Pepperoni', 'Basil']);

pepperoni.bake();

// Using Calsses - without pattern

import { signup } from './Signup.js';

// the huge list of arguments is certainly prone to mistakes and is not client friendly.
// the telescoping construction anti pattern in OOP languages.
signup.create({ name: 'John doe', email: 'John@email.com', age: 36, nickname: 'jd', photo: 'john.jpeg', isModerator: true, isAdmin: false});


// Example 2 - using classess with builder pattern

import { SignupBuilder } from "./SignupBuilder.js";

new SignupBuilder('James Bond', 'bond@james.com', '40')
  .setPhoto('james.jped')
  .setNickName('bond')
  .setModerator()
  .setAdmin()
  .create();
