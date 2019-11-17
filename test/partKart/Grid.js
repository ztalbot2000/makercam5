//'use strict';
//


var assert = require('chai').assert;


import Grid  from '../../app/partKart/Grid.js';

var grid = new Grid();

describe('Testing Grid.js', function ()
{
   it('grid should not be null', function ()
   {
      assert.isNotNull(grid, 'grid is null');
   });

   describe('Testing Grid variables', function (){});

   it('grid.xaxis should be private and not defined', function ()
   {
      console.log("grid.xasis is " + grid.xaxis);
      let expectedResult = undefined;
      assert.isUndefined(grid.xaxis, "grid.xaxis: expected " + expectedResult + " received = " + grid.xaxis);
   });

   // All the other variables are private, so no use testing them

   it('grid.redrawGrid should be a function', function ()
   {
      let expectedResult = 'function';
      assert.isFunction(grid.redrawGrid, "grid.redrawGrid: expected " + expectedResult + " received = " + typeof grid.redrawGrid);
   });

   it('grid.redrawGridLarge should be a function', function ()
   {
      let expectedResult = 'function';
      assert.isFunction(grid.redrawGridLarge, "grid.redrawGridLarge: expected " + expectedResult + " received = " + typeof grid.redrawGridLarge);
   });

   it('grid.clear should be a function', function ()
   {
      let expectedResult = 'function';
      assert.isFunction(grid.clear, "grid.clear: expected " + expectedResult + " received = " + typeof grid.clear);
   });

});

