//O package com.partkart
//O {
//O    import flash.geom.Point
//O    import flash.geom.Rectangle

import * as PIXI from 'pixi.js'
import { ArcSegment } from './ArcSegment'
import { Global } from './Global'

export class CircularArc extends ArcSegment
{
   public center: PIXI.Point
   public radius: number

   constructor( point1: PIXI.Point, point2: PIXI.Point, c: PIXI.Point, r: number )
   {
      let center = c
      //let radius = r

      let theta1: number = Math.atan2( point1.y - center.y, point1.x - center.x )
      let theta2: number = Math.atan2( point2.y - center.y, point2.x - center.x )

      let dtheta1: number = ( ( theta2 - theta1 ) * 180 ) / Math.PI
      let dtheta2: number = ( ( ( Math.PI - theta2 ) + theta1 ) * 180 ) / Math.PI

      if ( dtheta1 > 360 )
      {
         dtheta1 -= 360
      }
      else if( dtheta1 < -360 )
      {
         dtheta1 += 360
      }

      if ( dtheta2 > 360 )
      {
         dtheta2 -= 360
      }
      else if ( dtheta2 < -360 )
      {
         dtheta2 += 360
      }

      let dtheta: number

      if ( Math.abs( dtheta1 ) <= Math.abs( dtheta2 ) )
      {
         dtheta = dtheta1
      }
      else
      {
         dtheta = dtheta2
      }

      let large: boolean = false

      // calculate which side of the segment the center lies on
      let m: number = ( center.x - point1.x ) * ( point2.y - point1.y ) - ( point2.x - point1.x ) * ( center.y - point1.y )

      if ( ( ( m > 0 && r < 0 ) || ( m < 0 && r > 0 ) ) && Math.abs( m ) > Global.tolerance )
      {
         large = true
      }

      large = false

      if ( Math.abs( dtheta ) < 0.000001 || Math.abs( dtheta + 180 ) < 0.00000001 || Math.abs( dtheta - 180 ) < 0.0000001 )
      {
         dtheta = 0
      }

      let sweep: boolean = false

      if ( dtheta > 0 )
      {
         sweep = true
      }

      if ( dtheta == 0 && r < 0 )
      {
         sweep = true
      }
      else if( dtheta == 0 && r > 0 )
      {
         sweep = false
      }
      //large = true
      //sweep = !sweep
      //trace( "dtheta: ", dtheta )

      super( point1, point2, Math.abs( r ), Math.abs( r ), 0, large, sweep )

      this.center = center
      this.radius = r
   }

   //O public override offset( r: number ): boolean
   public offset( r: number ): boolean
   {
      let newradius: number =  this.radius + r

      // inverted offsets ( offsets that pass through the arc center ) are VALID
      // they must be preserved to maintain the integrity of the overall offset
      let inverse: boolean = false
      if ( newradius/ Math.abs( newradius ) !=  this.radius / Math.abs( this.radius ) )
      {
         inverse = true
      }

      this.radius = newradius

      this.rx =  this.radius
      this.ry =  this.radius

      let r1: PIXI.Point = new PIXI.Point( this.p1.x -  this.center.x, this.p1.y -  this.center.y )
      let r2: PIXI.Point = new PIXI.Point( this.p2.x -  this.center.x, this.p2.y -  this.center.y )

      if ( inverse )
      {
         //O r1.normalize( -Math.abs( this.radius ) )
         r1 = Global.normalize( r1, -Math.abs( this.radius ) )
         //O r2.normalize( -Math.abs( this.radius ) )
         r2 = Global.normalize( r2, -Math.abs( this.radius ) )
      }
      else
      {
         //O r1.normalize( Math.abs( this.radius ) )
         r1 = Global.normalize( r1, Math.abs( this.radius ) )
         //O r2.normalize( Math.abs( this.radius ) )
         r2 = Global.normalize( r2, Math.abs( this.radius ) )
      }

      this.p1.x = this.center.x + r1.x
      this.p1.y = this.center.y + r1.y

      this.p2.x = this.center.x + r2.x
      this.p2.y = this.center.y + r2.y

      return true
   }

