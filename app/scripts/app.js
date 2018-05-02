(function() {
  function config($locationProvider, $stateProvider) {
    $locationProvider
      .html5Mode({
        enabled: true,
        requireBase: false
      });

      $stateProvider
        .state('home', {
          url: '/',
          controller: 'HomeCtrl as home',
          templateUrl: '/templates/home.html'
        });

        // .state('task', {
        //   url: '/task',
        //   controller: 'TaskCtrl as task',
        //   templateUrl: '/templates/task.html'
        // });

  }

  angular
    .module('Bloctime', ['ui.router', 'firebase'])
    .config(config);
})();
