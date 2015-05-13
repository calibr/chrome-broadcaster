var Broadcaster = {
  _onlyOnce: function(fn) {
    var onceFn = function() {
      if (onceFn._broadcasterCalled) {
        return;
      }
      onceFn._broadcasterCalled = true;
      fn.apply(window, arguments);
    };
    onceFn._broadcasterCalled = false;
    return onceFn;
  },
  onMessage: {
    _listeners: [],
    _call: function(msg, cb) {
      var result = false;
      cb = cb || function() {};
      var sender = {
        url: document.location.href,
        id: chrome.runtime.id
      };
      var args = [msg, sender];
      if(cb) {
        args.push(cb);
      }
      for(var i = 0; i != this._listeners.length; i++) {
        var callres = this._listeners[i].apply(window, args);
        if(callres === true || cb._broadcasterCalled) {
          // return true, when response should be obtained from current page listeners
          result = true;
        }
      }
      return result;
    },
    addListener: function(listener) {
      if(this._listeners.indexOf(listener) !== -1) {
        return;
      }
      this._listeners.push(listener);
      chrome.runtime.onMessage.addListener(listener);
    },
    removeListener: function(listener) {
      var index = this._listeners.indexOf(listener);
      if(index !== -1) {
        return;
      }
      this._listeners.splice(index, 0);
      chrome.runtime.onMessage.removeListener(listener);
    }
  },
  sendMessage: function(msg, cb) {
    if(cb) {
      cb = this._onlyOnce(cb);
    }
    var currentPageCallRes = this.onMessage._call(msg, cb);
    if(currentPageCallRes && cb) {
      // not need to call remote listeners, response should be obtained from current page listener
      return;
    }
    var args = [msg];
    if(cb) {
      args.push(cb);
    }
    chrome.runtime.sendMessage.apply(chrome.runtime, args);
  }
};