   public arcclone( ):CircularArc
   {
      let p1clone: PIXI.Point = this.p1.clone( )
      let p2clone: PIXI.Point = this.p2.clone( )

      let centerclone: PIXI.Point = this.center.clone( )

      return new CircularArc( p1clone, p2clone, centerclone, this.radius )
   }

   //O public override getLength( ): number
   public getLength( ): number
   {
      let radians: number = Global.getAngle( new PIXI.Point( this.p1.x - this.center.x, this.p1.y - this.center.y ), new PIXI.Point( this.p2.x - this.center.x, this.p2.y - this.center.y ) )
      let length: number = radians * this.radius

      return Math.abs( length )
   }

   public onArc( p: PIXI.Point ): boolean
   {
      let norm1: PIXI.Point
      let norm2: PIXI.Point

      let normpoint: PIXI.Point

      normpoint = new PIXI.Point( p.x - this.center.x, p.y - this.center.y )

      norm1 = new PIXI.Point( this.p1.x - this.center.x, this.p1.y - this.center.y )
      norm2 = new PIXI.Point( this.p2.x - this.center.x, this.p2.y - this.center.y )

      let angle1: number = Global.getAngle( norm1, normpoint )
      let angle2: number = Global.getAngle( norm1, norm2 )

      // Unused
      //O let pi: number = Math.PI

      if( angle1 == 0 || angle2 == 0 )
      {
         return false
      }
      else if ( Math.PI - Math.abs( angle2 ) < 0.0000000001 )
      {
         // things get a bit hairy with the angle method when the normals are exactly opposite. In this case we simply key on the circle winding direction and point position
         let m = ( p.x - this.p1.x ) * ( this.p2.y - this.p1.y ) - ( this.p2.x - this.p1.x ) * ( p.y - this.p1.y )

         if( ( m > 0 &&  this.radius < 0 ) || ( m < 0 &&  this.radius > 0 ) )
         {
            return true
         }
         else
         {
            return false
         }
      }
      else if ( ( angle2 > 0 && angle1 > 0 && angle1 < angle2 ) || ( angle2 < 0 && angle1 < 0 && angle1 > angle2 ) )
      {
         return true
      }

      //trace( cross1, cross2 )
      return false
   }

   // similar to the getbounds function, this function returns a bounding rectangle
   // however it uses exact geometry rather than pixel approximation
   // note that the returned rectangle is in right-hand coordinates ( x,y values represent lower-left corner of box )
   public getExactBounds( ): PIXI.Rectangle
   {
      let minx: number = Math.min( this.p1.x, this.p2.x )
      let miny: number = Math.min( this.p1.y, this.p2.y )

      let maxx: number = Math.max( this.p1.x, this.p2.x )
      let maxy: number = Math.max( this.p1.y, this.p2.y )

      if ( this.onArc( new PIXI.Point( this.center.x + Math.abs( this.radius ), this.center.y ) ) )
      {
         maxx = this.center.x + Math.abs( this.radius )
      }
      if ( this.onArc( new PIXI.Point( this.center.x - Math.abs( this.radius ), this.center.y ) ) )
      {
         minx = this.center.x - Math.abs( this.radius )
      }
      if ( this.onArc( new PIXI.Point( this.center.x, this.center.y + Math.abs( this.radius ) ) ) )
      {
         maxy = this.center.y + Math.abs( this.radius )
      }
      if ( this.onArc( new PIXI.Point( this.center.x, this.center.y - Math.abs( this.radius ) ) ) )
      {
         miny = this.center.y - Math.abs( this.radius )
      }

      return new PIXI.Rectangle( minx, miny, maxx - minx, maxy - miny )
   }

   // returns a point that is distance "length" from p1 along the arc
   //O public override getPointFromLength( length: number ): PIXI.Point
   public getPointFromLength( length: number ): PIXI.Point
   {
      let norm1: PIXI.Point = new PIXI.Point( this.p1.x - this.center.x, this.p1.y - this.center.y )
      let norm2: PIXI.Point = new PIXI.Point( this.p2.x - this.center.x, this.p2.y - this.center.y )

      let angle: number = Global.getAngle( norm1, norm2 )

      /*if( angle < 0 ){
         l = -l
      }*/

      let theta: number = length / Math.abs( this.radius )

      if ( angle < 0 )
      {
         theta = -theta
      }

      theta += Math.atan2( norm1.y, norm1.x )

      let dx: number = Math.abs( this.radius ) * Math.cos( theta )
      let dy: number = Math.abs( this.radius ) * Math.sin( theta )

      return new PIXI.Point( this.center.x + dx,  this.center.y + dy )
   }

