(function() {
  function button($interval) {
    return {
      templateUrl: '/templates/directives/button.html',
      restrict: 'E',
      scope: {},
      link: function(scope, element, attrs) {
        var WORK_TIME = 1500;
        var BREAK_TIME = 300;

        scope.buttonStatus = 'START';
        scope.currentTime = WORK_TIME;
        var countdown = undefined;
        scope.onBreak = false;
        // var seconds = 00;
        // var minutes = 25;


        var startTimer = function() {
          scope.buttonStatus = 'RESET';
          // scope.currentTime = WORK_TIME;

          countdown = $interval(function() {
            if (scope.currentTime >= 1) {
              scope.currentTime--;
            } else {
                if (scope.onBreak == false) {
                  scope.currentTime = BREAK_TIME;
                  scope.buttonStatus = 'BREAK';
                  scope.onBreak = true;
                } else if (scope.onBreak == true) {
                  scope.currentTime = WORK_TIME;
                  scope.buttonStatus = 'WORK';
                  scope.onBreak = false;
                }
                stopTimer();
            }
          },1000);
        };

        var stopTimer = function() {
          if (scope.onBreak == false) {
            scope.currentTime = WORK_TIME;
            $interval.cancel(countdown);
            countdown = undefined;
            scope.buttonStatus = 'START';
          } else if (scope.onBreak == true) {
            scope.currentTime = BREAK_TIME;
            $interval.cancel(countdown);
            countdown = undefined;
            scope.buttonStatus = 'BREAK';
          }
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
