'use strict';

var assert = require('chai').assert;

import { DynamicTextStyle } from '../../../app/ui/DynamicText/DynamicTextStyle';

let dynamicTextStyle = new DynamicTextStyle;

describe('Testing DynamicTextStyle.ts', function ()
{
   it('DynamicTextStyle should not be null', function ()
   {
      assert.isNotNull(DynamicTextStyle, 'DynamicTextStyle resulted is null');
   });

   it('dynamicTextStyle should not be null', function ()
   {
      assert.isNotNull(dynamicTextStyle, 'dynamicTextStyle resulted is null');
   });

   describe('Testing DynamicTextStyle variables', function (){});

   it('dynamicTextStyle.scale should be a Number', function ()
   {
      assert.isNumber(dynamicTextStyle.scale, "dynamicTextStyle.scale is not a Number. result: " + typeof dynamicTextStyle.scale );
   });

   it('dynamicTextStyle.scale should init to be: 1', function ()
   {
      assert.equal(dynamicTextStyle.scale, 1, "dynamicTextStyle.scale is not -1. result: " + dynamicTextStyle.scale );
   });

   it('dynamicTextStyle.align should be a String', function ()
   {
      assert.isString(dynamicTextStyle.align, "dynamicTextStyle.align is not a String. result: " + typeof dynamicTextStyle.align );
   });

   it('dynamicTextStyle.align should init to be: "left"', function ()
   {
      assert.equal(dynamicTextStyle.align, 'left', "dynamicTextStyle.align is not 'left'. result: " + dynamicTextStyle.align );
   });

   it('dynamicTextStyle.fontFamily should be a String', function ()
   {
      assert.isString(dynamicTextStyle.fontFamily, "dynamicTextStyle.fontFamily is not a String. result: " + typeof dynamicTextStyle.fontFamily );
   });

   it('dynamicTextStyle.fontFamily should init to be: "Arial"', function ()
   {
      assert.equal(dynamicTextStyle.fontFamily, 'Arial', "dynamicTextStyle.fontFamily is not 'Arial' false. result: " + dynamicTextStyle.fontFamily );
   });

   it('dynamicTextStyle.fontSize should be a Number', function ()
   {
      assert.isNumber(dynamicTextStyle.fontSize, "dynamicTextStyle.fontSize is not a Number. result: " + typeof dynamicTextStyle.fontSize );
   });

   it('dynamicTextStyle.fontSize should init to be: 26', function ()
   {
      assert.equal(dynamicTextStyle.fontSize, 26, "dynamicTextStyle.fontSize is not 26. result: " + dynamicTextStyle.fontSize );
   });

   it('dynamicTextStyle.fontWeight should be a String', function ()
   {
      assert.isString(dynamicTextStyle.fontWeight, "dynamicTextStyle.fontWeight is not a String. result: " + typeof dynamicTextStyle.fontWeight );
   });

   it('dynamicTextStyle.fontWeight should init to be: "normal"', function ()
   {
      assert.equal(dynamicTextStyle.fontWeight, 'normal', "dynamicTextStyle.fontWeight is not 0. result: " + dynamicTextStyle.fontWeight );
   });


   it('dynamicTextStyle.fontStyle should be a string', function ()
   {
      assert.isString(dynamicTextStyle.fontStyle, "dynamicTextStyle.fontStyle is not a string. result: " + typeof dynamicTextStyle.fontStyle );
   });

   it('dynamicTextStyle.fontStyle should init to be: "normal"', function ()
   {
      assert.equal(dynamicTextStyle.fontStyle, "normal",  "dynamicTextStyle.fontStyle is not init to \"normal\". result: '" + dynamicTextStyle.fontStyle + "'" );
   });

   it('dynamicTextStyle.letterSpacing should be a Number', function ()
   {
      assert.isNumber(dynamicTextStyle.letterSpacing, "dynamicTextStyle.letterSpacing is not a Number. result: " + typeof dynamicTextStyle.letterSpacing );
   });

   it('dynamicTextStyle.letterSpacing should init to be: 0', function ()
   {
      assert.equal(dynamicTextStyle.letterSpacing, 0, "dynamicTextStyle.letterSpacing is not init to 0. result: " + dynamicTextStyle.letterSpacing );
   });

   it('dynamicTextStyle.lineHeight should be a Number', function ()
   {
      assert.isNumber(dynamicTextStyle.lineHeight, "dynamicTextStyle.lineHeight is not a Number. result: " + typeof dynamicTextStyle.lineHeight );
   });

   it('dynamicTextStyle.lineHeight should init to be: 0', function ()
   {
      assert.equal(dynamicTextStyle.lineHeight, 0, "dynamicTextStyle.lineHeight is not init to 0. result: " + dynamicTextStyle.lineHeight );
   });

   it('dynamicTextStyle.verticalAlign should be a Number', function ()
   {
      assert.isNumber(dynamicTextStyle.verticalAlign, "dynamicTextStyle.verticalAlign is not a Number. result: " + typeof dynamicTextStyle.verticalAlign );
   });

   it('dynamicTextStyle.verticalAlign should init to be: 0', function ()
   {
      assert.equal(dynamicTextStyle.lineHeight, 0, "dynamicTextStyle.verticalAlign is not init to 0. result: " + dynamicTextStyle.verticalAlign );
   });

   it('dynamicTextStyle.rotation should be a Number', function ()
   {
      assert.isNumber(dynamicTextStyle.rotation, "dynamicTextStyle.rotation is not a Number. result: " + typeof dynamicTextStyle.rotation );
   });

   it('dynamicTextStyle.rotation should init to be: 0', function ()
   {
      assert.equal(dynamicTextStyle.rotation, 0, "dynamicTextStyle.rotation is not init to 0. result: " + dynamicTextStyle.rotation );
   });

   it('dynamicTextStyle.skew should be a Number', function ()
   {
      assert.isNumber(dynamicTextStyle.skew, "dynamicTextStyle.skew is not a Number. result: " + typeof dynamicTextStyle.skew );
   });

   it('dynamicTextStyle.skew should init to be: 0', function ()
   {
      assert.equal(dynamicTextStyle.skew, 0, "dynamicTextStyle.skew is not init to 0. result: " + dynamicTextStyle.skew );
   });

   it('dynamicTextStyle.tint should be a String', function ()
   {
      assert.isString(dynamicTextStyle.tint, "dynamicTextStyle.tint is not a Number. result: " + typeof dynamicTextStyle.tint );
   });

   it('dynamicTextStyle.tint should init to be: "#FFFFFF"', function ()
   {
      assert.equal(dynamicTextStyle.tint, '#FFFFFF', "dynamicTextStyle.tint is not init to '#FFFFFF'. result: " + dynamicTextStyle.tint );
   });

   it('dynamicTextStyle.fill should be a String', function ()
   {
      assert.isString(dynamicTextStyle.fill, "dynamicTextStyle.fill is not a String. result: " + typeof dynamicTextStyle.fill );
   });

   it('dynamicTextStyle.shadow should init to be: ""', function ()
   {
      assert.equal(dynamicTextStyle.shadow, '', "dynamicTextStyle.shadow is not init to ''. result: " + dynamicTextStyle.shadow );
   });

   it('dynamicTextStyle.stroke should be a Number', function ()
   {
      assert.isNumber(dynamicTextStyle.stroke, "dynamicTextStyle.stroke is not a Number. result: " + typeof dynamicTextStyle.stroke );
   });

   it('dynamicTextStyle.stroke should init to be: 0', function ()
   {
      assert.equal(dynamicTextStyle.stroke, 0, "dynamicTextStyle.lineHeight is not init to 0. result: " + dynamicTextStyle.stroke );
   });

   it('dynamicTextStyle.strokeFill should be a String', function ()
   {
      assert.isString(dynamicTextStyle.strokeFill, "dynamicTextStyle.strokeFill is not a String. result: " + typeof dynamicTextStyle.strokeFill );
   });

   it('dynamicTextStyle.strokeFill should init to be: ""', function ()
   {
      assert.equal(dynamicTextStyle.strokeFill, '', "dynamicTextStyle.strokeFill is not init to ''. result: " + dynamicTextStyle.strokeFill );
   });

   it('dynamicTextStyle.strokeShadow should be a String', function ()
   {
      assert.isString(dynamicTextStyle.strokeShadow, "dynamicTextStyle.strokeShadow is not a String. result: " + typeof dynamicTextStyle.strokeShadow );
   });

   it('dynamicTextStyle.strokeShadow should init to be: ""', function ()
   {
      assert.equal(dynamicTextStyle.strokeShadow, '', "dynamicTextStyle.strokeShadow is not init to ''. result: " + dynamicTextStyle.strokeShadow );
   });

   it('dynamicTextStyle.wrap should be a Boolean', function ()
   {
      assert.isBoolean(dynamicTextStyle.wrap, "dynamicTextStyle.wrap is not a Boolean. result: " + typeof dynamicTextStyle.wrap );
   });

   it('dynamicTextStyle.wrap should init to be: true', function ()
   {
      assert.isTrue(dynamicTextStyle.wrap, "dynamicTextStyle.wrap is not init to true. result: " + dynamicTextStyle.wrap );
   });

   it('dynamicTextStyle.breakWords should be a Boolean', function ()
   {
      assert.isBoolean(dynamicTextStyle.breakWords, "dynamicTextStyle.breakWords is not as Boolean. result: " + typeof dynamicTextStyle.breakWords );
   });

   it('dynamicTextStyle.breakWords should init to be: false', function ()
   {
      assert.isFalse(dynamicTextStyle.breakWords, "dynamicTextStyle.breakWords is not init to false. result: " + dynamicTextStyle.breakWords );
   });

   it('dynamicTextStyle.overflowX should be a String', function ()
   {
      assert.isString(dynamicTextStyle.overflowX, "dynamicTextStyle.overflowX is not a String. result: " + typeof dynamicTextStyle.overflowX );
   });

   it('dynamicTextStyle.overflowX should init to be: "visible"', function ()
   {
      assert.equal(dynamicTextStyle.overflowX, 'visible', "dynamicTextStyle.overflowX is not init to 'visible'. result: " + dynamicTextStyle.overflowX );
   });

   it('dynamicTextStyle.overflowy should be a String', function ()
   {
      assert.isString(dynamicTextStyle.overflowY, "dynamicTextStyle.overflowy is not a String. result: " + typeof dynamicTextStyle.overflowY );
   });

   it('dynamicTextStyle.overflowy should init to be: "visible"', function ()
   {
      assert.equal(dynamicTextStyle.overflowY, 'visible', "dynamicTextStyle.overflowY is not init to 'visible'. result: " + dynamicTextStyle.overflowY );
   });

   it('dynamicTextStyle.ellipsis should be a Boolean', function ()
   {
      assert.isBoolean(dynamicTextStyle.ellipsis, "dynamicTextStyle.ellipsis is not a String. result: " + typeof dynamicTextStyle.ellipsis );
   });

   it('dynamicTextStyle.ellipsis should init to be: false', function ()
   {
      assert.isFalse(dynamicTextStyle.ellipsis, "dynamicTextStyle.ellipsis is not init to false. result: " + dynamicTextStyle.ellipsis );
   });

});

