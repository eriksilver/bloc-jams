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

// the createSongRow function creates a row of HTML with song data
//  it takes 3 arguments: the index of the loop we're in,
//  the name of our song, and the length of the song
 var createSongRow = function(songNumber, songName, songLength) {
  var template =
      '<tr>' //makes a table row
    + '  <td class="col-md-1">' + songNumber + '</td>'
    + '  <td class="col-md-9">' + songName +  '</td>'
    + '  <td class="col-md-2">' + songLength + '</td>'
    + '</tr>'
    ;
  //when we call $(template), the string of HTML made of above becomes
  //  a jQuery object that we can append to our song list
  return $(template);
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


// This 'if' condition is used to prevent the jQuery modifications
// from happening on non-Album view pages.
//  - Use a regex to validate that the url has "/album" in its path.
if (document.URL.match(/\/album.html/)) {
  // wait until the HTML is fully processed
  $(document).ready(function() {
    changeAlbumView(albumPicasso);
  });
}
