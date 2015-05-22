 
 blocJams.controller('Landing.controller', ['$scope','Metric', function($scope, Metric) {
  $scope.subText = "Turn the music up!";
  $scope.headingText = "Bloc Jams";
  var songObj = {};

  $scope.subTextClicked = function() {
    $scope.subText += '!'; //Adds ! to our subText variable
    //because of data binding btw the subText variable and the page output,
    //when variable changes, it will update the output
   }

  var count = 0;
  $scope.countUp = function() {
    count += 1;
    console.log("here is the count on Choose Your Music clicks", count);
  };

  //calls countMore in the Metric service
  $scope.countMore = function() {
    return Metric.countMore();
  };

  //calls registerSongPlay in the Metric Service
  $scope.registerSongPlay = function() {
    return Metric.registerSongPlay();
  };

  // $scope.metric = Metric;


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