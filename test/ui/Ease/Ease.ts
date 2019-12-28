'use strict';

var assert = require('chai').assert;

//N No brackets, imports the default created Ease Instance from new.
import Ease from '../../../app/ui/Ease/Ease';


describe('Testing ui/Ease/Ease.ts', function ()
{
   it('Ease should not be null', function ()
   {
      assert.isNotNull(Ease, 'Ease resulted is null');
   });

   it('Ease.Linear should be an object', function ()
   {
      let expectedResult = 'object';
      assert.isObject(Ease.Linear, "Ease.Linear: expected " + expectedResult + " received = " + typeof Ease.Linear);
   });

   it('Ease.Linear.easeNone.getPosition(8) should return correctly', function ()
   {
      let num = 8;
      let expectedResult = num;

      let result = Ease.Linear.easeNone.getPosition( num );

      for (let k in Ease.Linear)
      {
         console.log("Ease.Linear[" + k + "]=" + Ease.Linear[k]);
      }

      assert.equal(result, expectedResult, "Ease.Linear.easeNone.getPosition(" + num + "): expected " + expectedResult + " received = " + result);
   });

// ********** Power 0

   it('Ease.Power0 should be an object', function ()
   {
      let expectedResult = 'object';
      assert.isObject(Ease.Power0, "Ease.Power0: expected " + expectedResult + " received = " + typeof Ease.Power0);
   });

   it('Ease.Power0.easeNone should be an object', function ()
   {
      let expectedResult = 'object';
      assert.isObject(Ease.Power0.easeNone, "Ease.Power0.easeNone: expected " + expectedResult + " received = " + typeof Ease.Power0.easeNone);
   });

   it('Ease.Power0.easeNone.getPosition(8) should return correctly', function ()
   {
      let num = 8;
      let expectedResult = num;

      let result = Ease.Power0.easeNone.getPosition( num );
      for (let k in Ease.Power0)
      {
         console.log("Ease.Power0[" + k + "]=" + Ease.Power0[k]);
      }

      assert.equal(result, expectedResult, "Ease.Power0.easeNone.getPosition(" + num + "): expected " + expectedResult + " received = " + result);
   });

// ********** Power 1

   it('Ease.Power1 should be an object', function ()
   {
      let expectedResult = 'object';
      assert.isObject(Ease.Power1, "Ease.Power1: expected " + expectedResult + " received = " + typeof Ease.Power1);
   });

   it('Ease.Power1.easeIn should be an object', function ()
   {
      let expectedResult = 'object';
      assert.isObject(Ease.Power1.easeIn, "Ease.Power1.easeIn: expected " + expectedResult + " received = " + typeof Ease.Power1.easeIn);
   });

   it('Ease.Power1.easeIn.getPosition(8) should return correctly', function ()
   {
      let num = 8;
      let expectedResult = 64;

      let result = Ease.Power1.easeIn.getPosition( num );

      assert.equal(result, expectedResult, "Ease.Power1.easeIn.getPosition(" + num + "): expected " + expectedResult + " received = " + result);
   });

   it('Ease.Power1.easeOut should be an object', function ()
   {
      let expectedResult = 'object';
      assert.isObject(Ease.Power1.easeOut, "Ease.Power1.easeOut: expected " + expectedResult + " received = " + typeof Ease.Power1.easeOut);
   });

   it('Ease.Power1.easeOut.getPosition(8) should return correctly', function ()
   {
      let num = 8;
      let expectedResult = -48;

      let result = Ease.Power1.easeOut.getPosition( num );

      assert.equal(result, expectedResult, "Ease.Power1.easeOut.getPosition(" + num + "): expected " + expectedResult + " received = " + result);
   });

   it('Ease.Power1.easeInOut should be an object', function ()
   {
      let expectedResult = 'object';
      assert.isObject(Ease.Power1.easeInOut, "Ease.Power1.easeInOut: expected " + expectedResult + " received = " + typeof Ease.Power1.easeInOut);
   });

   it('Ease.Power1.easeInOut.getPosition(8) should return correctly', function ()
   {
      let num = 8;
      let expectedResult = -97;

      let result = Ease.Power1.easeInOut.getPosition( num );

      assert.equal(result, expectedResult, "Ease.Power1.easeInOut.getPosition(" + num + "): expected " + expectedResult + " received = " + result);
   });

// ********** Power 2

   it('Ease.Power2 should be an object', function ()
   {
      let expectedResult = 'object';
      assert.isObject(Ease.Power2, "Ease.Power2: expected " + expectedResult + " received = " + typeof Ease.Power2);
   });

   it('Ease.Power2.easeIn should be an object', function ()
   {
      let expectedResult = 'object';
      assert.isObject(Ease.Power2.easeIn, "Ease.Power2.easeIn: expected " + expectedResult + " received = " + typeof Ease.Power2.easeIn);
   });

   it('Ease.Power2.easeIn.getPosition(8) should return correctly', function ()
   {
      let num = 8;
      let expectedResult = 512;

      let result = Ease.Power2.easeIn.getPosition( num );

      assert.equal(result, expectedResult, "Ease.Power2.easeIn.getPosition(" + num + "): expected " + expectedResult + " received = " + result);
   });

   it('Ease.Power2.easeOut should be an object', function ()
   {
      let expectedResult = 'object';
      assert.isObject(Ease.Power2.easeOut, "Ease.Power2.easeOut: expected " + expectedResult + " received = " + typeof Ease.Power2.easeOut);
   });

   it('Ease.Power2.easeOut.getPosition(8) should return correctly', function ()
   {
      let num = 8;
      let expectedResult = 344;

      let result = Ease.Power2.easeOut.getPosition( num );

      assert.equal(result, expectedResult, "Ease.Power2.easeOut.getPosition(" + num + "): expected " + expectedResult + " received = " + result);
   });

   it('Ease.Power2.easeInOut should be an object', function ()
   {
      let expectedResult = 'object';
      assert.isObject(Ease.Power2.easeInOut, "Ease.PowePowePower2.easeInOut: expected " + expectedResult + " received = " + typeof Ease.Power2.easeInOut);
   });

   it('Ease.Power2.easeInOut.getPosition(8) should return correctly', function ()
   {
      let num = 8;
      let expectedResult = 1373;

      let result = Ease.Power2.easeInOut.getPosition( num );

      assert.equal(result, expectedResult, "Ease.Power2.easeInOut.getPosition(" + num + "): expected " + expectedResult + " received = " + result);
   });

// ********** Power 3

   it('Ease.Power3 should be an object', function ()
   {
      let expectedResult = 'object';
      assert.isObject(Ease.Power3, "Ease.Power3: expected " + expectedResult + " received = " + typeof Ease.Power3);
   });

   it('Ease.Power3.easeIn should be an object', function ()
   {
      let expectedResult = 'object';
      assert.isObject(Ease.Power3.easeIn, "Ease.Power3.easeIn: expected " + expectedResult + " received = " + typeof Ease.Power3.easeIn);
   });

   it('Ease.Power3.easeIn.getPosition(8) should return correctly', function ()
   {
      let num = 8;
      let expectedResult = 4096;

      let result = Ease.Power3.easeIn.getPosition( num );

      assert.equal(result, expectedResult, "Ease.Power3.easeIn.getPosition(" + num + "): expected " + expectedResult + " received = " + result);
   });

   it('Ease.Power3.easeOut should be an object', function ()
   {
      let expectedResult = 'object';
      assert.isObject(Ease.Power3.easeOut, "Ease.Power3.easeOut: expected " + expectedResult + " received = " + typeof Ease.Power3.easeOut);
   });

   it('Ease.Power3.easeOut.getPosition(8) should return correctly', function ()
   {
      let num = 8;
      let expectedResult = -2400;

      let result = Ease.Power3.easeOut.getPosition( num );

      assert.equal(result, expectedResult, "Ease.Power3.easeOut.getPosition(" + num + "): expected " + expectedResult + " received = " + result);
   });

   it('Ease.Power3.easeInOut should be an object', function ()
   {
      let expectedResult = 'object';
      assert.isObject(Ease.Power3.easeInOut, "Ease.Power3.easeInOut: expected " + expectedResult + " received = " + typeof Ease.Power3.easeInOut);
   });

   it('Ease.Power3.easeInOut.getPosition(8) should return correctly', function ()
   {
      let num = 8;
      let expectedResult = -19207;

      let result = Ease.Power3.easeInOut.getPosition( num );

      assert.equal(result, expectedResult, "Ease.Power3.easeInOut.getPosition(" + num + "): expected " + expectedResult + " received = " + result);
   });

// ********** Power 4

   it('Ease.Power4 should be an object', function ()
   {
      let expectedResult = 'object';
      assert.isObject(Ease.Power4, "Ease.Power4: expected " + expectedResult + " received = " + typeof Ease.Power4);
   });

   it('Ease.Power4.easeIn should be an object', function ()
   {
      let expectedResult = 'object';
      assert.isObject(Ease.Power4.easeIn, "Ease.Power4.easeIn: expected " + expectedResult + " received = " + typeof Ease.Power4.easeIn);
   });

   it('Ease.Power4.easeIn.getPosition(8) should return correctly', function ()
   {
      let num = 8;
      let expectedResult = 32768;

      let result = Ease.Power4.easeIn.getPosition( num );

      assert.equal(result, expectedResult, "Ease.Power4.easeIn.getPosition(" + num + "): expected " + expectedResult + " received = " + result);
   });

   it('Ease.Power4.easeOut should be an object', function ()
   {
      let expectedResult = 'object';
      assert.isObject(Ease.Power4.easeOut, "Ease.Power4.easeOut: expected " + expectedResult + " received = " + typeof Ease.Power4.easeOut);
   });

   it('Ease.Power4.easeOut.getPosition(8) should return correctly', function ()
   {
      let num = 8;
      let expectedResult = 16808;

      let result = Ease.Power4.easeOut.getPosition( num );

      assert.equal(result, expectedResult, "Ease.Power4.easeOut.getPosition(" + num + "): expected " + expectedResult + " received = " + result);
   });

   it('Ease.Power4.easeInOut should be an object', function ()
   {
      let expectedResult = 'object';
      assert.isObject(Ease.Power4.easeInOut, "Ease.Power4.easeInOut: expected " + expectedResult + " received = " + typeof Ease.Power4.easeInOut);
   });

   it('Ease.Power4.easeInOut.getPosition(8) should return correctly', function ()
   {
      let num = 8;
      let expectedResult = 268913;

      let result = Ease.Power4.easeInOut.getPosition( num );

      assert.equal(result, expectedResult, "Ease.Power4.easeInOut.getPosition(" + num + "): expected " + expectedResult + " received = " + result);
   });

// ********** Bounce

   it('Ease.Bounce should be an object', function ()
   {
      let expectedResult = 'object';
      assert.isObject(Ease.Bounce, "Ease.Bounce: expected " + expectedResult + " received = " + typeof Ease.Bounce);
   });

   it('Ease.Bounce.BounceIn should be an object', function ()
   {
      let expectedResult = 'object';
      assert.isObject(Ease.Bounce.BounceIn, "Ease.Bounce.BounceIn: expected " + expectedResult + " received = " + typeof Ease.Bounce.BounceIn);
   });

   it('Ease.Bounce.BounceIn.getPosition(8) should return correctly', function ()
   {
      let num = 8;
      let expectedResult = -369.5625;

      let result = Ease.Bounce.BounceIn.getPosition( num );

      assert.equal(result, expectedResult, "Ease.Bounce.BounceIn.getPosition(" + num + "): expected " + expectedResult + " received = " + result);
   });

   it('Ease.Bounce.BounceOut should be an object', function ()
   {
      let expectedResult = 'object';
      assert.isObject(Ease.Bounce.BounceOut, "Ease.Bounce.BounceOut: expected " + expectedResult + " received = " + typeof Ease.Bounce.BounceOut);
   });

   it('Ease.Bounce.BounceOut.getPosition(8) should return correctly', function ()
   {
      let num = 8;
      let expectedResult = 376.37499;

      let result = Ease.Bounce.BounceOut.getPosition( num );

      assert.closeTo(result, expectedResult, .0005, "Ease.Bounce.BounceOut.getPosition(" + num + "): expected " + expectedResult + " received = " + result);
   });

   it('Ease.Bounce.BounceInOut should be an object', function ()
   {
      let expectedResult = 'object';
      assert.isObject(Ease.Bounce.BounceInOut, "Ease.Bounce.BounceInOut: expected " + expectedResult + " received = " + typeof Ease.Bounce.BounceInOut);
   });

   it('Ease.Bounce.BounceInOut.getPosition(8) should return correctly', function ()
   {
      let num = 8;
      let expectedResult = 746.9375;

      let result = Ease.Bounce.BounceInOut.getPosition( num );

      assert.closeTo(result, expectedResult, .0005, "Ease.Bounce.BounceInOut.getPosition(" + num + "): expected " + expectedResult + " received = " + result);
   });

// ********** Circ

   it('Ease.Circ should be an object', function ()
   {
      let expectedResult = 'object';
      assert.isObject(Ease.Circ, "Ease.Circ: expected " + expectedResult + " received = " + typeof Ease.Circ);
   });

   it('Ease.Circ.CircIn should be an object', function ()
   {
      let expectedResult = 'object';
      assert.isObject(Ease.Circ.CircIn, "Ease.Circ.CircIn: expected " + expectedResult + " received = " + typeof Ease.Circ.CircIn);
   });

   it('Ease.Circ.CircIn.getPosition(.123) should return correctly', function ()
   {
      let num = .123;
      let expectedResult = 0.007593329325119802;

      let result = Ease.Circ.CircIn.getPosition( num );

      assert.closeTo(result, expectedResult, .0000005, "Ease.Circ.CircInOut.getPosition(" + num + "): expected " + expectedResult + " received = " + result);
   });

   it('Ease.Circ.CircOut should be an object', function ()
   {
      let expectedResult = 'object';
      assert.isObject(Ease.Circ.CircOut, "Ease.Circ.CircOut: expected " + expectedResult + " received = " + typeof Ease.Circ.CircOut);
   });

   it('Ease.Circ.CircOut.getPosition(.123) should return correctly', function ()
   {
      let num = .123;
      let expectedResult = 0.48049037451337157;

      let result = Ease.Circ.CircOut.getPosition( num );

      assert.closeTo(result, expectedResult, .0000005, "Ease.Circ.CircOut.getPosition(" + num + "): expected " + expectedResult + " received = " + result);
   });

   it('Ease.Circ.CircInOut should be an object', function ()
   {
      let expectedResult = 'object';
      assert.isObject(Ease.Circ.CircInOut, "Ease.Circ.CircInOut: expected " + expectedResult + " received = " + typeof Ease.Circ.CircInOut);
   });

   it('Ease.Circ.CircInOut.getPosition(.123) should return correctly', function ()
   {
      let num = .123;
      let expectedResult = 0.015365085863595696;

      let result = Ease.Circ.CircInOut.getPosition( num );

      assert.closeTo(result, expectedResult, .0000005, "Ease.Circ.CircInOut.getPosition(" + num + "): expected " + expectedResult + " received = " + result);
   });

// ********** Expo

   it('Ease.Expo should be an object', function ()
   {
      let expectedResult = 'object';
      assert.isObject(Ease.Expo, "Ease.Expo: expected " + expectedResult + " received = " + typeof Ease.Expo);
   });

   it('Ease.Expo.ExpoIn should be an object', function ()
   {
      let expectedResult = 'object';
      assert.isObject(Ease.Expo.ExpoIn, "Ease.Expo.ExpoIn: expected " + expectedResult + " received = " + typeof Ease.Expo.ExpoIn);
   });

   it('Ease.Expo.ExpoIn.getPosition(.002) should return correctly', function ()
   {
      let num = .002;
      let expectedResult = -0.00000980519551754995;

      let result = Ease.Expo.ExpoIn.getPosition( num );

      assert.closeTo(result, expectedResult, .0000005, "Ease.Expo.ExpoIn.getPosition(" + num + "): expected " + expectedResult + " received = " + result);
   });

   it('Ease.Expo.ExpoOut should be an object', function ()
   {
      let expectedResult = 'object';
      assert.isObject(Ease.Expo.ExpoOut, "Ease.Expo.ExpoOut: expected " + expectedResult + " received = " + typeof Ease.Expo.ExpoOut);
   });

   it('Ease.Expo.ExpoOut.getPosition(.08) should return correctly', function ()
   {
      let num = .08;
      let expectedResult = 0.42565082250148256;

      let result = Ease.Expo.ExpoOut.getPosition( num );

      assert.closeTo(result, expectedResult, .0000005, "Ease.Expo.ExpoOut.getPosition(" + num + "): expected " + expectedResult + " received = " + result);
   });

   it('Ease.Expo.ExpoInOut should be an object', function ()
   {
      let expectedResult = 'object';
      assert.isObject(Ease.Expo.ExpoInOut, "Ease.Expo.ExpoInOut: expected " + expectedResult + " received = " + typeof Ease.Expo.ExpoInOut);
   });

   it('Ease.Expo.ExpoInOut.getPosition(.002) should return correctly', function ()
   {
      let num = .002;
      let expectedResult = 0.0005020087044219072;

      let result = Ease.Expo.ExpoInOut.getPosition( num );

      assert.closeTo(result, expectedResult, .0000005, "Ease.Expo.ExpoInOut.getPosition(" + num + "): expected " + expectedResult + " received = " + result);
   });

// ********** Sine

   it('Ease.Sine should be an object', function ()
   {
      let expectedResult = 'object';
      assert.isObject(Ease.Sine, "Ease.Sine: expected " + expectedResult + " received = " + typeof Ease.Sine);
   });

   it('Ease.Sine.SineIn should be an object', function ()
   {
      let expectedResult = 'object';
      assert.isObject(Ease.Sine.SineIn, "Ease.Sine.SineIn: expected " + expectedResult + " received = " + typeof Ease.Sine.SineIn);
   });

   it('Ease.Sine.SineIn.getPosition(.123) should return correctly', function ()
   {
      let num = .123;
      let expectedResult = 0.018606666259886717;

      let result = Ease.Sine.SineIn.getPosition( num );

      assert.closeTo(result, expectedResult, .0000005, "Ease.Sine.SineIn.getPosition(" + num + "): expected " + expectedResult + " received = " + result);
   });

   it('Ease.Sine.SineOut should be an object', function ()
   {
      let expectedResult = 'object';
      assert.isObject(Ease.Sine.SineOut, "Ease.Sine.SineOut: expected " + expectedResult + " received = " + typeof Ease.Sine.SineOut);
   });

   it('Ease.Sine.SineOut.getPosition(.123) should return correctly', function ()
   {
      let num = .123;
      let expectedResult = 0.19200813652;

      let result = Ease.Sine.SineOut.getPosition( num );

      assert.closeTo(result, expectedResult, .0000005, "Ease.Sine.SineOut.getPosition(" + num + "): expected " + expectedResult + " received = " + result);
   });

   it('Ease.Sine.SineInOut should be an object', function ()
   {
      let expectedResult = 'object';
      assert.isObject(Ease.Sine.SineInOut, "Ease.Sine.SineInOut: expected " + expectedResult + " received = " + typeof Ease.Sine.SineInOut);
   });

   it('Ease.Sine.SineInOut.getPosition(.123) should return correctly', function ()
   {
      let num = .123;
      let expectedResult = 0.036867124;

      let result = Ease.Sine.SineInOut.getPosition( num );

      assert.closeTo(result, expectedResult, .0000005, "Ease.Sine.SineInOut.getPosition(" + num + "): expected " + expectedResult + " received = " + result);
   });

});
