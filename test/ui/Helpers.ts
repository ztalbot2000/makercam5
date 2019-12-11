'use strict';

var assert = require('chai').assert;

import  { Helpers }  from '../../app/ui/Helpers';

describe('Testing Helpers.ts', function ()
{
   it('Helpers should not be null', function ()
   {
      assert.isNotNull(Helpers, 'Helpers resulted is null');
   });

   it('Helpers.Lerp should be a Class method', function ()
   {
      let expectedResult = 'function';
      assert.isFunction(Helpers.Lerp, "Helpers.Lerp: expected " + expectedResult + " received = " + typeof Helpers.Lerp);
   });

   it('Helpers.Lerp(0, 3, 0.5) should be successful.', function ()
   {
      let tParam = 0.5;
      let valToBeLerped = 0;

      let expectedResult = 1.5;
      let result = Helpers.Lerp( 0, 3, tParam);

      assert.equal(result, expectedResult, "Helpers.Lerp(0,3," + tParam +"): expected " + expectedResult + " received = " + result );
   });

   it('Helpers.Round should be a Class method', function ()
   {
      let expectedResult = 'function';
      assert.isFunction(Helpers.Round, "Helpers.Round: expected " + expectedResult + " received = " + typeof Helpers.Round);
   });

   it('Helpers.Round(3.141592654, 3) should be successful.', function ()
   {
      let num = 3.1415927654;
      let decimals = 3;

      let expectedResult = 3.142;
      let result = Helpers.Round(num, decimals);

      assert.equal(result, expectedResult, "Helpers.Round(" + num +", " + decimals + "): expected " + expectedResult + " received = " + result );
   });

   it('Helpers.Round(3.141592654, 2) should be successful.', function ()
   {
      let num = 3.1415927654;
      let decimals = 2;

      let expectedResult = 3.14;
      let result = Helpers.Round(num, decimals);

      assert.equal(result, expectedResult, "Helpers.Round(" + num +", " + decimals + "): expected " + expectedResult + " received = " + result );
   });

   it('Helpers.Round(3.141592654, 4) should be successful.', function ()
   {
      let num = 3.1415927654;
      let decimals = 4;

      let expectedResult = 3.1416;
      let result = Helpers.Round(num, decimals);

      assert.equal(result, expectedResult, "Helpers.Round(" + num +", " + decimals + "): expected " + expectedResult + " received = " + result );
   });

   it('Helpers.Round(3.14, 4) should be successful.', function ()
   {
      let num = 3.14;
      let decimals = 4;

      let expectedResult = 3.14;
      let result = Helpers.Round(num, decimals);

      assert.equal(result, expectedResult, "Helpers.Round(" + num +", " + decimals + "): expected " + expectedResult + " received = " + result );
   });

   it('Helpers.Round(0.0, 4) should not fail.', function ()
   {
      let num = 0.0;
      let decimals = 4;

      let expectedResult = 0;
      let result = Helpers.Round(num, decimals);

      assert.equal(result, expectedResult, "Helpers.Round(" + num +", " + decimals + "): expected " + expectedResult + " received = " + result );
   });

   it('Helpers.componentToHex should be a Class method', function ()
   {
      let expectedResult = 'function';
      assert.isFunction(Helpers.componentToHex, "Helpers.componentToHex: expected " + expectedResult + " received = " + typeof Helpers.componentToHex);
   });

   it('Helpers.componentToHex(152732) should be successful.', function ()
   {
      let component = 152732;

      let expectedResult = '2549c';
      let result = Helpers.componentToHex( component );

      assert.equal(result, expectedResult, "Helpers.componentToHex(" + component + "): expected " + expectedResult + " received = " + result );
   });

   it('Helpers.componentToHex(14) should be successful.', function ()
   {
      let component = 14;

      let expectedResult = '0e';
      let result = Helpers.componentToHex( component );

      assert.equal(result, expectedResult, "Helpers.componentToHex(" + component + "): expected " + expectedResult + " received = " + result );
   });

   it('Helpers.rgbToHex should be a Class method', function ()
   {
      let expectedResult = 'function';
      assert.isFunction(Helpers.rgbToHex, "Helpers.rgbToHex: expected " + expectedResult + " received = " + typeof Helpers.rgbToHex);
   });

   it('Helpers.rgbToHex(6, 14, 10) should be successful.', function ()
   {
      let red = 6;
      let green = 14;
      let blue = 10;

      let expectedResult = '#060e0a';
      let result = Helpers.rgbToHex( red, green, blue );

      assert.equal(result, expectedResult, "Helpers.rgbToHex(" + red + ", " + green + ", " + blue + "): expected " + expectedResult + " received = " + result );
   });

   it('Helpers.rgbToNumber should be a Class method', function ()
   {
      let expectedResult = 'function';
      assert.isFunction(Helpers.rgbToNumber, "Helpers.rgbToNumber: expected " + expectedResult + " received = " + typeof Helpers.rgbToNumber);
   });

   it('Helpers.rgbToNumber(6, 0xe, 0xa) should be successful.', function ()
   {
      let red = 6;
      let green = 14
      let blue = 10;

      let expectedResult = 396810;
      let result = Helpers.rgbToNumber( red, green, blue );

      assert.equal(result, expectedResult, "Helpers.rgbToHex(" + red + ", " + green + ", " + blue + "): expected " + expectedResult + " received = " + result );
   });

   it('Helpers.numberToRgb should be a Class method', function ()
   {
      let expectedResult = 'function';
      assert.isFunction(Helpers.numberToRgb, "Helpers.numberToRgb: expected " + expectedResult + " received = " + typeof Helpers.numberToRgb);
   });

   it('Helpers.numberToRgb(396810) should be successful.', function ()
   {
      let rgb = 396810;

      let expectedResult = {r:6, g:14, b:10};

      let result = Helpers.numberToRgb( rgb );

      assert.deepEqual(result, expectedResult, "Helpers.numberToRgb("  + rgb + "): expected " + expectedResult + " received = " + result );
   });

   it('Helpers.hexToRgb should be a Class method', function ()
   {
      let expectedResult = 'function';
      assert.isFunction(Helpers.hexToRgb, "Helpers.hexToRgb: expected " + expectedResult + " received = " + typeof Helpers.hexToRgb);
   });

   it('Helpers.hexToRgb(396810) should be successful.', function ()
   {
      let hex = 396810;

      let expectedResult = {r:6, g:14, b:10};

      let result = Helpers.hexToRgb( hex );

      assert.deepEqual(result, expectedResult, "Helpers.hexToRgb("  + hex + "): expected " + expectedResult + " received = " + result );
   });


});

