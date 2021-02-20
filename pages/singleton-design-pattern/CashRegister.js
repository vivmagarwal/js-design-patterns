let cash = 0; // this is a private varialbe. 

const CashResister = {
  addMoney(amount) {
    cash = cash + amount;
    return cash;
  },
  deductMoney(amount) {
    if (amount <= cash) {
      cash = cash - amount;
      return true;
    } else {
      return false;
    }
  },
  total() {
    console.log('total is: ' , cash);
    return cash;
  }
}

// module.exports = CashResister; // CashRegister is exposed to the world.

export { CashResister };