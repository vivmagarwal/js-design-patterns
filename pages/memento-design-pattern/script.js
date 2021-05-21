console.log('memento-design-pattern works!!');

// Example from Mosh's course
// https://codewithmosh.com/courses/759570/lectures/13732393


(() => {
  
  // Memento
  class EditorState {
    constructor(content) {
      this.content = content;
    }

    getContent() {
      return this.content;
    }

    // createState() {
      
    // }

    // restore(state) {
      
    // }
  }

  // Caretaker
  class History {
    constructor() {
      // editor states
      this.states = [];
    }

    push(editorState) {
      this.states.push(editorState);
    }

    pop() {
      return this.states.pop();
    }
  }
  
  // Originator
  class Editor {
    constructor() {
      this.content = null;
    }

    createState() {
      return new EditorState(this.content);
      /**
       * Do you notice that we are returning and EditorState object and not the Editor object.
       * 
       * had we stored Editor object, the history object would have got access to all the methods of the 
       * Editor class.
       * 
       * The work of the history class is just to manage a list/stack of editor states, nothing more than that.
       * The Editor state (memento) limits the capabilites of the History (caretaker).
       */
    }

    restore(state) {
      this.content = state.getContent();
    }

    getContent() {
      return this.content;
    }

    setContent(content) {
      this.content = content;
    }
  }

  // Usage
  let editor = new Editor();
  let history = new History();

  editor.setContent("a");
  history.push(editor.createState()); // create an editorState object and store it in history
  console.log(editor.getContent()); // a

  editor.setContent("b");
  history.push(editor.createState()); // create an editorState object and store it in history
  console.log(editor.getContent()) // b

  editor.setContent("c");
  history.push(editor.createState()); // create an editorState object and store it in history
  console.log(editor.getContent()) // c

  editor.restore(history.pop()); // history.pop returns c the last editorState in the stack; Restore the content of editor using this editorState;
  console.log(editor.getContent()) // c

  editor.restore(history.pop()); // history.pop returns b the editorState item in the stack; Restore the content of editor using this editorState;
  console.log(editor.getContent()) // b

  editor.restore(history.pop()); // history.pop returns a the editorState item in the stack; Restore the content of editor using this editorState;
  console.log(editor.getContent()) // a

})();