//O package com.partkart{

//New
import {Undo} from './Undo';

import * as PIXI from 'pixi.js';

//J Typescript does not like this, too bad.
//J Point.prototype.normalize = function(scale: number ): void
//J {
//J   //J var norm = Math.sqrt(this.x * this.x + this.y * this.y);
//J   let norm: number = Math.sqrt(this.x * this.x + this.y * this.y);
//J   if (norm != 0) {
//J      //J this.x = scale * this.x / norm;
//J      this.x = scale * this.x / norm;
//J      //J this.y = scale * this.y / norm;
//J      this.y = scale * this.y / norm;
//J   }
//J }

//O public class Global
export class Global
{

      //O public static var zoom:Number = 80; // default resolution of 80 pixels per inch
      static  zoom: number = 80; // default resolution of 80 pixels per inch
      //O public static var tool:int = 0; // default tool is pointer
      static tool: number = 0; // default tool is pointer

      //O public static var snap:Boolean = false;
      static snap: boolean = false;

      //O public static var xorigin:Number = 0;
      static xorigin: number = 0;
      //O public static var yorigin:Number = 600;
      static yorigin: number = 600;

      //O public static var docwidth:int = 950;
      static docwidth: number = 950;
      //O public static var docheight:int = 600;
      static docheight: number = 600;

      //O public static var dragging:Boolean = false; // captures all dragging events, including dots, paths and main window dragging
      static dragging: boolean = false; // captures all dragging events, including dots, paths and main window dragging

      //O public static var unit:String = "in"; // "in" = inches "cm" = centimeters. Stop using magic values!!
      static unit: string = "in"; //O  "in" = inches "cm" = centimeters. Stop using magic values!!

      //O public static var space:Boolean = false; // true if space is currently down
      static space: boolean = false; // true if space is currently down

      //O public static var importres:Number = 72;
      static importres: number = 72;
      //O public static var localsnap:Boolean = true;
      static localsnap: boolean = true;
   
      //O public static var tolerance:Number = 0.001; // global tolerance for cam operations
      static tolerance: number = 0.001; // global tolerance for cam operations
      //O public static var precision:int = 4;
      static precision: number = 4;
      //O public static var bitmaptolerance:Number = 0.007;
      static bitmaptolerance: number = 0.007;
      //O public static var bitmapsize:Number = 4000;
      static bitmapsize: number = 4000;
      //O public static var nestbitmapsize:Number = 1000;
      static nestbitmapsize: number = 1000;

      //O public static var separatetoolpaths:Boolean = false;
      static separatetoolpaths: boolean = false;

      //O public static var viewcuts:Boolean = false;
      static viewcuts: boolean = false;

      // undo stack
      //O public static var undo:Array = new Array();
      static undo = new Array();
      //O private static var undoindex:int = 0;
      static undoindex: number = 0;

   constructor()
   {
   }

   //N As this method does not exist on PIXI Point
   static normalize (point: PIXI.Point, scale: number ): PIXI.Point
   {
     let norm: number = Math.sqrt(point.x * point.x + point.y * point.y);
     if (norm != 0)
     {
        point.x = scale * point.x / norm;
        point.y = scale * point.y / norm;
     }
     return point;
   }

   //N As this method does not exist on PIXI Point
   static distance (pointA: PIXI.Point, pointB: PIXI.Point ): number
   {
      return Math.hypot(pointB.x - pointA.x, pointB.y - pointA.y)
   }
   //N As this method does not exist on PIXI Point
   static subtract (pointA: PIXI.Point, pointB: PIXI.Point ): PIXI.Point
   {
      return new PIXI.Point(pointA.x - pointB.x, pointA.y - pointB.y)
   }
   //N As this method does not exist on PIXI Point
   static add (pointA: PIXI.Point, pointB: PIXI.Point ): PIXI.Point
   {
      return new PIXI.Point(pointA.x + pointB.x, pointA.y + pointB.y)
   }
   static interpolate(pt1: PIXI.Point, pt2: PIXI.Point, f: number): PIXI.Point
   {
      let x: number = f * pt1.x + (1 - f) * pt2.x;
      let y: number = f * pt1.y + (1 - f) * pt2.y;

      return new PIXI.Point(x, y);
   }
   // Quadratic roots
   // Calculate where the parabola crosses th X-axis. ( X Intercepts )
   // Solve for my grade 12 math. Thank-you Mr. Mcleod
   // b2 −4ac < 0 There are no real roots.
   // b2 −4ac = 0 There is one real root.
   // b2 −4ac > 0 There are two real roots.
   static getQuadraticRoots( x: number, y: number, z: number ): Array < number >
   {
      let a = z
      let b = y / a
      let c = x / a
      let discriminant = b * b - 4 * c
      let roots: Array< number > = new Array( )

      if ( discriminant > 0 )
      {
         // Parabola crosses the X-Axis at two points
         let s = Math.sqrt( discriminant )
         roots.push ( .5 * ( -b + s) )
         roots.push ( .5 * ( -b - s) )
      }
      else if ( discriminant == 0 )
      {
         // Parabola just touches the X-Axis, thus only one real root
         roots.push( 0.5 * -b )
      }
      // return the result, which could be 1,2 or no X intercepts.
      return roots
   }

