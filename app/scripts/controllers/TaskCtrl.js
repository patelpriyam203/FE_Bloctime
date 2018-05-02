(function() {
  function TaskCtrl(Task, $scope) {
    // this.tasks = Task.all;
    //
    // this.addTask = function(description) {
    //   if (description) {
    //     var newTask = {
    //       description: description
    //     };
    //     Task.addTask(newTask);
    //   }
    // };
    //
    // this.removeTask = function(task) {
    //   this.tasks.$remove(task);
    // };

  }

  angular
    .module('Bloctime')
    .controller('TaskCtrl', ['Task', '$scope', TaskCtrl]);
})();
