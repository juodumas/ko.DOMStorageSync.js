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
    ko.extenders[storage] = function(observable, key) {
      var stored_json = window[storage].getItem(key);

      if (stored_json) {
        observable(JSON.parse(stored_json));
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
