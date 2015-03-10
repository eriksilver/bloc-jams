// require("./landing");
// require('./collection');
// require('./album');
// require('./profile');


//This is the Angular Landing Controller

// angular: the JavaScript object that contains the entire angular library.

// angular.module: a function that returns an angular app object. 
// Since we're passing it "BlocJams", it'll return the app object for our "BlocJams" app 
// as declared in our HTML. This will be useful when we have multiple apps, 
// but it's just boilerplate for now. 

// The second argument to .module is a list of dependencies or libraries to include
// into our app. We don't have any yet, so we'll leave it as an empty array.

//angular.module('BlocJams', []).controller: the .controller function allows 
// us to initialize a controller. 
// The second argument we pass to it is an array. 
// The last element of the array is the callback function that is executed 
// when our controller is initialized.

//How it works:
// When app.js runs, we're defining our Landing.controller. 
//After that, Angular will read over our HTML in index.html, 
//see the ng-controller='Landing.controller' attribute, 
//and execute the callback to initialize our controller.

// In the Landing controller we've passed in a $scope object to our callback. 
// The $scope object is what connects the code in our controller and the HTML view. 
// We can attach variables, functions or other data to our $scope in the controller, 
// and then access them back in our view.

 angular.module('BlocJams', []).controller('Landing.controller', ['$scope', function($scope) {
  $scope.subText = "Turn the music up!";

  $scope.subTextClicked = function() {
    $scope.subText += '!'; //Adds ! to our subText variable
    //because of data binding btw the subText variable and the page output,
    //when variable changes, it will update the output
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