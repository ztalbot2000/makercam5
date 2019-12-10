'use strict';

var assert = require('chai').assert;

import  { ExponentialEase } from '../../../app/ui/Ease/ExponentialEase';

let power = 2;
let easeIn = 3;
let easeOut = 1;

let exponentialEase = new ExponentialEase(power, easeIn, easeOut);

describe('Testing ui/Ease/ExponentialEase.ts', function ()
{
   it('exponentialEase should not be null', function ()
   {
      assert.isNotNull(exponentialEase, 'exponentialEase resulted is null');
   });

   it('exponentialEase.getPosition should be a Class method', function ()
   {
      let expectedResult = 'function';
      assert.isFunction(exponentialEase.getPosition, "exponentialEase.getPosition: expected " + expectedResult + " received = " + typeof exponentialEase.getPosition);
   });

   it('exponentialEase.getPosition should be successful.', function ()
   {
      let num = 8;

      let expectedResult = 1373;
      let result = exponentialEase.getPosition(num);

      assert.equal(result, expectedResult, "exponentialEase.getPosition(" + num +"): expected " + expectedResult + " received = " + result );
   });

});