   //O public static function undoPush(u:Undo):void
   static undoPush(u: Undo): void
   {
      //O undo = undo.slice(0,undoindex+1);
      this.undo = this.undo.slice(0,this.undoindex+1);
      //O undo.push(u);
      this.undo.push(u);
      //O if (undo.length > 10)
      if (this.undo.length > 10)
      {
         //O undo.shift();
         this.undo.shift();
      }
      //O undoindex = undo.length-1;
      this.undoindex = this.undo.length-1;
   }

   //O public static function undoAction():void
   static undoAction(): void
   {
      //Oif (undoindex >= 0 && undoindex < undo.length)
      if (this.undoindex >= 0 && this.undoindex < this.undo.length)
      {
         //O undo[undoindex].undoAction();
         this.undo[this.undoindex].undoAction();
         //O undoindex--;
         this.undoindex--;
      }
   }

   //O public static function redoAction():void
   static redoction(): void
   {
      //O if (undoindex >= -1 && undoindex < undo.length-1)
      if (this.undoindex >= -1 && this.undoindex < this.undo.length-1)
      {
         //O undoindex++;
         this.undoindex++;
         //O undo[undoindex].redoAction();
         this.undo[this.undoindex].redoAction();
      }
   }

   //O public static function withinTolerance(p1:Point, p2:Point, factor:Number = 1):Boolean
   static withinTolerance(p1: PIXI.Point, p2: PIXI.Point, factor: number = 1)
   {
      //O var diff:Point = new Point(Math.pow(p1.x-p2.x,2),Math.pow(p1.y-p2.y,2));
      let diff = new PIXI.Point(Math.pow(p1.x-p2.x,2),Math.pow(p1.y-p2.y,2));
      //O if (diff.x + diff.y < Math.pow(Global.tolerance*factor,2))
      if (diff.x + diff.y < Math.pow(this.tolerance*factor,2))
      {
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
   static toFixed(numb: number, precision: number)
   {
      precision = Math.pow(10, precision);
      //O jreturn Math.round(number * precision)/precision;
      return Math.round(numb * precision)/precision;
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
   static getAngle(v1: PIXI.Point, v2: PIXI.Point): number
   {
      // Scales the line segment between (0,0) and the current point
      // to a set length.
      //O v1.normalize(1);
      v1 = this.normalize(v1, 1);
      //O v2.normalize(1);
      v2 = this.normalize(v2, 1);

      //O var crossproduct:Number = v1.x*v2.y - v1.y*v2.x;
      let crossproduct = v1.x*v2.y - v1.y*v2.x;
      //O var dotproduct:Number = v1.x*v2.x + v1.y*v2.y;
      let dotproduct = v1.x*v2.x + v1.y*v2.y;

      // Using both cross and dot product to calculate angle avoids
      // numerical error caused by acos/asin at roots
      //O var angle:Number = Math.atan2(crossproduct,dotproduct);
      let angle = Math.atan2(crossproduct,dotproduct);

      return angle;
   }

   //---------------------------------------------------------------
   // Checks for intersection of Segment if as_seg is true.
   // Checks for intersection of Line if as_seg is false.
   // Return intersection of Segment AB and Segment EF as a Point
   // Return null if there is no intersection
   //---------------------------------------------------------------
   //O public static function lineIntersect(A:Point,B:Point,E:Point,F:Point,as_seg:Boolean=false):Point 
   static lineIntersect(A: PIXI.Point, B: PIXI.Point, E: PIXI.Point, F: PIXI.Point, as_seg: boolean=false): PIXI.Point
   {
      //O var ip:Point;
      let ip: PIXI.Point;
      //O var a1:Number;
      let a1: number = 0;
      //O var a2:Number;
      let a2: number = 0;
      //O var b1:Number;
      let b1: number = 0;
      //O var b2:Number;
      let b2: number = 0;
      //O var c1:Number;
      let c1: number = 0;
      //O var c2:Number;
      let c2: number = 0;

      a1= B.y-A.y;
      b1= A.x-B.x;
      c1= B.x*A.y - A.x*B.y;
      a2= F.y-E.y;
      b2= E.x-F.x;
      c2= F.x*E.y - E.x*F.y;

      //O var denom:Number=a1*b2 - a2*b1;
      let denom: number = a1*b2 - a2*b1;
      if (denom == 0) {
         return undefined;
      }
      ip=new PIXI.Point();
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
      if (as_seg)
      {
         if (Math.abs(A.x-B.x) > 0.000000000001 && (( A.x < B.x ) ? ip.x < A.x || ip.x > B.x : ip.x > A.x || ip.x < B.x ))
                   return null;
         if (Math.abs(A.y-B.y) > 0.000000000001 && (( A.y < B.y ) ? ip.y < A.y || ip.y > B.y : ip.y > A.y || ip.y < B.y ))
            return null;

         if (Math.abs(E.x-F.x) > 0.000000000001 && (( E.x < F.x ) ? ip.x < E.x || ip.x > F.x : ip.x > E.x || ip.x < F.x ))
            return null;
         if (Math.abs(E.y-F.y) > 0.000000000001 && (( E.y < F.y ) ? ip.y < E.y || ip.y > F.y : ip.y > E.y || ip.y < F.y ))
            return null;
      }

      if (isNaN(ip.x) || isNaN(ip.y))
      {
         return null;
      }

      return ip;
   }
}
//export default  new GlobalClass();
