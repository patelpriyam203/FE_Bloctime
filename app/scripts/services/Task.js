(function() {
  function Task($firebaseArray) {
    var ref = firebase.database().ref().child("tasks");
    var tasks = $firebaseArray(ref);

    Task.addTask = function(newTask) {
      tasks.$add(newTask);
    }

    Task.all = tasks;

    return Task;
  }

  angular
    .module('Bloctime')
    .factory('Task', ['$firebaseArray', Task]);
})();
