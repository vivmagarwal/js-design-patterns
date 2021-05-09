console.log('bridge-pattern works!!');

// ===================================================== //
// Example 1.
// ===================================================== //

class VectorRendered {
  renderCircle(radius) {
    console.log(`drawing a vector circle of radius ${radius}`);
  }
}

class RasterRender {
  renderCircle(radius) {
    console.log(`drawing a raster circle of radius ${radius}`);
  }
}

class Shape {
  constructor(renderer) {
    this.renderer = renderer;
  }
}

class Circle extends Shape {
  constructor(renderer, radius) {
    super(renderer);
    this.radius = radius;
  } 

  draw() {
    this.renderer.renderCircle(this.radius);
  }

  resize(factor) {
    this.radius *= factor;
  }
}

class Square {

}

// Shape(hierarchy) - Square, Circle, Triange
// using composition we may bridge them together
// Renderer(hierarcy) = Raster, Vector


let raster = new RasterRender();
let vector = new VectorRendered();
let circle = new Circle(vector, 5);

circle.draw(); // drawing a vector circle of radius 5
circle.resize(2.5);
circle.draw(); // drawing a vector circle of radius 12.5

// it does saves us from having too many classes but it doesnot save us from having too many menthods.

// ===================================================== //
// Example 2
console.log('---------- Example 2 --------------');
// ===================================================== //

// Let's say we are going to build a universal remote control app. So with this mobile app 
// we are going to be able to control various brands to TV and potentially other devices in the future.
// so in our project let's create a class called RemoteControl 

// Basic remote control (turn on, turn off)
// Advanced remote control(setChannel)
// Movie remote control(play, pause, rewind)

// Class Hierarchy - complex one

// RemoteControl
//   SonyRemoteControl
//   SamsungRemoteControl
//   AdvancedRemoteControl
//     SonyAdvancedRemoteControl  
//     SamsungAdvancedRemoteControl


class DimmableLight {
  turnOn() { /* abstract */ };
  turnOff() { /* abstract */ };
  flashLight() { /* abstract */ };
  dim(value) { /* abstract */ };
  glow(value) { /* abstract */ };
}

class PhilipsDimmableLight extends DimmableLight {
  turnOn() { console.log(`Philips dimmable light: Turn on`); };
  turnOff() { console.log(`Philips dimmable light: Turn off`) };
  flashLight() { console.log(`Philips dimmable light: Flashing light`) };
  dim(value) { console.log(`Philips dimmable light: Dimming light by ${value}`) };
  glow(value) { console.log(`Philips dimmable light: Glowing light by ${value}`) };
}

class GEDimmableLight extends DimmableLight {
  turnOn() { console.log(`GE Dimmable light: Turn on`); };
  turnOff() { console.log(`GE Dimmable light: Turn off`) };
  flashLight() { console.log(`GE Dimmable light: Flashing light`) };
  dim(value) { console.log(`GE Dimmable light: Dimming light by ${value}`) };
  glow(value) { console.log(`GE Dimmable light: Glowing light by ${value}`) };
}

class SonyDimmableLight extends DimmableLight {
  turnOn() { console.log(`Sony Dimmable light: Turn on`); };
  turnOff() { console.log(`Sony Dimmable light: Turn off`) };
  flashLight() { console.log(`Sony Dimmable light: Flashing light`) };
  dim(value) { console.log(`Sony Dimmable light: Dimming light by ${value}`) };
  glow(value) { console.log(`Sony Dimmable light: Glowing light by ${value}`) };
}

class SimpleRemote {
  constructor(dimmableLight) {
    this.dimmableLight = dimmableLight;
  }

  turnOn() { this.dimmableLight.turnOn() };
  turnOff() { this.dimmableLight.turnOff() };
}

class RemoteWithDimAndGlow extends SimpleRemote {
  constructor(dimmableLight) {
    super(dimmableLight);
  }

  turnOn() { this.dimmableLight.turnOn() };
  turnOff() { this.dimmableLight.turnOff() };
  dim(value) { this.dimmableLight.dim(value) };
  glow(value) { this.dimmableLight.glow(value) };
}

class RemoteWithFlash extends SimpleRemote {
  constructor(dimmableLight) {
    super(dimmableLight);
  }

  turnOn() { this.dimmableLight.turnOn() };
  turnOff() { this.dimmableLight.turnOff() };
  flashLight() { this.dimmableLight.flashLight() };
}

let remoteControl = new RemoteWithDimAndGlow(new SonyDimmableLight());
remoteControl.turnOn();
remoteControl.dim(10);
