(function() {
  function button($interval) {
    return {
      templateUrl: '/templates/directives/button.html',
      restrict: 'E',
      scope: {},
      link: function(scope, element, attrs) {
        var WORK_TIME = 15;
        var BREAK_TIME = 3;
        var LONG_BREAK_TIME = 18;

        // var subtract = moment.duration().subtract(mom);
        // console.log(subtract);

        scope.buttonStatus = 'START';
        scope.currentTime = WORK_TIME;
        var countdown = undefined;
        scope.onBreak = false;
        scope.numberOfBreaks = 0;


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
                  scope.numberOfBreaks++;
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
            if (scope.numberOfBreaks % 4 == 0) {
              scope.currentTime = LONG_BREAK_TIME;
            } else {
              scope.currentTime = BREAK_TIME;
            };
            // scope.currentTime = BREAK_TIME;
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
