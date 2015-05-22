

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