//O package com.partkart{

import { Point } from '@pixi/math';

Point.prototype.normalize = function(scale){
  var norm = Math.sqrt(this.x * this.x + this.y * this.y);
  if (norm != 0) {
     this.x = scale * this.x / norm;
     this.y = scale * this.y / norm;
  }
}

//O public class Global
class GlobalClass
{
   constructor()
   {

      //O public static var zoom:Number = 80; // default resolution of 80 pixels per inch
      this.zoom = 80; // default resolution of 80 pixels per inch
      //O public static var tool:int = 0; // default tool is pointer
      this.tool = 0; // default tool is pointer

      //O public static var snap:Boolean = false;
      this.snap = false;

      //O public static var xorigin:Number = 0;
      this.xorigin = 0;
      //O public static var yorigin:Number = 600;
      this.yorigin = 600;

      //O public static var docwidth:int = 950;
      this.docwidth = 950;
      //O public static var docheight:int = 600;
      this.docheight = 600;

      //O public static var dragging:Boolean = false; // captures all dragging events, including dots, paths and main window dragging
      this.dragging = false; // captures all dragging events, including dots, paths and main window dragging

      //O public static var unit:String = "in"; // "in" = inches "cm" = centimeters. Stop using magic values!!
      this.unit = "in"; //O  "in" = inches "cm" = centimeters. Stop using magic values!!

      //O public static var space:Boolean = false; // true if space is currently down
      this.space = false; // true if space is currently down

      //O public static var importres:Number = 72;
      this.importres = 72;
      //O public static var localsnap:Boolean = true;
      this.localsnap = true;
   
      //O public static var tolerance:Number = 0.001; // global tolerance for cam operations
      this.tolerance = 0.001; // global tolerance for cam operations
      //O public static var precision:int = 4;
      this.precision = 4;
      //O public static var bitmaptolerance:Number = 0.007;
      this.bitmaptolerance = 0.007;
      //O public static var bitmapsize:Number = 4000;
      this.bitmapsize = 4000;
      //O public static var nestbitmapsize:Number = 1000;
      this.nestbitmapsize = 1000;

      //O public static var separatetoolpaths:Boolean = false;
      this.separatetoolpaths = false;

      //O public static var viewcuts:Boolean = false;
      this.viewcuts = false;

      // undo stack
      //O public static var undo:Array = new Array();
      this.undo = new Array();
      //O private static var undoindex:int = 0;
      this.undoindex = 0;

   }

   //O public static function undoPush(u:Undo):void
   undoPush(u)
   {
      undo = undo.slice(0,undoindex+1);
      undo.push(u);
      if(undo.length > 10){
         undo.shift();
      }
      undoindex = undo.length-1;
   }

   //O public static function undoAction():void
   undoAction()
   {
      if(undoindex >= 0 && undoindex < undo.length){
         undo[undoindex].undoAction();
         undoindex--;
      }
   }

   //O public static function redoAction():void
   redoAction()
   {
      if(undoindex >= -1 && undoindex < undo.length-1){
         undoindex++;
         undo[undoindex].redoAction();
      }
   }

   //O public static function withinTolerance(p1:Point, p2:Point, factor:Number = 1):Boolean
   withinTolerance(p1, p2, factor = 1)
   {
      //O var diff:Point = new Point(Math.pow(p1.x-p2.x,2),Math.pow(p1.y-p2.y,2));
      var diff = new Point(Math.pow(p1.x-p2.x,2),Math.pow(p1.y-p2.y,2));
      if(diff.x + diff.y < Math.pow(Global.tolerance*factor,2)){
         return true;
      }
      return false;
   }

   /*
   This gives very wonky results with metric, so simplify the 'precision' param 
   to indicate a 'decimal place precision', much simpler for GRBL owners
   See this SO question:
   http://stackoverflow.com/questions/632802/how-to-deal-with-number-precision-in-actionscript
   
   public static function toFixed(number:Number, factor:Number):Number{
      return (Math.round(number * factor)/factor);
   }*/
   //O public static function toFixed(number:Number, precision:int)
   toFixed(number, precision)
   {
      precision = Math.pow(10, precision);
      return Math.round(number * precision)/precision;
   }
   
