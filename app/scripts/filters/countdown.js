(function() {
  function countdown() {
    return function(seconds) {
      var seconds = Number.parseFloat(seconds);
      var wholeSeconds = Math.floor(seconds);
      var minutes = Math.floor(wholeSeconds / 60);
      var remainingSeconds = wholeSeconds % 60;

      var result = minutes + ':';
      // console.log(result);
      if (remainingSeconds < 10) {
        result = result + 0;
        // console.log(result);
      }

      result = result + remainingSeconds;
      // console.log(result);
      return result;
    }
  }

  angular
    .module('Bloctime')
    .filter('countdown', countdown);
})();
