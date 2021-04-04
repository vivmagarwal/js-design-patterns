console.log('mvc-pattern works!!');

// MVC Pattern

// ===================================================== //
// Model
// Knows nothing about the view
// ===================================================== //
var model = {
  toDos: [
    'Meet George',
    'Buy Fruits',
    'Read a book',
    'Organize office'
  ],

  completed: [
    'Pay Bills',
  ]
};

// ===================================================== //
// controller
// ===================================================== //

var controller = {
  // typically the init of controller is the entry point of the app
  init: function () {
    compactView.render();
    summaryView.render();
  },

  addTodo: function (todoItem) {
    model.toDos.push(todoItem);
    compactView.render();
    summaryView.render();
  },


  getTodos: function () {
    return model.toDos;
  },

  getDones: function () {
    return model.completed;
  }
}

// ===================================================== //
// view 1
// knows nothing about the model.
// ===================================================== //
var compactView = {
  render: function () {
    let todos = controller.getTodos();
    console.log('todos [compact view]', todos);
  },
};

// ===================================================== //
// view 2
// ===================================================== //
var formView = {
  addTodo: function (todoItem) {
    console.log('>> Adding item to the list via form....');
    controller.addTodo(todoItem);
  },
}

// ===================================================== //
// view 3
// ===================================================== //
var summaryView = {
  render: function () {
    let todosCount = (controller.getTodos()).length;
    let doneCount = (controller.getDones()).length;
    console.log(`Summary: ${todosCount} items toDo, ${doneCount} items done.`);
  }
}

// run the app
// controller.init();
// console.log('=======================================');
// formView.addTodo('Visit Doctor');
// console.log('=======================================');
// formView.addTodo('Speak to the Manager');
// console.log('=======================================');


// ===================================================== //
// Model
// ===================================================== //

class Question {
  constructor(question, answer) {
    this.question = question;
    this.answer = answer;
  }

  getQuestion() {
    return this.question;
  }

  isGoodAnswer(answer) {
    return answer == this.answer;
  }
}

class QuestionController {
  constructor() {
    this.questions = [];
  }

  load() {
    // from memory or disk
    this.questions.push(new Question("from with direction does Sun rise?", "east"));
    this.questions.push(new Question("How many days do we have in a week?", "7"))
    this.questions.push(new Question("How many letters are there in the English alphabet?", "26"))
  }

  next() {
    if (!this.questions.length) return null;
    return this.questions.pop();
  }
}

// ===================================================== //
// View
// ===================================================== //
class QuestionView {
  generateMarkup(question) {
    const questionWrapper = document.createElement('div');
    questionWrapper.classList.add('quiz__question-wrapper');

    const questionParagraph = document.createElement('p');
    questionParagraph.innerHTML = question;
    questionParagraph.classList.add('quiz__question');

    questionWrapper.appendChild(questionParagraph);
    return questionWrapper;
  }
}

class AnswerView {
  generateMarkup() {
    const answerWrapper = document.createElement('div');
    answerWrapper.classList.add('quiz__answer-wrapper');

    const answerInput = document.createElement('input');
    answerInput.setAttribute('type', 'text');
    answerInput.setAttribute('placeholder', 'Type answer');
    answerInput.setAttribute('id', 'myAnswer');
    answerInput.classList.add('myAnswer');

    const submitButton = document.createElement('button');
    submitButton.setAttribute('id', 'submitMyAnswer');
    submitButton.textContent = "✔️"
    submitButton.classList.add('submitMyAnswer');

    answerWrapper.appendChild(answerInput);
    answerWrapper.appendChild(submitButton);
    return answerWrapper;
  }
}

class FeedbackView {
  generateMarkup() {
    const feedbackWrapper = document.createElement('div');
    feedbackWrapper.classList.add('quiz__feedback-wrapper');

    this.feedbackParagraph = document.createElement('p');
    this.feedbackParagraph.setAttribute('id', 'answerFeedback');
    this.feedbackParagraph.textContent = "waiting for answer";

    feedbackWrapper.appendChild(this.feedbackParagraph);
    return feedbackWrapper;
  }

  update(text) {
    this.feedbackParagraph.textContent = text;
  }
}

class ViewController {
  constructor() {
    this.qv = new QuestionView();
    this.av = new AnswerView();
    this.fv = new FeedbackView();
  }


  render(question) {
    this.app = document.getElementById('app');
    
    this.gameWrapper = document.createElement('div');
    this.gameWrapper.classList.add('quiz');

    this.app.appendChild(this.gameWrapper);

    this.gameWrapper.appendChild(this.qv.generateMarkup(question));
    this.gameWrapper.appendChild(this.av.generateMarkup());
    this.gameWrapper.appendChild(this.fv.generateMarkup());
  }

  goodAnswer() {
    this.fv.update('Absolutely Correct 👏🏻');
  };

  badAnswer() {
    this.fv.update('Wrong Answer, Try again 🚫');
  };

  finishPlaying() { };
}

// ===================================================== //
// controller
// ===================================================== //

class GameController {
  constructor() {
    this.qc = new QuestionController();
    this.qc.load();
    this.vc = new ViewController();
  }

  validateAnswer(question) {
    const submitButtons = document.querySelectorAll('.quiz .submitMyAnswer');

    submitButtons.forEach(element => {
      element.addEventListener('click', (e) => {
        const target = e.target;
        console.log(target);
        const quiz = target.closest('.quiz');
        console.log(quiz);
  
        console.log(quiz.querySelector('.myAnswer'));
        let userInput = quiz.querySelector('.myAnswer').value;
        if (question.isGoodAnswer(userInput)) {
          this.vc.goodAnswer();
  
          setTimeout(() => {
            this.askQuestion();
           },1000)
        } else {
          this.vc.badAnswer();;
        }
      })
    });
  }

  askQuestion() {
    let question = this.qc.next();
    if (question) {
      this.vc.render(question.getQuestion());
      this.validateAnswer(question);
    }
  }
}

// ===================================================== //


const game = new GameController();
game.askQuestion();



// https://learning.oreilly.com/library/view/hands-on-design-patterns/9781789135565/a912ac3e-9c02-464e-b124-9a323c3faedd.xhtml