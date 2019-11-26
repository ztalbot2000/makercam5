'use strict';

var assert = require('chai').assert;

import  ease  from '../../../app/ui/Ease/Ease';


describe('Testing ui/Ease/Ease.ts', function ()
{
   it('ease should not be null', function ()
   {
      assert.isNotNull(ease, 'ease resulted is null');
   });

   it('ease.Linear should be an object', function ()
   {
      let expectedResult = 'object';
      assert.isObject(ease.Linear, "ease.Linear: expected " + expectedResult + " received = " + typeof ease.Linear);
   });

   it('ease.Linear.getPosition(8) should return correctly', function ()
   {
      let num = 8;
      let expectedResult = num;

      let result = ease.Linear.getPosition( num );

      assert.equal(result, expectedResult, "ease.Linear.getPosition(" + num + "): expected " + expectedResult + " received = " + result);
   });

// ********** Power 0

   it('ease.Power0 should be an object', function ()
   {
      let expectedResult = 'object';
      assert.isObject(ease.Power0, "ease.Power0: expected " + expectedResult + " received = " + typeof ease.Power0);
   });

   it('ease.Power0.easeNone should be an object', function ()
   {
      let expectedResult = 'object';
      assert.isObject(ease.Power0.easeNone, "ease.Power0.easeNone: expected " + expectedResult + " received = " + typeof ease.Power0.easeNone);
   });

   it('ease.Power0.easeNone.getPosition(8) should return correctly', function ()
   {
      let num = 8;
      let expectedResult = num;

      let result = ease.Power0.easeNone.getPosition( num );

      assert.equal(result, expectedResult, "ease.Power0.easeNone.getPosition(" + num + "): expected " + expectedResult + " received = " + result);
   });

// ********** Power 1

   it('ease.Power1 should be an object', function ()
   {
      let expectedResult = 'object';
      assert.isObject(ease.Power1, "ease.Power1: expected " + expectedResult + " received = " + typeof ease.Power1);
   });

   it('ease.Power1.easeIn should be an object', function ()
   {
      let expectedResult = 'object';
      assert.isObject(ease.Power1.easeIn, "ease.Power1.easeIn: expected " + expectedResult + " received = " + typeof ease.Power1.easeIn);
   });

   it('ease.Power1.easeIn.getPosition(8) should return correctly', function ()
   {
      let num = 8;
      let expectedResult = 64;

      let result = ease.Power1.easeIn.getPosition( num );

      assert.equal(result, expectedResult, "ease.Power1.easeIn.getPosition(" + num + "): expected " + expectedResult + " received = " + result);
   });

   it('ease.Power1.easeOut should be an object', function ()
   {
      let expectedResult = 'object';
      assert.isObject(ease.Power1.easeOut, "ease.Power1.easeOut: expected " + expectedResult + " received = " + typeof ease.Power1.easeOut);
   });

   it('ease.Power1.easeOut.getPosition(8) should return correctly', function ()
   {
      let num = 8;
      let expectedResult = -48;

      let result = ease.Power1.easeOut.getPosition( num );

      assert.equal(result, expectedResult, "ease.Power1.easeOut.getPosition(" + num + "): expected " + expectedResult + " received = " + result);
   });

   it('ease.Power1.easeInOut should be an object', function ()
   {
      let expectedResult = 'object';
      assert.isObject(ease.Power1.easeInOut, "ease.Power1.easeInOut: expected " + expectedResult + " received = " + typeof ease.Power1.easeInOut);
   });

   it('ease.Power1.easeInOut.getPosition(8) should return correctly', function ()
   {
      let num = 8;
      let expectedResult = -97;

      let result = ease.Power1.easeInOut.getPosition( num );

      assert.equal(result, expectedResult, "ease.Power1.easeInOut.getPosition(" + num + "): expected " + expectedResult + " received = " + result);
   });

// ********** Power 2

   it('ease.Power2 should be an object', function ()
   {
      let expectedResult = 'object';
      assert.isObject(ease.Power2, "ease.Power2: expected " + expectedResult + " received = " + typeof ease.Power2);
   });

   it('ease.Power2.easeIn should be an object', function ()
   {
      let expectedResult = 'object';
      assert.isObject(ease.Power2.easeIn, "ease.Power2.easeIn: expected " + expectedResult + " received = " + typeof ease.Power2.easeIn);
   });

   it('ease.Power2.easeIn.getPosition(8) should return correctly', function ()
   {
      let num = 8;
      let expectedResult = 512;

      let result = ease.Power2.easeIn.getPosition( num );

      assert.equal(result, expectedResult, "ease.Power2.easeIn.getPosition(" + num + "): expected " + expectedResult + " received = " + result);
   });

   it('ease.Power2.easeOut should be an object', function ()
   {
      let expectedResult = 'object';
      assert.isObject(ease.Power2.easeOut, "ease.Power2.easeOut: expected " + expectedResult + " received = " + typeof ease.Power2.easeOut);
   });

   it('ease.Power2.easeOut.getPosition(8) should return correctly', function ()
   {
      let num = 8;
      let expectedResult = 344;

      let result = ease.Power2.easeOut.getPosition( num );

      assert.equal(result, expectedResult, "ease.Power2.easeOut.getPosition(" + num + "): expected " + expectedResult + " received = " + result);
   });

   it('ease.Power2.easeInOut should be an object', function ()
   {
      let expectedResult = 'object';
      assert.isObject(ease.Power2.easeInOut, "ease.PowePowePower2.easeInOut: expected " + expectedResult + " received = " + typeof ease.Power2.easeInOut);
   });

   it('ease.Power2.easeInOut.getPosition(8) should return correctly', function ()
   {
      let num = 8;
      let expectedResult = 1373;

      let result = ease.Power2.easeInOut.getPosition( num );

      assert.equal(result, expectedResult, "ease.Power2.easeInOut.getPosition(" + num + "): expected " + expectedResult + " received = " + result);
   });

// ********** Power 3

   it('ease.Power3 should be an object', function ()
   {
      let expectedResult = 'object';
      assert.isObject(ease.Power3, "ease.Power3: expected " + expectedResult + " received = " + typeof ease.Power3);
   });

   it('ease.Power3.easeIn should be an object', function ()
   {
      let expectedResult = 'object';
      assert.isObject(ease.Power3.easeIn, "ease.Power3.easeIn: expected " + expectedResult + " received = " + typeof ease.Power3.easeIn);
   });

   it('ease.Power3.easeIn.getPosition(8) should return correctly', function ()
   {
      let num = 8;
      let expectedResult = 4096;

      let result = ease.Power3.easeIn.getPosition( num );

      assert.equal(result, expectedResult, "ease.Power3.easeIn.getPosition(" + num + "): expected " + expectedResult + " received = " + result);
   });

   it('ease.Power3.easeOut should be an object', function ()
   {
      let expectedResult = 'object';
      assert.isObject(ease.Power3.easeOut, "ease.Power3.easeOut: expected " + expectedResult + " received = " + typeof ease.Power3.easeOut);
   });

   it('ease.Power3.easeOut.getPosition(8) should return correctly', function ()
   {
      let num = 8;
      let expectedResult = -2400;

      let result = ease.Power3.easeOut.getPosition( num );

      assert.equal(result, expectedResult, "ease.Power3.easeOut.getPosition(" + num + "): expected " + expectedResult + " received = " + result);
   });

   it('ease.Power3.easeInOut should be an object', function ()
   {
      let expectedResult = 'object';
      assert.isObject(ease.Power3.easeInOut, "ease.Power3.easeInOut: expected " + expectedResult + " received = " + typeof ease.Power3.easeInOut);
   });

   it('ease.Power3.easeInOut.getPosition(8) should return correctly', function ()
   {
      let num = 8;
      let expectedResult = -19207;

      let result = ease.Power3.easeInOut.getPosition( num );

      assert.equal(result, expectedResult, "ease.Power3.easeInOut.getPosition(" + num + "): expected " + expectedResult + " received = " + result);
   });

// ********** Power 4

   it('ease.Power4 should be an object', function ()
   {
      let expectedResult = 'object';
      assert.isObject(ease.Power4, "ease.Power4: expected " + expectedResult + " received = " + typeof ease.Power4);
   });

   it('ease.Power4.easeIn should be an object', function ()
   {
      let expectedResult = 'object';
      assert.isObject(ease.Power4.easeIn, "ease.Power4.easeIn: expected " + expectedResult + " received = " + typeof ease.Power4.easeIn);
   });

   it('ease.Power4.easeIn.getPosition(8) should return correctly', function ()
   {
      let num = 8;
      let expectedResult = 32768;

      let result = ease.Power4.easeIn.getPosition( num );

      assert.equal(result, expectedResult, "ease.Power4.easeIn.getPosition(" + num + "): expected " + expectedResult + " received = " + result);
   });

   it('ease.Power4.easeOut should be an object', function ()
   {
      let expectedResult = 'object';
      assert.isObject(ease.Power4.easeOut, "ease.Power4.easeOut: expected " + expectedResult + " received = " + typeof ease.Power4.easeOut);
   });

   it('ease.Power4.easeOut.getPosition(8) should return correctly', function ()
   {
      let num = 8;
      let expectedResult = 16808;

      let result = ease.Power4.easeOut.getPosition( num );

      assert.equal(result, expectedResult, "ease.Power4.easeOut.getPosition(" + num + "): expected " + expectedResult + " received = " + result);
   });

   it('ease.Power4.easeInOut should be an object', function ()
   {
      let expectedResult = 'object';
      assert.isObject(ease.Power4.easeInOut, "ease.Power4.easeInOut: expected " + expectedResult + " received = " + typeof ease.Power4.easeInOut);
   });

   it('ease.Power4.easeInOut.getPosition(8) should return correctly', function ()
   {
      let num = 8;
      let expectedResult = 268913;

      let result = ease.Power4.easeInOut.getPosition( num );

      assert.equal(result, expectedResult, "ease.Power4.easeInOut.getPosition(" + num + "): expected " + expectedResult + " received = " + result);
   });

// ********** Bounce

   it('ease.Bounce should be an object', function ()
   {
      let expectedResult = 'object';
      assert.isObject(ease.Bounce, "ease.Bounce: expected " + expectedResult + " received = " + typeof ease.Bounce);
   });

   it('ease.Bounce.BounceIn should be an object', function ()
   {
      let expectedResult = 'object';
      assert.isObject(ease.Bounce.BounceIn, "ease.Bounce.BounceIn: expected " + expectedResult + " received = " + typeof ease.Bounce.BounceIn);
   });

   it('ease.Bounce.BounceIn.getPosition(8) should return correctly', function ()
   {
      let num = 8;
      let expectedResult = -369.5625;

      let result = ease.Bounce.BounceIn.getPosition( num );

      assert.equal(result, expectedResult, "ease.Bounce.BounceIn.getPosition(" + num + "): expected " + expectedResult + " received = " + result);
   });

   it('ease.Bounce.BounceOut should be an object', function ()
   {
      let expectedResult = 'object';
      assert.isObject(ease.Bounce.BounceOut, "ease.Bounce.BounceOut: expected " + expectedResult + " received = " + typeof ease.Bounce.BounceOut);
   });

   it('ease.Bounce.BounceOut.getPosition(8) should return correctly', function ()
   {
      let num = 8;
      let expectedResult = 376.37499;

      let result = ease.Bounce.BounceOut.getPosition( num );

      assert.closeTo(result, expectedResult, .0005, "ease.Bounce.BounceOut.getPosition(" + num + "): expected " + expectedResult + " received = " + result);
   });

   it('ease.Bounce.BounceInOut should be an object', function ()
   {
      let expectedResult = 'object';
      assert.isObject(ease.Bounce.BounceInOut, "ease.Bounce.BounceInOut: expected " + expectedResult + " received = " + typeof ease.Bounce.BounceInOut);
   });

   it('ease.Bounce.BounceInOut.getPosition(8) should return correctly', function ()
   {
      let num = 8;
      let expectedResult = 746.9375;

      let result = ease.Bounce.BounceInOut.getPosition( num );

      assert.closeTo(result, expectedResult, .0005, "ease.Bounce.BounceInOut.getPosition(" + num + "): expected " + expectedResult + " received = " + result);
   });

// ********** Circ

   it('ease.Circ should be an object', function ()
   {
      let expectedResult = 'object';
      assert.isObject(ease.Circ, "ease.Circ: expected " + expectedResult + " received = " + typeof ease.Circ);
   });

   it('ease.Circ.CircIn should be an object', function ()
   {
      let expectedResult = 'object';
      assert.isObject(ease.Circ.CircIn, "ease.Circ.CircIn: expected " + expectedResult + " received = " + typeof ease.Circ.CircIn);
   });

   it('ease.Circ.CircIn.getPosition(.123) should return correctly', function ()
   {
      let num = .123;
      let expectedResult = 0.007593329325119802;

      let result = ease.Circ.CircIn.getPosition( num );

      assert.closeTo(result, expectedResult, .0000005, "ease.Circ.CircInOut.getPosition(" + num + "): expected " + expectedResult + " received = " + result);
   });

   it('ease.Circ.CircOut should be an object', function ()
   {
      let expectedResult = 'object';
      assert.isObject(ease.Circ.CircOut, "ease.Circ.CircOut: expected " + expectedResult + " received = " + typeof ease.Circ.CircOut);
   });

   it('ease.Circ.CircOut.getPosition(.123) should return correctly', function ()
   {
      let num = .123;
      let expectedResult = 0.48049037451337157;

      let result = ease.Circ.CircOut.getPosition( num );

      assert.closeTo(result, expectedResult, .0000005, "ease.Circ.CircOut.getPosition(" + num + "): expected " + expectedResult + " received = " + result);
   });

   it('ease.Circ.CircInOut should be an object', function ()
   {
      let expectedResult = 'object';
      assert.isObject(ease.Circ.CircInOut, "ease.Circ.CircInOut: expected " + expectedResult + " received = " + typeof ease.Circ.CircInOut);
   });

   it('ease.Circ.CircInOut.getPosition(.123) should return correctly', function ()
   {
      let num = .123;
      let expectedResult = 0.015365085863595696;

      let result = ease.Circ.CircInOut.getPosition( num );

      assert.closeTo(result, expectedResult, .0000005, "ease.Circ.CircInOut.getPosition(" + num + "): expected " + expectedResult + " received = " + result);
   });

// ********** Expo

   it('ease.Expo should be an object', function ()
   {
      let expectedResult = 'object';
      assert.isObject(ease.Expo, "ease.Expo: expected " + expectedResult + " received = " + typeof ease.Expo);
   });

   it('ease.Expo.ExpoIn should be an object', function ()
   {
      let expectedResult = 'object';
      assert.isObject(ease.Expo.ExpoIn, "ease.Expo.ExpoIn: expected " + expectedResult + " received = " + typeof ease.Expo.ExpoIn);
   });

   it('ease.Expo.ExpoIn.getPosition(.002) should return correctly', function ()
   {
      let num = .002;
      let expectedResult = -0.00000980519551754995;

      let result = ease.Expo.ExpoIn.getPosition( num );

      assert.closeTo(result, expectedResult, .0000005, "ease.Expo.ExpoIn.getPosition(" + num + "): expected " + expectedResult + " received = " + result);
   });

   it('ease.Expo.ExpoOut should be an object', function ()
   {
      let expectedResult = 'object';
      assert.isObject(ease.Expo.ExpoOut, "ease.Expo.ExpoOut: expected " + expectedResult + " received = " + typeof ease.Expo.ExpoOut);
   });

   it('ease.Expo.ExpoOut.getPosition(.08) should return correctly', function ()
   {
      let num = .08;
      let expectedResult = 0.42565082250148256;

      let result = ease.Expo.ExpoOut.getPosition( num );

      assert.closeTo(result, expectedResult, .0000005, "ease.Expo.ExpoOut.getPosition(" + num + "): expected " + expectedResult + " received = " + result);
   });

   it('ease.Expo.ExpoInOut should be an object', function ()
   {
      let expectedResult = 'object';
      assert.isObject(ease.Expo.ExpoInOut, "ease.Expo.ExpoInOut: expected " + expectedResult + " received = " + typeof ease.Expo.ExpoInOut);
   });

   it('ease.Expo.ExpoInOut.getPosition(.002) should return correctly', function ()
   {
      let num = .002;
      let expectedResult = 0.0005020087044219072;

      let result = ease.Expo.ExpoInOut.getPosition( num );

      assert.closeTo(result, expectedResult, .0000005, "ease.Expo.ExpoInOut.getPosition(" + num + "): expected " + expectedResult + " received = " + result);
   });

// ********** Sine

   it('ease.Sine should be an object', function ()
   {
      let expectedResult = 'object';
      assert.isObject(ease.Sine, "ease.Sine: expected " + expectedResult + " received = " + typeof ease.Sine);
   });

   it('ease.Sine.SineIn should be an object', function ()
   {
      let expectedResult = 'object';
      assert.isObject(ease.Sine.SineIn, "ease.Sine.SineIn: expected " + expectedResult + " received = " + typeof ease.Sine.SineIn);
   });

   it('ease.Sine.SineIn.getPosition(.123) should return correctly', function ()
   {
      let num = .123;
      let expectedResult = 0.018606666259886717;

      let result = ease.Sine.SineIn.getPosition( num );

      assert.closeTo(result, expectedResult, .0000005, "ease.Sine.SineIn.getPosition(" + num + "): expected " + expectedResult + " received = " + result);
   });

   it('ease.Sine.SineOut should be an object', function ()
   {
      let expectedResult = 'object';
      assert.isObject(ease.Sine.SineOut, "ease.Sine.SineOut: expected " + expectedResult + " received = " + typeof ease.Sine.SineOut);
   });

   it('ease.Sine.SineOut.getPosition(.123) should return correctly', function ()
   {
      let num = .123;
      let expectedResult = 0.19200813652;

      let result = ease.Sine.SineOut.getPosition( num );

      assert.closeTo(result, expectedResult, .0000005, "ease.Sine.SineOut.getPosition(" + num + "): expected " + expectedResult + " received = " + result);
   });

   it('ease.Sine.SineInOut should be an object', function ()
   {
      let expectedResult = 'object';
      assert.isObject(ease.Sine.SineInOut, "ease.Sine.SineInOut: expected " + expectedResult + " received = " + typeof ease.Sine.SineInOut);
   });

   it('ease.Sine.SineInOut.getPosition(.123) should return correctly', function ()
   {
      let num = .123;
      let expectedResult = 0.036867124;

      let result = ease.Sine.SineInOut.getPosition( num );

      assert.closeTo(result, expectedResult, .0000005, "ease.Sine.SineInOut.getPosition(" + num + "): expected " + expectedResult + " received = " + result);
   });

});