   // splits the arc at the point that is distance "length" from p1 along the arc
   // returns two arcs as an array
   //O public override splitByLength( length: number ):Array
   public splitByLength( length: number ):Array < CircularArc >
   {
      if ( length == 0 )
      {
         return new Array( this )
      }
      let splitpoint: PIXI.Point = this.getPointFromLength( length )

      let arc1: CircularArc = new CircularArc( this.p1, splitpoint, this.center.clone( ), this.radius )
      let arc2: CircularArc = new CircularArc( splitpoint, this.p2, this.center.clone( ), this.radius )

      return new Array( arc1, arc2 )
   }

   // returns a reversed version of this segment
   //O public override reverse( ):*
   //fixme star
   public reverse( ): CircularArc
   {
      let newarc:CircularArc = new CircularArc( this.p2, this.p1,  this.center.clone( ), - this.radius )

      return newarc
   }

   // recalculates center and radius based on end point positions and winding direction ( current radius sign )
   public recalculateCenter( ): void
   {
      //let hypo: number = Point.distance( this.p1, this.p2 )
      //N PIXI.Point does not have function distance
      let hypo: number = Global.distance( this.p1, this.p2 )

      //O let mid: PIXI.Point = PIXI.Point.interpolate( this.p1, this.p2, 0.5 )
      //N PIXI.Point does not have function interpolate
      let mid: PIXI.Point = Global.interpolate( this.p1, this.p2, 0.5 )
      let normal: PIXI.Point = new PIXI.Point( -this.p2.y + this.p1.y, this.p2.x - this.p1.x )

      let distance: number = Math.sqrt( this.radius * this.radius - 0.25 * hypo * hypo )
      //O normal.normalize( distance )
      normal = Global.normalize( normal, distance )

      if ( this.radius > 0 )
      {
         normal.x = - normal.x
         normal.y = - normal.y
      }

       this.center.x = mid.x + normal.x
       this.center.y = mid.y + normal.y
   }

   // returns a linearized version of this arc, with deviation no more than the given tolerance
   // not useful for now, but may come in handy later ( ? )
   //O Originally commented out
   /*public linearize( tol: number ):Array{
      let dtheta: number = Math.sqrt( tol / Math.abs( this.radius * 2 ) )
      let angle: number = Global.getAngle( new Point( this.p1.x - this.center.x, this.p1.y - this.center.y ), new PIXI.Point( this.p2.x - this.center.x, this.p2.y - this.center.y ) )

      let divisions: number = angle / dtheta

      if ( divisions < 0 )
      {
         dtheta = - dtheta
         divisions = - divisions
      }

      divisions = Math.ceil( divisions )
      let increment: number = angle / divisions

      let segments:Array = new Array( )
      let current: number = Math.atan2( this.p1.y - this.center.y, this.p1.x - this.center.x )

      let i = 0

      let prev: PIXI.Point = this.p1.clone( )

      while( i < divisions )
      {
         i++
         let next: PIXI.Point = new PIXI.Point( this.radius * Math.cos( current + i * increment ) + this.center.x, this.radius * Math.sin( current + i * increment ) + this.center.y )
         let segment:Segment = new Segment( prev, next )
         prev = next
         segments.push( segment )
      }

      return segments
   }

   public getAverage( ): PIXI.Point
   {
      let segments:Array = linearize( Global.tolerance )
      let ax: number = segments[0].x
      let ay: number = segments[0].y
      for( let i = 1; i < segments.length; i++ )
      {
         ax += ( segments[ i ].x - ax ) / ( i + 1 )
         ay += ( segments[ i ].y - ax ) / ( i + 1 )
      }

      return new Point( ax, ay )
   }*/
}
