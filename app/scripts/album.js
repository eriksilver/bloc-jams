//Example Album /created as an object 
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

//Another Example Album
var albumMarconi = {
  name: 'The Telephone',
  artist: 'Guglielmo Marconi',
  label: 'EM',
  year: '1909',
  albumArtUrl: '/images/album-placeholder.png',
  songs: [
       { name: 'Hello, Operator?', length: '1:01' },
       { name: 'Ring, ring, ring', length: '5:01' },
       { name: 'Fits in your pocket', length: '3:21'},
       { name: 'Can you hear me now?', length: '3:14' },
       { name: 'Wrong phone number', length: '2:15'}
     ]
 };

 //define variable globally (outside of a function)
 var currentlyPlayingSong = null;

// the createSongRow function creates a row of HTML with song data
//  it takes 3 arguments: the index of the loop we're in,
//  the name of our song, and the length of the song
 var createSongRow = function(songNumber, songName, songLength) {
  var template =
      '<tr>' //makes a table row
    + '  <td class="song-number col-md-1" data-song-number="' + songNumber + '">' + songNumber + '</td>' 
          //adding song-number class allows us to replace song number with play button on hover
          //data-song-number is a data attribute in the div to store replace song number on OffHover
    + '  <td class="col-md-9">' + songName +  '</td>'
    + '  <td class="col-md-2">' + songLength + '</td>'
    + '</tr>'
    ;

//? why make all jQuery
  //when we call $(template), the string of HTML made of above becomes
  //  a jQuery object that we can append to our song list
  // instead of returning the row template immediately, we'll attach hover functionality to it first
  var $row = $(template);

  //change from a song number to play button when the song isnt playing and we hover over the row
  var onHover = function(event) {
    var songNumberCell = $(this).find('.song-number'); //selects song number
    var songNumber = songNumberCell.data('song-number');
    if (songNumber !== currentlyPlayingSong) {
      songNumberCell.html('<a class="album-song-button"><i class="fa fa-play"></i></a>');
    //note jQuery html function replaces (rather than appends) the cell's contents
    // with new HTML; in this case the album-song-button link with a play icon inside
    }
  };

  //change from a play button to a song number when the song isn't playing & we hover off row
  var offHover = function(event) {
    var songNumberCell = $(this).find('.song-number');
    var songNumber = songNumberCell.data('song-number'); //data attrib to remember song number
    songNumberCell.html(songNumber); //find song-number and replaces with empty string
    if (songNumber !== currentlyPlayingSong) {
      songNumberCell.html(songNumber);
    } 
  };
 
// Toggle the play, pause, and song number based on which play/pause button we clicked on.
  var clickHandler = function(event) {
    var songNumber = $(this).data('song-number');

    if (currentlyPlayingSong !== null) {
      //if a song is playing, stop playing current song, replace stopped song button with number
      // Revert to song number for currently playing song because user started playing new song.
      currentlyPlayingCell = $('.song-number[data-song-number="' + currentlyPlayingSong + '"]');
      currentlyPlayingCell.html(currentlyPlayingSong);
    }

    if (currentlyPlayingSong !== songNumber) {
      //if a non-playing song was clicked, set current song to the one clicked
      // Switch from Play -> Pause button to indicate new song is playing.
      $(this).html('<a class="album-song-button"><i class="fa fa-pause"></i></a>');
      currentlyPlayingSong = songNumber;
    }

    else if (currentlyPlayingSong === songNumber) {
      //the playing song was clicked
      // Switch from Pause -> Play button to pause currently playing song.
      //set the current song to null
      $(this).html('<a class="album-song-button"><i class="fa fa-play"></i></a>');
      currentlyPlayingSong = null;
    }
  };

  $row.find('.song-number').click(clickHandler); //add clickHandler to play button for functionality 
  $row.hover(onHover, offHover); //attach both functions to $row
  return $row; //returns the jQuery-bound template
};

 //we refactored this code into the changeAlbumView function that
 //  we can call in the .ready callback
 var changeAlbumView = function(album) {

    // update the album title
    var $albumTitle = $('.album-title');
    $albumTitle.text(album.name);

    // update the album artist
    var $albumArtist = $('.album-artist');
    $albumArtist.text(album.artist);

    // update the meta information
    var $albumMeta = $('.album-meta-info');
    $albumMeta.text(album.year + " on " + album.label);

    //update the album image
    var $albumImage = $('.album-image img');
    $albumImage.attr('src', album.albumArtUrl);

    // update the song list /create jQuery object for the song list table
    var $songList = $(".album-song-listing");
    $songList.empty(); //empties the table to ensure working from clean slate
    var songs = album.songs;
    //use for loop to iterate over the album's songs and create new row of HTML
    //  for each song, populated with the song's data
    for (var i = 0; i < songs.length; i++) {
      var songData = songs[i];
      // $newRow is jQuery variable that gets updated by the createSongRow function
      var $newRow = createSongRow(i + 1, songData.name, songData.length);
      //each new row is appended to the $songList jQuery table
      $songList.append($newRow);
    }
  };

