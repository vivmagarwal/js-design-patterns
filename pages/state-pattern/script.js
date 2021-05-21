console.log('state-pattern works!!');

// Example from Mosh's Design pattern course
// https://codewithmosh.com/courses/759570/lectures/13732405

// Problematic implementation.
(() => {
  
  class Canvas {
    constructor() {
      this.currentTool = null;
    }

    // In real application there will be many more events and we'll have to write this decision making code several times for each events.
    mouseDown() {
      // The longer the tools we support; the longer the list is going to become; super unmaintainable;
      // Not easy to extend; the tool needs to be added to each events.
      if (this.currentTool == 'selection') {
        console.log("Selection icon");
      } else if (this.currentTool == 'brush') {
        console.log("Brush icon");
      } else if (this.currentTool == "eraser") {
        console.log("Eraser icon");
      }
    }

    mouseUp() {
      if (this.currentTool == 'selection') {
        console.log("Draw dashed rectangle");
      } else if (this.currentTool == 'brush') {
        console.log("Draw a hand drawn line");
      } else if (this.currentTool == "eraser") {
        console.log("Erase something");
      }
    }

    getCurrentTool() {
      return this.currentTool;
    }

    setCurrentTool(tool) {
      this.currentTool = tool;
    }
  }
})();



// Solution implementation using the State pattern.
(() => {

  // Abstract State
  class Tool {
    mouseDown() { };
    mouseUp() { };
  }

  // Concrete State
  class SelectionTool extends Tool {
    mouseDown() { console.log("Selection icon") };
    mouseUp() { console.log("Draw dashed rectangle") };
  }

  // Concrete State
  class BrushTool extends Tool {
    mouseDown() { console.log("Brush icon") };
    mouseUp() { console.log("Draw handdrawn line") };
  }

  // Concrete State - Super easy to add new tools
  class EraserTool extends Tool {
    mouseDown() { console.log("Eraser icon") };
    mouseUp() { console.log("Eraise something") };
  }

  // context
  class Canvas {
    constructor() {
      this.currentTool = null;
    }

    mouseDown() {
      this.currentTool.mouseDown();
    };
    
    mouseUp() {
      this.currentTool.mouseUp();
    };

    getCurrentTool() {
      return this.currentTool;
    }

    setCurrentTool(tool) {
      this.currentTool = tool;
    }
  }

  // Usage
  let canvas = new Canvas();
  canvas.setCurrentTool(new SelectionTool());
  canvas.mouseDown();
  canvas.mouseUp();
})();

/**
 * 
 */