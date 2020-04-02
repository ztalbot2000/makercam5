
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

//O package com.lorentz.SVG
//O {
//O    import flash.geom.Point
//O    import com.lorentz.SVG.MathUtils

import * as PIXI from 'pixi.js'
import { MathUtils } from './MathUtils'
import { IQUADPOINTS } from './MathUtils'
import { ICUBBEZ } from './MathUtils'
import { Global } from '../../partkart/Global'

export interface IQPT { p: PIXI.Point, c: PIXI.Point }
   //
   //  Class: Bezier
   //
   //  Bezier approximation methods used in SVG import.
   //
   //                   ( see muSpriteLogo.png )
   //
export class Bezier
{
   //
   //  Approximation deviation tolerance.
   //
   //  Set tolerance to zero to use Timothee Groleau's midpoint method.
   //  Or larger than zero to use Robert Penner's recursive approximation method.
   //  In Robert Penner's version of getQuadBezier, the last argument is
   //  tolerance ( 1 = very accurate, 25 ( eg ) = faster, not so accurate )
   //
   public static tolerance: number = 0

   public static savedBeziers:Object = new Object( )

   public p1: PIXI.Point = null
   public p2: PIXI.Point = null
   public c1: PIXI.Point = null
   public c2: PIXI.Point = null
   public QPts:Array< IQPT > = null

   //
   //  Bezier object Constructor
   //
   //  Defines a cubic bezier curve with anchor points p1 and p2,
   //  and control points c1 and c2.  Also calls getQuadBezier to create an
   //  array of quadratic bezier points, QPts, which approximate the cubic
   //
   //  Parameters:
   //      p1 - first anchor
   //      p2 - second anchor
   //      c1 - first control
   //      c2 - second control
   //
   public constructor( p1Anchor: PIXI.Point, c1Control: PIXI.Point, c2Control: PIXI.Point, p2Anchor: PIXI.Point )
   {
      this.p1 = p1Anchor
      this.p2 = p2Anchor
      this.c1 = c1Control
      this.c2 = c2Control
      this.QPts = new Array( )
      this.getQuadBezier( this.p1, this.c1, this.c2, this.p2 )
   }

   //
   //  Calls either <GetQuadBez_TG> or <GetQuadBez_RP> depending on <tolerance>.
   //
   //  Parameters:
   //      p1Anchor - first anchor
   //      p2Anchor - second anchor
   //      c1Control - first control
   //      c2Control - second control
   //
   private getQuadBezier( p1Anchor: PIXI.Point, c1Control: PIXI.Point, c2Control: PIXI.Point, p2Anchor: PIXI.Point ): void
   {
      if ( Bezier.tolerance == 0 )
      {
         // Timothee Groleau's midpoint method:
         this.GetQuadBez_TG( p1Anchor, c1Control, c2Control, p2Anchor )
      }
      else
      {
         // Robert Penner's recursive approximation method:
         this.GetQuadBez_RP( p1Anchor, c1Control, c2Control, p2Anchor )
      }
   }

   //
   //  Midpoint approximation of a cubic bezier with four quad segments.
   //  Set tolerance to zero to use it.  Adds 4 elements to QPts array.
   //
   //  Parameters:
   //      P0 - first anchor
   //      P1 - first control
   //      P2 - second control
   //      P3 - second anchor
   //
   private GetQuadBez_TG( P0: PIXI.Point, P1: PIXI.Point, P2: PIXI.Point, P3: PIXI.Point ):void
   {
      // calculates the useful base points
      let PA: PIXI.Point = MathUtils.ratioTo( P0, P1, 3/4 )
      let PB: PIXI.Point = MathUtils.ratioTo( P3, P2, 3/4 )

      // get 1/16 of the [P3, P0] segment
      let dx: number = ( P3.x - P0.x ) / 16
      let dy: number = ( P3.y - P0.y ) / 16

      // calculates control point 1
      let Pc_1: PIXI.Point = MathUtils.ratioTo( P0, P1, 3/8 )

      // calculates control point 2
      let Pc_2: PIXI.Point = MathUtils.ratioTo( PA, PB, 3/8 )
      Pc_2.x -= dx
      Pc_2.y -= dy

      // calculates control point 3
      let Pc_3: PIXI.Point = MathUtils.ratioTo( PB, PA, 3/8 )
      Pc_3.x += dx
      Pc_3.y += dy

      // calculates control point 4
      let Pc_4: PIXI.Point = MathUtils.ratioTo( P3, P2, 3/8 )

      // calculates the 3 anchor points
      let Pa_1: PIXI.Point = MathUtils.midLine( Pc_1, Pc_2 )
      let Pa_2: PIXI.Point = MathUtils.midLine( PA, PB )
      let Pa_3: PIXI.Point = MathUtils.midLine( Pc_3, Pc_4 )

      // save the four quadratic subsegments
      this.QPts = [ { p:Pa_1, c:Pc_1 },
                    { p:Pa_2, c:Pc_2 },
                    { p:Pa_3, c:Pc_3 },
                    { p:P3,   c:Pc_4 }
                  ]
   }

   //
   //  Recursive midpoint approximation of a cubic bezier with as many
   //  quadratic bezier segments ( n ) as required to achieve specified tolerance.
   //  Set tolerance larger than zero to use. Adds n elements to QPts array.
   //
   //  Parameters:
   //      a - first anchor point
   //      b - first control point
   //      c - second control point
   //      d - second anchor point
   //      k - tolerance ( low number = most accurate result )
   //
   private GetQuadBez_RP( a: PIXI.Point, b: PIXI.Point, c: PIXI.Point, d: PIXI.Point ):void
   {
      // find intersection between bezier arms
      let s: PIXI.Point = MathUtils.intersect2Lines( a, b, c, d )

      if ( s && !isNaN( s.x ) && !isNaN( s.y ) )
      {
         // find distance between the midpoints
         let dx: number = ( a.x + d.x + s.x * 4 - ( b.x + c.x ) * 3 ) * .125
         let dy: number = ( a.y + d.y + s.y * 4 - ( b.y + c.y ) * 3 ) * .125
         // split curve if the quadratic isn't close enough
         if ( dx * dx + dy * dy <= Bezier.tolerance * Bezier.tolerance )
         {
            // end recursion by saving points
            this.QPts.push( { p:d, c:s } )
            return
         }
      }
      else
      {
         //O let mp: PIXI.Point = PIXI.Point.interpolate( a, d, 0.5 )
         //NC PIXI.Point does not have interpolate. Use the one created on Global
         let mp: PIXI.Point = Global.interpolate( a, d, 0.5 )
         //O if ( Point.distance( a, mp ) <= Bezier.tolerance )
         //NC PIXI.Point does not have distance. Use the one created on Global
         if ( Global.distance( a, mp ) <= Bezier.tolerance )
         {
            this.QPts.push( { p:d, c:mp } )
            return
         }
      }

      let halves:ICUBBEZ = MathUtils.bezierSplit ( a, b, c, d )
      let b0: IQUADPOINTS = halves.b0
      let b1: IQUADPOINTS = halves.b1

      // recursive call to subdivide curve
      this.getQuadBezier( a,     b0.b, b0.c, b0.d )
      this.getQuadBezier( b1.a,  b1.b, b1.c, d )
   }
}
