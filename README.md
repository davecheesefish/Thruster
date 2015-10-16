#Thruster.js
An HTML5 canvas-based game library for the common developer.

##Usage
Thruster.js is a work-in-progress and not yet ready for usage.

##License
See license.txt for the full license details.

##Development
The following applies only to Thruster.js developers.

###Setup
To build, you will need:
- Node.js
- npm
- JSDoc installed on your PATH `npm install jsdoc -g`

To run the tests after building, you will need:
- A local Apache httpd server (see "Test Server Setup" below)

###Build-time Libraries
From the base project directory, run `npm install`.

###Test Server Setup
A local server is required to run any tests involving AJAX calls.
1. Add the contents of config/apache/vhosts.conf to your virtual host configuration.
 - *Make sure to change the file paths to the actual locations of your tests and dist directories.*
2. Add the contents of config/hosts to your computer's hosts file.
3. Start the server and the test page will be available in your browser at http://test.thrusterjs.local.

###Build
From the base project directory, run `node build/build.js`. The project will be built to the dist directory.

###Test
Assuming you've followed the steps above and have built the library, point your browser(s) of choice at http://test.thrusterjs.local.