//To Angularize our album collection logic, we'll be populating album data 
//from our controller.
//To generate the data for our collection, we'll use a for loop in our controller.
// We'll use angular.copy to make 33 copies of albumPicasso 
//and push them to the $scope.albums array in the for loop.


blocJams.controller('Collection.controller', ['$scope','SongPlayer', 'Metric', function($scope, SongPlayer, Metric) {
 $scope.albums = [];
  for (var i = 0; i < 33; i++) {
   $scope.albums.push(angular.copy(albumPicasso));
 }

  $scope.playAlbum = function(album){
     SongPlayer.setSong(album, album.songs[0]); // Targets first song in the array.
 }

  //calls countMore in the Metric service
  $scope.countMore = function() {
    return Metric.countMore();
  };
}]);