   //---------------------------------------------------------------
   //
   // getAngle
   //    returns the angle between two vectors (in radians)
   //
   // Note: This is not the angle *OF* the two vectors.  The angle
   //       between two vectors is that angle of both relative to
   //       the point (0,0).
   //                       |     .(5,13)
   //                       |    .
   //                       |   .
   //                       |  . \ θ       . (6,3)
   //                       | .   \   .
   //                  (0,0)|.  .         
   //           -----------------------------------
   //                       |
   //                       |
   //
   // Note: The two vectors are minimized. This Scales the line
   //       segment between (0,0) and the current point.
   //
   // Note: To convert to degrees you would mutiply by:
   //        180 / (4 * arctangent (1))
   //
   // Example:
   //   Find the angle θ between u =〈6,3) and v =〈5,13〉
   //   Step 1: Find the Dot product u·v = u1v1+u2v2
   //           (6·5)+(3·13)
   //             30 +  39 = 69
   // 
   //   Step 2: Find the magnitudes of each vector
   //           ||u|| = √( u1·u1 + u2·u2 )
   //           ||u|| = √( 6·6 + 5·5 )
   //           ||u|| = √45 = 3√5
   //
   //           ||v|| = √( v1·v1 + v2·v2 )
   //           ||v|| = √( 5·5 + 13·13)
   //           ||v|| = √194
   //
   //   Step 3: Substitute and solve for θ.
   //           cos θ = u·v / ||u|| · ||v||
   //           cos θ = 69  /  3√5  ·  √194  = 23/√970
   //
   //           θ = cos−1 23/√970
   //           θ ≈ .73948892455246225752
   //
   //   Step 4: Convert from rads to degrees
   //           θ = .73948892455246225752 * 180 / (4 * arctangent (1))
   //           θ ≈ 42°
   //
   //     Using 'bc -l' this would c(23/sqrt(970)) * 180/(4*a(1))

   //O public static function getAngle(v1:Point, v2:Point):Number
   getAngle(v1, v2)
   {
      // Scales the line segment between (0,0) and the current point
      // to a set length.
      v1.normalize(1);
      v2.normalize(1);

      //O var crossproduct:Number = v1.x*v2.y - v1.y*v2.x;
      var crossproduct = v1.x*v2.y - v1.y*v2.x;
      //O var dotproduct:Number = v1.x*v2.x + v1.y*v2.y;
      var dotproduct = v1.x*v2.x + v1.y*v2.y;

      // Using both cross and dot product to calculate angle avoids
      // numerical error caused by acos/asin at roots
      //O var angle:Number = Math.atan2(crossproduct,dotproduct);
      var angle = Math.atan2(crossproduct,dotproduct);

      return angle;
   }

   //---------------------------------------------------------------
   // Checks for intersection of Segment if as_seg is true.
   // Checks for intersection of Line if as_seg is false.
   // Return intersection of Segment AB and Segment EF as a Point
   // Return null if there is no intersection
   //---------------------------------------------------------------
   //O public static function lineIntersect(A:Point,B:Point,E:Point,F:Point,as_seg:Boolean=false):Point 
   lineIntersect(A,B,E,F,as_seg=false)
   {
      //O var ip:Point;
      var ip;
      //O var a1:Number;
      var a1;
      //O var a2:Number;
      var a2;
      //O var b1:Number;
      var b1;
      //O var b2:Number;
      var b2;
      //O var c1:Number;
      var c1;
      //O var c2:Number;
      var c2;

      a1= B.y-A.y;
      b1= A.x-B.x;
      c1= B.x*A.y - A.x*B.y;
      a2= F.y-E.y;
      b2= E.x-F.x;
      c2= F.x*E.y - E.x*F.y;

      //O var denom:Number=a1*b2 - a2*b1;
      var denom = a1*b2 - a2*b1;
      if (denom == 0) {
         return null;
      }
      ip=new Point();
      ip.x=(b1*c2 - b2*c1)/denom;
      ip.y=(a2*c1 - a1*c2)/denom;

      //      Deal with rounding errors.

      if ( A.x == B.x )
            ip.x = A.x;
      else if ( E.x == F.x )
            ip.x = E.x;
      if ( A.y == B.y )
            ip.y = A.y;
      else if ( E.y == F.y )
            ip.y = E.y;


      // ---------------------------------------------------
      // Do checks to see if intersection to endpoints
      // distance is longer than actual Segments.
      // Return null if it is with any.
      // ---------------------------------------------------
      if(as_seg){
         if (Math.abs(A.x-B.x) > 0.000000000001 && (( A.x < B.x ) ? ip.x < A.x || ip.x > B.x : ip.x > A.x || ip.x < B.x ))
                   return null;
         if (Math.abs(A.y-B.y) > 0.000000000001 && (( A.y < B.y ) ? ip.y < A.y || ip.y > B.y : ip.y > A.y || ip.y < B.y ))
            return null;

         if (Math.abs(E.x-F.x) > 0.000000000001 && (( E.x < F.x ) ? ip.x < E.x || ip.x > F.x : ip.x > E.x || ip.x < F.x ))
            return null;
         if (Math.abs(E.y-F.y) > 0.000000000001 && (( E.y < F.y ) ? ip.y < E.y || ip.y > F.y : ip.y > E.y || ip.y < F.y ))
            return null;
      }

      if(isNaN(ip.x) || isNaN(ip.y)){
         return null;
      }

      return ip;
   }
}
export default  new GlobalClass();
