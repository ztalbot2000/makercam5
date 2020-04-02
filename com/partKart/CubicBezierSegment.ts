//O package com.partkart
//O {
//O    import flash.geom.Point
//O    import fl.motion.BezierSegment

import * as PIXI from 'pixi.js'
import { Global } from './Global'
import { Segment } from './Segment'
import { CircularArc } from './CircularArc'
import { BezierSegment } from './BezierSegment'
import { Biarc } from './Biarc'


export class CubicBezierSegment extends Segment
{

   public c1: PIXI.Point
   public c2: PIXI.Point

   private seglist: Array< Segment | CircularArc | CubicBezierSegment >

   constructor( point1: PIXI.Point, point2: PIXI.Point, control1: PIXI.Point, control2: PIXI.Point )
   {
      super( point1, point2 )

      this.c1 = control1
      this.c2 = control2
   }

   public linearize( circle: boolean = false ): Array< Segment | CircularArc | CubicBezierSegment >
   {

      this.seglist = new Array( )
      this.seglist.push( this )

      if ( circle == true )
      {
         this.inflectiondivide( this, Global.tolerance )
      }
      else
      {
         //O this.subdivide( this, Global.tolerance, 0.5 )
         this.loopdivide( circle )
      }

      return this.seglist
   }

   // flash's recursion stack is limited, we use loops instead
   private loopdivide( circle: boolean ):void
   {
      let dividelist = this.seglist.slice( )
      while( dividelist.length > 0 )
      {

         //O while( dividelist.length > 0 && !( dividelist[ 0 ] is CubicBezierSegment ) )
         while( dividelist.length > 0 && !( dividelist[ 0 ] instanceof CubicBezierSegment ) )
         {
            dividelist.shift( )
         }

         if ( dividelist.length == 0 )
         {
            return
         }

         // Cast is valid as we iterate through the seglist above
         let seg:CubicBezierSegment = < CubicBezierSegment > dividelist[ 0 ]

         let re:Array< CubicBezierSegment > = this.subdivide( seg, Global.tolerance, 0.5, circle )
         if ( re && re.length == 2 )
         {
            dividelist.splice( 0, 1, re[ 0 ], re[1] )
         }
         else
         {
            dividelist.shift( )
         }
      }
   }

   // to "normalize" the cubic bezier segment, we must first subdivide it at its inflection point, if any exists
   // this is mostly to improve the accuracy of our arc fitting algorithm
   // for simplicity, we will assume that any resulting subdivisions do not have inflection points
   private inflectiondivide( seg:CubicBezierSegment, tol: number ): void
   {

      // inflection point detection is simply a quadratic root finding problem ( at^2 + bt + c = 0 )
      let ax: number = -this.p1.x + 3 * ( this.c1.x - this.c2.x ) + this.p2.x
      let ay: number = -this.p1.y + 3 * ( this.c1.y - this.c2.y ) + this.p2.y

      let bx: number = 3 * ( this.p1.x - 2 * this.c1.x + this.c2.x )
      let by: number = 3 * ( this.p1.y - 2 * this.c1.y + this.c2.y )

      let cx: number = 3 * ( this.c1.x - this.p1.x )
      let cy: number = 3 * ( this.c1.y - this.p1.y )

      //NC Not Used
      //O let dx: number = this.p1.x
      //O let dy: number = this.p1.y

      let a: number = 6 * ( ay*bx - ax*by )
      let b: number = 6 * ( ay*cx - ax*cy )
      let c: number = 2 * ( by*cx - bx*cy )

      let roots:Array< number > = BezierSegment.getQuadraticRoots( a, b, c )

      if ( !roots || roots.length == 0 )
      {
         this.loopdivide( true )
         //O this.subdivide( seg, tol, 0.5, true )
         return
      }
      else
      {
         // filter out roots that are not within [ 0, 1 ]
         if ( roots.length > 1 )
         {
            if ( roots[ 1 ] <= 0 || roots[ 1 ] >= 1 )
            {
               roots.pop( )
            }
         }
         if ( roots.length > 0 )
         {
            if ( roots[ 0 ] <= 0 || roots[ 0 ] >= 1 )
            {
               roots.shift( )
            }
         }

         let t: number

         if ( roots.length == 0 )
         {
            //O this.subdivide( seg, tol, 0.5, true )
            this.loopdivide( true )
            return
         }
         else if ( roots.length == 1 )
         {
            t = roots[ 0 ]
         }
         // if two correct roots remain, choose the one closest to 0.5
         else if ( roots.length > 1 )
         {
            let dis1: number = Math.abs( roots[ 0 ] - 0.5 )
            let dis2: number = Math.abs( roots[ 1 ] - 0.5 )
            if ( dis1 <= dis2 )
            {
               t = roots[ 0 ]
            }
            else
            {
               t = roots[ 1 ]
            }
         }

         //O  subdivide at t
         this.subdivide( seg, tol, t, true )
         this.loopdivide( true )
      }
   }

