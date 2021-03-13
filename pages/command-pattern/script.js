console.log('command-pattern works!!');

/**
 * Simple command line blog app that allows you to create a new post, view a post and update an exisiting post.
 */




// ===================================================== //


class Calculator {
  constructor() {
    this.value = 0
    this.history = []
  }

  executeCommand(command) {
    // the execute method of the commands will get access to the current value
    /**
     * So, what this is doing is it's saying,
     * take our add command, call execute, 
     * pass it in our current value which in our case is 0 to start with,
     * and add it that value, that we gave to our add command
     * and set that as our new value.
     */
    this.value = command.execute(this.value)
    this.history.push(command)
    console.log('executeCommand :::', command, this.value);
  }

  undo() {
    const command = this.history.pop();
    this.value = command.undo(this.value)
    console.log('undoCommand :::', command, this.value);
  }

  // add(valueToAdd) {
  //   this.value = this.value + valueToAdd
  // }

  // subtract(valueToSubtract) {
  //   this.value = this.value - valueToSubtract
  // }

  // multiply(valueToMultiply) {
  //   this.value = this.value * valueToMultiply
  // }

  // divide(valueToDivide) {
  //   this.value = this.value / valueToDivide
  // }
}

class AddCommand { 
  constructor(valueToAdd) {
    this.valueToAdd = valueToAdd
  }

  // its somewhat like the Array.reduce function where on ever execution the command get's access to the current value 
  execute(currentValue) {
    return currentValue + this.valueToAdd
  }

  undo(currentValue) {
    return currentValue - this.valueToAdd
  }
}

class SubtractCommand { 
  constructor(valueToSubtract) {
    this.valueToSubtract = valueToSubtract
  }

  execute(currentValue) {
    return currentValue - this.valueToSubtract
  }

  undo(currentValue) {
    return currentValue + this.valueToSubtract
  }
}

class MultiplyCommand { 
  constructor(valueToMultiply) {
    this.valueToMultiply = valueToMultiply
  }

  execute(currentValue) {
    return currentValue * this.valueToMultiply
  }

  undo(currentValue) {
    return currentValue / this.valueToMultiply
  }
}

class DivideCommand {
  constructor(valueToDivide) {
    this.valueToDivide = valueToDivide
  }

  execute(currentValue) {
    return currentValue / this.valueToDivide;
  }

  undo(currentValue) {
    return currentValue * this.valueToDivide;
  }
}

class AddThenMultiplyCommand {
  constructor(valueToAdd, valueToMultiply) {
    this.AddCommand = new AddCommand(valueToAdd);
    this.MultiplyCommand = new MultiplyCommand(valueToMultiply);
  }

  execute(currentValue) {
    const newValue = this.AddCommand.execute(currentValue);
    return this.MultiplyCommand.execute(newValue);
  }

  undo(currentValue) {
    const newValue = this.MultiplyCommand.undo(currentValue);
    return this.AddCommand.undo(newValue);
  }
}


const calculator = new Calculator();
calculator.executeCommand(new AddCommand(10));

calculator.executeCommand(new AddCommand(15));
calculator.undo();

calculator.executeCommand(new SubtractCommand(3));

calculator.executeCommand(new MultiplyCommand(10));

calculator.executeCommand(new DivideCommand(7));

calculator.executeCommand(new AddThenMultiplyCommand(5, 3));


// ===================================================== //

//Reciever: 
class PrintingMachine {
  constructor() {
    this.currentState = 'off';
    this.history = [];
  }

  executeCommand(command) {
    this.currentState = command.execute(this.currentState);
    this.history.push(command);
    console.log('executeCommand :::', command, this.value);
  }

  turnOn() {
    console.log(`Printing machine has been turned on`);
  }

  turnOff() {
    console.log('Printing machine has been turned off');
  }

  print(){
      console.log('The printer is printing your document')
  }

  
}

// TurnOnPrinter command:
class TurnOnPrinter {
  constructor(PrintingMachine) {
    this.PrintingMachine = PrintingMachine;
    this.commandName = "turn on";
  }

  execute(currentState) {
    return `ON`;
  }
}

// Invoker / Manager:
class PrinterControlPanel {
  pressButton(command) {
      console.log(`Pressing ${command.commandName} button`);
      command.execute();
  }
}

const printingMachine = new PrintingMachine();
const controlPanel = new PrinterControlPanel();


// controlPanel.pressButton(new TurnOnPrinter(printingMachine));

