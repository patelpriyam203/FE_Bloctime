(function() {
    function HomeCtrl(Task, $scope) {
      this.tasks = Task.all;

      this.addTask = function(description) {
        if (description) {
          var newTask = {
            description: description
          };
          Task.addTask(newTask);
          $scope.description = null;
        }
      };

      this.removeTask = function(task) {
        this.tasks.$remove(task);
      };
    }

    angular
        .module('Bloctime')
        .controller('HomeCtrl', ['Task', '$scope', HomeCtrl]);
})();
