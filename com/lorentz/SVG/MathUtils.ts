
//
//  Copyright ( c ) 2550/2007, autotelicum/Hoigaard,
//  http://musprite.sourceforge.net.
//  All rights reserved.
//
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//   * Redistributions of source code must retain the above copyright notice, this
//     list of conditions and the following disclaimer.
//   * Redistributions in binary form must reproduce the above copyright notice,
//     this list of conditions and the following disclaimer in the documentation
//     and/or other materials provided with the distribution.
//   * Neither the name autotelicum nor the names of its
//     contributors may be used to endorse or promote products derived from this
//     software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
//  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
//  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
//  DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE
//  FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
//  DAMAGES ( INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
//  SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION ) HOWEVER
//  CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
//  OR TORT ( INCLUDING NEGLIGENCE OR OTHERWISE ) ARISING IN ANY WAY OUT OF THE USE
//  OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//

//package com.lorentz.SVG
//{
// import flash.geom.Point

import * as PIXI from 'pixi.js'
export interface IQUADPOINTS { a: PIXI.Point, b: PIXI.Point, c: PIXI.Point, d: PIXI.Point }
export interface ICUBBEZ { b0: IQUADPOINTS, b1: IQUADPOINTS }

//
//  Class: MathUtils
//
//  Math utility methods used in SVG import.
//
//                   ( see muSpriteLogo.png )
//
export class MathUtils
{
   //
   //  Tim Groleau's Math method ratioTo.
   //
   //  Return the point on segment [p1,p2] which is ratio times the total
   //  distance between p1 and p2 away from p1.
   //
   //  Parameters:
   //      p1 - first Point
   //      p2 - second Point
   //      ratio - a real number
   //
   public static ratioTo( p1: PIXI.Point, p2: PIXI.Point, ratio: number ): PIXI.Point
   {
      return new PIXI.Point( ( p1.x + ( ( p2.x - p1.x ) * ratio ) ), ( p1.y + ( ( p2.y - p1.y ) * ratio ) ) )
   }

   //
   //  Robert Penner's Math intersect2Lines.
   //
   //  Returns the point of intersection between two lines.
   //
   //  Parameters:
   //      p1, p2 - two points on first line
   //      p3, p4 - two points on second line
   //
   //  Returns:
   //      Point of intersection
   //
   public static intersect2Lines( p1: PIXI.Point, p2: PIXI.Point, p3: PIXI.Point, p4: PIXI.Point ): PIXI.Point
   {
      let x1: number = p1.x; let y1: number = p1.y
      let x4: number = p4.x; let y4: number = p4.y

      let dx1: number = p2.x - x1
      let dx2: number = p3.x - x4

      if ( !dx1 && !dx2 )
         return null; // new Point( NaN, NaN )

      let m1: number = ( p2.y - y1 ) / dx1
      let m2: number = ( p3.y - y4 ) / dx2

      if ( !dx1 )
      {
         // infinity
         return new PIXI.Point( x1, m2 * ( x1 - x4 ) + y4 )
      }
      else if ( !dx2 )
      {
         // infinity
         return new PIXI.Point( x4, m1 * ( x4 - x1 ) + y1 )
      }
      let xInt: number = ( -m2 * x4 + y4 + m1 * x1 - y1 ) / ( m1 - m2 )
      let yInt: number = m1 * ( xInt - x1 ) + y1

      return new PIXI.Point( xInt, yInt )
   }

   //
   //  Robert Penner's Math method midLine.
   //
   //  Returns the midpoint of a line segment.
   //
   //  Parameters:
   //      a, b - endpoints of line segment ( each with .x and .y properties )
   //
   public static midLine( a: PIXI.Point, b: PIXI.Point ): PIXI.Point// Math.midLine = function ( a, b )
   {
      return new PIXI.Point( ( a.x + b.x  ) / 2, ( a.y + b.y  ) / 2  )
   }

   //
   //  Robert Penner's Math method bezierSplit.
   //
   //  Divides a cubic bezier curve into two halves ( each also cubic beziers ).
   //
   //  Parameters:
   //      p0 - first anchor ( Point object )
   //      p1 - first control ( Point object )
   //      p2 - second control ( Point object )
   //      p3 - second anchor ( Point object )
   //
   //  Returns:
   //      An object with
   //          b0 - 1st cubic bezier ( with properties a,b,c,d corresp to p0,p1,p2,p3 )
   //          b1 - 2nd cubic bezier ( same )
   //
   // Math.bezierSplit = function ( p0, p1, p2, p3 )
   public static bezierSplit( p0: PIXI.Point, p1: PIXI.Point, p2: PIXI.Point, p3: PIXI.Point ): ICUBBEZ
   {
      let m:Function = MathUtils.midLine
      let p01: PIXI.Point = m( p0, p1 )
      let p12: PIXI.Point = m( p1, p2 )
      let p23: PIXI.Point = m( p2, p3 )
      let p02: PIXI.Point = m( p01, p12 )
      let p13: PIXI.Point = m( p12, p23 )
      let p03: PIXI.Point = m( p02, p13 )
      let result: ICUBBEZ = { b0: { a:p0,  b:p01, c:p02, d:p03 },
                              b1: { a:p03, b:p13, c:p23, d:p3  }
                            }
      return result
   }
}
