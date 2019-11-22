//'use strict';

var assert = require('chai').assert;

//Jimport Global  from '../../app/partKart/Global.js';
import { Global }  from '../../app/partKart/Global.js';
import { Point } from '@pixi/math';

describe('Testing Global.js', function ()
{
   it('Global should not be null', function ()
   {
      assert.isNotNull(Global, 'Global resulted is null');
   });

   describe('Testing Global variables', function (){});

   it('Global.zoom should be 80', function ()
   {
      let expectedResult = 80;
      assert.equal(Global.zoom, expectedResult, "Global.zoom: expected " + expectedResult + " received = " + Global.zoom);
   });

   it('Global.tool should be: 0', function ()
   {
      let expectedResult = 0;
      assert.equal(Global.tool, expectedResult, "Global.tool: expected " + expectedResult + " received = " + Global.tool);
   });

   it('Global.snap should be: false', function ()
   {
      let expectedResult = false;
      assert.equal(Global.tool, expectedResult, "Global.snap: expected " + expectedResult + " received = " + Global.snap);
   });

   it('Global.xorigin should be: 0', function ()
   {
      let expectedResult = 0;
      assert.equal(Global.xorigin, expectedResult, "Global.xorigin: expected " + expectedResult + " received = " + Global.xorigin);
   });

   it('Global.yorigin should be: 600', function ()
   {
      let expectedResult = 600;
      assert.equal(Global.yorigin, expectedResult, "Global.yorigin: expected " + expectedResult + " received = " + Global.yorigin);
   });

   it('Global.docwidth should be: 950', function ()
   {
      let expectedResult = 950;
      assert.equal(Global.docwidth, expectedResult, "Global.docwidth: expected " + expectedResult + " received = " + Global.docwidth);
   });

   it('Global.docheight should be: 600', function ()
   {
      let expectedResult = 600;
      assert.equal(Global.docheight, expectedResult, "Global.docheight: expected " + expectedResult + " received = " + Global.docheight);
   });

   it('Global.dragging should be: false', function ()
   {
      let expectedResult = false;
      assert.equal(Global.dragging, expectedResult, "Global.dragging: expected " + expectedResult + " received = " + Global.dragging);
   });

   it('Global.unit should be: in', function ()
   {
      let expectedResult = 'in';
      assert.equal(Global.unit, expectedResult, "Global.unit: expected " + expectedResult + " received = " + Global.unit);
   });

   it('Global.space should be: false', function ()
   {
      let expectedResult = false;
      assert.equal(Global.space, expectedResult, "Global.space: expected " + expectedResult + " received = " + Global.space);
   });

   it('Global.importres should be: 72', function ()
   {
      let expectedResult = 72;
      assert.equal(Global.importres, expectedResult, "Global.importres: expected " + expectedResult + " received = " + Global.importres);
   });

   it('Global.localsnap should be: true', function ()
   {
      let expectedResult = true;
      assert.equal(Global.localsnap, expectedResult, "Global.localsnap: expected " + expectedResult + " received = " + Global.localsnap);
   });

   it('Global.tolerance should be: .001', function ()
   {
      let expectedResult = .001;
      assert.equal(Global.tolerance, expectedResult, "Global.tolerance: expected " + expectedResult + " received = " + Global.tolerance);
   });

   it('Global.precision should be: 4', function ()
   {
      let expectedResult = 4;
      assert.equal(Global.precision, expectedResult, "Global.precision: expected " + expectedResult + " received = " + Global.precision);
   });

   it('Global.bitmaptolerance should be: .007', function ()
   {
      let expectedResult = .007;
      assert.equal(Global.bitmaptolerance, expectedResult, "Global.bitmaptolerance: expected " + expectedResult + " received = " + Global.bitmaptolerance);
   });

   it('Global.bitmapsize should be: 4000', function ()
   {
      let expectedResult = 4000;
      assert.equal(Global.bitmapsize, expectedResult, "Global.bitmapsize: expected " + expectedResult + " received = " + Global.bitmapsize);
   });

   it('Global.nestbitmapsize should be: 1000', function ()
   {
      let expectedResult = 1000;
      assert.equal(Global.nestbitmapsize, expectedResult, "Global.nestbitmapsize: expected " + expectedResult + " received = " + Global.nestbitmapsize);
   });

   it('Global.separatetoolpaths should be: false', function ()
   {
      let expectedResult = false;
      assert.equal(Global.separatetoolpaths, expectedResult, "Global.separatetoolpaths: expected " + expectedResult + " received = " + Global.separatetoolpaths);
   });

   it('Global.viewcuts should be: false', function ()
   {
      let expectedResult = false;
      assert.equal(Global.viewcuts, expectedResult, "Global.viewcuts: expected " + expectedResult + " received = " + Global.viewcuts);
   });

   it('Global.undo should be an Array', function ()
   {
      assert.isArray(Global.undo, 'Global.undo is not an array');
   });

   it('Global.undo.length should be: 0', function ()
   {
      let expectedResult = 0;
      assert.equal(Global.undo.length, expectedResult, "Global.undo.length: expected " + expectedResult + " received = " + Global.undo.length);
   });

   it('Global.undoPush should be a function', function ()
   {
      let expectedResult = 'function';
      assert.isFunction(Global.undoPush, "Global.undoPush: expected " + expectedResult + " received = " + typeof Global.undoPush);
   });

   it('Global.undoAction should be a function', function ()
   {
      let expectedResult = 'function';
      assert.isFunction(Global.undoAction, "Global.undoAction: expected " + expectedResult + " received = " + typeof Global.undoAction);
   });

   it('Global.withinTolerance should be a function', function ()
   {
      let expectedResult = 'function';
      assert.isFunction(Global.withinTolerance, "Global.withinTolerance: expected " + expectedResult + " received = " + typeof Global.withinTolerance);
   });

   it('Global.toFixed should be a function', function ()
   {
      let expectedResult = 'function';
      assert.isFunction(Global.toFixed, "Global.toFixed: expected " + expectedResult + " received = " + typeof Global.toFixed);
   });

   it('Global.getAngle should be a function', function ()
   {
      let expectedResult = 'function';
      assert.isFunction(Global.getAngle, "Global.getAngle: expected " + expectedResult + " received = " + typeof Global.getAngle);
   });

   it('new Point(3,4) should create a point at (3,4)', function ()
   {
      let P1 = new Point(3,4);
      assert.equal(P1.x, 3, "Point.x: expected " + 3 + " received = P1.x:" + P1.x + " P1.y:" + P1.y);
      assert.equal(P1.y, 4, "Point.y: expected " + 4 + " received = " + P1.y);
   });

   it('Global.getAngle(P0(6,3), P1=(5,13) should return 42° (0.74 rads)', function ()
   {
      let P0 = new Point(6,3);
      let P1 = new Point(5,13);
      let expectedResult = .74;
      let result = Global.getAngle(P0,P1);
      assert.closeTo(result, expectedResult, .05, "Global.getAngle: expected " + expectedResult + " received = " + result);
   });


//   it('Global.lineIntersect should be a function', function ()
//   {
//      let expectedResult = 'function';
//      assert.isFunction(Global.lineIntersect, "Global.lineIntersect: expected " + expectedResult + " received = " + typeof Global.lineIntersect);
//   });




});

