# Broadcast message for Chrome Extensions

## Why?

Sometimes you need to receive messages sent by chrome.runtime.sendMessage in the sender's frame, so you have something like this in your extesion page's js file:

```js

chrome.runtime.onMessage(function(message) {
  ...
});

...

chrome.runtime.sendMessage(...);

```

But Chrome behaviour for this among versions and even inside a single version is inconsistent:

- up to 57 onMessage listener within the one frame will be triggered only if there are at least two extensions frames(`chrome.extension.getViews().length > 1`)
- in versions from 57 `onMessage` is not triggered within one frame in any case. *It is the expected behaviour.*

For further reading see:
https://bugs.chromium.org/p/chromium/issues/detail?id=677692
https://bugzilla.mozilla.org/show_bug.cgi?id=1286124#c35

## Usage

Just include `broadcaster.js` in your addon and replace:
- `chrome.runtime.sendMessage` by `Broadcaster.sendMessage`
- `chrome.runtime.onMessage` by `Broadcaster.onMessage`

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