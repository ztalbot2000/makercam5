'use strict';

var assert = require('chai').assert;

import  EaseBase  from '../../../app/ui/Ease/EaseBase';

var easeBase = new EaseBase();

describe('Testing ui/Ease/EaseBase.ts', function ()
{
   it('EaseBase should not be null', function ()
   {
      assert.isNotNull(EaseBase, 'EaseBase resulted is null');
   });

   it('easeBase.getPosition should be a Class method', function ()
   {
      let expectedResult = 'function';
      assert.isFunction(easeBase.getPosition, "easeBase.getPosition: expected " + expectedResult + " received = " + typeof easeBase.getPosition);
   });

   it('easeBase.getPosition(15) should be successful.', function ()
   {
      let num = 15;

      let expectedResult = num;
      let result = easeBase.getPosition( num );

      assert.equal(result, expectedResult, "easeBase.getPosition(" + num +"): expected " + expectedResult + " received = " + result );
   });

});

