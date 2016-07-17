/*
As with the home state, we're also going to need to define both a new template and a new controller. 
Because we're going to associate comments with posts, we want to ensure our posts factory is 
injected into this controller so that it may access the comments data.
*/
angular.module('flapperNews')
/*
To get access to the post object we just retrieved in the PostsCtrl, 
instead of going through the posts service, the specific object will be directly injected into our PostsCtrl

Notice that we no longer have need to inject $stateParams into our controller.
We're still going to want to inject posts to gain access to the methods for manipulating comments, however
*/
.controller('PostsCtrl', [
'$scope',
'posts',
'post',
function($scope, posts, post){
  $scope.post = post;
// .controller('PostsCtrl', [
// '$scope',
// '$stateParams',
// 'posts',
// function($scope, $stateParams, posts){
  
  // $scope.post = posts.posts[$stateParams.id];
  
  $scope.addComment = function(){
  if($scope.body === '') { return; }
  posts.addComment(post.id, {
    body: $scope.body,
    author: 'user',
  }).success(function(comment) {
    $scope.post.comments.push(comment);
  });
  // $scope.post.comments.push({
  //   body: $scope.body,
  //   author: 'user',
  //   upvotes: 0
  // });

  $scope.incrementUpvotes = function(comment){
    posts.upvoteComment(post, comment);
  };

  $scope.body = '';
};
}]);