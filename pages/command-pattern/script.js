console.log('command-pattern works!!');

// Receiver. In this example, It just exposes two methods called currentBrightness(), that returns the current brightness 
// and  changeBrightness(), that displays the last brightness and the new brightness.
// Receiver could be anything. No guarenteed interface. It can be from any company.
class LCDLight {
  constructor() {
    this.brightness = 0
    console.log(`WELCOME ::: New LCD light instantiated.`);
    console.log(`CURRENT BRIGHTNESS ::: ${this.brightness}`);
  }

  currentBrightness() {
    return this.brightness;
  }

  changeBrightness(newBrightnessValue) {
    let oldValue = this.brightness;
    this.brightness = newBrightnessValue;
    console.log(`${oldValue} BRIGHTNESS value changed to :::=> ${this.brightness} `);
  }
}

// Invoker: 1 :: simple invoker remote with just two buttons, on and off.
class SimpleOnOffRemote {
  constructor(onCommand, offCommand) {
    this.history = [];

    // loading the buttons of the remote with the commands
    this.on = onCommand
    this.off = offCommand
  }

  // our on button handler of the remote.
  pressOn() {
    this.on.execute();
    this.history.push(this.on);
  }

  // our off button handler of the interface.
  pressOff() {
    this.off.execute();
    this.history.push(this.off);
  }

  // Genieric method to execute any command.
  executeCommand(command) {
    command.execute();
    this.history.push(command);
  }

  // Generic method to undo the last command in the history
  undo() {
    const cmd = this.history.pop();
    cmd.undo();
  }
}

// Invoker: 2 ::  remote with three buttons, on and off + a flash button that tunds on light for three seconds and then turns it off.
class LightRemoteWithFlash {
  constructor(onCommand, offCommand, flashCommand) {
    this.history = [];

    this.on = onCommand
    this.off = offCommand
    this.flash = flashCommand
  }

  // our on button handler of the remote.
  pressOn() {
    this.on.execute();
    this.history.push(this.on);
  }

  // our off button handler of the interface.
  pressOff() {
    this.off.execute();
    this.history.push(this.off);
  }

  // our flash button that turns on the light for just 3 seconds and than turnds off
  pressFlash() {
    this.flash.execute();
    this.history.push(this.flash);
  }

  // Genieric method to execute any command.
  executeCommand(command) {
    command.execute();
    this.history.push(command);
  }

  // Generic method to undo the last command in the history
  undo() {
    const cmd = this.history.pop();
    cmd.undo();
  }
}

class LightRemoteWithDimAndGlow {
  constructor(onCommand, offCommand, dimCommand, glowCommand) {
    this.history = [];

    this.on = onCommand;
    this.off = offCommand;
    this.dim = dimCommand;
    this.glow = glowCommand;
  }

  pressOn() {
    this.on.execute();
    this.history.push(this.on);
  }

  pressOff() {
    this.off.execute();
    this.history.push(this.off);
  }

  pressDim() {
    this.dim.execute();
    this.history.push(this.dim);
  }

  pressGlow() {
    this.glow.execute();
    this.history.push(this.glow)
  }
  
  executeCommand(command) {
    command.execute();
    this.history.push(command);
  }

  undo() {
    const cmd = this.history.pop();
    cmd.undo();
  }
}

// Commands
// These commands will act upon our Receiver; that is our LCD light in this example.
// Commands always has access to its receiver because we send a receiver whiler instantiation.
// two methods execute() and undo()
// On isntantiation, a commands immediately needs to know all its dependencies, that it needs to do its job. 
class LightOnCommand { 
  constructor(light) {
    this.light = light; // a receiver 
  }

  // Execute command will change the value of the receiver.These are commands and not queries; so they performs its duty; it doesnot return anything.
  // its simple. the point that we are encapsulating something (simple) so that we can pass it around.  
  execute() {
    this.light.changeBrightness(100);
  }

  undo() {
    this.light.changeBrightness(0);
  }
}

class LightOffCommand { 
  constructor(light) {
    this.light = light; // a receiver 
  }

  execute() {
    this.light.changeBrightness(0);
  }

  undo() {
    this.light.changeBrightness(100);
  }
}

class LigtOnThenOffCommand {
  constructor(light) {
    this.onCommand = new LightOnCommand(light);
    this.offCommand = new LightOffCommand(light);
  }

  execute() { 
    setTimeout(() => { this.onCommand.execute()}, 2000)
    setTimeout(() => { this.offCommand.execute()}, 3000)
  }

  undo() {
    console.log(`this command doesnot have an undo operation.`);
  }
}

class LightDimCommand { 
  constructor(light) {
    this.light = light; // a receiver 
  }

  execute() {
    this.light.changeBrightness(this.light.currentBrightness() - 5);
  }

  undo() {
    this.light.changeBrightness(this.light.currentBrightness() + 5);
  }
}

class LightGlowCommand { 
  constructor(light) {
    this.light = light; // a receiver 
  }

  execute() {
    this.light.changeBrightness(this.light.currentBrightness() + 5);
  }

  undo() {
    this.light.changeBrightness(this.light.currentBrightness() - 5);
  }
}

// ===================================================== //
// Usage: 

const light_one = new LCDLight();

// we need to load relevant commands with the invokers.
const simple_on_off_remote = new SimpleOnOffRemote(new LightOnCommand(light_one), new LightOffCommand(light_one));
const on_off_flash_remote = new LightRemoteWithFlash(new LightOnCommand(light_one), new LightOffCommand(light_one), new LigtOnThenOffCommand(light_one));
const on_off_dim_glow_remote = new LightRemoteWithDimAndGlow(new LightOnCommand(light_one), new LightOffCommand(light_one), new LightDimCommand(light_one), new LightGlowCommand(light_one));

simple_on_off_remote.pressOn(); //100
simple_on_off_remote.pressOff(); // 0


on_off_dim_glow_remote.pressGlow(); // 5
on_off_dim_glow_remote.pressGlow(); // 10
on_off_dim_glow_remote.pressGlow(); // 15
on_off_dim_glow_remote.pressDim(); // 10

on_off_flash_remote.pressFlash(); // 100 => 0

// We are using three remotes to act upon the same receiver light :) Woww!! Fantasitc.
// This is a very common use case where there are multiple ways of doing an operation in our example. for example to cut some text we may select some text & click the cut button or just press cmd + x & so on...
// ===================================================== //