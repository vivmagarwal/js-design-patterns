console.log('facade-pattern works!!');

// Facade
var addMyEvent = function (el, ev, fn) {
  if (el.addEventListener) {
    el.addEventListener(ev, fn, false);
  } else if (el.attachEvent) {
    el.attachEvent("on" + ev, fn);
  } else {
    el["on" + ev] = fn;
  }
};

// Client
try {
  addMyEvent(document.getElementById("facade-pattern"), "click", () => { console.log("Heading clicked.") });
} catch (e) {
  console.log(e);
}



class Message {
  constructor(content) {
    this.content = content;
  }
}

class NotificationServer {
  // connect() -> Connection
  // authenitcate(appID, key) -> AuthToken
  // send(authToken, message, target)
  // Connection.disconnect

  connect(ipAddress) {
    return new Connection()
  }

  authenticate(addID, key) {
    return new AuthToken();
  }

  send(authToken, message, target) {
    console.log("Sending a message");
  }
}

class Connection {
  disconnect() {}
}

class AuthToken { }

// Usage / clinet / main [not using facade]
let server = new NotificationServer();
let connection = server.connect("ip");
let authToken = server.authenticate("appid", "key");
let message = new Message("Hello World");
server.send(authToken, message, "target");
connection.disconnect();

// for something like  - sending push notification to the client, it's too much work. We use facade pattern to solve this problem.
// main app is dependent on  4 classes to just send notification.

// Facade - the class with which our main app will talk to 
class NotificationService {
  send(msg, target) {
    let server = new NotificationServer();
    let connection = server.connect("ip");
    let authToken = server.authenticate("appid", "key");
    let message = new Message(msg);
    server.send(authToken, message, target);
    connection.disconnect();
  }
}

// Usage [using facade]
var service = new NotificationServer();
service.send("Hello World", "target");


// =====================================================