   // recursively subdivide bezier segment to within the given tolerance
   // using de Casteljau subdivision
   private subdivide( seg:CubicBezierSegment, tol: number, t: number, circle: boolean = false ):Array< CubicBezierSegment >
   {
      // only use biarc approximation when the segment has been inflection divided
      if ( this.seglist.length > 1 && circle == true )
      {
         let biarc:Biarc = this.isbiarc( seg, tol )
         if ( biarc )
         {
            // approximate with biarc
            let arcs:Array< CircularArc > = biarc.getArcs( )
            this.seglist.splice( this.seglist.indexOf( seg ), 1, arcs[ 0 ], arcs[ 1 ] )
            return null
         }
      }

      // use more stringent tests for flatness if circles are specified ( circular arcs are more desirable )
      if ( ( circle == false && this.isflat( seg, tol ) ) || ( circle == true && this.isflat( seg, 0.5*tol ) ) )
      {
         // convert to line
         this.seglist.splice( this.seglist.indexOf( seg ), 1, new Segment( seg.p1, seg.p2 ) )
         return null
      }
      //O else{
      // first calculate midpoints
      // note: they are actual midpoints only when t = 0.5

      let mid1: PIXI.Point = new PIXI.Point( seg.p1.x + ( seg.c1.x - seg.p1.x )*t, seg.p1.y + ( seg.c1.y - seg.p1.y ) * t )
      let mid2: PIXI.Point = new PIXI.Point( seg.c2.x + ( seg.p2.x - seg.c2.x )*t, seg.c2.y + ( seg.p2.y - seg.c2.y ) * t )

      let mid3: PIXI.Point = new PIXI.Point( seg.c1.x + ( seg.c2.x - seg.c1.x )*t, seg.c1.y + ( seg.c2.y - seg.c1.y ) * t )

      let mida: PIXI.Point = new PIXI.Point( mid1.x + ( mid3.x - mid1.x )*t, mid1.y + ( mid3.y - mid1.y )*t )
      let midb: PIXI.Point = new PIXI.Point( mid3.x + ( mid2.x - mid3.x )*t, mid3.y + ( mid2.y - mid3.y )*t )

      let midx: PIXI.Point = new PIXI.Point( mida.x + ( midb.x - mida.x ) * t, mida.y + ( midb.y - mida.y ) * t )

      if ( t != 0.5 )
      {
         //O trace( midx.x, midx.y )
      }

      /*var bezier:BezierSegment = new BezierSegment( seg.p1, seg.c1, seg.c2, seg.p2 )
      let midpoint = bezier.getValue( t );
      */

      let seg1:CubicBezierSegment = new CubicBezierSegment( seg.p1, midx, mid1, mida )
      let seg2:CubicBezierSegment = new CubicBezierSegment( midx, seg.p2, midb, mid2 )

      this.seglist.splice( this.seglist.indexOf( seg ), 1, seg1, seg2 )

      return new Array( seg1, seg2 )
      //O this.subdivide( seg1, tol, 0.5, circle )
      //O this.subdivide( seg2, tol, 0.5, circle )
      //O }
   }

