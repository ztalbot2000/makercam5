//'use strict';

var assert = require('chai').assert;

import { Individual }  from '../../app/partKart/Individual';

var individual = new Individual();

describe('Testing Individual.js', function ()
{
   it('individual should not be null', function ()
   {
      assert.isNotNull(individual, 'individual is null');
   });

   describe('Testing Individual variables', function (){});

   it('individual.fitness should be: NaN', function ()
   {
      let expectedResult = NaN;
      assert.isNaN(individual.fitness, "individual.fitness: expected " + expectedResult + " received = " + individual.fitness);
   });

   it('individual.secondaryfitness should be: NaN', function ()
   {
      let expectedResult = NaN;
      assert.isNaN(individual.secondaryfitness, "individual.secondaryfitness: expected " + expectedResult + " received = " + individual.secondaryfitness);
   });

   it('individual.genes should be an Array', function ()
   {
      assert.isArray(individual.genes, 'individual.genes is not an array');
   });

   it('individual.genes.length should be: 0', function ()
   {
      let expectedResult = 0;
      assert.equal(individual.genes.length, expectedResult, "individual.genes.length: expected " + expectedResult + " received = " + individual.genes.length);
   });

   it('individual.data should be an Array', function ()
   {
      assert.isArray(individual.data, 'individual.data is not an array');
   });

   it('individual.data.length should be: 0', function ()
   {
      let expectedResult = 0;
      assert.equal(individual.data.length, expectedResult, "individual.data.length: expected " + expectedResult + " received = " + individual.data.length);
   });


   it('individual.mutate should be a Class method', function ()
   {
      let expectedResult = 'function';
      assert.isFunction(individual.mutate, "individual.mutate: expected " + expectedResult + " received = " + typeof individual.mutate);
   });

   it('individual.clone should be a Class method', function ()
   {
      let expectedResult = 'function';
      assert.isFunction(individual.clone, "individual.clone: expected " + expectedResult + " received = " + typeof individual.clone);
   });

   it('individual.clone should increase genes', function ()
   {
      let expectedResult = 1;
      //J let x: number = 42;
      let x = 42;

      // Add something to individula.genes array
      individual.genes.push(x);

      assert.lengthOf(individual.genes, expectedResult, "individual.genes.length expected: " + expectedResult + " received = " + individual.genes.length);

      let clone = individual.clone();

      assert.instanceOf(clone, Individual, "individual.clone(): expected: instance of Individual, received = " + clone);

      let result = individual.genes.length;
      assert.equal(result, expectedResult, "individual.clone: expected " + expectedResult + " received = " + result);

      assert.equal(individual.genes[0], clone.genes[0], "individual.genes not cloned: expected " + individual.genes[0] + " received = " + clone.genes[0]);
   });

   it('individual.mate should be a Class method', function ()
   {
      let expectedResult = 'function';
      assert.isFunction(individual.mate, "individual.mate: expected " + expectedResult + " received = " + typeof individual.mate);
   });


});

