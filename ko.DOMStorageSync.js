(function(ko) {
  var ls_test = function() {
    try {
      var key = 'test23241',
          value = 'test',
          retrieved;
      localStorage.setItem(key, value);
      retrieved = localStorage.getItem(key);
      localStorage.removeItem(key);
      return value == retrieved;
    }
    catch (e) {
      return false;
    }
  };
  if (!ls_test()) {
    return;
  }

  ['localStorage', 'sessionStorage'].forEach(function(storage) {
    ko.extenders[storage] = function(observable, options) {
      var key = typeof options == 'string' ? options : options.key,
          data = window[storage].getItem(key);

      if (data) {
        data = JSON.parse(data);
        if (options.beforeAdd) {
          data = options.beforeAdd(data);
        }
        observable(data);
      }

      observable.subscribe(function(value) {
        if (value === undefined) {
          window[storage].removeItem(key);
        }
        else {
          window[storage].setItem(key, ko.toJSON(value));
        }
      });

      return observable;
    };
  });
})(ko);
