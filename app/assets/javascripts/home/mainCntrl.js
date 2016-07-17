angular.module('flapperNews')
/*
 inject the service into our controller so we can access its data. 
 Simply add the name of the service as a parameter to the controller we wish to access it from
*/
.controller('MainCtrl', [
'$scope', 'posts',
function($scope, posts){

  /*
  Now that we have the post variable in our controller, we can display that information in our template.
  Create a new inline template called "/posts.html" in index.html right before the </body> tag
  */

  // -- - - - - - - - - - -
  // $scope.test = 'Hello world!';

  // $scope.posts = [
  //   {title: 'post 1', upvotes: 5},
  //   {title: 'post 2', upvotes: 2},
  //   {title: 'post 3', upvotes: 15},
  //   {title: 'post 4', upvotes: 9},
  //   {title: 'post 5', upvotes: 4}
  // ];

  $scope.posts = posts.posts;

  /*
  add some fake comment data to our posts model.
   */
  $scope.posts.push({
    title: $scope.title,
    link: $scope.link,
    upvotes: 0,
    comments: [
      {author: 'Joe', body: 'Cool post!', upvotes: 0},
      {author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
    ]
  });

  // - - - -

  // $scope.addPost = function(){
  //   $scope.posts.push({title: 'A new post!', upvotes: 0});
  // };

  // $scope.addPost = function(){
  //   if(!$scope.title || $scope.title === '') { return; }
  //   $scope.posts.push({title: $scope.title, upvotes: 0});
  //   $scope.title = '';
  // };

  // first version:
  // $scope.addPost = function(){
  //   if(!$scope.title || $scope.title === '') { return; }
  //   $scope.posts.push({
  //     title: $scope.title,
  //     link: $scope.link,
  //     upvotes: 0
  //   });
  //   // clears the form fields after submission....
  //   $scope.title = '';
  //   $scope.link = '';
  // };

  // 2nd version  - saves new post to rails:
  $scope.addPost = function(){
    if(!$scope.title || $scope.title === '') { return; }
    posts.create({
      title: $scope.title,
      link: $scope.link,
    });
    $scope.title = '';
    $scope.link = '';
  };

  // $scope.incrementUpvotes = function(post) {
  //   post.upvotes += 1;
  // };

  $scope.incrementUpvotes = function(post) {
    posts.upvote(post);
  };
}]);
