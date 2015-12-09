## Bloc Jams - Analytics Service

### Overview

This analytics service is a custom feature I built on top of the Bloc Jams music service app. It tracks the internal metrics of total song plays by song name, total song plays by day, and total song plays by month. The metrics are displayed as charts in a dashboard view.

Components:
<ol>
  <li>A client side event handler that executes a callback when a metric is recorded</li>
  <li>An Angular model to capture displayable events</li>
  <li>A new "Analytics" state accessible in the navigation to view event results/charts</li>
</ol>

### Stack

<ul>
  <li>AngularJS</li>
  <li>Keen IO</li>
</ul>

### To run

Local: ```npm start``` <br>
Web: [https://bloc-jams-turnitup.herokuapp.com/](https://bloc-jams-turnitup.herokuapp.com/)

*******************

## Bloc Jams - Full Application
Bloc Jams is a Rdio music service clone application, built in collaboration with a senior developer as part of the Bloc.io program.

### Getting started
* If app has been installed & run before:
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
      * `brunch watch --server` — watches the project with continuous rebuild. This will also launch HTTP server with       [pushState](https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Manipulating_the_browser_history).
      * `brunch build --production` — builds minified project for production
* Learn:
   * This is HTML5 application, built with [Brunch](http://brunch.io).
   * `public/` dir is fully auto-generated and served by HTTP server.  Write your code in `app/` dir.
   * Place static files you want to be copied from `app/assets/` to `public/`.
    

