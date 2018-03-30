(function() {
  function button($interval) {
    return {
      templateUrl: '/templates/directives/button.html',
      restrict: 'E',
      scope: {},
      link: function(scope, element, attrs) {
        scope.buttonStatus = 'START';
        scope.currentTime = '0:00';
        var countdown = undefined;
        // var seconds = 00;
        // var minutes = 25;


        var startTimer = function() {
          scope.buttonStatus = 'RESET';
          scope.currentTime = 1500;

          countdown = $interval(function() {
            scope.currentTime--;
          }, 1000);
        };

        var stopTimer = function() {
          scope.currentTime = 1500;
          $interval.cancel(countdown);
          countdown = undefined;
          scope.buttonStatus = 'START';
        };

        scope.start = function() {
          if (countdown) {
            stopTimer();
          } else {
            startTimer();
          }
        };
      }

    };
  };
  angular
    .module('Bloctime')
    .directive('button', ['$interval', button]);
})();
