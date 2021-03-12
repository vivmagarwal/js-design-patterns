console.log('mediator-pattern works!!');
/*
// Colleagues
const User = function (name) {
  this.name = name;
  this.chatroom = null;
};

User.prototype = {
  send: function (message, to) {
    this.chatroom.send(message, this, to);
  },
  receive: function (message, from) {
    console.log(`${from.name} to ${this.name}: ${message}`);
  }
}

// Mediator
const Chatroom = function () {
  let users = {};

  return {
    register: function (user) {
      users[user.name] = user;
      user.chatroom = this;
    },
    send: function  (message, from, to){
      if (to) {
        to.receive(message, from);
      } else {
        for (let key in users) {
          if (users[key] !== from) {
            users[key].receive(message, from);
          } 
        }
      }
    }
  }
}

// Usage
const john = new User('John');
const adam = new User('Adam');
const nita = new User('Nita');

const chatroom = new Chatroom();

chatroom.register(john);
chatroom.register(adam);
chatroom.register(nita);

john.send('Hello Nita', adam);
adam.send('Hello Nita!', nita);
nita.send('Hello Everyone!!');

*/

// ===================================================== //
// Example of using pub/sub with mediator
// Say, YT channel published a video of a topic
// all the subscribers of that topic got notified
// We also need a feature where users may register to a chatroom & chat with each other.
// ===================================================== //

/**
 * For youtubechannel *--* topics *--* subscribers scenario the pub/sub patterns looks a good choice
 * For user *--* user *--* user scenario, the mediator pattern looks a reasonable choice where multiple colleagues needs to communicate with each other. 
 */

// Just practicing observer | pubsub & mediator

// pubsub - to make it flexible we can make it a constructor function and an object will we used.
var pubsub = {
  events: {},

  subscribe: function (eventName, fn) {
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].push(fn);
  },

  unsubscribe: function (eventName, fn) {
    // logic to unsubscribe
  },

  publish: function (eventName, data) {
    if (this.events[eventName]) {
      this.events[eventName].forEach((fn) => {
        fn(data);
      })
    }
  },
}

// Mediator - to make it flexible we can make it a constructor function and an object will we used.
var chatroom = {
  users: {},

  register: function (user) {
    this.users[user.name] = user;
    user.chatroom = this;
  },
  send: function (message, from, to) {
    if (to) {
      to.receive(message, from);
    } else {
      for (let key in users) {
        if (this.users[key] !== from) {
          this.users[key].receive(message, from);
        }
      }
    }
  }
}

// Publisher constructor object
function YoutubeChannel(channelName) {
  this.channelName = channelName;;
}

YoutubeChannel.prototype.postVideo = function (VideoTitle, videoTopic) {
  pubsub.publish(videoTopic, `New Video, topic: ${videoTopic}, title: ${VideoTitle}`);
}

// Subscriber constructor object
function User(name) {
  this.name = name;
}

User.prototype.subscribeToTopic = function (topicName) {
  pubsub.subscribe(topicName, (msg) => {
    console.log(`NOTIFICATION to ${this.name} :::`, msg);
  })
}

User.prototype.send = function (message, to) {
  chatroom.send(message, this, to);
}

User.prototype.receive = function (message, from) {
  console.log(`${from.name} to ${this.name} ::: ${message}`);
}


let u1 = new User("John");
let u2 = new User("Mike");
let u3 = new User("Nita");

let channel1 = new YoutubeChannel("Youtube channel 1");
let channel2 = new YoutubeChannel("Youtube channel 2");

console.log('---------------------------------------');

u1.subscribeToTopic('js');
u2.subscribeToTopic('html');

u3.subscribeToTopic('js');
u3.subscribeToTopic('html');
u3.subscribeToTopic('css');

channel2.postVideo("Javacript the good parts", 'js');
channel2.postVideo("HTML in depth", 'html');

console.log('---------------------------------------');

chatroom.register(u1);
chatroom.register(u2);

u1.send('Hello Mike', u2);
