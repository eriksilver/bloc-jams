

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
  //onTimeUpdate captures two events from the $broacast call - the event and the value (time of the song)
  SongPlayer.onTimeUpdate(function(event, time){
      $scope.$apply(function(){
        $scope.playTime = time;
      });
  });
}]);
