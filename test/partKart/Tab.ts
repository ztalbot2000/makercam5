'use strict';

var assert = require('chai').assert;

import Tab  from '../../app/partKart/Tab';

var tloc = 15;
let twidth = 480;
let theight = 640
let tdiameter = 120;

var tab = new Tab(tloc, twidth, theight, tdiameter);



describe('Testing Tab.ts', function ()
{
   it('Tab should not be null', function ()
   {
      assert.isNotNull(Tab, 'Tab resulted is null');
   });

   describe('Testing Class Tab variables', function (){});

   it('tab.location should be set correctly', function ()
   {
      let expectedResult = tloc;
      assert.equal(tab.location, expectedResult, "Tab.location: expected " + expectedResult + " received = " + tab.location);
   });

   it('Tab.tabwidth should set correctly', function ()
   {
      let expectedResult = twidth;
      assert.equal(tab.tabwidth, expectedResult, "tab.tabwidth: expected " + expectedResult + " received = " + tab.tabwidth);
   });

   it('tab.tabheight should set correctly false', function ()
   {
      let expectedResult = theight;
      assert.equal(tab.tabheight, expectedResult, "tab.tabheight: expected " + expectedResult + " received = " + tab.tabheight);
   });

   it('tab.diameter should set correctly', function ()
   {
      let expectedResult = tdiameter;
      assert.equal(tab.diameter, expectedResult, "tab.diameter: expected " + expectedResult + " received = " + tab.diameter);
   });

   it('tab.active should be: false', function ()
   {
      let expectedResult = false;
      assert.equal(tab.active, expectedResult, "tab.active: expected " + expectedResult + " received = " + tab.active);
   });

//N Unused ?
// it('tab.p1 should be: ??/', function ()
// {
//    let expectedResult = 950;
//    assert.equal(tab.p1, expectedResult, "tab.p1: expected " + expectedResult + " received = " + tab.p1);
// });

// it('tab.p2 should be: ???', function ()
// {
//    let expectedResult = 600;
//    assert.equal(tab.p2, expectedResult, "tab.p2: expected " + expectedResult + " received = " + tab.p2);
// });

   it('tab.redraw should be a Class method', function ()
   {
      let expectedResult = 'function';
      assert.isFunction(tab.redraw, "tab.redraw: expected " + expectedResult + " received = " + typeof tab.redraw);
   });

   it('tab.setActive should be a Class method', function ()
   {
      let expectedResult = 'function';
      assert.isFunction(tab.setActive, "tab.setActive: expected " + expectedResult + " received = " + typeof tab.setActive);
   });

   it('tab.setInactive should be a Class method', function ()
   {
      let expectedResult = 'function';
      assert.isFunction(tab.setInactive, "tab.setInactive: expected " + expectedResult + " received = " + typeof tab.setInactive);
   });

});

