//'use strict';

//const exec = require('child_process').exec;
//const ps = require('child_process').exec;

//w const jsdom = require("jsdom");
//w const { JSDOM } = jsdom;
//w var window = (new JSDOM(``, { pretendToBeVisual: true })).window;
//w window.requestAnimationFrame(timestamp => {
//w   console.log(timestamp > 0);
//w });


//w global.document = window.document;
//w global.navigator = {
//w   userAgent: 'node.js',
//w };


//w const PIXI = require('pixi.js');

var assert = require('chai').assert;

// ***************** TEST LOADING **********************


function dynamicallyLoadScript( url )
{
   return new Promise (function(resolve, reject)
   {
      var script = document.createElement("script" );
      script.src = url;
      script.onload = resolve;
      script.onerror = () => reject(new Error(`Error when loading $\{url\}!`));
      document.body.appendChild(script);
   });
}
// Cannot load resource /users/zarf/XCode_dev_t/Global.js
//dynamicallyLoadScript("../app/js/com/partKart/Global.js");
// Cannot use import outside a module
//dynamicallyLoadScript("/Users/zarf/XcodeDevelopment/makercam5/app/js/com/partKart/Global.js");

// Worked
// import Global  from '../../app/js/com/partKart/Global.js';
import Global  from '../../app/partKart/Global.js';

//var { Global } = require('../app/js/com/partKart/Global');

// SyntaxError: Cannot use import statement outside a module
//require('../app/js/com/partKart/Global.js');
//require('../app/js/com/partKart/Global');

// Undefined Global and Global.zoom
//require('../dist/makercam5.js');

// tests fail
//import('../app/js/com/partKart/Global.js');


// Cannot use import statement outside a module
//import Global from '../app/js/com/partKart/Global.js';

// Cannot find module 'Global'
// require('Global');

// Cannot use import statement outside a module
// require('../app/js/com/partKart/Global');

describe('Testing Global.js', function ()
{
   it('Global should not be null', function ()
   {
      assert.isNotNull(Global, 'Global resulted in null');
   });
});
describe('Testing Global.zoom', function ()
{
   it('Global.zoom should be 80', function ()
   {
            assert.equal(Global.zoom, 80, "Global.zoom = " + Global.zoom);
      assert.isNotNull(Global, 'Global resulted in null');
   });

});

// ***************** TEST Plugin Initialized Variables ***************

