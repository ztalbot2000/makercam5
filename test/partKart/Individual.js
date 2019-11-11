//'use strict';

var assert = require('chai').assert;

import Individual  from '../../app/partKart/Individual.js';

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
      assert.equal(isNaN(individual.fitness), true, "individual.fitness: expected " + expectedResult + " received = " + individual.fitness);
   });

   it('individual.secondaryfitness should be: NaN', function ()
   {
      let expectedResult = NaN;
      assert.equal(isNaN(individual.secondaryfitness), true, "individual.secondaryfitness: expected " + expectedResult + " received = " + individual.secondaryfitness);
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


   it('individual.mutate should be a function', function ()
   {
      let expectedResult = 'function';
      assert.isFunction(individual.mutate, "individual.mutate: expected " + expectedResult + " received = " + typeof individual.mutate);
   });

   it('individual.clone should be a function', function ()
   {
      let expectedResult = 'function';
      assert.isFunction(individual.clone, "individual.clone: expected " + expectedResult + " received = " + typeof individual.clone);
   });

   it('individual.mate should be a function', function ()
   {
      let expectedResult = 'function';
      assert.isFunction(individual.mate, "individual.mate: expected " + expectedResult + " received = " + typeof individual.mate);
   });


});

