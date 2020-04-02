//O package com.partkart
//O {
//O    import flash.geom.Point
//O    import com.partkart.Segment

import * as PIXI from 'pixi.js'
import { Global } from './Global'
import { Segment } from './Segment'
import { CircularArc } from './CircularArc'
import { Biarc } from './Biarc'

export class QuadBezierSegment extends Segment
{
   public c1: PIXI.Point

   private seglist: Array< Segment | QuadBezierSegment | CircularArc >

   constructor ( point1: PIXI.Point, point2: PIXI.Point, control1: PIXI.Point )
   {
      super( point1, point2 )

      this.c1 = control1
   }

   public getPoint( time: number, point: PIXI.Point = null ): PIXI.Point
   {
      if ( isNaN( time ) )
      {
         return undefined
      }
      point = ( point as PIXI.Point ) || new PIXI.Point(  )
      const f: number = 1 - time
      point.x = this.p1.x * f * f + this.c1.x * 2 * time * f + this.p2.x * time * time
      point.y = this.p1.y * f * f + this.c1.y * 2 * time * f + this.p2.y * time * time
      return point
   }

   public linearize( circle: boolean = false ): Array< QuadBezierSegment >
   {
      let seglist: Array< QuadBezierSegment > = new Array( )
      seglist.push( this )

      this.loopdivide( circle )
      //subdivide( this, Global.tolerance, 0.5, circle )

      return seglist
   }

   // flash's recursion stack is limited, we use loops instead
   private loopdivide( circle: boolean ): void
   {
      let dividelist:Array< Segment | QuadBezierSegment | CircularArc > = this.seglist.slice(  )
      while( dividelist.length > 0 )
      {
         //O var seg:QuadBezierSegment = dividelist[0];
         //NC I guess it knows the first is a QuadBezierSegment
         let seg:QuadBezierSegment = < QuadBezierSegment > dividelist[ 0 ]

         let re:Array< QuadBezierSegment > = this.subdivide( seg, Global.tolerance, 0.5, circle )
         if ( re && re.length == 2  )
         {
            dividelist.splice( 0, 1, re[ 0 ], re[ 1 ]  )
         }
         else
         {
            dividelist.shift(  )
         }
      }
   }

   // recursively subdivide bezier segment to within the given tolerance
   // using de Casteljau subdivision
   //NC return Quad is correct
   private subdivide( seg: QuadBezierSegment, tol: number, t: number, circle = false ): Array< QuadBezierSegment >
   {
      if ( circle )
      {
         let biarc = this.isbiarc( seg, tol )
         // approximate with biarc
         if ( biarc )
         {
            let arcs:Array < CircularArc > = biarc.getArcs(  )
            this.seglist.splice( this.seglist.indexOf( seg ), 1 , arcs[ 0 ], arcs[ 1 ] )
            return null
         }
      }
      // use more stringent tests for flatness if circles are specified ( circular arcs are more desirable )
      if ( ( circle == false && this.isflat( seg, tol ) ) || ( circle == true && this.isflat( seg, 0.5 * tol ) ) )
      {
         // convert to line
         this.seglist.splice( this.seglist.indexOf( seg ), 1, new Segment( seg.p1, seg.p2 ) )
         return null
      }
      //else{
      // first calculate midpoints
      // note: they are actual midpoints only when t = 0.5

      let mid1: PIXI.Point = new PIXI.Point( seg.p1.x + ( seg.c1.x - seg.p1.x ) * t, seg.p1.y + ( seg.c1.y - seg.p1.y ) * t )
      let mid2: PIXI.Point = new PIXI.Point( seg.c1.x + ( seg.p2.x - seg.c1.x ) * t, seg.c1.y + ( seg.p2.y - seg.c1.y ) * t )

      let mid3: PIXI.Point = new PIXI.Point( mid1.x + ( mid2.x - mid1.x ) * t, mid1.y + ( mid2.y - mid1.y ) * t )

      let seg1:QuadBezierSegment = new QuadBezierSegment( seg.p1, mid3, mid1 )
      let seg2:QuadBezierSegment = new QuadBezierSegment( mid3, seg.p2, mid2 )

      this.seglist.splice( this.seglist.indexOf( seg ), 1, seg1, seg2 )

      return new Array( seg1, seg2 )
      //subdivide( seg1, tol, 0.5, circle )
      //subdivide( seg2, tol, 0.5, circle )
      //}
   }

   private isbiarc( seg:QuadBezierSegment, tol: number ):Biarc
   {
      let intersect: PIXI.Point = seg.c1

      if ( intersect == null )
      {
         return null
      }

      let biarc:Biarc = new Biarc( seg.p1, intersect, seg.p2 )

      // limit max radius ( some machine controllers limit this radius )
      let radiuslimit: number = 400
      if ( Global.unit == 'cm' )
      {
         radiuslimit *= 2.54
      }

      if ( biarc == null || isNaN( biarc.r1 ) || isNaN( biarc.r2 ) || Math.abs( biarc.r1 ) > radiuslimit || Math.abs( biarc.r2 ) > radiuslimit )
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

   private getmaxdeviation( t1: number, t2: number, seg: QuadBezierSegment, center: PIXI.Point, radius: number ): number
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

   private geterror( t: number, seg:QuadBezierSegment, center: PIXI.Point, radius: number ): number
   {
      let currentpoint: PIXI.Point = seg.getPoint( t )

      //O let error: number = Math.abs( PIXI.Point.distance( currentpoint,center ) - Math.abs( radius ) )
      let error: number = Math.abs( Global.distance( currentpoint, center ) - Math.abs( radius ) )

      return error
   }

   // returns true if the given quad bezier is close enough to a line segment using the given tolerance, false otherwise
   // use Roger Willcocks bezier flatness criterion
   public isflat( seg:QuadBezierSegment, tol: number ): boolean
   {
      let tolerance: number = 4*tol*tol

      let ux: number = 2 * seg.c1.x - seg.p1.x - seg.p2.x
      ux *= ux

      let uy: number = 2 * seg.c1.y - seg.p1.y - seg.p2.y
      uy *= uy

      return ( ux+uy <= tolerance )
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

      let denom: number = a1 * b2 - a2 * b1
      if ( denom == 0 )
      {
         return null
      }
      ip=new PIXI.Point(  )
      ip.x=( b1 * c2 - b2 * c1 ) / denom
      ip.y=( a2 * c1 - a1 * c2 ) / denom

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

   //O public override function reverse( ):*
   //fixme star
   public reverse( ): QuadBezierSegment
   {
      let newbezier: QuadBezierSegment = new QuadBezierSegment( this.p2, this.p1, this.c1 )
      return newbezier
   }
}
