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

        scope.ionclass = 'ion-play';
        scope.currentTime = WORK_TIME;
        var countdown = undefined;
        scope.onBreak = false;
        scope.numberOfBreaks = 0;


        /* Buzz Library -- play a sound at the end */
        var mySound = new buzz.sound("/assets/sounds/ding.mp3", {
          preload: true
        });

        scope.$watch('currentTime', function() {
          if (scope.currentTime == 0) {
            console.log(scope.currentTime);
            mySound.play();
          };
        });


        /* Starting Timer */
        var startTimer = function() {
          scope.ionclass = 'ion-stop';
          // scope.currentTime = WORK_TIME;

          countdown = $interval(function() {
            if (scope.currentTime >= 1) {
              scope.currentTime--;
            } else {
                if (scope.onBreak == false) {
                  scope.currentTime = BREAK_TIME;
                  scope.ionclass = 'ion-play';
                  scope.onBreak = true;
                  // scope.numberOfBreaks++;
                } else if (scope.onBreak == true) {
                  scope.currentTime = WORK_TIME;
                  scope.ionclass = 'ion-play';
                  scope.onBreak = false;
                  // scope.numberOfBreaks++;
                }
                stopTimer();
            }
          },1000);
        };


        /* Stopping Timer */
        var stopTimer = function() {
          if (scope.onBreak == false) {
            scope.currentTime = WORK_TIME;
            $interval.cancel(countdown);
            countdown = undefined;
            scope.ionclass = 'ion-play';
          } else if (scope.onBreak == true) {
            scope.numberOfBreaks++;
            if (scope.numberOfBreaks % 4 == 0) {
              scope.currentTime = LONG_BREAK_TIME;
            } else {
              scope.currentTime = BREAK_TIME;
            };
            $interval.cancel(countdown);
            countdown = undefined;
            scope.ionclass = 'ion-play';
          }
        };


        /* Start and Stop Trigger */
        scope.start = function() {
          if (countdown) {
            stopTimer();
          } else {
            startTimer();
          }
        };


        /* Skip to next selection*/
        scope.next = function() {
          if (scope.onBreak == false) {
            scope.onBreak = true;
            stopTimer();
          } else if (scope.onBreak == true) {
            scope.onBreak = false;
            stopTimer();
          }
        };

      }
    };
  };
  angular
    .module('Bloctime')
    .directive('button', ['$interval', button]);
})();
