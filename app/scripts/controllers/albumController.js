

//album controller, initialize $scope.album by copying albumPicasso
//also injects SongPlayer service so we can use it in Album.controller
blocJams.controller('Album.controller', ['$scope', 'SongPlayer', 'Metric', function($scope, SongPlayer, Metric) {
 $scope.albums = [];
 $scope.album = angular.copy(albumPicasso);

  //calls countMore in the Metric service
  $scope.countMore = function() {
    return Metric.countMore();
  };


 //Both functions take an argument of a song (an ng-repeated variable
 // passed in from the view), and set the hoveredSong variable accordingly.
  var hoveredSong = null;
 
  $scope.onHoverSong = function(song) {
     hoveredSong = song;
  };
 
  $scope.offHoverSong = function(song) {
     hoveredSong = null;
  };

  //this function attaches the hover state of a row (hoveredSong from above) 
  // to the $scope so we can access it in the view
  // it also takes into account whether the song is playing
  //While repeating over our song list, we can call this function on each row 
  // to determine its hover state. It compares the song being looped over to 
  // the hoveredSong variable in our controller, and returns a song-state string. 
  // In our view, we can control what is visible based on the string returned.
  //Now playSong and pauseSong functions can be shared among a number of pages
  $scope.getSongState = function(song) {
   if (song === SongPlayer.currentSong && SongPlayer.playing) {
     return 'playing';
   }
   else if (song === hoveredSong) {
     return 'hovered';
   }
   return 'default';
  };

  //Adds the ability to play and pause the album songs by adding two methods 
  // to our controller that we'll call using an ng-click directive.
  //Note how playSong function both sets the service to playing AND
  //uses the setSong function to give it a currentSong object
  $scope.playSong = function(song) {
      SongPlayer.setSong($scope.album, song);
  };
 
  $scope.pauseSong = function(song) {
      SongPlayer.pause();
  };

     //addl challenge to add album shuffle on clicking "Bloc Jams" headingText
     //headingTextClicked is in Templates > Landing.html
    $scope.headingTextClicked = function () {
      function shuffle(o){ //v1.0
          for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
          return o;
      };
      //shuffle album images
      $scope.albumURLs = shuffle($scope.albumURLs);
    };


}]);