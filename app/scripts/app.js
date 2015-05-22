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
     controller: 'Album.controller',
     templateUrl: '/templates/album.html'
   });

    $stateProvider.state('analytics', {
      url: '/analytics',
      controller: 'Analytics.controller',
      templateUrl: '/templates/analytics.html'
   });

}]);

  



// Create a Metric Service.
blocJams.service('Metric', ['$rootScope', function($rootScope) {
  //metric service can be applied to different parts of the application
  //by injecting it into the differetn controllers that control different parts
  $rootScope.songPlays = [];

  //Metric service added to Landing Controller: Lines 66-113
  //Metric service added to Collection Controller: Lines 120-129
  //Metric service added to Album Controller: Lines 129-190


  //count test in landing controller, line 66
  //songplayer service example at 232

  // var get_incrementer_value = function() {
  //   var count = 0;
  //   return count;
  // };

  var $rootScope = {counter: 0}; //variable for countMore test function
  
  //var songObj = {}; //create empty songObj to use with Metric service
  //var songObj['playedAt'] = {};
  var $rootScope = {playedAt: null};


  //Notes on Service
  //Can include private or helper functions before the return object in a service
  //What is in the return objects is essentially a public API as those properties
  //will be available to those that use the Metric service
  return {
  
    countMore: function() {
    $rootScope.counter += 1;
    console.log("here is the count on metric service clicks", $rootScope.counter);
    },

    // Function that records a metric object by pushing it to the $rootScope array.
    registerSongPlay: function(songObj) {
      // Add time to event register.
      //songObj['playedAt'] = new Date(); //object bracket notation
      //songObj.playedAt = new Date(); //object bracket notation

      $rootScope.songPlays.push(songObj);
      console.log("Here is $rootScope.playedAt:", $rootScope.playedAt);
    },

    listSongsPlayed: function() {
      var songs = [];
      angular.forEach($rootScope.songPlays, function(song) {
        // Check to make sure the song isn't listed twice.
        if (songs.indexOf(song.name) != -1) {
          songs.push(song.name);
        }
      });
      return songs;
    }
  };
}]);

//create directive for Charting
blocJams.directive('charting', ['$document', function ($document) {
  return {
    templateUrl: '/templates/directives/charting.html', //the path to an HTML template
    restrict: 'E', //instructs to treat as an element, <slider>; e.g. wont run on <div slider>
    link: function(scope, element, attributes) {
      var testData = {
          labels: ["January", "February", "March", "April", "May", "June", "July"],
          datasets: [
              {
                  label: "My First dataset",
                  fillColor: "rgba(220,220,220,0.5)",
                  strokeColor: "rgba(220,220,220,0.8)",
                  highlightFill: "rgba(220,220,220,0.75)",
                  highlightStroke: "rgba(220,220,220,1)",
                  data: [65, 59, 80, 81, 56, 55, 40]
              },
              {
                  label: "My Second dataset",
                  fillColor: "rgba(151,187,205,0.5)",
                  strokeColor: "rgba(151,187,205,0.8)",
                  highlightFill: "rgba(151,187,205,0.75)",
                  highlightStroke: "rgba(151,187,205,1)",
                  data: [28, 48, 40, 19, 86, 27, 100]
              }
          ]
      };

      var clicksChart = document.getElementById("clicksChart").getContext("2d");
      new Chart(clicksChart).Line(testData);

      //Bloc provided example
      //var ctx = $("#pie-chart").get(0).getContext("2d");
      //new Chart(ctx).Pie(attributes.pieData, options);
    }
  };

}]);




