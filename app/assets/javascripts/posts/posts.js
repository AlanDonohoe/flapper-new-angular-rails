/*
add a service:
What we're doing here is creating a new object that has an array property called 'posts'. 
We then return that variable so that our o object essentially becomes exposed to any other 
Angular module that cares to inject it. You'll note that we could have simply exported 
the posts array directly, however, by exporting an object that contains the posts array 
we can add new objects and methods to our services in the future.
*/
angular.module('flapperNews')
.factory('posts', [
  '$http',
  function($http){
  var o = {
    posts: []
  };
  o.getAll = function() {
    return $http.get('/posts.json').success(function(data){
      angular.copy(data, o.posts);
    });
  };
  o.create = function(post) {
    return $http.post('/posts.json', post).success(function(data){
      o.posts.push(data);
    });
  };

  /* Here we use the put() method to upvote a post. When the call returns successfully,
    we update our local copy to reflect the changes. 
  */
  o.upvote = function(post) {
    return $http.put('/posts/' + post.id + '/upvote.json')
      .success(function(data){
        post.upvotes += 1;
      });
  };

  /* 
   lets add a simple method in our posts service to retrieve a single post from our server:
   Notice that instead of using the success() method we have traditionally used, we are instead using a promise
  */
  o.get = function(id) {
    return $http.get('/posts/' + id + '.json').then(function(res){
      return res.data;
    });
  };

  o.addComment = function(id, comment) {
    return $http.post('/posts/' + id + '/comments.json', comment);
  };

  o.upvoteComment = function(post, comment) {
    return $http.put('/posts/' + post.id + '/comments/'+ comment.id + '/upvote.json')
      .success(function(data){
        comment.upvotes += 1;
      });
  };
  return o;
}]);
