console.log('module-pattern works!!');

// ===================================================== //
// Object literals.

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


// ===================================================== //
// Module pattern

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

// Usage:

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

// ===================================================== //
// Revealing module pattern

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