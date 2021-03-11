# Observer Pattern

Synonyms: Event-Subscriber, Listener

**Observer** is a behavorial design pattern that lets us define a subscription mechanism to notify multiple objects about any event that happen to the object they are observing.

## Problem
let's say I am very interested in a particular youtube channel and I would like to watch their next video. One approach could be I checking the channel every hour to check a new video's release. But you see the probem in this approach. Most of my checks are going to be pointless & a waste of time. 

Another option could be that youtube could send tons of emails to all the customers each time a new video becomes available. it will upset cusomers who are not interested in new videos, right!!.

## Solution
The current youtube channel subscription system is a reasonalble solution where any number of customers can subscribe to a channel and only the customer who have subscribed and opted in for notification shall be notified on new video release.


## Implementation logic
subject/publisher : The object that has some interesting state and is also going to notify other objects about the changes to its state. This mechanism consists of an array field for storing a list of references to subscriber objects and several public methods which allow adding/removing subscribers.

subscribers : Other objects that wnat to track the changes to the publisher.

Whenever the event happens to the publisher, it invokes a specific notification method in the subsciber object.

That's why:
- All subscribers implement the same interface
- The publisher communicated with them only via that interface. This interface should declare the notification method along with a set of parameters that publisher can use to pass some contextual data along with notification.

## Step by step implementation

1. Create a **Publisher** class that issues events. the Publisher may contain 
   - a `mainState` that changes
   - an array field `subscribers` : Subscriber[] 
   - a method to `subscribe(s: Subscriber)`
   - a method to `unsubscribe(s: Subscriber)`
   - a method to `notifySubscribers()`

2. The **Subscriber** interface declares the notificaiton interface called `update()`. The method may have several parameters that let the publisher pass some event detail along with the `update()`.

3. When a new event happens, the **publisher** goes over the subscibers list and calles the notification method `update()` declared in the subscriber interface of each subscriber object.

4. **Concrete Subscribers** perform some actions in response to notifications issued by the publisher. All of these classes must implement the same interface so the publisher isn't coupled to concreate classes.

5. Subscribers may need some contextual information to handle the update correctly. For this reason, publishers often pass some context data as arguments of the notification method. The publisher can pass itself as an argument. letting subscriber fetch any required data directly.

6. The **Client** creates publisher and subscriber objects separately and then registers subscribers for publisher updates.

## Pseudocode

**Publisher base class:**
```
class EventManager
  private field listerens: hash map of event types and listeners

  method subscribe(eventType, listener) {
    listeners.add(eventType, listener)
  }

  method unsubscribe(eventType, listener) {
    listeners.add(eventType, listener)
  }

  method notify(eventType, data) {
    foreach listener in listerns of eventtype {
      listener.update(data)
    }
  }
```

**Concrete Publisher:**
```
class YoutubeChannel
  public field events: EventManager

  constructror()
    this.events = new EventManager()

  method publishNewVideo()
    events.notify("new_video", video_name) 
```

**Subscriber Interface:**
```
Interface EventListener
  method update(message)
```

**Concrete Subscriber class:**
```
class YoutubeAccount implements EventListener
  method update(message)
    alert(message)

```

**Usage:**
```
class App
  ytc_1 = new YoutubeChannel()
  ytc_2 = new YoutubeChannel()
  yta_1 = new YouttubeAccount()
  yta_2 = new YouttubeAccount()
  yta_3 = new YouttubeAccount()

  ytc_1.events.subscribe("new_video", yta_1)
  ytc_1.events.subscribe("new_video", yta_2)
  ytc_2.events.subscribe("new_video", yta_3)
```
