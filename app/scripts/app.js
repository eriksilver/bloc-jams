//Example Album /created as an object 
//To Angularize our album collection logic, we'll be populating album data
// from our controller.
var albumPicasso = {
  name: 'The Colors',
  artist: 'Pablo Picasso',
  label: 'Cubism',
  year: '1881',
  albumArtUrl: '/images/album-placeholder.png',
  songs: [
     { name: 'Blue', length: '4:26' },
     { name: 'Green', length: '3:14'},
     { name: 'Red', length: '5:01' },
     { name: 'Pink', length: '3:21'},
     { name: 'Magenta', length: '2:15'}
      ]
};



// prior commands for jQuery
// require("./landing");
// require('./collection');
// require('./album');
// require('./profile');


//Ui-router replaced prior Angular code


 // Notes on ui-router: ui-router manages views using states which are triggered by 
 // attaching a ui-sref attribute (short for "ui state reference") to an <a> tag 
 // (instead of an href). 

//In Bloc Jams, we'll be using two providers to configure the state behavior ($stateProvider) 
//and the way our app handles URLs in the browser ($locationProvider).

//To make sure our providers can be used throughout the entirety of the Angular app,
// we need to inject them using the .config() method on our app's module.

blocJams = angular.module('BlocJams', ['ui.router']);

blocJams.config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider) {
$locationProvider.html5Mode(true); //configure states to match plain routes
 
  //configures state definitions using ui-router
  //state method takes 2 arguments, 1) name of the state string 'landing'
 // and 2) object that defines specific properties of the state
 //because landing state is our root URL, path will be '/'
 //the controller property injects the controller directly into the view,
 // so we no longer need to attach ng-controller to the container HTML element
 // templateURL defines the path where we find the template with the landing page HTML
 // the template will be injected within the element with the ui-view attribute
   $stateProvider.state('landing', { 
     url: '/',
     controller: 'Landing.controller',
     templateUrl: '/templates/landing.html'
   });


  //We need to add a $stateProvider configuration to work with our new
  // album collection view and collection controller. 
   $stateProvider.state('collection', {
     url: '/collection',
     controller: 'Collection.controller',
     templateUrl: '/templates/collection.html'
   });

   //album route, associated with proper url, template, and controller
   $stateProvider.state('album', {
     url: '/album',
     templateUrl: '/templates/album.html',
     controller: 'Album.controller'
   });
}]);

  // This is a cleaner way to call the controller than crowding
  // it on the module definition.
  //replacing: angular.module('BlocJams', []).controller('Landing.controller', ['$scope', function($scope) {

 blocJams.controller('Landing.controller', ['$scope', function($scope) {
  $scope.subText = "Turn the music up!";
  $scope.headingText = "Bloc Jams (click to shuffle)";

  $scope.subTextClicked = function() {
    $scope.subText += '!'; //Adds ! to our subText variable
    //because of data binding btw the subText variable and the page output,
    //when variable changes, it will update the output
   }

   //this is an array placeholder of album images held in our images directory
   //we'll tell Angular to iterate over this array and display the albums
   //on our landing page
   //we'll use 'ng-repeat', a directive that allows us to display a collection
   //of data in a repeated set of HTML elements to add album artwork to 
   //the landing page. (You can use ng-repeat instead of a loop)
   $scope.albumURLs = [
     '/images/album-placeholders/album-1.jpg',
     '/images/album-placeholders/album-2.jpg',
     '/images/album-placeholders/album-3.jpg',
     '/images/album-placeholders/album-4.jpg',
     '/images/album-placeholders/album-5.jpg',
     '/images/album-placeholders/album-6.jpg',
     '/images/album-placeholders/album-7.jpg',
     '/images/album-placeholders/album-8.jpg',
     '/images/album-placeholders/album-9.jpg',
   ];

 }]);

//To Angularize our album collection logic, we'll be populating album data 
//from our controller.
//To generate the data for our collection, we'll use a for loop in our controller.
// We'll use angular.copy to make 33 copies of albumPicasso 
//and push them to the $scope.albums array in the for loop.
blocJams.controller('Collection.controller', ['$scope', function($scope) {
 $scope.albums = [];
  for (var i = 0; i < 33; i++) {
   $scope.albums.push(angular.copy(albumPicasso));
 }
}]);

//album controller, initialize $scope.album by copying albumPicasso
//also injects SongPlayer service so we can use it in Album.controller
blocJams.controller('Album.controller', ['$scope', 'SongPlayer', function($scope, SongPlayer) {
 $scope.album = angular.copy(albumPicasso);

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
      SongPlayer.play();
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


//The player-bar should be an object which shares functionality and data among
// a number of pages. The Angular framework provides services for this purpose.
// A service is defined with its own encapsulated functionality; it can then 
//be injected as a dependency into Angular controllers that need access to it.
//As with our controllers, we define services in their containing module

//The player-bar controller code is brief but gives our player-bar template
// access to the shared SongPlayer object, allowing us to make powerful changes
blocJams.controller('PlayerBar.controller', ['$scope', 'SongPlayer', function($scope, SongPlayer) {
  $scope.songPlayer = SongPlayer;
}]);
 
blocJams.service('SongPlayer', function() {
 //method to calculate the trackIndex of a song within an album
 //trackIndex function receives an album and a song and uses the JS
 //indexOf function to determine the song's location within the album
 //this is an internal or private method that doesn't need to be accessed
 //from outside the service, we so dont return it with the rest of the
 //SongPlayer object
 var trackIndex = function(album, song) {
     return album.songs.indexOf(song);
 }; 
 
 return {
   currentSong: null,
   currentAlbum: null,
   playing: false,

   play: function() {
     this.playing = true;
   },
   pause: function() {
     this.playing = false;
   },

   //The next function should grab the index of the currently playing song 
   //and determine what the next track is. If the current song isn't the
   //last one, that's just the song with the next index. If it is the last
   // song, we should restart the album at the song with index 0.
   next: function() {
     var currentTrackIndex = trackIndex(this.currentAlbum, this.currentSong);
     currentTrackIndex++;
     if (currentTrackIndex >= this.currentAlbum.songs.length) {
       currentTrackIndex = 0;
     }
     this.currentSong = this.currentAlbum.songs[currentTrackIndex];
   },

   previous: function() {
     var currentTrackIndex = trackIndex(this.currentAlbum, this.currentSong);
     currentTrackIndex--;
     if (currentTrackIndex < 0) {
       currentTrackIndex = this.currentAlbum.songs.length - 1;
     }
     this.currentSong = this.currentAlbum.songs[currentTrackIndex];
   },

   setSong: function(album, song) {
     this.currentAlbum = album;
     this.currentSong = song;
   }
 };
});
