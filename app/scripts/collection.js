 //very similar to the buildAlbumOverlay function below - see description below
 var buildAlbumThumbnail = function() {
    var template =
        '<div class="collection-album-container col-md-2">'
        //wraps image in a div container for precise sytling
      + '  <div class="collection-album-image-container">'
      + '    <img src="/images/album-placeholder.png"/>' 
      + '  </div>'   

      + '  <div class="caption album-collection-info">'
      + '    <p>'
      + '      <a class="album-name" href="/album.html"> Album Name </a>'
      + '      <br/>'
      + '      <a href="/album.html"> Artist name </a>'
      + '      <br/>'
      + '      X songs'
      + '      <br/>'
      + '    </p>'
      + '  </div>'
      + '</div>';
 
   return $(template);
 };
 
//buildAlbumOverlay is a function that is a template for the album overlays 
//  It defines a set of nested HTML elements w/ small amount of dynamic content
//  It converts that concatenated string of HTML elements into a jQuery object, $(template)
//  Note 'albumURL' is set as the url for the play link
//  A separate function can then use this Object and render HTML on the page
  var buildAlbumOverlay = function(albumURL) {
    var template =
        '<div class="collection-album-image-overlay">' //new image overlay class
      + '  <div class="collection-overlay-content">'
      + '    <a class="collection-overlay-button" href="' + albumURL + '">'
      + '      <i class="fa fa-play" ng-click="countMore()"></i>' //icon tag for icon font from FontAwesome library
      + '    </a>'
      + '    &nbsp;' //HTML code for the unicode character spacebar. Inserts space btw two buttons
      + '    <a class="collection-overlay-button">'
      + '      <i class="fa fa-plus"></i>' //icon tag for icon font from FontAwesome library
      + '    </a>'
      + '  </div>'
      + '</div>'
      ;
    return $(template);
  };


 //puts album injection into new function
 var updateCollectionView = function() {
    var $collection = $(".collection-container .row");
    $collection.empty();

    for (var i = 0; i < 33; i++) {
      var $newThumbnail = buildAlbumThumbnail();
      $collection.append($newThumbnail);
    }

    //HOVER ON - function to run when user hovers over an album
    //  when function is called on an object, it will append the result
    // of the buildAlbumOverlay function (the overlay template), using the 
    // album URL we gave it to the object on which it was called
    var onHover = function(event) {
      $(this).append(buildAlbumOverlay("/album.html"));
    };

    //HOVER OFF
    var offHover = function(event) {
      $(this).find('.collection-album-image-overlay').remove();
    };

    // this finds the .collection-album-image-container divs associated with
    // the $collection object
    // we call the hover function to run onHover when a user hovers a mouse over
    // any of those divs
    $collection.find('.collection-album-image-container').hover(onHover,offHover);
};

if (document.URL.match(/\/collection.html/)) {
  //wait until the HTML is fully processed.
  $(document).ready(function() {
   updateCollectionView();
  });
};

