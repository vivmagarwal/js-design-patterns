# Module Pattern

Modules help in keeping the units of code for a project separate and organized. In Javascript, there are several options for implementing modules:

- The Module Pattern
- Object literal notation
- AMD modules
- CommonJS modules
- EcmaScript modules 

## Object Literals

Using object literals can assist in encapsulating and organizig your code.

```
var myAccount = {

  // property
  accountHolerName: "John Deo",

  // property
  balance: 5000,

  // property
  accountSettings: {
    minimum_balance: 1000,
    credit_limit: 0,
    nominee: 'Jane Doe',
    default_language: 'English',
    default_currency: 'Rs.'
  },

  // method
  getAccountInfo: function () {
    console.log(`${this.accountHolerName}'s balance is ${this.accountSettings.default_currency} ${this.balance} and he speaks ${this.accountSettings.default_language}. ${this.accountHolerName} has to keep a minimum balace of ${this.accountSettings.minimum_balance}.`);
  },

  // method
  updateAccountSettings: function (new_settings) {
    if (typeof new_settings === "object") {
      this.accountSettings = new_settings;
    }
  }
}
```

Usage:

```
myAccount.getAccountInfo();

myAccount.updateAccountSettings({
  minimum_balance: 2000,
  credit_limit: 0,
  nominee: 'Jane Doe',
  default_language: 'French',
  default_currency: '$'
})

// Is there somthing called privacy? Shouldn't there be a way to make it private?
myAccount.accountHolerName = "James Bond";

myAccount.getAccountInfo();
```

## The Module Pattern

In Javascript, the Module pattern is used to emulate the concept of classes in such a way that we're able to include both public/private methods and variables inside a single object, thus sheilding particular parts from the global scope. With this pattern only a public API is returned, keeping evertying else within the closure private.

Module pattern assigns an iife to a variable. that iife returns an object with properties and methods that we want to make available outsite the iife.

```
var myAccountModule = (function () {
  var accountHolerName = "John Doe";
  var balance = 5000;
  var accountSettings = {
    minimum_balance: 1000,
    credit_limit: 0,
    nominee: 'Jane Doe',
    default_language: 'English',
    default_currency: 'Rs.'
  };

  return {
    getAccountInfo: function () {
      console.log(`${accountHolerName}'s balance is ${accountSettings.default_currency} ${balance} and he speaks ${accountSettings.default_language}. ${accountHolerName} has to keep a minimum balace of ${accountSettings.minimum_balance}.`);
    },

    updateAccountSettings: function (new_settings) {
      if (typeof new_settings === "object") {
        accountSettings = new_settings;
      }
    },

    updateName: function (new_name) {
      accountHolerName = new_name;
    }
  };
})();
```

Usage:

```
myAccountModule.getAccountInfo();
myAccountModule.updateName("James Bondy")
myAccountModule.updateAccountSettings({
  minimum_balance: 3000,
  credit_limit: 1000,
  nominee: 'Jane Bond',
  default_language: 'Chinese',
  default_currency: '#'
});
myAccountModule.getAccountInfo();
```

Here, other parts of the code are unable to directly access internal properties like `accountHolderName` , `balance` or `accountSettings`. They are fully sheilded from our global scope, so, it acts just like a private variable would. Methods like `getAccountInfo`, `updateName`, `updateAccountSettings` are effectively namespaced inside `myAccountModule`.

## Advantages of Module Pattern

- supports private properties and methods
- supports API for outside world which can easily interact with private properties and methods
  
## Disadvantages of Module Pattern

- We access both public and private memebers differently. When we wish to change visibility, we actually have to make changes to each place the memeber was used
- We cant access private memebers in methods that are added to the object at a later point.
- Inability to create automated unit tests for private members
- Inability to patch private members when hotfix is required, instead, one must override all public methods which interact with buggy private members.
- Inablility to extend private members easily
- Switching between functions and object literals for private and public methods

## The Revealing Module Pattern

The revealing module pattern is a slightly improved version of the module pattern. In the revealing module pattern we simply define all of our functions and variables in the private scope and return an anonymous object with pointers to the private functionality we wish to **reveal** as public.

**Example:**
```
var myAccountRevealingModule = (function () {
  var accountHolerName = "John Doe";
  var balance = 5000;

  var accountSettings = {
    minimum_balance: 1000,
    credit_limit: 0,
    nominee: 'Jane Doe',
    default_language: 'English',
    default_currency: 'Rs.'
  };

  function getAccountInfo() {
    console.log(`${accountHolerName}'s balance is ${accountSettings.default_currency} ${balance} and he speaks ${accountSettings.default_language}. ${accountHolerName} has to keep a minimum balace of ${accountSettings.minimum_balance}.`);
  };

  function updateAccountSettings(new_settings) {
    if (typeof new_settings === "object") {
      accountSettings = new_settings;
    }
  };

  function updateName(new_name) {
    accountHolerName = new_name;
  };

  // we are returning object with pointers to private members. All the logic remains outside of the return object.
  return {
    getAccountInfo: getAccountInfo,
    updateAccountSettings: getAccountInfo,
    updateName: updateName,
  };
})();
```

**Usage:**

```
myAccountRevealingModule.getAccountInfo();
myAccountRevealingModule.updateName("James Bondy")
myAccountRevealingModule.updateAccountSettings({
  minimum_balance: 3000,
  credit_limit: 1000,
  nominee: 'Jane Bond',
  default_language: 'Chinese',
  default_currency: '#'
});
myAccountRevealingModule.getAccountInfo();
```

Its a common practice in the revealing module pattern to name the private members with more specific naming scheme that uses the  words `private` or `public` and then expose a more consumer friendly name. for example in the above example the function `getAccountInfo()` can be named `publicGetAccountInfo()` and in the return oject we can use a better name like `getInfo: publicGetAccountInfo`. Also, the private member `balance` can be named `_balance` or `privateBalance`.

## Advantages

This pattern allows the syntax of our scripts to be more consistent. It also makes it more clear at the end of the module, which of our functions and variables may be accessed publicly.

## Disadvantages

Inside the IIFE private members may access the public members. If we are trying to patch the public members from outside, it wont work. Basically we can override a public member from outside. This is because the private function will continue to refer to the implementation inside the IIFE. Same no-patch rule applies to Public members which refer to the private member.



