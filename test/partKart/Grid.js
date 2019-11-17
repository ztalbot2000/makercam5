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
      //console.log("grid.#asis is " + grid.#xaxis);
      let expectedResult = undefined;
      assert.isUndefined(grid.xaxis, "grid.xaxis: expected " + expectedResult + " received = " + grid.xaxis);
   });
/*
   it('grid.secondaryfitness should be: NaN', function ()
   {
      let expectedResult = NaN;
      assert.isNaN(grid.secondaryfitness, "grid.secondaryfitness: expected " + expectedResult + " received = " + grid.secondaryfitness);
   });

   it('grid.genes should be an Array', function ()
   {
      assert.isArray(grid.genes, 'grid.genes is not an array');
   });

   it('grid.genes.length should be: 0', function ()
   {
      let expectedResult = 0;
      assert.equal(grid.genes.length, expectedResult, "grid.genes.length: expected " + expectedResult + " received = " + grid.genes.length);
   });

   it('grid.data should be an Array', function ()
   {
      assert.isArray(grid.data, 'grid.data is not an array');
   });

   it('grid.data.length should be: 0', function ()
   {
      let expectedResult = 0;
      assert.equal(grid.data.length, expectedResult, "grid.data.length: expected " + expectedResult + " received = " + grid.data.length);
   });


   it('grid.mutate should be a function', function ()
   {
      let expectedResult = 'function';
      assert.isFunction(grid.mutate, "grid.mutate: expected " + expectedResult + " received = " + typeof grid.mutate);
   });

   it('grid.clone should be a function', function ()
   {
      let expectedResult = 'function';
      assert.isFunction(grid.clone, "grid.clone: expected " + expectedResult + " received = " + typeof grid.clone);
   });

   it('grid.clone should increase genes', function ()
   {
      let expectedResult = 1;
      let child = "Child";

      // Add something to individula.genes array
      grid.genes.push(child);

      assert.lengthOf(grid.genes, expectedResult, "grid.genes.length expected: " + expectedResult + " received = " + grid.genes.length);

      let clone = grid.clone();

      assert.instanceOf(clone, Individual, "grid.clone(): expected: instance of Individual, received = " + clone);

      let result = grid.genes.length;
      assert.equal(result, expectedResult, "grid.clone: expected " + expectedResult + " received = " + result);

      assert.equal(grid.genes[0], clone.genes[0], "grid.genes not cloned: expected " + grid.genes[0] + " received = " + clone.genes[0]);
   });

   it('grid.mate should be a function', function ()
   {
      let expectedResult = 'function';
      assert.isFunction(grid.mate, "grid.mate: expected " + expectedResult + " received = " + typeof grid.mate);
   });

*/

});

