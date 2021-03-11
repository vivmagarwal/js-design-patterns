import { EventEmitter } from "events"
let eventEmitter = new EventEmitter();

// subscriber
class User {
  constructor(name) {
    this.name = name;
    eventEmitter.on("new-video", ({ message, subscribers }) => {
      if (subscribers.includes(this)) {
        this.update(message);
      }
    })
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
    eventEmitter.emit("new-video", {
      message: msg,
      subscribers: this.subscribers
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