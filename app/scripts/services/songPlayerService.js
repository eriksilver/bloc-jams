

//using rootScope for playTime broadcast event so it can be used anywhere in app
blocJams.service('SongPlayer', ['$rootScope', function($rootScope) {
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
     //console.log("this is SongPlayer.play()", song);  
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