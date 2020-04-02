//'use strict';
//


var assert = require('chai').assert;


import { Grid } from '../../com/partKart/Grid';

var grid = new Grid();

describe('Testing Grid.js', function ()
{
   it('grid should not be null', function ()
   {
      assert.isNotNull(grid, 'grid is null');
   });

   describe('Testing Grid variables', function (){});
   // With typescript, this does not compile
   // it('grid.xaxis should be private and not defined', function ()
   // {
   //    console.log("grid.xaxis is " + grid.xaxis);
   //    let expectedResult = undefined;
   //    assert.isUndefined(grid.xaxis, "grid.xaxis: expected " + expectedResult + " received = " + grid.xaxis);
   // });

   it('grid.xaxis should be private and hackingly an object', function ()
   {
      let expectedResult = 'object';
      assert.isObject(grid['xaxis'], "grid.xaxis: expected " + expectedResult + " received = " + typeof grid['xaxis'] );
   });


   // All the other variables are private, so no use testing them
   // You can also hackingly test a private methods this wat:
   // grid['private_method']()


   it('grid.redrawGrid should be a class method', function ()
   {
      let expectedResult = 'function';
      assert.isFunction(grid.redrawGrid, "grid.redrawGrid: expected " + expectedResult + " received = " + typeof grid.redrawGrid);
   });

   it('grid.redrawGridLarge should be a class method', function ()
   {
      let expectedResult = 'function';
      assert.isFunction(grid.redrawGridLarge, "grid.redrawGridLarge: expected " + expectedResult + " received = " + typeof grid.redrawGridLarge);
   });

   it('grid.clear should be a class method', function ()
   {
      let expectedResult = 'function';
      assert.isFunction(grid.clear, "grid.clear: expected " + expectedResult + " received = " + typeof grid.clear);
   });

});

