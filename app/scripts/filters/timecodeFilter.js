



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

blocJams.controller('Analytics.controller', ['$rootScope','Metric', function($rootScope, Metric) {


}]);