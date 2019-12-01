'use strict';

var assert = require('chai').assert;

import  DynamicChar  from '../../../app/ui/DynamicText/DynamicChar';

let dynamicChar = new DynamicChar;

describe('Testing DynamicChar.ts', function ()
{
   it('DynamicChar should not be null', function ()
   {
      assert.isNotNull(DynamicChar, 'DynamicChar resulted is null');
   });

   it('dynamicChar should not be null', function ()
   {
      assert.isNotNull(dynamicChar, 'dynamicChar resulted is null');
   });

   describe('Testing DynamicChar variables', function (){});

   it('dynamicChar.data should be a Number', function ()
   {
      assert.isNumber(dynamicChar.data, "dynamicChar.data is not a Number. result: " + typeof dynamicChar.data );
   });

   it('dynamicChar.data should init to be -1', function ()
   {
      assert.equal(dynamicChar.data, -1, "dynamicChar.data is not -1. result: " + dynamicChar.data );
   });

   it('dynamicChar.space should be a Boolean', function ()
   {
      assert.isBoolean(dynamicChar.space, "dynamicChar.space is not a Boolean. result: " + typeof dynamicChar.space );
   });

   it('dynamicChar.space should init to be a false', function ()
   {
      assert.isFalse(dynamicChar.space, "dynamicChar.space is not false. result: " + dynamicChar.space );
   });

   it('dynamicChar.newline should be a Boolean', function ()
   {
      assert.isBoolean(dynamicChar.newline, "dynamicChar.newline is not a Boolean. result: " + typeof dynamicChar.newline );
   });

   it('dynamicChar.newline should init to be false', function ()
   {
      assert.isFalse(dynamicChar.newline, "dynamicChar.newline is not false. result: " + dynamicChar.newline );
   });

   it('dynamicChar.emoji should be a Boolean', function ()
   {
      assert.isBoolean(dynamicChar.emoji, "dynamicChar.emoji is not a Boolean. result: " + typeof dynamicChar.emoji );
   });

   it('dynamicChar.emoji should init to be false', function ()
   {
      assert.isFalse(dynamicChar.emoji, "dynamicChar.emoji is not false. result: " + dynamicChar.emoji );
   });

   it('dynamicChar.charcode should be a Number', function ()
   {
      assert.isNumber(dynamicChar.charcode, "dynamicChar.charcode is not a Number. result: " + typeof dynamicChar.charcode );
   });

   it('dynamicChar.charcode should init to be 0', function ()
   {
      assert.equal(dynamicChar.charcode, 0, "dynamicChar.charcode is not 0. result: " + dynamicChar.charcode );
   });


   it('dynamicChar.value should be a string', function ()
   {
      assert.isString(dynamicChar.value, "dynamicChar.value is not a string. result: " + typeof dynamicChar.value );
   });

   it('dynamicChar.value should init to be ""', function ()
   {
      assert.equal(dynamicChar.value, "",  "dynamicChar.value is not init to \"\". result: '" + dynamicChar.value + "'" );
   });

   it('dynamicChar.wordIndex should be a number', function ()
   {
      assert.isNumber(dynamicChar.wordIndex, "dynamicChar.wordIndex is not a number. result: " + typeof dynamicChar.wordIndex );
   });

   it('dynamicChar.wordIndex should init to be -1', function ()
   {
      assert.equal(dynamicChar.wordIndex, -1, "dynamicChar.wordIndex is not init to -1. result: " + dynamicChar.wordIndex );
   });

   it('dynamicChar.lineIndex should be a number', function ()
   {
      assert.isNumber(dynamicChar.lineIndex, "dynamicChar.lineIndex is not a number. result: " + typeof dynamicChar.lineIndex );
   });

   it('dynamicChar.lineIndex should init to be -1', function ()
   {
      assert.equal(dynamicChar.lineIndex, -1, "dynamicChar.lineIndex is not init to -1. result: " + dynamicChar.lineIndex );
   });

});