   private isbiarc( seg:CubicBezierSegment, tol: number ):Biarc
   {
      let intersect: PIXI.Point = this.lineIntersect( seg.p1, seg.c1, seg.p2, seg.c2 )

      if ( intersect == null )
      {
         return null
      }

      let biarc:Biarc = new Biarc( seg.p1, intersect, seg.p2 )

      // limit max radius ( some machine controllers limit this radius )
      //NC Unused
      //let radiuslimit: number = 400
      //if ( Global.unit == 'cm' )
      //{
      //   radiuslimit *= 2.54
      //}

      /*if ( biarc == null || isNaN( biarc.r1 ) || isNaN( biarc.r2 ) || Math.abs( biarc.r1 ) > radiuslimit || Math.abs( biarc.r2 ) > radiuslimit ){
         return null
      }*/
      if ( biarc == null || isNaN( biarc.r1 ) || isNaN( biarc.r2 ) )
      {
         return null
      }

      // determine whether the biarc is a close enough approximation to the given segment
      let deviation1: number = this.getmaxdeviation( 0, 0.5, seg, biarc.c1, biarc.r1 )
      let deviation2: number = this.getmaxdeviation( 0.5, 1, seg, biarc.c2, biarc.r2 )

      let deviation: number = Math.max( deviation1, deviation2 )

      if ( deviation < tol )
      {
         return biarc
      }

      return null

   }

   /* Originally commented out
   private getmaxdeviation( t: number, seg:CubicBezierSegment, center: PIXI.Point, radius: number ): number
   {
      // use newton's method to find t at which radial deviation is maximum, then return that maximum deviation

      // first get the coefficients of the parameterized cubic equation ( at^3 + bt^2 + ct^ + d )
      let ax: number = -seg.p1.x + 3 * ( seg.c1.x - seg.c2.x ) + seg.p2.x
      let ay: number = -seg.p1.y + 3 * ( seg.c1.y - seg.c2.y ) + seg.p2.y

      let bx: number = 3 * ( seg.p1.x - 2 * seg.c1.x + seg.c2.x )
      let by: number = 3 * ( seg.p1.y - 2 * seg.c1.y + seg.c2.y )

      let cx: number = 3 * ( seg.c1.x - seg.p1.x )
      let cy: number = 3 * ( seg.c1.y - seg.p1.y )

      let dx: number = seg.p1.x
      let dy: number = seg.p1.y

      // and now values for the first derivative

      let ax1: number = 3 * ax; let ay1: number = 3 * ay
      let bx1: number = 2 * bx; let by1: number = 2 * by
      let cx1: number = cx; let cy1: number = cy

      // and the second derivative

      let ax2: number = 2 * ax1; let ay2: number = 2 * ay1
      let bx2: number = bx1; let by2: number = by1

      let bezier:BezierSegment = new BezierSegment( seg.p1, seg.c1, seg.c2, seg.p2 )

      let currentpoint: PIXI.Point

      let q: PIXI.Point
      let q1: PIXI.Point
      let q2: PIXI.Point

      let f: number
      let f1: number

      // first use bisection to determine whether root exists

      currentpoint = bezier.getValue( 0 )

      q = new PIXI.Point( currentpoint.x - center.x, currentpoint.y - center.y )
      q1 = new PIXI.Point( cx1, cy1 )

      let temp1f: number = q.x * q1.x + q.y * q1.y

      currentpoint = bezier.getValue( 1 )

      q = new Point( currentpoint.x - center.x, currentpoint.y - center.y )
      q1 = new Point( ax1 + bx1 + cx1, ay1 + by1 + cy1 )

      let temp2f: number = q.x * q1.x + q.y * q1.y

      if ( temp1f/Math.abs( temp1f ) == temp2f/Math.abs( temp2f ) ){
         // if the sign does not change between t=0 and t=1, assume that there is no root.
         return this.geterror( t, seg, center, radius )
      }

      let t1: number = 0
      let i = 0
      f = 1

      while( f > 0.01 && i<100 && !isNaN( t ) )
      {
         currentpoint = bezier.getValue( t )

         q = new Point( currentpoint.x - center.x, currentpoint.y - center.y )
         q1 = new Point( ax1 * Math.pow( t, 2 ) + bx1 * t + cx1, ay1 * Math.pow( t, 2 ) + by1 * t + cy1 )
         q2 = new Point( ax2 * t + bx2, ay2 * t + by2 )

         f = q.x * q1.x + q.y * q1.y
         f1 = ( q1.x - center.x ) * q2.x + ( q1.y - center.y ) * q2.y

         t = t - f / f1

         i++
      }

      if ( t >= 1 || t <= 0 )
      {
         t = 0.5
      }

      return geterror( t, seg, center, radius )
   }
   */

   private getmaxdeviation( t1: number, t2: number, seg:CubicBezierSegment, center: PIXI.Point, radius: number ): number
   {
      // the newton raphson method approach is still not very reliable, for now sample 20 points along the curve
      let error: number = 0
      let e: number
      for( let i = 0; i < 20; i++ )
      {
         e = this.geterror( t1 + ( i / 20 ) * ( t2 - t1 ), seg, center, radius )
         if ( e > error )
         {
            error = e
         }
      }
      return error
   }

