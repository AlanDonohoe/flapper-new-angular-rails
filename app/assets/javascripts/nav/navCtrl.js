angular.module('flapperNews')
.controller('NavCtrl', [
'$scope',
'Auth',
function($scope, Auth){
  /*
  angular-devise provides us with the methods we can expose to the $scope

  Expose the isAuthenticated method and logout method to $scope
  */
  $scope.signedIn = Auth.isAuthenticated;
  $scope.logout = Auth.logout;

  /*
  Try to access Auth.currentUser() to set $scope.user when the controller loads:
  */
  Auth.currentUser().then(function (user){
    $scope.user = user;
  });

  /*
  Add Event listeners to handle when the user authenticates and logs out 
  angular-devise automatically broadcast events when authentication happens.
  See their documentation to see when each event is broadcasted.
  We want to set $scope.user whenever the user logs in or registers, and clear it out when our user logs out.
  */
  $scope.$on('devise:new-registration', function (e, user){
    $scope.user = user;
  });

  $scope.$on('devise:login', function (e, user){
    $scope.user = user;
  });

  $scope.$on('devise:logout', function (e, user){
    $scope.user = {};
  });
}]);