//SEEK BAR FUNCTIONALITY

//a jQuery function that passes an Event has many attributes, include pageX and pageY
//we'll use these to locate the mouse on Click, Mouseup, and Mousemove actions
//our function below(updateSeek...) isnt a built in jQ function and Event is not passed automatically
//We'll pass that argument explicitly when we call the function
 var updateSeekPercentage = function($seekBar, event) {
   var barWidth = $seekBar.width();
   //uses 'offset()' to calc the offsetX as horizontal distance betw
   //the start of the seek-bar and the mouse's position
   var offsetX = event.pageX - $seekBar.offset().left;
 
  //we calc offsetXPercent as the distance of the click from the bar's left most point
   var offsetXPercent = (offsetX  / barWidth) * 100;
   offsetXPercent = Math.max(0, offsetXPercent); //returns largest of the 2 values
   offsetXPercent = Math.min(100, offsetXPercent); //return smallest of the 2 values
 
  //the click distance becomes a percentage of the bar's total width
   var percentageString = offsetXPercent + '%';
   //uses jQuery 'width' function to set width of bar's 'fill' to that offset percentage
   $seekBar.find('.fill').width(percentageString); 
   //uses jQuery 'css' function to set the .thumb div's LEFT attribute to that percentage too
   $seekBar.find('.thumb').css({left: percentageString});
  }

//function to attach our seek bar updates to mouse events on the bars
//Step 1 is a mouse click on either bar; this should call updateSeekPercentage, 
// with the clicked bar as a first argument and the clicked event as the second
var setupSeekBars = function() {
 
   $seekBars = $('.player-bar .seek-bar');//can bind both bars in one function
   $seekBars.click(function(event) {
     updateSeekPercentage($(this), event);
   });

  //the dragging function begins when a user clicks and holds the mouse a 'mousedown' event 
  $seekBars.find('.thumb').mousedown(function(event) {
    //defines seekBar within the function, using jQuery parent function
    //this refers to the HTML element immediately containing the thumb
    var $seekBar = $(this).parent();

    $seekBar.addClass('no-animate'); //remove animation from seekbar, making it move faster/no lag
 
    //we use the bind() method to attach the 'mousemove' event to another 
    //  call of the updateSeekPercentage function,
    //  so that the thumb moves horizontally with the mouse
    $(document).bind('mousemove.thumb', function(event){
      updateSeekPercentage($seekBar, event);
    });
 
    //cleanup - release jQuery bindings on 'mouseup', 
    //detaching the functions we wrote from the events that called them
    //this way further mousemove or mouseup actions elswhere on page wont trigger thumb movement
    $(document).bind('mouseup.thumb', function(){
      $seekBar.removeClass('no-animate'); //removes no animate - restoring it  

      $(document).unbind('mousemove.thumb');
      $(document).unbind('mouseup.thumb');
    });
  });
};



  // This 'if' condition is used to prevent the jQuery modifications
  // from happening on non-Album view pages.
  //  - Use a regex to validate that the url has "/album" in its path.
  if (document.URL.match(/\/album.html/)) {
    // wait until the HTML is fully processed
    $(document).ready(function() {
      changeAlbumView(albumPicasso)
      setupSeekBars();
    });
  }