   private geterror( t: number, seg:CubicBezierSegment, center: PIXI.Point, radius: number ): number
   {
      let bezier:BezierSegment = new BezierSegment( seg.p1, seg.c1, seg.c2, seg.p2 )
      let currentpoint: PIXI.Point = bezier.getValue( t )

      //O let error: number = Math.abs( Point.distance( currentpoint, center ) - Math.abs( radius ) )
      //NC PIXI.Point does not have function distance.  Added to Global
      let error: number = Math.abs( Global.distance( currentpoint, center ) - Math.abs( radius ) )

      return error
   }

   // returns true if the given cubic bezier is close enough to a line segment using the given tolerance, false otherwise
   // use Roger Willcocks bezier flatness criterion
   public isflat( seg:CubicBezierSegment, tol: number ): boolean
   {
      let tolerance: number = 16 * tol * tol

      let ux: number = 3 * seg.c1.x - 2 * seg.p1.x - seg.p2.x
      ux *= ux

      let uy: number = 3 * seg.c1.y - 2 * seg.p1.y - seg.p2.y
      uy *= uy

      let vx: number = 3 * seg.c2.x - 2 * seg.p2.x - seg.p1.x
      vx *= vx

      let vy: number = 3 * seg.c2.y - 2 * seg.p2.y - seg.p1.y
      vy *= vy

      if ( ux < vx )
      {
         ux = vx
      }
      if ( uy < vy )
      {
         uy = vy
      }

      return ( ux + uy <= tolerance )
   }

   //---------------------------------------------------------------
   //Checks for intersection of Segment if as_seg is true.
   //Checks for intersection of Line if as_seg is false.
   //Return intersection of Segment AB and Segment EF as a Point
   //Return null if there is no intersection
   //---------------------------------------------------------------
   public lineIntersect( A: PIXI.Point, B: PIXI.Point, E: PIXI.Point, F: PIXI.Point, as_seg: boolean=false ): PIXI.Point
   {
      let ip: PIXI.Point
      let a1: number
      let a2: number
      let b1: number
      let b2: number
      let c1: number
      let c2: number

      a1= B.y - A.y
      b1= A.x - B.x
      c1= B.x * A.y - A.x * B.y
      a2= F.y - E.y
      b2= E.x - F.x
      c2= F.x * E.y - E.x * F.y

      let denom: number=a1 * b2 - a2 * b1
      if ( denom == 0 )
      {
         return null
      }
      ip=new PIXI.Point( )
      ip.x=( b1 * c2 - b2 * c1 )/denom
      ip.y=( a2 * c1 - a1 * c2 )/denom

      //---------------------------------------------------
      //Do checks to see if intersection to endpoints
      //distance is longer than actual Segments.
      //Return null if it is with any.
      //---------------------------------------------------
      if ( as_seg )
      {
         if ( Math.pow( ip.x - B.x, 2 ) + Math.pow( ip.y - B.y, 2 ) > Math.pow( A.x - B.x, 2 ) + Math.pow( A.y - B.y, 2 ) )
         {
            return null
         }
         if ( Math.pow( ip.x - A.x, 2 ) + Math.pow( ip.y - A.y, 2 ) > Math.pow( A.x - B.x, 2 ) + Math.pow( A.y - B.y, 2 ) )
         {
            return null
         }

         if ( Math.pow( ip.x - F.x, 2 ) + Math.pow( ip.y - F.y, 2 ) > Math.pow( E.x - F.x, 2 ) + Math.pow( E.y - F.y, 2 ) )
         {
            return null
         }
         if ( Math.pow( ip.x - E.x, 2 ) + Math.pow( ip.y - E.y, 2 ) > Math.pow( E.x - F.x, 2 ) + Math.pow( E.y - F.y, 2 ) )
         {
            return null
         }
      }

      if ( isNaN( ip.x ) || isNaN( ip.y ) )
      {
         return null
      }

      return ip
   }

   //O public override reverse( ):*
   //fixme star
   public reverse( ): CubicBezierSegment
   {
      let newbezier:CubicBezierSegment = new CubicBezierSegment( this.p2, this.p1, this.c2, this.c1 )
      return newbezier
   }
}
