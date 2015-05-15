# Brunch app

This is HTML5 application, built with [Brunch](http://brunch.io).

## Getting started
* If app has been Installed & Run before
    * From the app directory, enter 'npm start'
        * This will run brunch & the server
        * View app locally on Localhost:3000
    *If the App hasn't been run for awhile - watch error output
        and may need to reinstall Brunch or run 'npm install' to update dependencies

* Install (if you don't have them):
    * [Node.js](http://nodejs.org): `brew install node` on OS X
    * [Brunch](http://brunch.io): `npm install -g brunch`
    * [Bower](http://bower.io): `npm install -g bower`
    * Brunch plugins and Bower dependencies: `npm install & bower install`.
* Run:
    * `brunch watch --server` — watches the project with continuous rebuild. This will also launch HTTP server with [pushState](https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Manipulating_the_browser_history).
    * `brunch build --production` — builds minified project for production
* Learn:
    * `public/` dir is fully auto-generated and served by HTTP server.  Write your code in `app/` dir.
    * Place static files you want to be copied from `app/assets/` to `public/`.
    * [Brunch site](http://brunch.io), [Chaplin site](http://chaplinjs.org)


About the Landing controller/ that was replaced by SPA
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
