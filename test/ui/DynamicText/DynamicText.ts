'use strict';

var assert = require('chai').assert;

import  { DynamicAtlas } from '../../../app/ui/DynamicText/DynamicText';
import  { DynamicText } from '../../../app/ui/DynamicText/DynamicText';

//
//
//
// DYNAMIC ATLAS tests
//
//
//


let dynamicAtlas = new DynamicAtlas( 1 );

describe('Testing DynamicAtlas in DynamicText.ts', function ()
{
   it('DynamicAtlas should not be null', function ()
   {
      assert.isNotNull(DynamicAtlas, 'DynamicAtlas resulted is null');
   });

   it('dynamicAtlas should not be null', function ()
   {
      assert.isNotNull(dynamicAtlas, 'dynamicAtlas resulted is null');
   });

   describe('Testing DynamicAtlas variables', function (){});

});






//
//
//
// DYNAMIC TEXT tests
//
//
//


let width = 10;
let height = 20;

let dynamicText = new DynamicText("Some Text", { 'height': height, 'width': width} ) ;

describe('Testing DynamicText.ts', function ()
{
   it('DynamicText should not be null', function ()
   {
      assert.isNotNull(DynamicText, 'DynamicText resulted is null');
   });

   it('dynamicText should not be null', function ()
   {
      assert.isNotNull(dynamicText, 'dynamicText resulted is null');
   });

   describe('Testing DynamicText variables', function (){});

   it('dynamicText.lastWidth should be a Number', function ()
   {
      assert.isNumber(dynamicText.lastWidth, "dynamicText.lastWidth is not a Number. result: " + typeof dynamicText.lastWidth );
   });

   it('dynamicText.lastWidth should init to be 0', function ()
   {
      let expectedResult = 0;

      assert.equal(dynamicText.lastWidth, expectedResult, "dynamicText.lastWidth is not:" + expectedResult + " result:" + dynamicText.lastWidth );
   });

   it('dynamicText.lastHeight should init to be 0', function ()
   {
      let expectedResult = 0;

      assert.equal(dynamicText.lastHeight, expectedResult, "dynamicText.lastHeight is not:" + expectedResult + " result:" + dynamicText.lastHeight );
   });

   it('dynamicText.width should be a Number', function ()
   {
      assert.isNumber(dynamicText.width, "dynamicText.width is not a Number. result: " + typeof dynamicText.width );
   });

   it('dynamicText.width should init to be ' + width, function ()
   {
      let expectedResult = width;

      assert.equal(dynamicText.width, expectedResult, "dynamicText.width is not:" + expectedResult + " result:" + dynamicText.width );
   });

   it('dynamicText.height should be a Number', function ()
   {
      assert.isNumber(dynamicText.height, "dynamicText.height is not a Number. result: " + typeof dynamicText.height );
   });

   it('dynamicText.height should init to be ' + height, function ()
   {
      let expectedResult = height;

      assert.equal(dynamicText.height, expectedResult, "dynamicText.height is not:" + expectedResult + " result:" + dynamicText.height );
   });

   it('DynamicText.settings should be a class Object', function ()
   {
      assert.isObject(DynamicText.settings, "DynamicText.settings is not a class Object. result: " + typeof DynamicText.settings );
   });

   it('DynamicText.settings should be a class Object', function ()
   {
      assert.isObject(DynamicText.settings, "DynamicText.settings is not a class Object. result: " + typeof DynamicText.settings );
   });



});

