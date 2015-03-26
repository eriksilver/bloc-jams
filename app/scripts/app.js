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
          { name: 'Blue', length: 163.38, audioUrl: '/music/placeholders/blue' },
          { name: 'Green', length: 105.66 , audioUrl: '/music/placeholders/green' },
          { name: 'Red', length: 270.14, audioUrl: '/music/placeholders/red' },
          { name: 'Pink', length: 154.81, audioUrl: '/music/placeholders/pink' },
          { name: 'Magenta', length: 375.92, audioUrl: '/music/placeholders/magenta' }
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
blocJams.controller('Collection.controller', ['$scope','SongPlayer', function($scope, SongPlayer) {
 $scope.albums = [];
  for (var i = 0; i < 33; i++) {
   $scope.albums.push(angular.copy(albumPicasso));
 }

  $scope.playAlbum = function(album){
     SongPlayer.setSong(album, album.songs[0]); // Targets first song in the array.
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
 //To integrate buzz's audio controls with our SongPlayer service, 
 //We'll declare a variable called currentSoundFile and set it to null. 
 //We can then update that variable by redefining our setSong method in SongPlayer.
 var currentSoundFile = null;

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
     currentSoundFile.play(); //.play is a method of Buzz
   },
   pause: function() {
     this.playing = false;
     currentSoundFile.pause(); //.pause is a method of Buzz
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
     var song = this.currentAlbum.songs[currentTrackIndex];
     this.setSong(this.currentAlbum, song);
   },

   previous: function() {
     var currentTrackIndex = trackIndex(this.currentAlbum, this.currentSong);
     currentTrackIndex--;
     if (currentTrackIndex < 0) {
       currentTrackIndex = this.currentAlbum.songs.length - 1;
     }
      var song = this.currentAlbum.songs[currentTrackIndex];
      this.setSong(this.currentAlbum, song);
   },

   //adding seek method for SongPlayer
   seek: function(time) {
     // Checks to make sure that a sound file is playing before seeking.
     if(currentSoundFile) {
       // Uses a Buzz method to set the time of the song.
       currentSoundFile.setTime(time);
     }
   },
   //setSong() still takes the same arguments, but our song objects now have something
   // that Buzz can work with. We add a conditional to the beginning that stops the 
   //current song if one is playing (this prevents multiple songs playing at once). 
   //We set currentSoundFile to the new song, passing in the audio url that we want to 
   //play, and a second argument that is an object that sets attributes in our 
   //<audio> tag that are required to play the song. The first property of this object 
   //is an array of acceptable formats for our audio file, and the second, preload, 
   //ensures that the file is preloaded before we attempt to play it.
   setSong: function(album, song) {
    if (currentSoundFile) {
      currentSoundFile.stop();
    }

    this.currentAlbum = album;
    this.currentSong = song;

    currentSoundFile = new buzz.sound(song.audioUrl, {
      formats: [ "mp3" ],
      preload: true
    });
 
    this.play();
   }
 };
});

//turned song and volume seek bars into, slider; a custom directive
//custom directives go within their own folder within the templates folder
//Angular will look for 'slider' in the HTML to call this directive
//r
blocJams.directive('slider', ['$document', function ($document){
   // Returns a number between 0 and 1 to determine where the mouse event happened along the slider bar.
   var calculateSliderPercentFromMouseEvent = function($slider, event) {
     var offsetX =  event.pageX - $slider.offset().left; // Distance from left
     var sliderWidth = $slider.width(); // Width of slider
     var offsetXPercent = (offsetX  / sliderWidth);
     offsetXPercent = Math.max(0, offsetXPercent);
     offsetXPercent = Math.min(1, offsetXPercent);
     return offsetXPercent;
   }


  // //jQuery for slider bar movement - REPLACED by Angular slider directive
  // var updateSeekPercentage = function($seekBar, event) {
  //  var barWidth = $seekBar.width();
  //  var offsetX =  event.pageX - $seekBar.offset().left;

  //  var offsetXPercent = (offsetX  / $seekBar.width()) * 100;
  //  offsetXPercent = Math.max(0, offsetXPercent);
  //  offsetXPercent = Math.min(100, offsetXPercent);

  //  var percentageString = offsetXPercent + '%';
  //  $seekBar.find('.fill').width(percentageString);
  //  $seekBar.find('.thumb').css({left: percentageString});
 var numberFromValue = function(value, defaultValue) {
   if (typeof value === 'number') {
     return value;
   }

   if(typeof value === 'undefined') {
     return defaultValue;
   }

   if(typeof value === 'string') {
     return Number(value);
   }
 }

 return {
   templateUrl: '/templates/directives/slider.html', //the path to an HTML template
   replace: true, //replace the <slider> element with the directive's HTML rather than insert it
   restrict: 'E', //instructs to treat as an element, <slider>; e.g. wont run on <div slider>
   scope: {       //creates a scope that exists only in this directive
      onChange: '&'
   },     
    //link is ng function for DOM manip & logic
    link: function(scope, element, attributes) { 
      // These values represent the progress into the song/volume bar, and its max value.
      // For now, we're supplying arbitrary initial and max values.
      scope.value = 0;
      scope.max = 100;

      var $seekBar = $(element); 
      attributes.$observe('value', function(newValue) {
        scope.value = numberFromValue(newValue, 0);
      });

      attributes.$observe('max', function(newValue) {
        scope.max = numberFromValue(newValue, 100) || 100;
      });

      //New angular slider bar functionality
      var percentString = function () {
        var value = scope.value || 0;
        var max = scope.max || 100;
        percent = value / max * 100;
        return percent + "%";
       }

       scope.fillStyle = function() {
         return {width: percentString()};
       }

       scope.thumbStyle = function() {
         return {left: percentString()};
       }

      //JQuery seekbar funcationality - replaced by Angular
      // $seekBar.click(function(event) {
      //   updateSeekPercentage($seekBar, event);
      // });

      // $seekBar.find('.thumb').mousedown(function(event){
      //   $seekBar.addClass('no-animate');

      //   $(document).bind('mousemove.thumb', function(event){
      //     updateSeekPercentage($seekBar, event);
      //   });

      //   //cleanup
      //   $(document).bind('mouseup.thumb', function(){
      //     $seekBar.removeClass('no-animate');
      //     $(document).unbind('mousemove.thumb');
      //     $(document).unbind('mouseup.thumb');
      //   });
      //  });
      var notifyCallback = function(newValue) {
        if(typeof scope.onChange === 'function') {
           scope.onChange({value: newValue});
        }
      };
    }
  }

scope.onClickSlider = function(event) {
  var percent = calculateSliderPercentFromMouseEvent($seekBar, event);
  scope.value = percent * scope.max;
  notifyCallback(scope.value);
}

scope.trackThumb = function() {
  $document.bind('mousemove.thumb', function(event){
    var percent = calculateSliderPercentFromMouseEvent($seekBar, event);
    scope.$apply(function(){
        scope.value = percent * scope.max;
        notifyCallback(scope.value);
    });
  });

  //cleanup
  $document.bind('mouseup.thumb', function(){
   $document.unbind('mousemove.thumb');
   $document.unbind('mouseup.thumb');
  });
};

}]);




