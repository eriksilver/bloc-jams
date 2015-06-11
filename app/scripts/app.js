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


//In Bloc Jams, we'll be using two providers to configure the state behavior ($stateProvider) 
//and the way our app handles URLs in the browser ($locationProvider).

//To make sure our providers can be used throughout the entirety of the Angular app,
// we need to inject them using the .config() method on our app's module.

blocJams = angular.module('BlocJams', ['ui.router','firebase']);

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
     controller: 'Album.controller',
     templateUrl: '/templates/album.html'
   });

    $stateProvider.state('analytics', {
      url: '/analytics',
      controller: 'Analytics.controller',
      templateUrl: '/templates/analytics.html'
   });
}]);


  // This is a cleaner way to call the controller than crowding
  // it on the module definition.
  //replacing: angular.module('BlocJams', []).controller('Landing.controller', ['$scope', function($scope) {

blocJams.controller("ApplicationController", ["$rootScope","$scope", "$firebaseArray", function($rootScope, $scope, $firebaseArray) {
    // $rootScope.countSongName = [];

    // var client = new Keen({
    //       projectId: "5579cb6346f9a779cb3dee22",   // String (required always)
    //       writeKey: "d37e46e682c9046ca1766f6cba815f833299bffa1c6fdaa5a94e484f3c67973eedf775e143768bd29dcbd809a823da8d687e1c5d3538e94403da41b7dad03a16e17b5fc2731c06d52a4d3a519f206437563736ec42af4f2a30968042926da829a2097afb01d8e206e27d32e8c8f99ae5",     // String (required for sending data)
    //       readKey: "394c80e1b52d1468d2205bd4bfde02456a6fed068f97e4829b62343601ac4da1f7f1e272b64e57d2984f04b8c68f749e58b763332f3e7910cb65bb1763c6fc15d923cf772b1cb5189962bed4d307a96a6973b508158babd5563a2fee4e98ba545f614342d37103b5e9d128ef13489629",       // String (required for querying data)
    //       protocol: "https",              // String (optional: https | http | auto)
    //       host: "api.keen.io/3.0",        // String (optional)
    //       requestType: "jsonp"            // String (optional: jsonp, xhr, beacon)
    // });

    // //Application controller is on index.html
    // // Create a data object with the properties you want to send
    // var purchaseEvent = {
    //   item: "golden gadget",  
    //   price: 25.50,
    //   referrer: document.referrer,
    //   keen: {
    //     timestamp: new Date().toISOString()
    //   }
    // };

    // // Send it to the "purchases" collection
    // client.addEvent("purchases", purchaseEvent, function(err, res){
    //   if (err) {
    //     // there was an error!
    //   }
    //   else {
    //     //"success": true
    //   }
    // });

    // console.log("here is purchase event:", purchaseEvent);


}]);


 blocJams.controller('Landing.controller', ['$scope','Metric', '$firebaseArray', function($scope, Metric, $firebaseArray) {
  $scope.subText = "Turn the music up!";
  $scope.headingText = "Bloc Jams";
  var songObj = {};

  $scope.subTextClicked = function() {
    $scope.subText += '!'; //Adds ! to our subText variable
    //because of data binding btw the subText variable and the page output,
    //when variable changes, it will update the output
   }

  //calls registerSongPlay in the Metric Service
  //connected to text on landing page for test purposes
  $scope.registerSongPlay = function() {
    return Metric.registerSongPlay();
  };

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
blocJams.controller('Collection.controller', ['$scope','SongPlayer', 'Metric','$rootScope', function($scope, SongPlayer, Metric, $rootScope) {
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
blocJams.controller('Album.controller', ['$scope', 'SongPlayer', 'Metric', function($scope, SongPlayer, Metric) {
 $scope.albums = [];
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
  var muteStatus = false;

  //this function returns a class name for the volume icon based on volume levels from the SongPlayer.volume property
  $scope.volumeClass = function() {
    return {
       'fa-volume-off': SongPlayer.volume == 0,
       'fa-volume-down': SongPlayer.volume <= 70 && SongPlayer.volume > 0,
       'fa-volume-up': SongPlayer.volume > 70
    }
  };

  $scope.toggleMute = function () {

    //if not muted, record current volume, update muteStatus, set volume to zero
    if (muteStatus === false) {
      alert("First Click, muteStatus is " + muteStatus)
      muteToggleVolume = SongPlayer.volume;
      muteStatus = true;
      SongPlayer.setVolume(0);
    }

    //if muted, set back to original volume, update mute status
    else if (muteStatus === true) {
      alert("Second Click, muteStatus is " + muteStatus)
      muteStatus = false;
      SongPlayer.setVolume(muteToggleVolume);
    }
    return SongPlayer.volume;
  };

  //onTimeUpdate will dynamically set the playTime as song progresses using the value attribute on the slider directive to {{playTime}}
  //onTimeUpdate captures two events from the $broadcast call - the event and the value (time of the song)
  SongPlayer.onTimeUpdate(function(event, time){
      $scope.$apply(function(){
        $scope.playTime = time;
      });
  });
}]);


//using rootScope for playTime broadcast event so it can be used anywhere in app
blocJams.service('SongPlayer', ['$rootScope', 'Metric', function($rootScope, Metric) {
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
   volume: 90,

   play: function() {
     this.playing = true;
     currentSoundFile.play(); //.play is a method of Buzz

     Metric.registerSongPlay(this.currentSong);
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

    //onTimeUpdate method to execute callback on every time update
    onTimeUpdate: function(callback) {
      console.log('ontimeupdate called');
      return $rootScope.$on('sound:timeupdate', callback);
    },

    //adding seek method for SongPlayer (this was above onTimeUpdate)
    seek: function(time) {
     // Checks to make sure that a sound file is playing before seeking.
     if(currentSoundFile) {
       // Uses a Buzz method to set the time of the song.
       currentSoundFile.setTime(time);
     }
    },

    setVolume: function(volume) {
      if(currentSoundFile){
        currentSoundFile.setVolume(volume);
      }
      this.volume = volume;
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
      //Metric.registerSongPlay(song);
      if (currentSoundFile) {
        currentSoundFile.stop();
      }

      this.currentAlbum = album;
      this.currentSong = song;

      currentSoundFile = new buzz.sound(song.audioUrl, {
        formats: [ "mp3" ],
        preload: true
      });

      currentSoundFile.setVolume(this.volume);

      currentSoundFile.bind('timeupdate', function(e) {
        console.log('timeupdate binding');
        $rootScope.$broadcast('sound:timeupdate', this.getTime());
      });
  
      this.play();
    }
  };
}]);

//turned song and volume seek bars into, slider; a custom directive
//custom directives go within their own folder within the templates folder
//Angular will look for 'slider' in the HTML to call this directive

blocJams.directive('slider', ['$document', function ($document) {
    console.log("start of slider directive");

    // Returns a number between 0 and 1 to determine where the mouse event happened along the slider bar.
    var calculateSliderPercentFromMouseEvent = function($slider, event) {
       var offsetX =  event.pageX - $slider.offset().left; // Distance from left
       var sliderWidth = $slider.width(); // Width of slider
       var offsetXPercent = (offsetX  / sliderWidth);
       offsetXPercent = Math.max(0, offsetXPercent);
       offsetXPercent = Math.min(1, offsetXPercent);
       console.log("this is offsetXPercent" + offsetXPercent);
       return offsetXPercent;
    }

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
       scope: {
          onChange: '&'
       },     //creates a scope that exists only in this directive
       //link is ng function for DOM manip & logic
        link: function(scope, element, attributes) { 
          console.log("start of link function");
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
          
          scope.onClickSlider = function(event) {
            console.log("start of onClickSlider function");
            var percent = calculateSliderPercentFromMouseEvent($seekBar, event);
            scope.value = percent * scope.max;
            notifyCallback(scope.value);
          }

          scope.trackThumb = function() {
            console.log("trackThumb function");
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

          var notifyCallback = function(newValue) {
            if(typeof scope.onChange === 'function') {
              scope.onChange({value: newValue});
            }
          };
        }
    }

}]);

//a filter in Angular will format data; this formats song in seconds to normal length format
blocJams.filter('timecode', function(){
  console.log('start timecode filter');
  return function(seconds) {
     seconds = Number.parseFloat(seconds);
 
     // Returned when no time is provided.
     if (Number.isNaN(seconds)) {
       return '-:--';
     }
 
     // make it a whole number
     var wholeSeconds = Math.floor(seconds);
 
     var minutes = Math.floor(wholeSeconds / 60);
 
     remainingSeconds = wholeSeconds % 60;
 
     var output = minutes + ':';
 
      // zero pad seconds, so 9 seconds should be :09
      if (remainingSeconds < 10) {
        output += '0';
      }
 
     output += remainingSeconds;
     return output;
  }
});

blocJams.controller('Analytics.controller', ['$scope','Metric', function($scope, Metric) {  

  var client = new Keen({
  projectId: "5579cb6346f9a779cb3dee22",
  readKey: "394c80e1b52d1468d2205bd4bfde02456a6fed068f97e4829b62343601ac4da1f7f1e272b64e57d2984f04b8c68f749e58b763332f3e7910cb65bb1763c6fc15d923cf772b1cb5189962bed4d307a96a6973b508158babd5563a2fee4e98ba545f614342d37103b5e9d128ef13489629"
  });

  //Chart 1
  Keen.ready(function(){
      var query = new Keen.Query("count", {
        eventCollection: "songData",
        groupBy: "songName",
        timezone: "UTC"
      });
      
      client.draw(query, document.getElementById("ChartSongCountByName"), {
        chartType: "columnchart",
        title: "Cumulative Song Plays by Song Name",
        height: 350,
        width: 400,
        legend: { position: "none" }
      });
  });

  //Chart 2
  Keen.ready(function(){
      var query = new Keen.Query("count", {
        eventCollection: "songData",
        interval: "daily",
        timeframe: "this_14_days",
        timezone: "UTC"
      });

      client.draw(query, document.getElementById("ChartSongCountByDay"), {
        chartType: "areachart",
        title: "Total Song Plays Each Day (trailing 2 weeks)",
        height: 350,
        width: 400,
        legend: { position: "none" }
      });
  });

  //Chart 3
  Keen.ready(function(){
    var query = new Keen.Query("count", {
      eventCollection: "songData",
      interval: "monthly",
      timeframe: "this_1_years",
      timezone: "UTC"
    });
  
    client.draw(query, document.getElementById("ChartSongCountByMonth"), {
        chartType: "areachart",
        title: "Song Plays by Month",
        height: 350,
        width: 400,
        legend: { position: "none" }
    });
  });


}]);

// Create a Metric Service.
blocJams.service('Metric', ['$rootScope', '$firebaseArray', function($rootScope, $firebaseArray) {
  //metric service can be applied to different parts of the application
  //by injecting it into the different controllers that control different parts

  //Metric service added to Landing Controller: Lines 66-113
  //Metric service added to Collection Controller: Lines 120-129
  //Metric service added to Album Controller: Lines 129-190

  //count test in landing controller, line 66
  //songplayer service example at 232

  var songDataObject = {};

  //setting up instance for Keen project (bloc-jams-data) 
  var client = new Keen({
          projectId: "5579cb6346f9a779cb3dee22",   // String (required always)
          writeKey: "d37e46e682c9046ca1766f6cba815f833299bffa1c6fdaa5a94e484f3c67973eedf775e143768bd29dcbd809a823da8d687e1c5d3538e94403da41b7dad03a16e17b5fc2731c06d52a4d3a519f206437563736ec42af4f2a30968042926da829a2097afb01d8e206e27d32e8c8f99ae5",     // String (required for sending data)
          readKey: "394c80e1b52d1468d2205bd4bfde02456a6fed068f97e4829b62343601ac4da1f7f1e272b64e57d2984f04b8c68f749e58b763332f3e7910cb65bb1763c6fc15d923cf772b1cb5189962bed4d307a96a6973b508158babd5563a2fee4e98ba545f614342d37103b5e9d128ef13489629",       // String (required for querying data)
          protocol: "https",              // String (optional: https | http | auto)
          host: "api.keen.io/3.0",        // String (optional)
          requestType: "jsonp"            // String (optional: jsonp, xhr, beacon)
  });

  //Notes on Service
  //Can include private or helper functions before the return object in a service
  //What is in the return objects is essentially a public API as those properties
  //will be available to those that use the Metric service
  return {

    // Function that records a metric object by pushing it to the $rootScope array.
    // To use, we can call the service, Metric.registerSongPlay(passAsongObject) on an event or element
    // called in SongPlayer service on Play button, line 289
    registerSongPlay: function(songObj) {

      // Add time to event to song Object.
      songObj['playedAt'] = moment().format('MMMM Do YYYY, h:mm:ss a'); //object bracket notation

      //Isolate song name and timestamp to the song data object
      songDataObject.songName = songObj.name;
      songDataObject.playedAt = songObj.playedAt; //redundant since Keen adds timestamp

      // Send it to the "purchases" collection
      client.addEvent("songData", songDataObject, function(err, res){
        if (err) {
          // there was an error!
        }
        else {
          //"success": true
        }
      });
    } 
  }; //end Return
}]); //end Metric Service






