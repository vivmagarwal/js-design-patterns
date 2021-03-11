console.log('observer-pattern works!!');

// ===================================================== //
// Example 1. Simple example ES6 Class
// ===================================================== //

// subscriber

/**
class User {
  constructor(name) {
    this.name = name;
  }

  update(msg) {
    console.log(`NOTIFICATION ::: ${this.name}, ${msg}.`);
  }
}

// subject/publisher
class YoutubeChannel {
  constructor(channelName) {
    this.channelName = channelName;
    this.subscribers = [];
    this.videos = [];
  }

  subscribe(user) {
    this.subscribers.push(user);
    user.update(`You are successfully subscribed to ${this.channelName}`)
  }

  unsubscribe(user) {
    let userIndex = this.subscribers.indexOf(user, 0);
    this.subscribers.splice(userIndex, 1);
  }

  postVideo(videoTitle) {
    this.videos.push(videoTitle);
    this.notify(`New Video - ${videoTitle} - posted on ${this.channelName}`);
  }

  notify(msg) {
    this.subscribers.forEach((subscriber) => {
      subscriber.update(msg);
    })
  }
}

// usage: client or main app
let u1 = new User("John");
let u2 = new User("Mike");

let channel1 = new YoutubeChannel("Youtube channel 1");
let channel2 = new YoutubeChannel("Youtube channel 2");

channel1.subscribe(u1);
channel1.subscribe(u2);
channel2.subscribe(u2);

console.log('---------------------------------------');

channel1.postVideo("C1 Video-1");

console.log('---------------------------------------');

channel2.postVideo("C2 Video-1");

channel1.unsubscribe(u2);

console.log('---------------------------------------');

channel1.postVideo("C1 Video-2");

console.log('---------------------------------------');
*/

// ===================================================== //
// Example 2. Prototypal Inheritance - My Favourite way
// ===================================================== //

// subject / publisher

/**
function YoutubeChannel(channelName) {
  this.channelName = channelName;
  this.subscribers = [];
  this.videos = [];
}

YoutubeChannel.prototype.subscribe = function (user) {
  this.subscribers.push(user);
  user.update(`You are successfully subscribed to ${this.channelName}`)
};

YoutubeChannel.prototype.unsubscribe = function (user) {
  let userIndex = this.subscribers.indexOf(user, 0);
  this.subscribers.splice(userIndex, 1);
};

YoutubeChannel.prototype.postVideo = function (videoTitle) {
  this.videos.push(videoTitle);
  this.notify(`New Video - ${videoTitle} - posted on ${this.channelName}`);
}

YoutubeChannel.prototype.notify = function (msg) {
  this.subscribers.forEach((subscriber) => {
    subscriber.update(msg);
  })
}

// subscriber
function User(name) {
  this.name = name;
};

User.prototype.update = function (msg) {
  console.log(`NOTIFICATION ::: ${this.name}, ${msg}.`);
};

// usage: client or main app
let u1 = new User("John");
let u2 = new User("Mike");

let channel1 = new YoutubeChannel("Youtube channel 1");
let channel2 = new YoutubeChannel("Youtube channel 2");

channel1.subscribe(u1);
channel1.subscribe(u2);
channel2.subscribe(u2);

console.log('---------------------------------------');

channel1.postVideo("C1 Video-1");

console.log('---------------------------------------');

channel2.postVideo("C2 Video-1");

channel1.unsubscribe(u2);

console.log('---------------------------------------');

channel1.postVideo("C1 Video-2");

console.log('---------------------------------------');
*/


// ===================================================== //
// Modifying our Youtube example to use pubsub
// ===================================================== //

// ===================================================== //
// Very Simple PubSub broker object implementation. 
// events object basically contains all events mapped to an array of all the callback functions associated with that event.
// In real life we would be most probably using one of the time tested pubSub libraries like : https://github.com/mroderick/PubSubJS
// ===================================================== //

var pubsub = {
  events: {},

  subscribe: function (eventName, fn) {
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].push(fn);
  },

  unsubscribe: function (eventName, fn) {
    if (this.events[eventName]) {
      for (var i = 0; i < this.events[eventName].length; i++) {
        if (this.events[eventName][i] === fn) {
          this.events[eventName].splice(i, 1);
          break;
        }
      };
    }
  },

  publish: function (eventName, data) {
    if (this.events[eventName]) {
      this.events[eventName].forEach(function(fn) {
        fn(data);
      });
    }
  }
};

// subscriber - completely decoupled with publishers
// subscribers just needs to subscribe (on) to a topic.
class User {
  constructor(name) {
    this.name = name;
  }

  subscribeToTopic(topicName) {
    pubsub.subscribe(`new_video__${topicName}`, ({ message }) => {
      console.log(`Notification to ${this.name} :::`, message);
    });
  }
}

// publisher - completely decoupled with subscribers
// publisher's responsibility is just to publish (emit).
class YoutubeChannel {
  constructor(channelName) {
    this.channelName = channelName;
  }

  postVideo(videoTitle, topic) {
    let msg = `New ${videoTitle} of topic ${topic} published on ${this.channelName}`;
    pubsub.publish(`new_video__${topic}`, { message:msg});
  }
}

// Main app - Usage:
let u1 = new User("John");
let u2 = new User("Mike");
let u3 = new User("Nita");

let channel1 = new YoutubeChannel("Youtube channel 1");
let channel2 = new YoutubeChannel("Youtube channel 2");

u1.subscribeToTopic('topic_one');
u3.subscribeToTopic('topic_one');

u1.subscribeToTopic('topic_two');
u2.subscribeToTopic('topic_two');
u3.subscribeToTopic('topic_two');

u3.subscribeToTopic('topic_three');


channel2.postVideo('video title one', 'topic_three');
channel2.postVideo('video title two', 'topic_two');