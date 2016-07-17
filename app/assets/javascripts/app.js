angular.module('flapperNews', ['ui.router', 'templates', 'Devise'])
.config([ // add a router:
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      // had to go back to using inline templates....
      templateUrl: '/home.html',
      // templateUrl: 'home/_home.html',
      controller: 'MainCtrl',
      resolve: {
        postPromise: ['posts', function(posts){
          return posts.getAll();
        }]
      }
    })
    .state('posts', {
      url: '/posts/{id}',
      templateUrl: '/posts.html',
      // had to go back to using inline templates....
      // templateUrl: 'posts/_posts.html',
      controller: 'PostsCtrl',
      /*
      The Angular ui-router detects we are entering the posts state and will then automatically
       query the server for the full post object, including comments. Only after the request has returned
        will the state finish loading.
      */
      resolve: {
        post: ['$stateParams', 'posts', function($stateParams, posts) {
          return posts.get($stateParams.id);
        }]
      }
    })
    .state('login', {
      url: '/login',
      templateUrl: '/login.html',
      // templateUrl: 'auth/_login.html',
      controller: 'AuthCtrl',
      /* 
      If the user is already logged in, we don't want to show them the registration or login page,
      but redirect them to the home state instead. We can do this by specifying an onEnter
      callback that will send the user home if we detect that they're authenticated.
      */
      onEnter: ['$state', 'Auth', function($state, Auth) {
        Auth.currentUser().then(function (){
          $state.go('home'); // redirect authenticated users to home
        });
      }]
    })
    .state('register', {
      url: '/register',
      templateUrl: '/register.html',
      // templateUrl: 'auth/_register.html',
      controller: 'AuthCtrl',
      /* 
      If the user is already logged in, we don't want to show them the registration or login page,
      but redirect them to the home state instead. We can do this by specifying an onEnter
      callback that will send the user home if we detect that they're authenticated.
      */
      onEnter: ['$state', 'Auth', function($state, Auth) {
        Auth.currentUser().then(function (){
          $state.go('home'); // redirect authenticated users to home
        });
      }]
    });

  $urlRouterProvider.otherwise('home');
}]);
