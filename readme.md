#Chrome Broadcaster for extensions

In chrome 44 messaging inside one page isn't working, so you not able to send message inside background page for example. This module is replacement for `chrome.runtime.sendMessage`/`chrome.runtime.onMessage` which allows to send message to current page and another pages of extension.

Just include `broadcaster.js` in your addon.

Sending message:

```javascript

// simple
Broadcaster.sendMessage({"message": 1});

// with callback
Broadcaster.sendMessage({"message": 1}, function(response) {
  
});

```

Receiving message:


```javascript

Broadcaster.onMessage.addListener(function(message, sender, sendResponse) {
  
});

```

This code will not work from Chrome 44:

```javascript

chrome.runtime.onMessage.addListener(function() {
  // never called
});

chrome.runtime.sendMessge("msg");

```

But code below will works:

```javascript

Broadcaster.onMessage.addListener(function() {
  // called
});

// listener from current page will be called also with another extension pages
Broadcaster.sendMessge("msg");

```